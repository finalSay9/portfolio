"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeaderItems {
    label: string;
    href?: string;
    onClick?: () => void
}

const headerItems: HeaderItems[] = [
    {label: 'Home', href: '/home'},
    {label: 'About', href: '/about'},
    {label: 'Contact', href: '/contact'},
    {label: 'Skills', href: '/skills'}
]

const LandingPage: React.FC = () => {
    const router = useRouter();
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
            {/* Dark swirl background */}
            <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute inset-0">
                    <defs>
                        <radialGradient id="swirl1" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.05"/>
                            <stop offset="100%" stopColor="transparent"/>
                        </radialGradient>
                        <radialGradient id="swirl2" cx="30%" cy="70%" r="40%">
                            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.03"/>
                            <stop offset="100%" stopColor="transparent"/>
                        </radialGradient>
                    </defs>
                    <path d="M100,400 Q300,200 500,400 T900,400" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.2"/>
                    <path d="M0,300 Q200,100 400,300 T800,300" stroke="#A855F7" strokeWidth="0.8" fill="none" opacity="0.15"/>
                    <circle cx="200" cy="150" r="100" fill="url(#swirl1)"/>
                    <circle cx="800" cy="600" r="120" fill="url(#swirl2)"/>
                    <path d="M300,600 Q500,400 700,600 T1100,600" stroke="#8B5CF6" strokeWidth="0.5" fill="none" opacity="0.1"/>
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
                            ease: "easeInOut" 
                        }}
                    >
                        <motion.div 
                            className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-500 transform rotate-45 shadow-lg shadow-purple-500/50"
                            animate={{ rotate: [45, 90, 135, 180, 225, 270, 315, 360, 45] }}
                            transition={{ 
                                duration: 4, 
                                repeat: Infinity, 
                                ease: "linear" 
                            }}
                        >
                            <div className="absolute inset-2 bg-purple-400 transform -rotate-45"></div>
                        </motion.div>
                    </motion.div>
                    
                    {/* Text content */}
                    <div className="text-center space-y-3 lg:space-y-4">
                        <motion.h1 
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-purple-400 leading-tight px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {displayedText}
                            <span className="animate-pulse text-purple-300">|</span>
                        </motion.h1>
                        <motion.p 
                            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-400 font-light px-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.8 }}
                        >
                            A Full Stack Developer
                        </motion.p>
                        <motion.div 
                            className="w-24 lg:w-32 h-1 bg-gradient-to-r from-purple-500 to-purple-300 mx-auto rounded-full"
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
                                        href={item.href || '#'}
                                        className="text-sm lg:text-lg text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium hover:scale-105 transform drop-shadow-lg block lg:inline"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </header>

                    {/* Image container with dark overlay */}
                    <div className="h-full relative">
                        {/* Image component */}
                        <Image 
                            src="/evan.jpg" 
                            alt="Evan Chimwaza"
                            fill
                            className="object-cover"
                        />
                        
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
                                    "radial-gradient(circle at 20% 80%, rgba(0,0,0,0.4) 0%, transparent 50%)"
                                ]
                            }}
                            transition={{ 
                                duration: 8, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Additional floating elements */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-purple-300 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute top-2/3 left-1/6 w-3 h-3 bg-purple-500 rounded-full animate-bounce opacity-60"></div>
        </div>
    );
};

export default LandingPage;