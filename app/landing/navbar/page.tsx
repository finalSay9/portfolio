"use client";

import React, { useState } from "react";
//import { useRouter } from "next/navigation";
//import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeaderItems {
  label: string;
  href?: string;
  onClick?: () => void;
}

const headerItems: HeaderItems[] = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Skills", href: "/skills" },
];

// Custom Particles Component using Canvas
const ParticlesBackground: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationRef = React.useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    opacityDirection: number;
  }
  
  const particlesRef = React.useRef<Particle[]>([]);
  
  React.useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  React.useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    // Initialize particles
    const particleCount = 50;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      opacityDirection: Math.random() > 0.5 ? 1 : -1
    }));
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Update opacity
        particle.opacity += particle.opacityDirection * 0.005;
        if (particle.opacity <= 0.1 || particle.opacity >= 0.6) {
          particle.opacityDirection *= -1;
        }
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= dimensions.width) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= dimensions.height) {
          particle.vy *= -1;
        }
        
        // Keep within bounds
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Draw edges between close particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) { // only draw lines if close
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, 0.2)`; // teal color with low opacity
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-30"
      style={{ zIndex: 0 }}
    />
  );
};

const LandingPage: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Hi, I'm Evan Chimwaza";

  React.useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Dark swirl background */}
      <div className="absolute inset-0 opacity-20 z-1">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute inset-0">
          <defs>
            <radialGradient id="swirl1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="swirl2" cx="30%" cy="70%" r="40%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.03" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <path
            d="M100,400 Q300,200 500,400 T900,400"
            stroke="#8B5CF6"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M0,300 Q200,100 400,300 T800,300"
            stroke="#A855F7"
            strokeWidth="0.8"
            fill="none"
            opacity="0.15"
          />
          <circle cx="200" cy="150" r="100" fill="url(#swirl1)" />
          <circle cx="800" cy="600" r="120" fill="url(#swirl2)" />
          <path
            d="M300,600 Q500,400 700,600 T1100,600"
            stroke="#8B5CF6"
            strokeWidth="0.5"
            fill="none"
            opacity="0.1"
          />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col lg:flex-row h-screen">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6 lg:space-y-8 px-4 lg:px-8 py-8 lg:py-0">
          {/* Animated Diamond with Framer Motion */}
          <motion.div
            className="relative"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-12 h-12 lg:w-16 lg:h-16 bg-teal-500 transform rotate-45 shadow-lg shadow-purple-500/50"
              animate={{ rotate: [45, 90, 135, 180, 225, 270, 315, 360, 45] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="absolute inset-2 bg-teal-400 transform -rotate-45"></div>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <div className="text-center space-y-3 lg:space-y-4">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-teal-400 leading-tight px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {displayedText}
              <span className="animate-pulse text-teal-600">|</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-teal-400 font-light px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              A Full Stack Developer
            </motion.p>
            <motion.div
              className="w-24 lg:w-32 h-1 bg-gradient-to-r from-teal-500 to-purple-300 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </div>
        </div>

        {/* Right side - Image section */}
        <div className="w-full lg:w-1/2 relative order-first lg:order-last h-64 lg:h-full">
          {/* Header positioned over the image */}
          <header className="absolute top-4 lg:top-6 right-4 lg:right-6 z-20">
            <nav className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-8">
              {headerItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href || "#"}
                    className="text-sm lg:text-lg text-teal-400 hover:text-purple-300 transition-colors duration-300 font-medium hover:scale-105 transform drop-shadow-lg block lg:inline"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </header>

          {/* Image container with dark overlay */}
          <div className="h-full relative">
            {/* Placeholder for Image */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-teal-400 text-lg">Your Image Here</span>
            </div>

            {/* Dark smoke overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-black/80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
            
            {/* Additional smoke effect with animated opacity */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 80%, rgba(0,0,0,0.4) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, rgba(0,0,0,0.4) 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 40%, rgba(0,0,0,0.4) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 80%, rgba(0,0,0,0.4) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>

      {/* Additional floating elements - Fixed duplicate class names */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-purple-300 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute top-2/3 left-1/6 w-3 h-3 bg-purple-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  );
};

export default LandingPage;