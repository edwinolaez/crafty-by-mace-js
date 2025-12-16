import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { ArrowLeft, Package, Tag, Sparkles } from "lucide-react";
import { 
  Sparkles as SparklesIcon, 
  Heart, 
  Star, 
  Gift, 
  Crown, 
  Gem, 
  Palette,
  Wand2
} from "lucide-react";

const ICON_MAP = {
  sparkles: SparklesIcon,
  heart: Heart,
  star: Star,
  gift: Gift,
  crown: Crown,
  gem: Gem,
  palette: Palette,
  wand: Wand2,
};

export default async function ProductPage({ params }) {
  // FIXED: Properly await params in Next.js 15+
  const { id } = await params;

  if (!id || id.trim() === "" || id.includes("/")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-deep/20 to-black">
        <div className="glass-sidebar rounded-3xl p-12 text-center max-w-md">
          <h1 className="text-4xl font-bold text-brand-coral mb-4">Invalid Product</h1>
          <p className="text-brand-cream/80 text-xl mb-8">This link is not valid. Let us find something cute instead!</p>
          <Link href="/products" className="glass-button-light px-8 py-4 rounded-2xl text-lg font-semibold">
            Browse All Charms
          </Link>
        </div>
      </div>
    );
  }

  const productDoc = doc(db, "products", id);
  const snap = await getDoc(productDoc);

  if (!snap.exists()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-deep/20 to-black">
        <div className="glass-sidebar rounded-3xl p-12 text-center max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-brand-cream/80 text-xl mb-8">This charm does not exist... yet! ✨</p>
          <Link href="/products" className="glass-button-light px-8 py-4 rounded-2xl text-lg font-semibold">
            Back to All Charms
          </Link>
        </div>
      </div>
    );
  }

  const product = { id: snap.id, ...snap.data() };
  const ProductIcon = ICON_MAP[product.icon || "sparkles"] || SparklesIcon;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/products" className="inline-flex items-center gap-3 text-brand-cream/80 hover:text-brand-coral transition mb-10">
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Back to All Charms</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative">
            {product.images && product.images.length > 0 && product.images[0] ? (
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-sidebar shadow-2xl">
                <Image
                  src={product.images[0]}
                  alt={product.name || "Handmade Charm"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-square rounded-3xl glass-sidebar flex items-center justify-center shadow-2xl">
                <ProductIcon className="w-32 h-32 text-brand-lavender/50" />
              </div>
            )}

            <Sparkles className="absolute -top-4 -left-4 w-12 h-12 text-brand-gold/60" />
            <Sparkles className="absolute -bottom-6 -right-6 w-16 h-16 text-brand-coral/40" />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">{product.name}</h1>
              {product.category && (
                <p className="text-brand-cream/70 text-xl flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  {product.category}
                </p>
              )}
            </div>

            <p className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent">
                ${Number(product.price || 0).toFixed(2)}
              </span>
            </p>

            {product.description && (
              <p className="text-xl text-brand-cream/90 leading-relaxed">
                {product.description}
              </p>
            )}

            {product.stock !== undefined && (
              <div className="flex items-center gap-3 text-lg">
                <Package className="w-6 h-6 text-brand-lavender" />
                <span className={product.stock > 0 ? "text-green-400" : "text-red-400"}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </span>
              </div>
            )}

            <ul className="space-y-3 text-brand-cream/80">
              <li className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                <span>Handcrafted with love and premium materials</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-brand-coral mt-1 flex-shrink-0" />
                <span>Unique piece – no two are exactly alike</span>
              </li>
              <li className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-brand-lavender mt-1 flex-shrink-0" />
                <span>Perfect gift for any occasion</span>
              </li>
            </ul>

            <div className="pt-6">
              <AddToCartButton product={product} />
            </div>

            <p className="text-brand-cream/60 text-sm text-center italic">
              ✨ Each charm is carefully handcrafted just for you
            </p>
          </div>
        </div>

        <div className="mt-32 text-center">
          <h2 className="text-4xl font-bold mb-12">
            <span className="bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent">
              You May Also Like
            </span>
          </h2>
          <p className="text-brand-cream/70 text-xl">More magic coming soon...</p>
        </div>
      </div>
    </div>
  );
}