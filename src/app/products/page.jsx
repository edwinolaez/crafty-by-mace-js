import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="py-16">
      <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent mb-20">
        All Handmade Charms
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}