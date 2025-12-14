"use client";
import { auth, db, storage } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const upload = async () => {
    if (!file || !auth.currentUser) return;

    const storageRef = ref(storage, `products/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "products"), {
      name,
      price: parseFloat(price),
      description: desc,
      images: [url]
    });

    alert("Product added!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-10 bg-white/80 rounded-3xl">
      <h1 className="text-4xl font-bold text-brand-deep mb-8">Add Product (Admin)</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4" />
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="block w-full mb-4 p-3 border rounded" />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="block w-full mb-4 p-3 border rounded" />
      <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="block w-full mb-4 p-3 border rounded" />
      <button onClick={upload} className="bg-brand-lavender text-white px-8 py-4 rounded-xl text-xl font-bold">
        Upload & Save Product
      </button>
    </div>
  );
}