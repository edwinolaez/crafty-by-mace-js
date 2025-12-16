import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default async function Home() {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="space-y-32 pt-24">
      {/* Sparkle background */}
      <div className="sparkles" />

      {/* Hero Section with Cosmic Orb */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        {/* Centered Cosmic Orb */}
        <div className="relative mb-16">
          {/* Particle Ring */}
          <div className="particle-ring" />
          
          {/* Glowing Orb */}
          <div className="cosmic-orb flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Crafty by m.Ace Logo"
              width={160}
              height={160}
              className="drop-shadow-2xl relative z-10"
              priority
            />
          </div>

          {/* Sparkle Stars */}
          <div className="sparkle-star" style={{ top: '5%', left: '10%', animationDelay: '0s' }} />
          <div className="sparkle-star" style={{ top: '15%', right: '8%', animationDelay: '0.5s' }} />
          <div className="sparkle-star" style={{ bottom: '10%', left: '0%', animationDelay: '1s' }} />
          <div className="sparkle-star" style={{ bottom: '20%', right: '12%', animationDelay: '1.5s' }} />
          <div className="sparkle-star" style={{ top: '45%', left: '-8%', animationDelay: '0.8s' }} />
          <div className="sparkle-star" style={{ top: '55%', right: '-8%', animationDelay: '1.3s' }} />
        </div>

        {/* Hero Text */}
        <h1 className="text-7xl md:text-8xl font-bold mb-6 relative">
          <span className="bg-gradient-to-r from-brand-lavender via-brand-coral to-brand-gold bg-clip-text text-transparent drop-shadow-2xl">
            Crafty by m.Ace
          </span>
        </h1>
        
        <p className="text-3xl md:text-4xl text-brand-cream/90 mb-12 drop-shadow-lg">
          Handmade Charms with Love ✨
        </p>

        {/* CTA Button */}
        <a href="/products">
          <button className="holo-button px-12 py-6 rounded-full text-2xl font-bold relative group">
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </a>
      </section>

      {/* Products Section */}
      <section className="content-wrapper px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-brand-lavender to-brand-coral bg-clip-text text-transparent">
            Our Charms
          </span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Decorative Section */}
      <section className="content-wrapper text-center py-20 px-4">
        <div className="max-w-3xl mx-auto glass-sidebar rounded-3xl p-12">
          <h3 className="text-4xl font-bold text-white mb-6">
            Every Charm Tells a Story
          </h3>
          <p className="text-xl text-brand-cream/80 leading-relaxed">
            Handcrafted with passion, each piece is unique and made with love. 
            Discover the magic in every detail.
          </p>
        </div>
      </section>
    </div>
  );
}