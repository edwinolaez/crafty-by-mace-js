"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, User, Settings, Share2, Power } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch { 
      alert("Registration failed - please try again"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Sparkle background */}
      <div className="sparkles" />

      {/* Left Sidebar */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <Link href="/products" className="glass-sidebar rounded-full p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform">
          <Heart className="w-7 h-7 text-white" fill="white" />
          <span className="text-white font-medium text-sm">Shop</span>
        </Link>
        
        <Link href="/cart" className="glass-sidebar rounded-full p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform">
          <ShoppingCart className="w-7 h-7 text-white" />
          <span className="text-white font-medium text-sm">Cart</span>
        </Link>
        
        <Link href="/profile" className="glass-sidebar rounded-full p-6 flex items-center justify-center hover:scale-105 transition-transform">
          <User className="w-7 h-7 text-white" />
        </Link>
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <button className="glass-circle rounded-full p-5 flex items-center justify-center hover:scale-105 transition-transform">
          <User className="w-6 h-6 text-white" />
        </button>
        
        <button className="glass-circle rounded-full p-5 flex items-center justify-center hover:scale-105 transition-transform">
          <Settings className="w-6 h-6 text-white" />
        </button>
        
        <button className="glass-circle rounded-full p-5 flex items-center justify-center hover:scale-105 transition-transform">
          <Share2 className="w-6 h-6 text-white" />
        </button>
        
        <button className="glass-circle rounded-full p-5 flex items-center justify-center hover:scale-105 transition-transform">
          <Power className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="content-wrapper flex flex-col items-center gap-16 px-4 max-w-md w-full">
        {/* Cosmic Orb with Logo */}
        <div className="relative">
          <div className="particle-ring" />
          <div className="cosmic-orb flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Crafty by m.Ace Logo"
              width={140}
              height={140}
              className="drop-shadow-2xl relative z-10"
              priority
            />
          </div>
          <div className="sparkle-star" style={{ top: '10%', left: '15%', animationDelay: '0s' }} />
          <div className="sparkle-star" style={{ top: '20%', right: '10%', animationDelay: '0.5s' }} />
          <div className="sparkle-star" style={{ bottom: '15%', left: '5%', animationDelay: '1s' }} />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-brand-lavender via-brand-coral to-brand-gold bg-clip-text text-transparent">
          Join Our Magic ✨
        </h1>

        {/* Registration Form */}
        <div className="w-full space-y-6">
          <form onSubmit={register} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 backdrop-blur-md border-brand-lavender/30 text-white placeholder-brand-cream/70 text-lg py-6 rounded-2xl"
              required
            />
            <Input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 backdrop-blur-md border-brand-lavender/30 text-white placeholder-brand-cream/70 text-lg py-6 rounded-2xl"
              required
              minLength={6}
            />
            <Button
              type="submit"
              className="holo-button w-full py-6 rounded-2xl text-xl font-bold relative"
            >
              <span className="relative z-10">Create Account</span>
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-brand-lavender/30" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-transparent text-brand-cream/60">OR CONTINUE WITH</span>
            </div>
          </div>

          <Button
            onClick={() => signInWithPopup(auth, googleProvider)}
            className="glass-button-dark w-full py-5 rounded-2xl text-lg font-semibold"
          >
            Continue with Google
          </Button>

          <p className="text-center text-brand-cream/80 text-lg">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-brand-coral font-bold hover:text-brand-gold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}