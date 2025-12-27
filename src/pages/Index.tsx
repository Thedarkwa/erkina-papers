import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Package, ArrowRight, Sparkles, Shield, Leaf } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    quantity: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-order-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Order Submitted!",
        description: "Thank you for your order. We'll contact you shortly.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        quantity: "",
        notes: "",
      });
    } catch (error: any) {
      console.error("Error submitting order:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] bg-[length:40px_40px]" />
        
        <div className="container relative mx-auto px-4 py-20 md:py-0">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div className="animate-slide-up mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 px-4 py-2 text-sm font-medium text-primary-foreground">
                <Sparkles className="h-4 w-4" />
                Premium Quality Since 2020
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="animate-slide-up-delay mb-6 text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Softness You Can
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Trust Every Day
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="animate-slide-up-delay-2 mb-8 max-w-xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              Experience uncompromising quality with our premium toilet rolls. 
              Gentle on skin, strong on performance — the everyday comfort 
              your home, office, or hotel deserves.
            </p>
            
            {/* Feature Pills */}
            <div className="animate-slide-up-delay-2 mb-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Dermatologist Tested</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Leaf className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Eco-Friendly</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Ultra Soft</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="animate-slide-up-delay-3 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated hover:shadow-medium transition-all duration-300 px-8 py-6 text-base font-semibold"
                onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Order in Bulk
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm px-8 py-6 text-base font-semibold transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Products Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground">Our Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              High-quality toilet rolls designed for commercial and residential use
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <Package className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="text-center">Standard Roll</CardTitle>
                <CardDescription className="text-center">
                  Perfect for everyday use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 2-ply tissue</li>
                  <li>• 200 sheets per roll</li>
                  <li>• Soft and absorbent</li>
                  <li>• Bulk packaging available</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <Package className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="text-center">Premium Roll</CardTitle>
                <CardDescription className="text-center">
                  Enhanced comfort and quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 3-ply tissue</li>
                  <li>• 250 sheets per roll</li>
                  <li>• Extra soft texture</li>
                  <li>• Wholesale rates available</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <Package className="h-16 w-16 text-primary" />
                </div>
                <CardTitle className="text-center">Jumbo Roll</CardTitle>
                <CardDescription className="text-center">
                  For high-traffic locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 2-ply tissue</li>
                  <li>• 500 sheets per roll</li>
                  <li>• Commercial grade</li>
                  <li>• Cost-effective solution</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Place Your Order</CardTitle>
              <CardDescription className="text-center">
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Erkina Papers"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="erkina@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+2332456789"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (Rolls) *</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      placeholder="100"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Tema"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special requirements or questions?"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <footer id="contact" className="bg-card py-16 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-2xl font-bold text-foreground">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>erkinapapers@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+233559890111</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Tema, Accra</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-2xl font-bold text-foreground">Follow Us</h3>
              <p className="mb-4 text-muted-foreground">
                Connect with us on social media @ErkinaPapers
              </p>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/ErkinaPapers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com/Erkinapapers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/erkinapapers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Erkina Papers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
