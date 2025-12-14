import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }) {
  const snap = await getDoc(doc(db, "products", params.id));
  if (!snap.exists()) return <p className="text-center text-3xl mt-40">Not found</p>;
  const product = { id: snap.id, ...snap.data() };

  return (
    <div className="grid md:grid-cols-2 gap-20 py-20">
      <div className="relative h-96 md:h-full rounded-3xl overflow-hidden shadow-2xl">
        <Image src={product.images[0]} alt="" fill className="object-cover" />
      </div>
      <div className="space-y-10">
        <h1 className="text-6xl font-bold text-brand-deep">{product.name}</h1>
        <p className="text-5xl font-bold bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent">
          ${product.price}
        </p>
        <p className="text-xl text-brand-deep/80 leading-relaxed">{product.description}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
