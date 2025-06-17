"use client";

import React, { useState } from "react";
//import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
    
    // Initialize particles - fewer on mobile
    const particleCount = dimensions.width < 768 ? 25 : 50;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * (dimensions.width < 768 ? 1 : 2),
      vy: (Math.random() - 0.5) * (dimensions.width < 768 ? 1 : 2),
      size: Math.random() * (dimensions.width < 768 ? 3 : 4) + 1,
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
        if (particle.opacity <= 0.1 || particle.opacity >= 0.9) {
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
      
      // Draw edges between close particles - shorter distance on mobile
      const connectionDistance = dimensions.width < 768 ? 80 : 120;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, 0.2)`;
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
      className="absolute inset-0 opacity-200"
      style={{ zIndex: 0 }}
    />
  );
};

const LandingPage: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

      {/* Header - Mobile Hamburger and Desktop Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="flex justify-between items-center">
          {/* Logo/Brand (optional) */}
          <div className="text-teal-400 font-bold text-xl md:text-2xl">
            EC
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex space-x-8">
            {headerItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href || "#"}
                  className="text-lg text-teal-400 hover:text-purple-300 transition-colors duration-300 font-medium hover:scale-105 transform drop-shadow-lg"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <motion.button
            className="md:hidden relative z-50 p-2 text-teal-400 hover:text-teal-300 transition-colors"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />
              
              {/* Menu Content */}
              <motion.div
                className="md:hidden fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-md border-l border-teal-500/20 z-40"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="flex flex-col pt-20 px-6 space-y-6">
                  {headerItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <Link
                        href={item.href || "#"}
                        className="block text-xl text-teal-400 hover:text-purple-300 transition-colors duration-300 font-medium py-2 border-b border-teal-500/10"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col min-h-screen pt-16 md:pt-0">
        {/* Content - Stacked on mobile, side by side on desktop */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* Image section - First on mobile, last on desktop */}
          <div className="w-full lg:w-1/2 lg:order-last h-64 sm:h-80 md:h-96 lg:h-screen relative">
            {/* Image container with dark overlay */}
            <div className="h-full relative">
              {/* Placeholder for Image */}
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Image 
                  src="/evan.jpg" 
                  alt="Evan Chimwaza Profile"
                  fill
                  className="object-cover"
                />
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

          {/* Text content - Second on mobile, first on desktop */}
          <div className="w-full lg:w-1/2 lg:order-first flex flex-col items-center justify-center space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
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
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-teal-500 transform rotate-45 shadow-lg shadow-purple-500/50"
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
            <div className="text-center space-y-3 lg:space-y-4 max-w-2xl">
              <motion.h1
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-teal-400 leading-tight px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {displayedText}
                <span className="animate-pulse text-teal-600">|</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-teal-400 font-light px-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                A Full Stack Developer
              </motion.p>
              <motion.div
                className="w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-teal-500 to-purple-300 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </div>

            {/* Action Cards */}
            <motion.div
              className="flex gap-4 sm:gap-6 mt-6 lg:mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              {/* Hire Me Card - Filled with teal color */}
              <motion.button
                className="bg-teal-500 hover:bg-teal-400 text-black font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-lg shadow-teal-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-teal-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                you have a project ?
              </motion.button>

              {/* Let's Talk Card - Outlined, no fill */}
              <motion.button
                className="border-2 border-teal-400 text-teal-400 hover:text-teal-300 hover:border-teal-300 font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-lg shadow-teal-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-teal-500/40 bg-transparent backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let &#39;s Talk
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Additional floating elements - Responsive sizes */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-purple-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-purple-300 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute top-2/3 left-1/6 w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  );
};

export default LandingPage;