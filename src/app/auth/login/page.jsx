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
      alert("Login failed — check email/password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Sparkle background */}
      <div className="sparkles" />

      {/* Centered Logo with Orbiting Glow */}
      <div className="relative mb-16">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-lavender/30 to-brand-coral/30 blur-3xl animate-pulse"></div>
        <div className="relative z-10">
          <Image
            src="/logo.png"
            alt="Crafty by m.Ace Logo"
            width={200}
            height={200}
            className="drop-shadow-2xl"
            priority
          />
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-brand-lavender/50 animate-ping"></div>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-lavender to-brand-coral mb-12">
        Welcome Back ✨
      </h1>

      {/* Form */}
      <div className="w-full max-w-md space-y-6">
        <form onSubmit={login} className="space-y-6">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 backdrop-blur-md border-brand-lavender/30 text-white placeholder-brand-cream/70 text-lg py-6"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 backdrop-blur-md border-brand-lavender/30 text-white placeholder-brand-cream/70 text-lg py-6"
            required
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-lavender to-brand-coral text-white py-8 text-2xl font-bold rounded-full glow-pulse shadow-2xl hover:shadow-brand-lavender/50 transition"
          >
            Login with Email
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-brand-lavender/30" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-brand-cream/80">OR CONTINUE WITH</span>
          </div>
        </div>

        <Button
          onClick={() => signInWithPopup(auth, googleProvider)}
          className="w-full bg-white/10 backdrop-blur-md border-2 border-brand-lavender/50 text-white py-8 text-2xl font-bold rounded-full glow-pulse hover:bg-brand-lavender/20 transition"
        >
          Continue with Google
        </Button>

        <p className="text-center text-brand-cream/80 text-lg">
          No account?{" "}
          <Link href="/auth/register" className="text-brand-coral font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}