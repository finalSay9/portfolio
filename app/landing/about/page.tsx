
'use client'

import React, { useEffect } from "react";
import Image from "next/image";
import { Download, Eye, FolderOpen, Award, Clock } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutPage: React.FC = () => {
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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
            <div className="space-y-6">
              <h1 
                className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-teal-600 leading-tight"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
               Hello, I&#39;m

              </h1>
              <h2 
                className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-teal-700 leading-tight"
                data-aos="fade-left"
                data-aos-duration="1300"
              >
                EVAN CHIMWAZA
              </h2>
              <p 
                className="text-lg sm:text-xl lg:text-2xl text-teal-200 leading-relaxed max-w-2xl"
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                A passionate full stack developer with an unwavering dedication to creating 
                innovative digital solutions. I bring ideas to life through clean code, 
                thoughtful design, and cutting-edge technology.
              </p>
              <p 
                className="text-base sm:text-lg lg:text-xl text-teal-300 leading-relaxed max-w-2xl"
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                My journey in development is driven by curiosity, fueled by challenges, 
                and guided by the belief that technology can make the world a better place. 
                Every project is an opportunity to learn, grow, and exceed expectations.
              </p>
            </div>

            {/* Action Cards */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              {/* Download CV Card */}
              <div
                className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:border-purple-400/40"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-all duration-300">
                    <Download className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-300">Download CV</h3>
                    <p className="text-teal-400/80 text-sm">Get my resume</p>
                  </div>
                </div>
              </div>

              {/* View Projects Card */}
              <div
                className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:border-teal-400/40"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-all duration-300">
                    <Eye className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-300">View Projects</h3>
                    <p className="text-teal-400/80 text-sm">See my work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Profile Image */}
          <div
            className="flex-shrink-0"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-teal-500/30 shadow-2xl shadow-purple-500/20">
                {/* Replace with your actual image */}
                <div className="w-full h-full bg-gradient-to-br from-teal-900/40 to-teal-700/20 flex items-center justify-center">
                  <span className="text-teal-400 text-lg font-medium">Your Photo</span>
                 
                  <Image 
                    src="/evan.jpg" 
                    alt="Evan Chimwaza Profile"
                    fill
                    className="object-cover"
                  />
                  
                </div>
              </div>
              {/* Glowing ring effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-300/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-24">
          {/* Total Projects Card */}
          <div
            className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-8 text-center group hover:border-teal-400/40 transition-all duration-300"
            data-aos="fade-right"
            data-aos-duration="1300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/20 rounded-full mb-6 group-hover:bg-teal-500/30 transition-all duration-300">
              <FolderOpen className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-teal-300 mb-2">50+</h3>
            <h4 className="text-xl font-semibold text-teal-400 mb-3">Total Projects</h4>
            <p className="text-teal-200/80 leading-relaxed">
              Bringing the world together through innovative digital solutions
            </p>
          </div>

          {/* Certificates Card */}
          <div
            className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-8 text-center group hover:border-teal-400/40 transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="1300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/20 rounded-full mb-6 group-hover:bg-teal-500/30 transition-all duration-300">
              <Award className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-teal-300 mb-2">15+</h3>
            <h4 className="text-xl font-semibold text-teal-400 mb-3">Certificates</h4>
            <p className="text-teal-200/80 leading-relaxed">
              Professional verified credentials in cutting-edge technologies
            </p>
          </div>

          {/* Years of Experience Card */}
          <div
            className="bg-gradient-to-br from-teal-900/30 to-teal-700/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-8 text-center group hover:border-teal-400/40 transition-all duration-300"
            data-aos="fade-left"
            data-aos-duration="1300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500/20 rounded-full mb-6 group-hover:bg-teal-500/30 transition-all duration-300">
              <Clock className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-teal-300 mb-2">3+</h3>
            <h4 className="text-xl font-semibold text-teal-400 mb-3">Years Experience</h4>
            <p className="text-teal-200/80 leading-relaxed">
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