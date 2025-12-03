import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-glow" />
      <div className="absolute inset-0 pattern-textile opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-2xl mb-6">
            <Upload className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Share Your Designs?
          </h2>
          
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join our community of talented artists and start earning from your creative work. 
            Upload your designs and reach thousands of potential buyers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-strong"
              >
                Start Uploading
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
