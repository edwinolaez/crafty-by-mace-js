"use client";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const add = async () => {
    if (!auth.currentUser) {
      alert("Please log in to add items to your cart");
      return;
    }

    // Check if out of stock
    if (product.stock !== undefined && product.stock <= 0) {
      alert("Sorry, this item is currently out of stock");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "users", auth.currentUser.uid, "cart"), {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || null,
        icon: product.icon || "sparkles",
        quantity: 1,
        addedAt: new Date()
      });

      // Show success state
      setAdded(true);
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={add}
      disabled={loading || added || (product.stock !== undefined && product.stock <= 0)}
      className="holo-button w-full py-6 rounded-2xl text-2xl font-bold relative disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        <ShoppingCart className="w-7 h-7" />
        {loading ? "Adding..." : added ? "Added! ✨" : "Add to Cart"}
      </span>
      
      {/* Shimmer effect on hover */}
      {!loading && !added && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </button>
  );
}