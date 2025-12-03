import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const featuredDesigns = [
  {
    id: 1,
    name: "Ocean Waves Pattern",
    artist: "Emma Design Co",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop",
    category: "Abstract",
    likes: 234,
  },
  {
    id: 2,
    name: "Floral Garden",
    artist: "Nature Prints",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    category: "Floral",
    likes: 189,
  },
  {
    id: 3,
    name: "Geometric Fusion",
    artist: "Modern Textile",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1509537257950-20f875b03669?w=400&h=400&fit=crop",
    category: "Geometric",
    likes: 312,
  },
  {
    id: 4,
    name: "Tropical Paradise",
    artist: "Island Studios",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    category: "Nature",
    likes: 456,
  },
];

export function FeaturedDesigns() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Designs
            </h2>
            <p className="text-muted-foreground">
              Handpicked selections from our talented community
            </p>
          </div>
          <Link to="/designs">
            <Button variant="outline">
              View All Designs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant="interactive"
                className="overflow-hidden group"
                onMouseEnter={() => setHoveredId(design.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-navy/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredId === design.id ? "opacity-100" : "opacity-0"
                  }`}>
                    <Button size="icon" variant="glass" className="rounded-full">
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                      {design.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <Link to={`/designs/${design.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                      {design.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3">
                    by {design.artist}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                      ₦{design.price}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
