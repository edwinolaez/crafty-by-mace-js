"use client";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, User, Heart, Sparkles } from "lucide-react";

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
    <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-deep/90 backdrop-blur-xl border-b border-brand-lavender/20 shadow-2xl">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo - Text Only with Sparkles, NO Small Image */}
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-brand-coral animate-pulse" />
            <span className="text-3xl font-bold bg-gradient-to-r from-brand-lavender via-brand-coral to-brand-gold bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Crafty by mAce
            </span>
            <Sparkles className="w-8 h-8 text-brand-lavender animate-pulse" />
          </div>
        </Link>

        {/* Nav Links - Enhanced Visibility with Background Colors */}
        <div className="flex gap-6 items-center">
          <Link 
            href="/products" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-lavender/20 hover:bg-brand-lavender/40 text-white font-bold text-lg transition-all hover:scale-105 border border-brand-lavender/30"
          >
            <Heart className="w-5 h-5" />
            <span>Shop</span>
          </Link>
          
          <Link 
            href="/cart" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-coral/20 hover:bg-brand-coral/40 text-white font-bold text-lg transition-all hover:scale-105 border border-brand-coral/30"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </Link>

          {user ? (
            <>
              <Link 
                href="/profile" 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold/20 hover:bg-brand-gold/40 text-white font-bold text-lg transition-all hover:scale-105 border border-brand-gold/30"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-lg border border-white/30 transition-all hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-lavender to-brand-coral text-white font-bold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}