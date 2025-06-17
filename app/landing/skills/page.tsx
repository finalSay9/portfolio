"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  Monitor, 
  Smartphone, 
  Database,
  Code,
  Wrench,
  Layers,
  Globe,
  Terminal,
  FileCode,
  Cpu,
  Cloud
} from "lucide-react";

// Animated Background Component similar to landing page
const AnimatedBackground: React.FC = () => {
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
    
    const particleCount = dimensions.width < 768 ? 30 : 60;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * (dimensions.width < 768 ? 1.5 : 3),
      vy: (Math.random() - 0.5) * (dimensions.width < 768 ? 1.5 : 3),
      size: Math.random() * (dimensions.width < 768 ? 2 : 3) + 1,
      opacity: Math.random() * 0.4 + 0.1,
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
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        particle.opacity += particle.opacityDirection * 0.008;
        if (particle.opacity <= 0.1 || particle.opacity >= 0.6) {
          particle.opacityDirection *= -1;
        }
        
        if (particle.x <= 0 || particle.x >= dimensions.width) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= dimensions.height) {
          particle.vy *= -1;
        }
        
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${particle.opacity})`;
        ctx.fill();
      });
      
      const connectionDistance = dimensions.width < 768 ? 100 : 150;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, 0.15)`;
            ctx.lineWidth = 0.8;
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
      className="absolute inset-0 opacity-100"
      style={{ zIndex: 0 }}
    />
  );
};

// Moving Graphs Background
const MovingGraphs: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-10 z-1">
      <svg width="100%" height="100%" viewBox="0 0 1400 900" className="absolute inset-0">
        <defs>
          <linearGradient id="graphGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="graphGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        
        {/* Animated flowing lines */}
        <motion.path
          d="M0,300 Q200,150 400,300 T800,300 Q1000,150 1200,300 T1600,300"
          stroke="url(#graphGradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.8, 0],
            x: [-100, 100, -100]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M100,500 Q300,350 500,500 T900,500 Q1100,350 1300,500"
          stroke="url(#graphGradient2)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.6, 0],
            x: [100, -100, 100]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.path
          d="M-100,700 Q100,550 300,700 T700,700 Q900,550 1100,700 T1500,700"
          stroke="#2DD4BF"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          animate={{
            x: [0, 200, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating geometric shapes */}
        <motion.circle
          cx="200"
          cy="200"
          r="30"
          fill="rgba(45, 212, 191, 0.1)"
          animate={{
            cx: [200, 300, 200],
            cy: [200, 100, 200],
            r: [30, 40, 30]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.rect
          x="800"
          y="150"
          width="40"
          height="40"
          fill="rgba(139, 92, 246, 0.1)"
          animate={{
            rotate: [0, 360],
            x: [800, 900, 800],
            y: [150, 250, 150]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
};

interface SkillCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  technologies: string[];
  delay?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, description, icon, technologies, delay = 0 }) => {
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-md border border-teal-500/20 rounded-xl p-6 hover:border-teal-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Icon/Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 mb-4 md:mb-0">
          <motion.div
            className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-teal-400/30"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-teal-400 text-4xl md:text-5xl">
              {icon}
            </div>
          </motion.div>
        </div>
        
        {/* Content Section */}
        <div className="w-full md:w-1/2 md:pl-4">
          <h3 className="text-xl md:text-2xl font-bold text-teal-400 mb-3">
            {title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-teal-500/10 text-teal-300 text-xs rounded-full border border-teal-500/20"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-full border border-purple-500/20">
                +{technologies.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface TechItemProps {
  name: string;
  icon: React.ReactNode;
  category: string;
  delay?: number;
}

const TechItem: React.FC<TechItemProps> = ({ name, icon, category, delay = 0 }) => {
  return (
    <motion.div
      className="bg-black/30 backdrop-blur-sm border border-teal-500/20 rounded-lg p-4 hover:border-teal-400/40 transition-all duration-300 hover:shadow-md hover:shadow-teal-500/20 group"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="text-teal-400 text-2xl md:text-3xl group-hover:text-teal-300 transition-colors">
          {icon}
        </div>
        <h4 className="text-white font-medium text-sm md:text-base">
          {name}
        </h4>
        <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800/50 rounded-full">
          {category}
        </span>
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const skillsData = [
    {
      title: "Backend Development",
      description: "Building robust server-side applications with modern frameworks and technologies. Experienced in creating RESTful APIs, handling databases, and implementing secure authentication systems.",
      icon: <Server />,
      technologies: ["NestJS", "Django", "FastAPI", "Flask", "Node.js", "Express.js"]
    },
    {
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern JavaScript frameworks. Focused on performance optimization and user experience design.",
      icon: <Monitor />,
      technologies: ["React.js", "Next.js", "TypeScript", "Zod", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Mobile Development",
      description: "Developing cross-platform and native mobile applications with focus on performance and user experience across different devices and platforms.",
      icon: <Smartphone />,
      technologies: ["Flutter", "React Native", "Kotlin", "Dart", "Android Studio"]
    }
  ];

  const technologies = [
    // Languages
    { name: "JavaScript", icon: <Code />, category: "Language" },
    { name: "TypeScript", icon: <FileCode />, category: "Language" },
    { name: "Python", icon: <Terminal />, category: "Language" },
    { name: "Java", icon: <Cpu />, category: "Language" },
    { name: "C#", icon: <Code />, category: "Language" },
    { name: "Dart", icon: <FileCode />, category: "Language" },
    
    // Databases
    { name: "MySQL", icon: <Database />, category: "Database" },
    { name: "PostgreSQL", icon: <Database />, category: "Database" },
    { name: "Supabase", icon: <Cloud />, category: "Database" },
    { name: "Firebase", icon: <Cloud />, category: "Database" },
    
    // Tools
    { name: "Docker", icon: <Layers />, category: "Tool" },
    { name: "Postman", icon: <Globe />, category: "Tool" },
    { name: "Apache", icon: <Server />, category: "Tool" },
    { name: "Git", icon: <Wrench />, category: "Tool" },
    { name: "VS Code", icon: <Code />, category: "Tool" },
    { name: "Linux", icon: <Terminal />, category: "Tool" }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-12 md:py-20">
      {/* Animated Background */}
      <AnimatedBackground />
      <MovingGraphs />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-400 mb-4"
            animate={{ 
              backgroundImage: [
                "linear-gradient(45deg, #2DD4BF, #8B5CF6)",
                "linear-gradient(45deg, #8B5CF6, #2DD4BF)",
                "linear-gradient(45deg, #2DD4BF, #8B5CF6)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Skills & Technologies
          </motion.h1>
          <motion.div
            className="w-24 md:w-32 h-1 bg-gradient-to-r from-teal-500 to-purple-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Skills Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {skillsData.map((skill, index) => (
            <SkillCard
              key={index}
              title={skill.title}
              description={skill.description}
              icon={skill.icon}
              technologies={skill.technologies}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Technologies Section */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-teal-400 mb-2">
            Technologies I Work With
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            A comprehensive toolkit for full-stack development
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <TechItem
              key={index}
              name={tech.name}
              icon={tech.icon}
              category={tech.category}
              delay={index * 0.05}
            />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute bottom-1/3 right-8 w-3 h-3 md:w-4 md:h-4 bg-teal-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-2/3 left-1/6 w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/6 right-1/4 w-4 h-4 md:w-6 md:h-6 bg-teal-400 rounded-full animate-pulse opacity-40"></div>
      </div>
    </div>
  );
};

export default Skills;