"use client";
import { auth, db } from "@/lib/firebase";
import { collection, onSnapshot, doc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const unsub = onSnapshot(collection(db, "users", auth.currentUser.uid, "cart"), (snap) => {
      setCart(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const remove = (id) => deleteDoc(doc(db, "users", auth.currentUser.uid, "cart", id));
  const updateQty = (id, delta) => {
    const ref = doc(db, "users", auth.currentUser.uid, "cart", id);
    updateDoc(ref, { quantity: increment(delta) });
  };

  if (!auth.currentUser) return <p className="text-center text-4xl mt-40">Log in to see cart</p>;

  return (
    <div className="py-20">
      <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent mb-20">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-3xl">Empty ✨</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="bg-white/70 backdrop-blur rounded-3xl p-8 mb-8 flex gap-8 items-center shadow-xl">
              <Image src={item.image} width={160} height={160} className="rounded-2xl" alt="" />
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-brand-deep">{item.name}</h3>
                <p className="text-2xl text-brand-lavender">${item.price}</p>
              </div>
              <div className="flex items-center gap-6 text-2xl">
                <button onClick={() => updateQty(item.id, -1)} className="text-4xl hover:scale-125 transition">-</button>
                <span className="w-16 text-center">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)} className="text-4xl hover:scale-125 transition">+</button>
                <button onClick={() => remove(item.id)} className="text-red-600 hover:scale-110">Remove</button>
              </div>
            </div>
          ))}
          <div className="text-right mt-20">
            <p className="text-5xl font-bold text-brand-deep">Total: ${total}</p>
            <Link href="/checkout">
              <button className="mt-8 bg-gradient-button text-white px-20 py-8 rounded-3xl text-3xl font-bold hover:opacity-90 shadow-2xl">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}