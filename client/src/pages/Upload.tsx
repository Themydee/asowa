import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload as UploadIcon, Image, X, Check, AlertCircle, CreditCard, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const categories = ["Abstract", "Floral", "Geometric", "Nature", "Vintage", "Modern", "Tribal", "Animal Print"];

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  // In a real application, you would get the authenticated user 
  // from a context or a hook, e.g., const { user } = useAuth();
  const mockUser = { id: "user_abc_123", email: "customer@example.com" };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreview(null);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      toast({
        title: "Image Required",
        description: "Please upload an image for your custom design.",
        variant: "destructive",
      });
      return;
    }
    // Open the payment dialog
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentAndSubmit = async () => {
    if (!uploadedFile) return; // Should not happen, but good practice

    setIsSubmitting(true);

    // 1. Create a FormData object to send multipart data (including the file)
    const submissionData = new FormData();
    submissionData.append("image", uploadedFile);
    submissionData.append("userId", mockUser.id);
    submissionData.append("designDetails", JSON.stringify(formData));
    submissionData.append("shippingDetails", JSON.stringify(shippingDetails));
    // In a real scenario, you'd append a payment token from your payment provider
    // submissionData.append("paymentToken", "tok_123xyz");

    try {
      // 2. Simulate sending the data to a backend endpoint
      console.log("Submitting order to backend...", Object.fromEntries(submissionData.entries()));
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   body: submissionData,
      // });
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const result = await response.json();
      // console.log("Backend response:", result);
      
      // --- MOCK API CALL ---
      await new Promise(resolve => setTimeout(resolve, 2000));
      // --- END MOCK ---

      // 3. On success, show toast and reset the form
      toast({
        title: "Order Submitted!",
        description: "Your custom design request has been received and will appear in your order history.",
      });

      setIsPaymentDialogOpen(false);
      setUploadedFile(null);
      setPreview(null);
      setFormData({ name: "", description: "", category: "", tags: "" });
      setShippingDetails({ fullName: "", address1: "", address2: "", city: "", state: "", zip: "", country: "United States" });

    } catch (error) {
      console.error("Failed to submit order:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                Request a Custom Design
              </h1>
              <p className="text-lg text-muted-foreground">
                Upload your design and we'll produce it for you. A standard fee applies.
              </p>
            </div>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Design Details</CardTitle>
                <CardDescription>
                  Fill in the information below to submit your custom design request.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>Design Image</Label>
                    {!preview ? (
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                          dragActive
                            ? "border-primary bg-accent/50"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInput}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                            <UploadIcon className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Drop your design here
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            or click to browse from your computer
                          </p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG up to 10MB • Minimum 2000x2000px recommended
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-xl overflow-hidden border border-border">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <div className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-sm flex items-center gap-1">
                            <Check className="h-4 w-4 text-green-500" />
                            Uploaded
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-1.5 bg-background/90 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {uploadedFile && (
                          <div className="p-4 bg-muted/50">
                            <div className="flex items-center gap-3">
                              <Image className="h-5 w-5 text-muted-foreground" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {uploadedFile.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Design Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Design Name</Label>
                    <Input
                      id="name"
                      placeholder="Give your design a unique name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your design, inspiration, and potential uses..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Category & Price Row */}
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category for your design" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., floral, summer, pastel"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Add relevant tags to help us categorize your request.
                    </p>
                  </div>

                  {/* Guidelines */}
                  <div className="bg-accent/50 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-1">
                        Important Information
                      </p>
                      <ul className="text-muted-foreground list-disc list-inside space-y-1">
                        <li>Ensure you have the rights to the design you are uploading.</li>
                        <li>A standard production fee will be charged upon submission.</li>
                        <li>Our team will review your design for feasibility after payment.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Proceed to Payment
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogDescription>
              Please provide your shipping and payment details to submit your custom design.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handlePaymentAndSubmit(); }}>
            <div className="py-6 space-y-6">
              {/* Shipping Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shipping Address</h3>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={shippingDetails.fullName} onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line 1</Label>
                  <Input id="address1" value={shippingDetails.address1} onChange={(e) => setShippingDetails({...shippingDetails, address1: e.target.value})} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={shippingDetails.city} onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={shippingDetails.state} onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" value={shippingDetails.zip} onChange={(e) => setShippingDetails({...shippingDetails, zip: e.target.value})} required />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                {/* 
                  IMPORTANT: For PCI compliance, you should use a payment provider's 
                  component here (e.g., Stripe's <CardElement />) instead of raw input fields.
                  This is a placeholder to illustrate the UI.
                */}
                <div className="p-4 border rounded-lg bg-muted">
                  <Label>Card Information</Label>
                  <div className="mt-2 h-10 w-full bg-background rounded-md flex items-center px-3 text-sm text-muted-foreground">
                    {/* This is where Stripe's CardElement would be mounted */}
                    Card details input from payment provider
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                  <span className="font-medium">Custom Design Fee</span>
                  <span className="text-2xl font-bold">$50.00</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This is a one-time fee for our team to process and prepare your design for production.
                </p>
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                "Pay Now & Submit Design"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
                   