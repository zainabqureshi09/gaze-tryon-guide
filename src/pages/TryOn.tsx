import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Upload, RotateCw, Move, ZoomIn, ZoomOut, Download, Share } from "lucide-react";

const featuredGlasses = [
  {
    id: 1,
    name: "Classic Aviator",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Modern Square",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Vintage Round",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=200&h=200&fit=crop",
  },
];

const TryOn = () => {
  const [selectedGlasses, setSelectedGlasses] = useState(featuredGlasses[0]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setIsCameraOn(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = () => {
    setIsCameraOn(true);
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Virtual Try-On Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how you look in our glasses using advanced AR technology. Upload a photo or use your camera for real-time try-on.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Virtual Try-On Area */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                  <h2 className="text-2xl font-semibold mb-6">Try On {selectedGlasses.name}</h2>
                  
                  <Tabs defaultValue="camera" className="mb-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="camera" className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Camera
                      </TabsTrigger>
                      <TabsTrigger value="upload" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Photo
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="camera" className="mt-6">
                      <div className="relative bg-muted rounded-lg aspect-[4/3] flex items-center justify-center">
                        {isCameraOn ? (
                          <div className="text-center">
                            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Camera feed would appear here</p>
                            <p className="text-sm text-muted-foreground mt-2">Grant camera permission to start</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Button onClick={startCamera} size="lg" className="mb-4">
                              <Camera className="h-5 w-5 mr-2" />
                              Start Camera
                            </Button>
                            <p className="text-sm text-muted-foreground">Click to activate your camera</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="upload" className="mt-6">
                      <div className="relative bg-muted rounded-lg aspect-[4/3] flex items-center justify-center">
                        {uploadedImage ? (
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="max-w-full max-h-full object-contain rounded-lg"
                          />
                        ) : (
                          <div className="text-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              ref={fileInputRef}
                              className="hidden"
                            />
                            <Button 
                              onClick={() => fileInputRef.current?.click()} 
                              size="lg" 
                              className="mb-4"
                            >
                              <Upload className="h-5 w-5 mr-2" />
                              Upload Photo
                            </Button>
                            <p className="text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  {/* Controls */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Button variant="outline" size="sm">
                      <Move className="h-4 w-4 mr-2" />
                      Adjust Position
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCw className="h-4 w-4 mr-2" />
                      Rotate
                    </Button>
                    <Button variant="outline" size="sm">
                      <ZoomIn className="h-4 w-4 mr-2" />
                      Zoom In
                    </Button>
                    <Button variant="outline" size="sm">
                      <ZoomOut className="h-4 w-4 mr-2" />
                      Zoom Out
                    </Button>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Save Image
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Glasses Selection */}
            <div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 bg-gradient-to-br from-card to-sky shadow-card">
                  <h3 className="text-xl font-semibold mb-6">Choose Glasses</h3>
                  
                  <div className="space-y-4">
                    {featuredGlasses.map((glasses) => (
                      <div
                        key={glasses.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedGlasses.id === glasses.id
                            ? "border-primary bg-accent"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedGlasses(glasses)}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={glasses.image}
                            alt={glasses.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium">{glasses.name}</h4>
                            <Badge variant="secondary" className="mt-1">
                              Try Now
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6" variant="outline">
                    Browse All Glasses
                  </Button>
                </Card>
              </motion.div>
              
              {/* Tips Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Card className="p-6 bg-gradient-to-br from-accent to-sky-light shadow-card">
                  <h3 className="text-lg font-semibold mb-4">💡 Tips for Best Results</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Ensure good lighting on your face</li>
                    <li>• Look directly at the camera</li>
                    <li>• Remove any existing glasses</li>
                    <li>• Keep your head centered in frame</li>
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TryOn;