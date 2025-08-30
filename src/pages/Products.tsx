import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Star, Search, Filter } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Classic Aviator",
    brand: "LensVision",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    category: "Sunglasses",
    frameColor: "Gold",
    lensType: "Polarized"
  },
  {
    id: 2,
    name: "Modern Square",
    brand: "LensVision Pro",
    price: 199.99,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop",
    category: "Prescription",
    frameColor: "Black",
    lensType: "Blue Light"
  },
  {
    id: 3,
    name: "Vintage Round",
    brand: "Retro Vision",
    price: 149.99,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop",
    category: "Fashion",
    frameColor: "Tortoiseshell",
    lensType: "Clear"
  },
  {
    id: 4,
    name: "Sport Performance",
    brand: "Active Vision",
    price: 179.99,
    rating: 4.6,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop",
    category: "Sports",
    frameColor: "Matte Black",
    lensType: "Anti-Glare"
  },
  {
    id: 5,
    name: "Cat Eye Glamour",
    brand: "Chic Vision",
    price: 139.99,
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1556306535-38febf6782d7?w=400&h=400&fit=crop",
    category: "Fashion",
    frameColor: "Rose Gold",
    lensType: "Gradient"
  },
  {
    id: 6,
    name: "Minimalist Wire",
    brand: "Clean Vision",
    price: 89.99,
    rating: 4.5,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop",
    category: "Prescription",
    frameColor: "Silver",
    lensType: "Clear"
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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
              Discover Perfect Eyewear
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of premium glasses and sunglasses designed for every style and occasion.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl shadow-card p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search glasses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="sunglasses">Sunglasses</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 bg-gradient-to-br from-card to-sky">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {product.originalPrice && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        Sale
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{product.brand}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frame:</span>
                        <span>{product.frameColor}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lens:</span>
                        <span>{product.lensType}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1">Try On</Button>
                      <Button variant="outline" className="flex-1">Add to Cart</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;