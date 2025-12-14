"use client";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  if (!auth.currentUser) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-32 text-center">
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-16">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent mb-10">
        Hello, {auth.currentUser.email} ✨
      </h1>
      <button
        onClick={() => signOut(auth)}
        className="bg-brand-deep text-white px-12 py-6 rounded-2xl text-2xl hover:bg-brand-deep/90"
      >
        Logout
      </button>
      <p className="mt-12 text-2xl text-brand-deep/70">Your orders will appear here soon!</p>
    </div>
  </div>
  );
}