import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Heart, 
  Star, 
  Gift, 
  Crown, 
  Gem, 
  Palette,
  Wand2
} from "lucide-react";

// Icon mapping
const ICON_MAP = {
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
  gift: Gift,
  crown: Crown,
  gem: Gem,
  palette: Palette,
  wand: Wand2,
};

export default function ProductCard({ product }) {
  const ProductIcon = ICON_MAP[product.icon] || Sparkles;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative">
        {/* Decorative sparkles on hover */}
        <div className="sparkle-star opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{ top: '-8px', right: '20%', animationDelay: '0s' }} />
        <div className="sparkle-star opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{ bottom: '30%', left: '-8px', animationDelay: '0.5s' }} />

        {/* Main Card */}
        <div className="glass-sidebar rounded-3xl overflow-hidden shadow-2xl hover:shadow-brand-lavender/40 transition-all duration-500 hover:-translate-y-4 hover:scale-105">
          
          {/* Image + Icon Container */}
          <div className="relative h-80 bg-gradient-to-br from-brand-deep/30 to-brand-lavender/20 overflow-hidden flex items-center justify-center">
            
            {/* Real Product Image – only renders if path exists */}
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.name || "Handmade charm"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-opacity duration-700"
                priority={false}
                
              />
            )}

            {/* Decorative fallback: blurred gradient + icon (always visible underneath) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/50 to-brand-lavender/30 rounded-xl blur-2xl group-hover:blur-3xl transition-all" />
              
              <ProductIcon 
                className="w-40 h-40 text-white drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700" 
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 text-center space-y-3">
            <h3 className="text-2xl font-bold text-white group-hover:text-brand-coral transition-colors">
              {product.name}
            </h3>
            <p className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-brand-lavender via-brand-coral to-brand-gold bg-clip-text text-transparent">
                ${product.price}
              </span>
            </p>
            
            {/* Stock indicator */}
            {product.stock !== undefined && (
              <p className="text-sm text-brand-cream/70">
                {product.stock > 0 ? (
                  <span className="text-green-400">In Stock ({product.stock})</span>
                ) : (
                  <span className="text-red-400">Out of Stock</span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}