"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch { alert("Failed"); }
  };

  return (
    <div className="max-w-md mx-auto mt-32 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent mb-12">
        Join Us
      </h1>
      <form onSubmit={register} className="space-y-8">
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" className="w-full bg-gradient-button text-white py-7 text-xl">Create Account</Button>
      </form>
    </div>
  );
}