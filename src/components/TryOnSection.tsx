import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, Smartphone, Zap } from "lucide-react";

const TryOnSection = () => {
  return (
    <section className="py-24 bg-navy-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(258 89% 45%) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(258 89% 35%) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Try Before You Buy
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience our revolutionary virtual try-on technology. See how you look in any frame instantly with just your camera or a photo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-primary to-primary-glow p-3 rounded-xl">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Live Camera Try-On</h3>
                  <p className="text-white/70">
                    Use your device camera for real-time virtual fitting. See how frames look on your face instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-primary to-primary-glow p-3 rounded-xl">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Photo Upload</h3>
                  <p className="text-white/70">
                    Upload your favorite photo and try on different frames. Perfect for getting opinions from friends.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-primary to-primary-glow p-3 rounded-xl">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mobile Optimized</h3>
                  <p className="text-white/70">
                    Seamless experience across all devices. Try on glasses anywhere, anytime.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-primary to-primary-glow p-3 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
                  <p className="text-white/70">
                    No downloads, no waiting. Get immediate results with our advanced AR technology.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-8">
              <div className="aspect-video bg-gradient-to-br from-white/10 to-transparent rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-white/60" />
                  <p className="text-white/80 font-medium">Virtual Try-On Demo</p>
                  <p className="text-white/60 text-sm">Click to start experience</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="hero" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Start Camera
                </Button>
                <Button variant="secondary" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TryOnSection;