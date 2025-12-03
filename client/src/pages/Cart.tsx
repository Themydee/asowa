import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Heart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const initialCartItems = [
  { id: 1, name: "Ocean Waves Pattern", artist: "Emma Design Co", price: 29.99, image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&h=200&fit=crop" },
  { id: 2, name: "Floral Garden", artist: "Nature Prints", price: 34.99, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop" },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <Layout>
      <div className="min-h-screen bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-8">
              Shopping Cart
            </h1>

            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Card variant="elevated">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="font-semibold text-foreground text-lg">
                                  {item.name}
                                </h3>
                                <p className="text-muted-foreground">
                                  by {item.artist}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-foreground">
                                  ${item.price}
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-primary"
                                  >
                                    <Heart className="h-5 w-5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {/* Continue Shopping */}
                  <Link
                    to="/designs"
                    className="inline-flex items-center gap-2 text-primary hover:underline mt-4"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>

                {/* Order Summary */}
                <div>
                  <Card variant="elevated" className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Subtotal ({cartItems.length} items)
                        </span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (8%)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold">${total.toFixed(2)}</span>
                      </div>

                      <Link to="/checkout">
                        <Button className="w-full" size="lg">
                          Proceed to Checkout
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>

                      <p className="text-xs text-center text-muted-foreground">
                        Secure checkout powered by Stripe
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              /* Empty Cart */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-8">
                  Looks like you haven't added any designs yet
                </p>
                <Link to="/designs">
                  <Button size="lg">
                    Browse Designs
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
