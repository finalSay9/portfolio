"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Eye, FolderOpen, Award, Clock } from "lucide-react";

const AboutPage: React.FC = () => {
    // AOS-like animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -60 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 60 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Dark swirl background */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute inset-0">
                    <defs>
                        <radialGradient id="swirl1" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1"/>
                            <stop offset="100%" stopColor="transparent"/>
                        </radialGradient>
                        <radialGradient id="swirl2" cx="70%" cy="30%" r="40%">
                            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.08"/>
                            <stop offset="100%" stopColor="transparent"/>
                        </radialGradient>
                    </defs>
                    <path d="M100,200 Q400,50 700,200 T1100,200" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.3"/>
                    <path d="M0,500 Q300,350 600,500 T1200,500" stroke="#A855F7" strokeWidth="0.8" fill="none" opacity="0.2"/>
                    <circle cx="300" cy="100" r="80" fill="url(#swirl1)"/>
                    <circle cx="900" cy="700" r="100" fill="url(#swirl2)"/>
                </svg>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
                {/* Main Content */}
                <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen gap-8 lg:gap-16">
                    
                    {/* Left side - Text content and cards */}
                    <div className="flex-1 space-y-8 lg:space-y-12">
                        
                        {/* Introduction Text */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={staggerContainer}
                            className="space-y-6"
                        >
                            <motion.h1 
                                variants={fadeInLeft}
                                className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-purple-400 leading-tight"
                            >
                                Hello, I'm
                            </motion.h1>
                            <motion.h2 
                                variants={fadeInLeft}
                                className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-purple-300 leading-tight"
                            >
                                EVAN CHIMWAZA
                            </motion.h2>
                            <motion.p 
                                variants={fadeInLeft}
                                className="text-lg sm:text-xl lg:text-2xl text-purple-200 leading-relaxed max-w-2xl"
                            >
                                A passionate full stack developer with an unwavering dedication to creating 
                                innovative digital solutions. I bring ideas to life through clean code, 
                                thoughtful design, and cutting-edge technology.
                            </motion.p>
                            <motion.p 
                                variants={fadeInLeft}
                                className="text-base sm:text-lg lg:text-xl text-purple-300 leading-relaxed max-w-2xl"
                            >
                                My journey in development is driven by curiosity, fueled by challenges, 
                                and guided by the belief that technology can make the world a better place. 
                                Every project is an opportunity to learn, grow, and exceed expectations.
                            </motion.p>
                        </motion.div>

                        {/* Action Cards */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={staggerContainer}
                            className="flex flex-col sm:flex-row gap-4 lg:gap-6"
                        >
                            {/* Download CV Card */}
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-br from-purple-900/30 to-purple-700/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:border-purple-400/40"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all duration-300">
                                        <Download className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-purple-300">Download CV</h3>
                                        <p className="text-purple-400/80 text-sm">Get my resume</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* View Projects Card */}
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-br from-purple-900/30 to-purple-700/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:border-purple-400/40"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-all duration-300">
                                        <Eye className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-purple-300">View Projects</h3>
                                        <p className="text-purple-400/80 text-sm">See my work</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right side - Profile Image */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInRight}
                        className="flex-shrink-0"
                    >
                        <div className="relative">
                            <div className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                                {/* Replace with your actual image */}
                                <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-purple-700/20 flex items-center justify-center">
                                    <span className="text-purple-400 text-lg font-medium">Your Photo</span>
                                    {/* When you have an image:
                                    <Image 
                                        src="/your-profile-image.jpg" 
                                        alt="Evan Chimwaza Profile"
                                        fill
                                        className="object-cover"
                                    />
                                    */}
                                </div>
                            </div>
                            {/* Glowing ring effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-300/20 animate-pulse"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Cards Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24"
                >
                    {/* Total Projects Card */}
                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05, y: -10 }}
                        className="bg-gradient-to-br from-purple-900/30 to-purple-700/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center group hover:border-purple-400/40 transition-all duration-300"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-6 group-hover:bg-purple-500/30 transition-all duration-300">
                            <FolderOpen className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-purple-300 mb-2">50+</h3>
                        <h4 className="text-xl font-semibold text-purple-400 mb-3">Total Projects</h4>
                        <p className="text-purple-200/80 leading-relaxed">
                            Bringing the world together through innovative digital solutions
                        </p>
                    </motion.div>

                    {/* Certificates Card */}
                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05, y: -10 }}
                        className="bg-gradient-to-br from-purple-900/30 to-purple-700/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center group hover:border-purple-400/40 transition-all duration-300"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-6 group-hover:bg-purple-500/30 transition-all duration-300">
                            <Award className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-purple-300 mb-2">15+</h3>
                        <h4 className="text-xl font-semibold text-purple-400 mb-3">Certificates</h4>
                        <p className="text-purple-200/80 leading-relaxed">
                            Professional verified credentials in cutting-edge technologies
                        </p>
                    </motion.div>

                    {/* Years of Experience Card */}
                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05, y: -10 }}
                        className="bg-gradient-to-br from-purple-900/30 to-purple-700/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center group hover:border-purple-400/40 transition-all duration-300"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-6 group-hover:bg-purple-500/30 transition-all duration-300">
                            <Clock className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-purple-300 mb-2">3+</h3>
                        <h4 className="text-xl font-semibold text-purple-400 mb-3">Years Experience</h4>
                        <p className="text-purple-200/80 leading-relaxed">
                            Continuing learning journey with passion and dedication
                        </p>
                    </motion.div>
                </motion.div>

                {/* Floating elements */}
                <div className="absolute top-1/4 left-10 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute bottom-1/4 right-10 w-4 h-4 bg-purple-300 rounded-full animate-bounce opacity-50"></div>
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-40"></div>
            </div>
        </div>
    );
};

export default AboutPage;