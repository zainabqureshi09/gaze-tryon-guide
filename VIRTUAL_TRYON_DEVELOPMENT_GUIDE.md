# 🔬 Complete Virtual Try-On Lens Website Development Guide

## 🏗️ System Architecture Overview

```mermaid
graph TB
    A[Frontend - React/Vite] --> B[Supabase Backend]
    A --> C[MediaPipe/WebGL AR Engine]
    A --> D[Stripe Payment]
    A --> E[Cloudinary/CDN]
    
    B --> F[PostgreSQL Database]
    B --> G[Authentication]
    B --> H[Real-time APIs]
    
    C --> I[Face Detection]
    C --> J[3D Frame Rendering]
    C --> K[Real-time Tracking]
    
    subgraph "Core Features"
        L[Product Catalog]
        M[Virtual Try-On]
        N[Shopping Cart]
        O[User Dashboard]
        P[Admin Panel]
    end
```

## 🎨 Frontend Implementation (React + TypeScript + Tailwind)

### Project Structure
```
src/
├── components/
│   ├── ui/                    # Shadcn components
│   ├── ar/                    # AR Try-On components
│   │   ├── CameraCapture.tsx
│   │   ├── FaceDetector.tsx
│   │   ├── FrameOverlay.tsx
│   │   └── VirtualMirror.tsx
│   ├── shop/                  # E-commerce components
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Cart.tsx
│   │   └── Checkout.tsx
│   ├── auth/                  # Authentication
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── ProtectedRoute.tsx
│   └── dashboard/             # User dashboard
├── pages/
│   ├── Home.tsx
│   ├── TryOn.tsx
│   ├── Products.tsx
│   ├── Profile.tsx
│   └── Admin.tsx
├── hooks/
│   ├── useCamera.ts
│   ├── useFaceDetection.ts
│   ├── useSupabase.ts
│   └── useCart.ts
├── utils/
│   ├── ar-engine.ts
│   ├── face-landmarks.ts
│   └── frame-fitting.ts
└── types/
    ├── product.ts
    ├── user.ts
    └── ar.ts
```

### Key Dependencies
```bash
# Core React packages
npm install react@18 react-dom@18 typescript

# UI & Styling
npm install tailwindcss framer-motion lucide-react
npm install @radix-ui/react-* class-variance-authority

# AR & Computer Vision
npm install @mediapipe/face_detection @mediapipe/face_mesh
npm install three @react-three/fiber @react-three/drei

# Backend & Database
npm install @supabase/supabase-js

# State Management
npm install zustand @tanstack/react-query

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Payment
npm install @stripe/stripe-js

# File Upload
npm install react-dropzone
```

### AR Try-On Implementation

#### 1. Face Detection Component
```typescript
// components/ar/FaceDetector.tsx
import { useEffect, useRef, useState } from 'react';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

interface FaceDetectorProps {
  onFaceDetected: (landmarks: any) => void;
  isActive: boolean;
}

export const FaceDetector = ({ onFaceDetected, isActive }: FaceDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [faceDetection, setFaceDetection] = useState<FaceDetection | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const initializeFaceDetection = async () => {
      const faceDetector = new FaceDetection({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
        }
      });

      faceDetector.setOptions({
        model: 'short',
        minDetectionConfidence: 0.5,
      });

      faceDetector.onResults((results) => {
        if (results.detections.length > 0) {
          onFaceDetected(results.detections[0]);
        }
      });

      setFaceDetection(faceDetector);

      if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current) {
              await faceDetector.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480
        });
        camera.start();
      }
    };

    initializeFaceDetection();

    return () => {
      if (faceDetection) {
        faceDetection.close();
      }
    };
  }, [isActive, onFaceDetected]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full h-auto rounded-lg"
        autoPlay
        muted
        playsInline
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};
```

#### 2. Frame Overlay Component
```typescript
// components/ar/FrameOverlay.tsx
import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FrameOverlayProps {
  faceLandmarks: any;
  selectedFrame: {
    id: string;
    model: string;
    width: number;
    height: number;
  };
  adjustments: {
    scale: number;
    rotation: number;
    position: { x: number; y: number; z: number };
  };
}

const GlassesModel = ({ frame, landmarks, adjustments }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && landmarks) {
      // Calculate position based on face landmarks
      const leftEye = landmarks.keypoints[0];
      const rightEye = landmarks.keypoints[1];
      const nose = landmarks.keypoints[2];

      // Position glasses based on eye positions
      const centerX = (leftEye.x + rightEye.x) / 2;
      const centerY = (leftEye.y + rightEye.y) / 2;
      
      meshRef.current.position.set(
        centerX + adjustments.position.x,
        centerY + adjustments.position.y,
        adjustments.position.z
      );

      // Scale based on distance between eyes
      const eyeDistance = Math.abs(rightEye.x - leftEye.x);
      meshRef.current.scale.setScalar(eyeDistance * adjustments.scale);

      // Rotation based on face tilt
      const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
      meshRef.current.rotation.z = angle + adjustments.rotation;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[frame.width, frame.height, 0.1]} />
      <meshStandardMaterial color="#333" transparent opacity={0.8} />
    </mesh>
  );
};

export const FrameOverlay = ({ faceLandmarks, selectedFrame, adjustments }: FrameOverlayProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <GlassesModel 
          frame={selectedFrame}
          landmarks={faceLandmarks}
          adjustments={adjustments}
        />
      </Canvas>
    </div>
  );
};
```

#### 3. Virtual Mirror Component
```typescript
// components/ar/VirtualMirror.tsx
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FaceDetector } from './FaceDetector';
import { FrameOverlay } from './FrameOverlay';

interface VirtualMirrorProps {
  selectedFrame: any;
  onCapture: (imageData: string) => void;
}

export const VirtualMirror = ({ selectedFrame, onCapture }: VirtualMirrorProps) => {
  const [faceLandmarks, setFaceLandmarks] = useState(null);
  const [adjustments, setAdjustments] = useState({
    scale: 1,
    rotation: 0,
    position: { x: 0, y: 0, z: 0 }
  });
  const [isCapturing, setIsCapturing] = useState(false);

  const handleFaceDetected = useCallback((landmarks: any) => {
    setFaceLandmarks(landmarks);
  }, []);

  const captureImage = async () => {
    setIsCapturing(true);
    // Capture logic here
    setTimeout(() => {
      setIsCapturing(false);
      // onCapture(capturedImageData);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="relative bg-black rounded-lg overflow-hidden">
        <FaceDetector
          onFaceDetected={handleFaceDetected}
          isActive={true}
        />
        {selectedFrame && faceLandmarks && (
          <FrameOverlay
            faceLandmarks={faceLandmarks}
            selectedFrame={selectedFrame}
            adjustments={adjustments}
          />
        )}
      </div>

      {/* Adjustment Controls */}
      <div className="space-y-4 p-4 bg-card rounded-lg">
        <h3 className="font-semibold">Adjust Fit</h3>
        
        <div>
          <label className="text-sm font-medium">Scale</label>
          <Slider
            value={[adjustments.scale]}
            onValueChange={([value]) => 
              setAdjustments(prev => ({ ...prev, scale: value }))
            }
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Rotation</label>
          <Slider
            value={[adjustments.rotation]}
            onValueChange={([value]) => 
              setAdjustments(prev => ({ ...prev, rotation: value }))
            }
            min={-0.5}
            max={0.5}
            step={0.01}
          />
        </div>

        <Button onClick={captureImage} disabled={isCapturing} className="w-full">
          {isCapturing ? 'Capturing...' : 'Capture Photo'}
        </Button>
      </div>
    </div>
  );
};
```

## 🗄️ Backend Implementation (Supabase)

### Database Schema
```sql
-- Users table (handled by Supabase Auth)
-- Additional user profile data
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  face_measurements JSONB, -- Store face measurements for better fitting
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Product categories
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id),
  brand TEXT,
  model_url TEXT, -- 3D model for AR
  images TEXT[], -- Array of image URLs
  frame_measurements JSONB, -- Width, height, bridge, temple length
  materials TEXT[],
  colors TEXT[],
  prescription_compatible BOOLEAN DEFAULT true,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Shopping cart
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  prescription_data JSONB, -- Store prescription details
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- Wishlist
CREATE TABLE wishlist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- Orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, processing, shipped, delivered, cancelled
  payment_intent_id TEXT, -- Stripe payment intent ID
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Order items
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  prescription_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Virtual try-on sessions (for analytics)
CREATE TABLE tryon_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  session_data JSONB, -- Store AR session data, adjustments
  image_url TEXT, -- Captured try-on image
  shared BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Reviews
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id)
);
```

### Row Level Security (RLS) Policies
```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tryon_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Cart policies
CREATE POLICY "Users can manage own cart" ON cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can manage own wishlist" ON wishlist_items
  FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Try-on sessions policies
CREATE POLICY "Users can manage own sessions" ON tryon_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Public read access for products and categories
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);
```

### API Functions (Supabase Edge Functions)
```typescript
// supabase/functions/create-payment-intent/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
})

serve(async (req) => {
  const { amount, currency = 'usd', user_id, order_items } = await req.json()

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata: {
        user_id,
        order_items: JSON.stringify(order_items)
      }
    })

    return new Response(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }
})
```

## 🤖 AI/AR Virtual Try-On Integration

### Advanced Face Detection Setup
```typescript
// utils/ar-engine.ts
import { FaceMesh } from '@mediapipe/face_mesh';

export class AREngine {
  private faceMesh: FaceMesh;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    
    this.faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    this.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.faceMesh.onResults(this.onResults.bind(this));
  }

  private onResults(results: any) {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      this.renderGlasses(landmarks);
    }
  }

  private renderGlasses(landmarks: any[]) {
    // Key landmark indices for glasses positioning
    const LEFT_EYE_OUTER = 33;
    const RIGHT_EYE_OUTER = 263;
    const LEFT_EYE_INNER = 133;
    const RIGHT_EYE_INNER = 362;
    const NOSE_TIP = 1;

    const leftEyeOuter = landmarks[LEFT_EYE_OUTER];
    const rightEyeOuter = landmarks[RIGHT_EYE_OUTER];
    const noseTip = landmarks[NOSE_TIP];

    // Calculate glasses position and size
    const glassesWidth = Math.abs(rightEyeOuter.x - leftEyeOuter.x) * this.canvas.width;
    const glassesHeight = glassesWidth * 0.4; // Aspect ratio
    
    const centerX = ((leftEyeOuter.x + rightEyeOuter.x) / 2) * this.canvas.width;
    const centerY = ((leftEyeOuter.y + rightEyeOuter.y) / 2) * this.canvas.height;

    // Draw glasses frame
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    
    // Left lens
    this.ctx.ellipse(
      centerX - glassesWidth * 0.25,
      centerY,
      glassesWidth * 0.2,
      glassesHeight * 0.4,
      0, 0, 2 * Math.PI
    );
    
    // Right lens
    this.ctx.ellipse(
      centerX + glassesWidth * 0.25,
      centerY,
      glassesWidth * 0.2,
      glassesHeight * 0.4,
      0, 0, 2 * Math.PI
    );
    
    this.ctx.stroke();

    // Bridge
    this.ctx.beginPath();
    this.ctx.moveTo(centerX - glassesWidth * 0.05, centerY);
    this.ctx.lineTo(centerX + glassesWidth * 0.05, centerY);
    this.ctx.stroke();

    // Temples (arms)
    this.ctx.beginPath();
    this.ctx.moveTo(centerX - glassesWidth * 0.45, centerY);
    this.ctx.lineTo(centerX - glassesWidth * 0.7, centerY + 20);
    this.ctx.moveTo(centerX + glassesWidth * 0.45, centerY);
    this.ctx.lineTo(centerX + glassesWidth * 0.7, centerY + 20);
    this.ctx.stroke();
  }

  public processFrame(video: HTMLVideoElement) {
    this.faceMesh.send({ image: video });
  }
}
```

### React Hook for AR
```typescript
// hooks/useAR.ts
import { useRef, useEffect, useState } from 'react';
import { AREngine } from '@/utils/ar-engine';

export const useAR = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arEngine, setArEngine] = useState<AREngine | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (canvasRef.current && !arEngine) {
      setArEngine(new AREngine(canvasRef.current));
    }
  }, [arEngine]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (isActive && arEngine && videoRef.current) {
      const interval = setInterval(() => {
        if (videoRef.current) {
          arEngine.processFrame(videoRef.current);
        }
      }, 33); // ~30 FPS

      return () => clearInterval(interval);
    }
  }, [isActive, arEngine]);

  return {
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    isActive
  };
};
```

## 💳 Payment Integration (Stripe)

### Checkout Component
```typescript
// components/shop/Checkout.tsx
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = ({ total, items }: { total: number, items: any[] }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    // Create payment intent
    const { data } = await supabase.functions.invoke('create-payment-intent', {
      body: { amount: total, order_items: items }
    });

    const result = await stripe.confirmCardPayment(data.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      }
    });

    if (result.error) {
      console.error('Payment failed:', result.error);
    } else {
      console.log('Payment succeeded:', result.paymentIntent);
      // Create order in database
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg">
        <CardElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary text-white py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${total}`}
      </button>
    </form>
  );
};

export const Checkout = ({ total, items }: { total: number, items: any[] }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm total={total} items={items} />
  </Elements>
);
```

## 🚀 Deployment Instructions

### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Environment variables needed:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
# VITE_STRIPE_PUBLISHABLE_KEY
```

### Backend Deployment (Supabase)
```bash
# Install Supabase CLI
npm install supabase --save-dev

# Initialize project
npx supabase init

# Deploy database migrations
npx supabase db push

# Deploy edge functions
npx supabase functions deploy create-payment-intent
```

## 🔧 Advanced Features & Scalability

### Performance Optimizations
1. **Image Optimization**: Use WebP format with fallbacks
2. **Lazy Loading**: Implement for product images and 3D models
3. **Caching**: Redis for frequently accessed data
4. **CDN**: CloudFront for global content delivery

### Security Best Practices
1. **Input Validation**: Zod schemas for all forms
2. **Rate Limiting**: Implement on API endpoints
3. **HTTPS Only**: Force secure connections
4. **Content Security Policy**: Prevent XSS attacks

### Monitoring & Analytics
```typescript
// utils/analytics.ts
import { supabase } from './supabase';

export const trackTryOnSession = async (productId: string, sessionData: any) => {
  await supabase.from('tryon_sessions').insert({
    product_id: productId,
    session_data: sessionData,
    user_id: (await supabase.auth.getUser()).data.user?.id
  });
};

export const trackPurchase = async (orderId: string, items: any[]) => {
  // Google Analytics 4 event
  gtag('event', 'purchase', {
    transaction_id: orderId,
    value: items.reduce((sum, item) => sum + item.price, 0),
    currency: 'USD',
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: item.price
    }))
  });
};
```

This comprehensive guide provides everything needed to build a production-ready virtual try-on lens website with modern technologies and best practices. The demo I've created shows the beautiful UI foundation you can build upon.