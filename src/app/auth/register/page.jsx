"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Sparkle background */}
      <div className="sparkles" />

      {/* Main Content - Centered with orbital width */}
      <div className="content-wrapper flex flex-col items-center gap-12 w-full max-w-lg">
        {/* Cosmic Orb with Logo */}
        <div className="relative">
          <div className="particle-ring" />
          <div className="cosmic-orb flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Crafty by m.Ace Logo"
              width={280}
              height={280}
              className="drop-shadow-2xl relative z-10 rounded-full"
              priority
            />
          </div>
          <div className="sparkle-star" style={{ top: '5%', left: '10%', animationDelay: '0s' }} />
          <div className="sparkle-star" style={{ top: '15%', right: '8%', animationDelay: '0.5s' }} />
          <div className="sparkle-star" style={{ bottom: '10%', left: '0%', animationDelay: '1s' }} />
          <div className="sparkle-star" style={{ bottom: '20%', right: '12%', animationDelay: '1.5s' }} />
          <div className="sparkle-star" style={{ top: '45%', left: '-8%', animationDelay: '0.8s' }} />
          <div className="sparkle-star" style={{ top: '55%', right: '-8%', animationDelay: '1.3s' }} />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-brand-lavender via-brand-coral to-brand-gold bg-clip-text text-transparent text-center">
          Join Our Magic ✨
        </h1>

        {/* Registration Form with Proper Spacing */}
        <div className="w-full space-y-8">
          <form onSubmit={register} className="space-y-6">
            {/* Email Input with spacing */}
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border-2 border-brand-lavender/30 text-white placeholder-brand-cream/70 text-lg py-7 px-5 rounded-2xl focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/50 transition-all"
                required
              />
            </div>

            {/* Password Input with spacing */}
            <div>
              <Input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border-2 border-brand-lavender/30 text-white placeholder-brand-cream/70 text-lg py-7 px-5 rounded-2xl focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/50 transition-all"
                required
                minLength={6}
              />
            </div>

            {/* Create Account Button with spacing */}
            <div className="pt-2">
              <Button
                type="submit"
                className="holo-button w-full py-7 rounded-2xl text-xl font-bold relative"
              >
                <span className="relative z-10">Create Account</span>
              </Button>
            </div>
          </form>

          {/* Divider with more spacing */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-brand-lavender/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-brand-deep/90 text-brand-cream/60 font-semibold">OR CONTINUE WITH</span>
            </div>
          </div>

          {/* Google Login with spacing */}
          <div>
            <Button
              onClick={() => signInWithPopup(auth, googleProvider)}
              className="glass-button-dark w-full py-6 rounded-2xl text-lg font-semibold hover:scale-105 transition-transform"
            >
              Continue with Google
            </Button>
          </div>

          {/* Sign In Link with spacing */}
          <div className="pt-4">
            <p className="text-center text-brand-cream/80 text-lg">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-brand-coral font-bold hover:text-brand-gold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}