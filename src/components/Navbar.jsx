"use client";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-brand-lavender to-brand-coral/80 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.png"  // Your logo in public/logo.png
            alt="Crafty by mAce Logo"
            width={60}
            height={60}
            className="drop-shadow-lg"
            priority
          />
          <span className="text-4xl font-bold text-white drop-shadow-lg">
            Crafty by m.Ace ✨
          </span>
        </Link>

        <div className="flex gap-10 text-white text-lg font-medium items-center">
          <Link href="/products" className="hover:scale-110 transition">
            Shop
          </Link>
          <Link href="/cart" className="hover:scale-110 transition">
            Cart
          </Link>

          {user ? (
            <>
              <Link href="/profile" className="hover:scale-110 transition">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white/25 backdrop-blur px-8 py-3 rounded-full hover:bg-white/40 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="bg-white/25 backdrop-blur px-8 py-3 rounded-full hover:bg-white/40 transition font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}