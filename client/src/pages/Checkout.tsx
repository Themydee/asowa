import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Lock, Trash2, ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

const cartItems = [
  { id: 1, name: "Ocean Waves Pattern", artist: "Emma Design Co", price: 29.99, image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&h=200&fit=crop" },
  { id: 2, name: "Floral Garden", artist: "Nature Prints", price: 34.99, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop" },
];

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Payment Successful!",
      description: "Your designs are ready for download.",
    });

    setIsProcessing(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-secondary/30 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Receipt and download links will be sent to this email
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                      <Label>Payment Method</Label>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-3 gap-4"
                      >
                        {[
                          { value: "card", label: "Card", icon: "💳" },
                          { value: "paypal", label: "PayPal", icon: "🅿️" },
                          { value: "apple", label: "Apple Pay", icon: "🍎" },
                        ].map((method) => (
                          <div key={method.value}>
                            <RadioGroupItem
                              value={method.value}
                              id={method.value}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={method.value}
                              className="flex flex-col items-center justify-center rounded-lg border-2 border-border bg-card p-4 hover:bg-accent/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent cursor-pointer transition-colors"
                            >
                              <span className="text-2xl mb-1">{method.icon}</span>
                              <span className="text-sm font-medium">{method.label}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <>
                        {/* Card Number */}
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={(e) =>
                                setFormData({ ...formData, cardNumber: e.target.value })
                              }
                              required
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                              <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" className="h-6" />
                              <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" className="h-6" />
                            </div>
                          </div>
                        </div>

                        {/* Expiry & CVC */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={formData.expiry}
                              onChange={(e) =>
                                setFormData({ ...formData, expiry: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              placeholder="123"
                              value={formData.cvc}
                              onChange={(e) =>
                                setFormData({ ...formData, cvc: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div className="space-y-2">
                          <Label htmlFor="name">Cardholder Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Security Notice */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-accent/50 p-3 rounded-lg">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <span>Your payment information is encrypted and secure</span>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          Pay ${total.toFixed(2)}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card variant="elevated" className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          by {item.artist}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">${item.price}</span>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* What You Get */}
                  <div className="bg-accent/50 rounded-lg p-4 mt-4">
                    <h4 className="font-medium text-foreground mb-3">What you'll get:</h4>
                    <ul className="space-y-2">
                      {[
                        "High-resolution design files",
                        "Commercial use license",
                        "Lifetime access",
                        "Free updates",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
