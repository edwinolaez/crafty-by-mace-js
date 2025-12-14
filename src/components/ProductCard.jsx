import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white/70 backdrop-blur rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
        <div className="relative h-96 bg-gradient-to-br from-brand-cream/50 to-brand-lavender/20">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition duration-700"
          />
        </div>
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold text-brand-deep mb-3">{product.name}</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
