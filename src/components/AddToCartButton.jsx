"use client";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useToast } from "@/components/ui/toast";

export default function AddToCartButton({ product }) {
  const { toast } = useToast();

  const add = async () => {
    if (!auth.currentUser) {
      toast({ title: "Please log in", variant: "destructive" });
      return;
    }
    await addDoc(collection(db, "users", auth.currentUser.uid, "cart"), {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      addedAt: new Date()
    });
    toast({ title: "Added to cart! ✨" });
  };

  return (
    <button
      onClick={add}
      className="w-full bg-gradient-to-r from-brand-lavender to-brand-coral text-white py-6 rounded-2xl text-2xl font-bold hover:opacity-90 transition shadow-lg"
    >
      Add to Cart
    </button>
  );
}