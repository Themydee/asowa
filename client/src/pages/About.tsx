import { motion } from "framer-motion";
import { Users, Award, Globe, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const stats = [
  { value: "50K+", label: "Designs Available", icon: Sparkles },
  { value: "12K+", label: "Talented Artists", icon: Users },
  { value: "150+", label: "Countries Reached", icon: Globe },
  { value: "99%", label: "Customer Satisfaction", icon: Award },
];

const team = [
  { name: "Sarah Chen", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop" },
  { name: "Michael Roberts", role: "Head of Design", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
  { name: "Emily Watson", role: "Lead Developer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop" },
  { name: "David Kim", role: "Customer Success", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-light/50 to-background overflow-hidden">
        <div className="absolute inset-0 pattern-textile opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Empowering Creators,
              <span className="text-gradient block">Inspiring Innovation</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              TextileHub is the world's leading marketplace for premium textile designs. 
              We connect talented artists with businesses and individuals seeking unique, 
              high-quality patterns for their creative projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                We believe that great design should be accessible to everyone. Our platform 
                democratizes the textile industry by providing independent artists with a 
                global marketplace to showcase and sell their work.
              </p>
              <p className="text-muted-foreground mb-6">
                At the same time, we empower businesses of all sizes to access premium, 
                unique designs that help them stand out in a crowded market.
              </p>
              <div className="space-y-4">
                {[
                  "Support independent artists and their creative vision",
                  "Provide businesses with high-quality, unique designs",
                  "Foster a global community of textile enthusiasts",
                  "Ensure fair compensation for creative work",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-strong">
                <img
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop"
                  alt="Textile Design Process"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-xl shadow-medium">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Global Reach</div>
                    <div className="text-sm text-muted-foreground">150+ countries</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're a passionate team of designers, developers, and textile enthusiasts 
              dedicated to building the best platform for creative communities.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 group">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-navy-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-navy-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of designers and businesses who trust TextileHub 
              for their creative needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/designs">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Browse Designs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
