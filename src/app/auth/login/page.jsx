"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch {
      alert("Login failed – check email/password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Sparkle background */}
      <div className="sparkles" />

      {/* Main Content - Centered with orbital width */}
      <div className="content-wrapper flex flex-col items-center gap-12 w-full max-w-lg">
        {/* Cosmic Orb with Logo */}
        <div className="relative mb-8">
          {/* Particle Ring */}
          <div className="particle-ring" />
          
          {/* Glowing Orb */}
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

          {/* Sparkle Stars */}
          <div className="sparkle-star" style={{ top: '5%', left: '10%', animationDelay: '0s' }} />
          <div className="sparkle-star" style={{ top: '15%', right: '8%', animationDelay: '0.5s' }} />
          <div className="sparkle-star" style={{ bottom: '10%', left: '0%', animationDelay: '1s' }} />
          <div className="sparkle-star" style={{ bottom: '20%', right: '12%', animationDelay: '1.5s' }} />
          <div className="sparkle-star" style={{ top: '45%', left: '-8%', animationDelay: '0.8s' }} />
          <div className="sparkle-star" style={{ top: '55%', right: '-8%', animationDelay: '1.3s' }} />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-lavender to-brand-coral text-center mb-4">
          Welcome Back ✨
        </h1>

        {/* Auth Container with Proper Spacing */}
        <div className="w-full space-y-8">
          {/* Sign Up Button with spacing */}
          <div>
            <Link href="/auth/register" className="block">
              <button className="glass-button-light w-full py-6 rounded-3xl text-2xl font-bold relative overflow-hidden hover:scale-105 transition-transform">
                <span className="relative z-10">Sign Up</span>
              </button>
            </Link>
          </div>

          {/* Sign In Button with spacing */}
          <div>
            <button
              onClick={() => document.getElementById('signin-form')?.classList.toggle('hidden')}
              className="glass-button-dark w-full py-6 rounded-3xl text-2xl font-bold relative overflow-hidden group hover:scale-105 transition-transform"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-lavender/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>

          {/* Collapsible Sign In Form with Better Spacing */}
          <div id="signin-form" className="hidden space-y-6 pt-4">
            <form onSubmit={login} className="space-y-6">
              {/* Email Input */}
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

              {/* Password Input */}
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border-2 border-brand-lavender/30 text-white placeholder-brand-cream/70 text-lg py-7 px-5 rounded-2xl focus:border-brand-lavender focus:ring-2 focus:ring-brand-lavender/50 transition-all"
                  required
                />
              </div>

              {/* Login Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="holo-button w-full py-7 rounded-2xl text-xl font-bold relative"
                >
                  <span className="relative z-10">Login with Email</span>
                </Button>
              </div>
            </form>

            {/* Divider with more spacing */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-2 border-brand-lavender/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-brand-deep/90 text-brand-cream/60 font-semibold">OR</span>
              </div>
            </div>

            {/* Google Login */}
            <div>
              <Button
                onClick={() => signInWithPopup(auth, googleProvider)}
                className="glass-button-dark w-full py-6 rounded-2xl text-lg font-semibold hover:scale-105 transition-transform"
              >
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}