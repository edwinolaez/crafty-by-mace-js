"use client";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, User, Heart, Sparkles, LogOut, UserPlus } from "lucide-react";

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
        {/* Logo - Text with Sparkles */}
        <Link href="/" className="group">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-brand-coral animate-pulse" />
            <span className="text-3xl font-bold bg-gradient-to-r from-brand-lavender via-brand-coral to-brand-gold bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Crafty by mAce
            </span>
            <Sparkles className="w-8 h-8 text-brand-lavender animate-pulse" />
          </div>
        </Link>

        {/* Nav Links - All Button Style like "Explore Collection" */}
        <div className="flex gap-4 items-center">
          <Link href="/products">
            <button className="holo-button px-8 py-3 rounded-full text-lg font-bold relative group flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span className="relative z-10">Shop</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </Link>
          
          <Link href="/cart">
            <button className="holo-button px-8 py-3 rounded-full text-lg font-bold relative group flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="relative z-10">Cart</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </Link>

          {user ? (
            <>
              <Link href="/profile">
                <button className="holo-button px-8 py-3 rounded-full text-lg font-bold relative group flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="relative z-10">Profile</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </Link>
              
              <Link href="/admin">
                <button className="holo-button px-8 py-3 rounded-full text-lg font-bold relative group flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="relative z-10">Admin</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </Link>
              
              <button
                onClick={handleLogout}
                className="holo-button px-8 py-3 rounded-full text-lg font-bold relative group flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                <span className="relative z-10">Logout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </>
          ) : (
            <Link href="/auth/login">
              <button className="holo-button px-8 py-3 rounded-full text-lg font-bold relative group flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}