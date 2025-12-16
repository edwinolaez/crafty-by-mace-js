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
        {/* Decorative sparkles */}
        <div className="sparkle-star opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{ top: '-8px', right: '20%', animationDelay: '0s' }} />
        <div className="sparkle-star opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{ bottom: '30%', left: '-8px', animationDelay: '0.5s' }} />

        {/* Card */}
        <div className="glass-sidebar rounded-3xl overflow-hidden shadow-2xl hover:shadow-brand-lavender/40 transition-all duration-500 hover:-translate-y-4 hover:scale-105">
          {/* Image/Icon Container */}
          <div className="relative h-80 bg-gradient-to-br from-brand-deep/30 to-brand-lavender/20 overflow-hidden flex items-center justify-center">
            {product.images && product.images.length > 0 && product.images[0] ? (
              <>
                <Image
                  src={product.images[0]}
                  alt={product.name || "Handmade Charm"}
                  fill
                  className="object-cover"
                />
                {/* Holographic overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-lavender/0 via-brand-coral/0 to-brand-gold/0 group-hover:from-brand-lavender/20 group-hover:via-brand-coral/10 group-hover:to-brand-gold/20 transition-all duration-700" />
              </>
            ) : (
              <div className="relative p-8">
                {/* Glowing effect behind icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-lavender/20 to-brand-coral/20 rounded-full blur-2xl group-hover:blur-3xl transition-all" />
                
                {/* Icon */}
                <ProductIcon 
                  className="w-40 h-40 text-white drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700" 
                  strokeWidth={1.5}
                />
              </div>
            )}
          </div>

          {/* Content */}
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