import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Camera, Smartphone, Palette, Shield, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Real-Time AR Try-On",
    description: "Experience cutting-edge augmented reality technology for instant virtual glasses fitting.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Seamless experience across all devices with responsive design and touch-friendly controls.",
  },
  {
    icon: Palette,
    title: "Customize & Adjust",
    description: "Fine-tune frame position, size, and angle to get the perfect fit for your face.",
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your photos are processed locally in your browser - we never store your personal images.",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "See how you look in different frames instantly without waiting or downloading apps.",
  },
  {
    icon: Users,
    title: "Social Sharing",
    description: "Share your virtual try-on results with friends and family to get their opinions.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-navy-dark to-primary bg-clip-text text-transparent">
            Why Choose LensVision?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary virtual try-on technology that transforms how you shop for eyewear online.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-card to-accent/10 border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="bg-gradient-to-br from-primary to-primary-glow p-3 rounded-2xl w-fit mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;