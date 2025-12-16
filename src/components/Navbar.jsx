"use client";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, User, Heart } from "lucide-react";

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
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-brand-deep/60 via-brand-lavender/40 to-brand-coral/30 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Crafty by mAce Logo"
              width={50}
              height={50}
              className="drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-lavender/30 to-brand-coral/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-3xl font-bold text-white drop-shadow-lg">
            Crafty by mAce ✨
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex gap-8 text-white text-lg font-medium items-center">
          <Link 
            href="/products" 
            className="flex items-center gap-2 hover:text-brand-coral transition-colors group"
          >
            <Heart className="w-5 h-5 group-hover:fill-current transition-all" />
            <span>Shop</span>
          </Link>
          
          <Link 
            href="/cart" 
            className="flex items-center gap-2 hover:text-brand-lavender transition-colors group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Cart</span>
          </Link>

          {user ? (
            <>
              <Link 
                href="/profile" 
                className="flex items-center gap-2 hover:text-brand-gold transition-colors group"
              >
                <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="glass-button-dark px-6 py-2.5 rounded-full text-base font-semibold hover:scale-105 transition-transform"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="glass-button-light px-6 py-2.5 rounded-full text-base font-semibold hover:scale-105 transition-transform"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}