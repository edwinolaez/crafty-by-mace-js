"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
/*import { init } from "next/dist/compiled/webpack/webpack";*/

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (window.Square) {
      initSquare();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
    script.async = true;
    script.onload = initSquare;
    script.onerror = () => {
      alert("Failed to load Square payment form. Check your internet connection.");
    };
    document.body.appendChild(script);
  }, []);

  const initSquare = async () => {
    if (!window.Square) {
      alert("Square SDK failed to load.");
      return;
    }

    try {
      const payments = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      );

      const card = await payments.card({
        style: {
          ".input-container.is-focus": { borderColor: "#9B87F5" }, // Lavender focus
          input: { fontSize: "16px", color: "#2D1B69" } // Deep blue text
        },
      });
      await card.attach("#card-container");

      document.getElementById("pay-button").onclick = async () => {
        setLoading(true);
        try {
          const result = await card.tokenize();
          if (result.status === "OK") {
            // Save order to Firestore
            await addDoc(collection(db, "users", auth.currentUser.uid, "orders"), {
              total: 999, // $9.99 in cents
              status: "paid",
              createdAt: serverTimestamp(),
            });
            alert("Payment successful! 🎉 (Sandbox mode — no real charge)");
            router.push("/profile");
          } else {
            alert("Card error — use test card: 4532 7598 5371 9743");
          }
        } catch (e) {
          alert("Payment processing failed. Try again.");
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
    } catch (e) {
      alert("Failed to initialize payment form. Check your Square keys in .env.local");
      console.error(e);
    }
  };

  if (!auth.currentUser) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent mb-10">
          Secure Checkout
        </h1>

        <div className="text-center mb-10">
          <p className="text-4xl font-bold text-brand-deep">$9.99</p>
          <p className="text-gray-600 mt-4 text-lg">
            Test card: <span className="font-mono font-bold">4532 7598 5371 9743</span> (any expiry/CVC)
          </p>
        </div>

        <div
          id="card-container"
          className="min-h-48 border-4 border-brand-lavender/30 rounded-2xl p-6 bg-white shadow-inner"
        />

        <button
          id="pay-button"
          disabled={loading}
          className="mt-10 w-full bg-gradient-to-r from-brand-lavender to-brand-coral text-white py-6 rounded-2xl text-2xl font-bold hover:opacity-90 disabled:opacity-60 transition shadow-lg"
        >
          {loading ? "Processing..." : "Pay with Card"}
        </button>
      </div>
    </div>
  );
}