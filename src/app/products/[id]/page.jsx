import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { ArrowLeft, Package, Gift, Sparkles } from "lucide-react";
import { 
  Sparkles as SparklesIcon, 
  Heart, 
  Star, 
  Gift as GiftIcon, 
  Crown, 
  Gem, 
  Palette,
  Wand2
} from "lucide-react";

const ICON_MAP = {
  sparkles: SparklesIcon,
  heart: Heart,
  star: Star,
  gift: GiftIcon,
  crown: Crown,
  gem: Gem,
  palette: Palette,
  wand: Wand2,
};

export default async function ProductPage({ params }) {
  const { id } = await params;

  if (!id) {
    return <div className="min-h-screen flex items-center justify-center text-white text-3xl">Invalid product</div>;
  }

  const productDoc = await getDoc(doc(db, "products", id));
  if (!productDoc.exists()) {
    return <div className="min-h-screen flex items-center justify-center text-white text-3xl">Product not found</div>;
  }

  const product = { id: productDoc.id, ...productDoc.data() };
  const ProductIcon = ICON_MAP[product.icon] || SparklesIcon;

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-8 max-w-7xl">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-3 text-brand-cream/80 hover:text-brand-coral transition-colors mb-12 text-lg font-medium">
          <ArrowLeft className="w-6 h-6" />
          Back to Shop
        </Link>

        {/* Main Layout - Balanced 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Column - FIXED SIZE */}
          <div className="relative w-full max-w-xl mx-auto lg:mx-0">
            {product.images?.[0] ? (
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden glass-sidebar shadow-2xl">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-square w-full rounded-3xl glass-sidebar shadow-2xl flex items-center justify-center bg-gradient-to-br from-brand-deep/50 to-brand-lavender/40">
                <ProductIcon className="w-48 h-48 text-white/80" strokeWidth={1.5} />
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {product.name}
              </h1>
              <p className="text-xl text-brand-cream/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="text-6xl font-bold">
              <span className="bg-gradient-to-r from-brand-lavender via-brand-coral to-brand-gold bg-clip-text text-transparent">
                ${product.price}
              </span>
            </div>

            {/* Stock Status */}
            {product.stock !== undefined && (
              <p className="text-xl">
                {product.stock > 0 ? (
                  <span className="text-green-400">✓ In Stock ({product.stock})</span>
                ) : (
                  <span className="text-red-400">Out of Stock</span>
                )}
              </p>
            )}

            {/* Features List */}
            <ul className="space-y-4 text-lg text-brand-cream/80">
              <li className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-brand-lavender" />
                <span>Handcrafted with love and premium materials</span>
              </li>
              <li className="flex items-center gap-3">
                <Package className="w-6 h-6 text-brand-lavender" />
                <span>Unique piece — no two are exactly alike</span>
              </li>
              <li className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-brand-lavender" />
                <span>Perfect gift for any occasion</span>
              </li>
            </ul>

            {/* Add to Cart */}
            <div className="pt-6">
              <AddToCartButton product={product} />
            </div>

            <p className="text-center text-brand-cream/60 text-lg italic pt-6">
              ✨ Each charm is carefully handcrafted just for you
            </p>
          </div>
        </div>

        {/* Optional "You May Also Like" */}
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