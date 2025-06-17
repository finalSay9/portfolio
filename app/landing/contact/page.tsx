"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  User, 
  Mail, 
  MessageSquare,
  Phone,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Heart
} from "lucide-react";

// Animated Background Component (same as Skills)
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
    
    const particleCount = dimensions.width < 768 ? 25 : 50;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * (dimensions.width < 768 ? 1.2 : 2.5),
      vy: (Math.random() - 0.5) * (dimensions.width < 768 ? 1.2 : 2.5),
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
        
        particle.opacity += particle.opacityDirection * 0.006;
        if (particle.opacity <= 0.1 || particle.opacity >= 0.5) {
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
      
      const connectionDistance = dimensions.width < 768 ? 90 : 130;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, 0.12)`;
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
    <div className="absolute inset-0 opacity-8 z-1">
      <svg width="100%" height="100%" viewBox="0 0 1400 900" className="absolute inset-0">
        <defs>
          <linearGradient id="contactGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="contactGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M0,250 Q300,100 600,250 T1200,250 Q1400,100 1600,250"
          stroke="url(#contactGradient1)"
          strokeWidth="1.8"
          fill="none"
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.7, 0],
            x: [-50, 50, -50]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M200,450 Q500,300 800,450 T1400,450"
          stroke="url(#contactGradient2)"
          strokeWidth="1.2"
          fill="none"
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.5, 0],
            x: [80, -80, 80]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        <motion.path
          d="M-50,650 Q200,500 450,650 T900,650 Q1150,500 1400,650"
          stroke="#2DD4BF"
          strokeWidth="0.8"
          fill="none"
          opacity="0.25"
          animate={{
            x: [0, 150, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.circle
          cx="150"
          cy="180"
          r="25"
          fill="rgba(45, 212, 191, 0.08)"
          animate={{
            cx: [150, 250, 150],
            cy: [180, 80, 180],
            r: [25, 35, 25]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.polygon
          points="900,120 920,140 900,160 880,140"
          fill="rgba(139, 92, 246, 0.08)"
          animate={{
            rotate: [0, 360],
            x: [0, 100, 0],
            y: [0, 80, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
};

// WhatsApp Icon Component
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488z"/>
  </svg>
);

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SocialLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
  delay?: number;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, label, href, color, delay = 0 }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center space-x-3 p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-teal-500/20 hover:border-${color}-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-${color}-500/20 group`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className={`text-${color}-400 text-2xl group-hover:text-${color}-300 transition-colors`}>
        {icon}
      </div>
      <span className="text-white font-medium">{label}</span>
    </motion.a>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const socialLinks = [
    {
      icon: <WhatsAppIcon className="w-6 h-6" />,
      label: "WhatsApp",
      href: "https://wa.me/+265883341542",
      color: "green"
    },
    {
      icon: <Instagram size={24} />,
      label: "Instagram",
      href: "https://instagram.com/evancimwaza",
      color: "pink"
    },
    {
      icon: <Linkedin size={24} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/evan-chimwaza-a657a5359/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BxeO5tbdzSOmWoPauop3Gyg%3D%3D",
      color: "blue"
    },
    {
      icon: <Twitter size={24} />,
      label: "X (Twitter)",
      href: "https://twitter.com/evanchimwaza",
      color: "blue"
    },
    {
      icon: <Facebook size={24} />,
      label: "Facebook",
      href: "https://web.facebook.com/evanchimwaza",
      color: "blue"
    }
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
            Contact Me
          </motion.h1>
          <motion.div
            className="w-24 md:w-32 h-1 bg-gradient-to-r from-teal-500 to-purple-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Let &#39;s connect and discuss how we can work together on your next project
          </motion.p>
        </motion.div>

        {/* Main Content - Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          
          {/* Contact Form Card */}
          <motion.div
            className="bg-black/40 backdrop-blur-md border border-teal-500/20 rounded-xl p-6 md:p-8 hover:border-teal-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-teal-400 mb-6 text-center">
              Get in Touch
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-teal-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-teal-500/30 rounded-lg bg-black/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-teal-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-teal-500/30 rounded-lg bg-black/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-teal-400" />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="block w-full pl-10 pr-3 py-3 border border-teal-500/30 rounded-lg bg-black/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/50 text-black font-semibold py-3 px-6 rounded-lg shadow-lg shadow-teal-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-teal-500/50 flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:hover:scale-100"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Media Card */}
          <motion.div
            className="bg-black/40 backdrop-blur-md border border-teal-500/20 rounded-xl p-6 md:p-8 hover:border-teal-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-teal-400 mb-6 text-center">
              Connect with Me
            </h2>
            
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  icon={social.icon}
                  label={social.label}
                  href={social.href}
                  color={social.color}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Additional Contact Info */}
            <motion.div
              className="mt-8 p-4 bg-black/20 rounded-lg border border-teal-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-teal-400 mb-2 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Quick Response
              </h3>
              <p className="text-gray-300 text-sm">
                I typically respond to messages within 24 hours. For urgent inquiries, 
                please reach out via WhatsApp or LinkedIn.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center py-8 border-t border-teal-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-gray-400 mb-2 flex items-center justify-center space-x-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>by Evan Chimwaza</span>
          </motion.p>
          <p className="text-sm text-gray-500">
            © 2025 Evan Chimwaza. All rights reserved.
          </p>
        </motion.footer>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-8 w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute bottom-1/3 right-8 w-3 h-3 md:w-4 md:h-4 bg-teal-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-2/3 left-1/6 w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-1/6 right-1/4 w-4 h-4 md:w-6 md:h-6 bg-teal-400 rounded-full animate-pulse opacity-40"></div>
      </div>
    </div>
  );
};

export default Contact;