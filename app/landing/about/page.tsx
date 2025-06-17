"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Download, Eye, FolderOpen, Award, Clock, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutPage: React.FC = () => {
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
        duration: 800, // Slightly faster for mobile
      });
    };

    initAOS();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Dark swirl background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute inset-0">
          <defs>
            <radialGradient id="swirl1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="swirl2" cx="70%" cy="30%" r="40%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <path d="M100,200 Q400,50 700,200 T1100,200" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M0,500 Q300,350 600,500 T1200,500" stroke="#A855F7" strokeWidth="0.8" fill="none" opacity="0.2" />
          <circle cx="300" cy="100" r="80" fill="url(#swirl1)" />
          <circle cx="900" cy="700" r="100" fill="url(#swirl2)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block relative group">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-4"
              data-aos="zoom-in-up"
              data-aos-duration="600"
            >
              About Me
            </h2>
          </div>
          <p 
            className="text-teal-300 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
            data-aos="zoom-in-up"
            data-aos-duration="800"
          >
            <Sparkles className="w-5 h-5 text-teal-400" />
            Transforming ideas into meaningful digital solutions through innovative development.
            <Sparkles className="w-5 h-5 text-teal-400" />
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 mb-12 sm:mb-16 lg:mb-24">
          {/* Left side - Text content and cards */}
          <div className="flex-1 space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Introduction Text */}
            <div className="space-y-4 sm:space-y-6">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-teal-400 leading-tight"
                data-aos="fade-left"
              >
                Hello, I&#39;m
              </h1>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-500 leading-tight"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                EVAN CHIMWAZA
              </h2>
              <p
                className="text-base sm:text-lg md:text-xl lg:text-xl text-teal-200 leading-relaxed max-w-2xl"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                A passionate full stack developer with an unwavering dedication to creating innovative digital solutions. I bring ideas to life through clean code, thoughtful design, and cutting-edge technology.
              </p>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-lg text-teal-300 leading-relaxed max-w-2xl"
                data-aos="fade-left"
                data-aos-delay="600"
              >
                My journey in development is driven by curiosity, fueled by challenges, and guided by the belief that technology can make the world a better place. Every project is an opportunity to learn, grow, and exceed expectations.
              </p>
            </div>

            {/* Action Cards */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              {/* Download CV Card */}
              <a
                href="/path-to-cv.pdf"
                download
                className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-xl p-4 sm:p-6 cursor-pointer group transition-all duration-300 hover:border-teal-400/40 hover:shadow-lg hover:shadow-teal-500/20"
                data-aos="fade-up"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-1 sm:p-2 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-all duration-300">
                    <Download className="w-3 h-2 sm:w-3 sm:h-3 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-teal-300">Download CV</h3>
                    <p className="text-teal-400/80 text-xs sm:text-sm">Get my resume</p>
                  </div>
                </div>
              </a>

              {/* View Projects Card */}
              <a
                href="/projects"
                className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-xl p-4 sm:p-6 cursor-pointer group transition-all duration-300 hover:border-teal-400/40 hover:shadow-lg hover:shadow-teal-500/20"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-1 sm:p-2 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-all duration-300">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-teal-300">View Projects</h3>
                    <p className="text-teal-400/80 text-xs sm:text-sm">See my work</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right side - Profile Image */}
          <div className="flex-shrink-0" data-aos="fade-up">
            <div className="relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-teal-500/30 shadow-2xl shadow-teal-500/20">
                <Image
                  src="/evan.jpg"
                  alt="Evan Chimwaza Profile"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-300/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Total Projects Card */}
          <div
            className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-6 sm:p-8 text-center group hover:border-teal-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
            data-aos="fade-right"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-teal-500/20 rounded-full mb-4 sm:mb-6 group-hover:bg-teal-500/30 transition-all duration-300">
              <FolderOpen className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-300 mb-2">50+</h3>
            <h4 className="text-base sm:text-xl font-semibold text-teal-400 mb-3">Total Projects</h4>
            <p className="text-teal-200/80 text-sm sm:text-base leading-relaxed">
              Bringing the world together through innovative digital solutions
            </p>
          </div>

          {/* Certificates Card */}
          <div
            className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-6 sm:p-8 text-center group hover:border-teal-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
            data-aos="fade-up"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-teal-500/20 rounded-full mb-4 sm:mb-6 group-hover:bg-teal-500/30 transition-all duration-300">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-300 mb-2">15+</h3>
            <h4 className="text-base sm:text-xl font-semibold text-teal-400 mb-3">Certificates</h4>
            <p className="text-teal-200/80 text-sm sm:text-base leading-relaxed">
              Professional verified credentials in cutting-edge technologies
            </p>
          </div>

          {/* Years of Experience Card */}
          <div
            className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-6 sm:p-8 text-center group hover:border-teal-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
            data-aos="fade-left"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-teal-500/20 rounded-full mb-4 sm:mb-6 group-hover:bg-teal-500/30 transition-all duration-300">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-300 mb-2">3+</h3>
            <h4 className="text-base sm:text-xl font-semibold text-teal-400 mb-3">Years Experience</h4>
            <p className="text-teal-200/80 text-sm sm:text-base leading-relaxed">
              Continuing learning journey with passion and dedication
            </p>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-3 h-3 bg-teal-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 right-10 w-4 h-4 bg-teal-300 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-teal-500 rounded-full animate-ping opacity-40"></div>
      </div>
    </div>
  );
};

export default AboutPage;