import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="space-y-20">
      <section className="text-center py-32 bg-gradient-to-b from-transparent to-brand-cream/30 rounded-3xl">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent mb-6">
          Crafty by m.Ace
        </h1>
        <p className="text-3xl text-brand-deep/80">Handmade Charms with Love ✨</p>
      </section>

      <section>
        <h2 className="text-5xl font-bold text-center text-brand-deep mb-16">Our Charms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}