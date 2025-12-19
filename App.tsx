
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomCursor from './components/CustomCursor';
import MagneticButton from './components/MagneticButton';
import Chatbot from './components/Chatbot';
import { TEAM, PRODUCTS, PROCEDURE_STEPS, SOCIAL_LINKS, TESTIMONIALS } from './constants';
import { CustomBrick } from './types';

const COLORS = ['#D2691E', '#00A86B', '#2E5BFF'];

const BackgroundParticles = () => {
  const { scrollYProgress } = useScroll();
  
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 200,
      size: Math.random() * 3 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 2 + 0.5
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-15"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            y: useTransform(scrollYProgress, [0, 1], [0, -1000 * p.speed])
          }}
        />
      ))}
    </div>
  );
};

const SideNav = ({ items, onScrollTo, onOpenLab }: { items: any[], onScrollTo: (id: string) => void, onOpenLab: () => void }) => {
  const { scrollYProgress } = useScroll();
  
  // Create a staggered "bow" movement for each item
  return (
    <nav className="fixed left-0 top-0 h-full z-[100] flex flex-col justify-center pointer-events-none px-6 md:px-12">
      <div className="flex flex-col gap-6 items-start pointer-events-auto">
        {items.map((item, index) => {
          // Each item has a slightly different parallax offset to create the "one by one" bow effect
          const offset = index * 0.15;
          const xTranslation = useTransform(
            scrollYProgress,
            [0 + offset, 0.5 + offset, 1 + offset],
            [0, 40, 0] // Moves out in a "bow" shape and back
          );
          
          return (
            <motion.button
              key={item.label}
              onClick={() => onScrollTo(item.id)}
              style={{ x: xTranslation }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex items-center gap-4"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black group-hover:scale-[3] group-hover:bg-[#00A86B] transition-all duration-500" />
              <span className="font-sync text-[10px] font-bold tracking-[0.3em] uppercase text-black opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 whitespace-nowrap bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-black/5 shadow-sm">
                {item.label}
              </span>
            </motion.button>
          );
        })}
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 pt-8 border-t border-black/10 w-full"
        >
          <MagneticButton 
            onClick={onOpenLab} 
            className="w-12 h-12 bg-[#00A86B] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          >
            <div className="font-sync text-[8px] font-bold leading-none uppercase">LAB</div>
          </MagneticButton>
        </motion.div>
      </div>
    </nav>
  );
};

const BrickLab = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [config, setConfig] = useState<CustomBrick>({ coffee: 70, palm: 20, pressure: 250 });

  const chartData = useMemo(() => {
    const durability = (config.pressure / 300) * 100;
    const thermal = (config.coffee / 100) * 100;
    const eco = ((config.coffee + config.palm) / 200) * 100;

    return [
      { name: 'Traditional Clay', durability: 75, eco: 20, thermal: 45 },
      { name: 'Your Custom Brick', durability: durability, eco: eco, thermal: thermal },
      { name: 'Concrete Block', durability: 85, eco: 10, thermal: 30 },
    ];
  }, [config]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] flex items-center justify-center p-4 lg:p-12 bg-black/90 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
            className="bg-white w-full max-w-6xl rounded-[60px] overflow-hidden flex flex-col lg:flex-row shadow-2xl border-4 border-black"
          >
            <div className="lg:w-1/2 p-12 bg-[#FAF9F6] border-r-4 border-black">
              <button onClick={onClose} className="mb-12 text-black/40 hover:text-black font-sync text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                <span>&larr;</span> CLOSE FOUNDRY
              </button>
              <h2 className="font-sync text-4xl font-bold mb-4 tracking-tighter uppercase text-black">BRICK LAB</h2>
              <p className="font-playfair text-xl italic text-gray-500 mb-12">Simulate molecular bonding based on organic ratios.</p>
              
              <div className="space-y-10">
                {Object.entries(config).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-4">
                      <label className="font-sync text-[10px] font-bold uppercase tracking-widest text-black">{key}</label>
                      <span className="font-sync text-[10px] font-bold text-[#00A86B]">{val}{key === 'pressure' ? 't' : '%'}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max={key === 'pressure' ? 300 : 100} 
                      value={val}
                      onChange={(e) => setConfig({...config, [key]: parseInt(e.target.value)})}
                      className="w-full accent-black cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-16 p-8 bg-black rounded-3xl text-white">
                <p className="font-sync text-[9px] font-bold tracking-[0.3em] uppercase mb-4 text-[#D2691E]">Certification Prediction</p>
                <p className="font-playfair text-xl italic opacity-80 leading-relaxed">"Based on these ratios, your brick is projected to be carbon neutral with a thermal resistance exceeding standard clay by 35%."</p>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 flex flex-col justify-center bg-white">
              <h3 className="font-sync text-[10px] font-bold tracking-[0.4em] uppercase mb-12 text-center text-gray-400">Structural Performance Graph</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#f5f5f5'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                    <Legend iconType="circle" />
                    <Bar dataKey="durability" fill="#2E5BFF" radius={[10, 10, 0, 0]} name="Durability Index" />
                    <Bar dataKey="eco" fill="#00A86B" radius={[10, 10, 0, 0]} name="Sustainability" />
                    <Bar dataKey="thermal" fill="#D2691E" radius={[10, 10, 0, 0]} name="Insulation" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-12 text-center">
                 <button onClick={onClose} className="font-sync text-[10px] font-bold tracking-widest bg-black text-white px-10 py-4 rounded-full uppercase hover:scale-105 transition-transform">Save Configuration</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ArtisticHeader = ({ title, subtitle, color = "var(--palm)" }: { title: string, subtitle?: string, color?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div ref={ref} className="mb-24 relative">
      <motion.div 
        initial={{ width: 0 }}
        animate={isInView ? { width: '120px' } : { width: 0 }}
        className="h-1 mb-6"
        style={{ backgroundColor: color }}
      />
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="font-sync text-xs uppercase tracking-widest mb-4 block font-bold"
        style={{ color }}
      >
        {subtitle}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-sync text-5xl md:text-8xl font-bold tracking-tighter text-black leading-none uppercase"
      >
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 2 !== 0 ? 'text-transparent stroke-text' : ''}>
            {word}{' '}
          </span>
        ))}
      </motion.h2>
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px black;
        }
      `}</style>
    </div>
  );
};

const HorizontalProcedure = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <div ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-black">
        <motion.div style={{ x }} className="flex gap-12 px-24">
          <div className="flex-shrink-0 w-[500px] flex flex-col justify-center">
             <h2 className="font-sync text-7xl font-bold text-white uppercase leading-none">
               THE <br /> <span className="text-[#D2691E]">ALCHEMY</span> <br /> PROCESS
             </h2>
             <p className="text-white/40 font-sync text-[10px] font-bold tracking-[0.3em] uppercase mt-8">Scroll to explore the transformation</p>
          </div>
          {PROCEDURE_STEPS.map((step) => (
            <div key={step.id} className="flex-shrink-0 w-[600px] md:w-[800px] aspect-video relative group overflow-hidden rounded-[60px] border-2 border-white/10 bg-white/5">
              <img src={step.image} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={step.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                <div className="flex items-center gap-6 mb-4">
                  <span className="font-sync text-5xl font-bold text-[#D2691E]">0{step.id}</span>
                  <div className="h-px flex-1 bg-white/20" />
                </div>
                <h3 className="font-sync text-white text-4xl font-bold uppercase tracking-tighter mb-4">{step.title}</h3>
                <p className="font-playfair text-white/70 text-xl italic mb-6 leading-relaxed max-w-xl">{step.description}</p>
                <div className="font-sync text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] border border-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                  NOTE: {step.technicalNote}
                </div>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-[400px]" />
        </motion.div>
      </div>
    </div>
  );
};

const ResearchSection = () => {
  return (
    <section id="research" className="py-48 px-8 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto pl-12 md:pl-24">
        <ArtisticHeader title="LABORATORY BORN" subtitle="Scientific Foundation" color="#2E5BFF" />
        
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <p className="font-playfair text-3xl italic text-gray-600 leading-relaxed">
              EcoloBrick isn't just a manufacturing feat; it's the result of rigorous structural validation at the 
              <span className="text-black font-bold"> University of Annaba</span> and 
              <span className="text-[#2E5BFF] font-bold"> CRTI Laboratories</span>.
            </p>
            <div className="space-y-6">
              <div className="p-8 border-l-4 border-[#2E5BFF] bg-[#2E5BFF]/5 rounded-r-3xl">
                <h4 className="font-sync text-sm font-bold uppercase mb-2">Molecular Material Science</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Our research focuses on the crystalline structure of bio-polymers formed during high-pressure cold forging. This ensures our bricks surpass standard load-bearing requirements for multi-story construction.</p>
              </div>
              <div className="p-8 border-l-4 border-[#00A86B] bg-[#00A86B]/5 rounded-r-3xl">
                <h4 className="font-sync text-sm font-bold uppercase mb-2">Thermal Efficiency Audits</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Using thermal imaging and heat-flow sensors in controlled university environments, we've proved our coffee-matrix provides 30% more natural insulation than red clay.</p>
              </div>
            </div>
            <div className="pt-8">
              <div className="flex items-center gap-8">
                <img src="https://upload.wikimedia.org/wikipedia/en/3/3a/Badji_Mokhtar_Annaba_University_Logo.png" alt="University Logo" className="h-16 grayscale opacity-50 hover:opacity-100 transition-opacity" />
                <div className="h-12 w-px bg-black/10" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Logo_CRTI.png/220px-Logo_CRTI.png" alt="CRTI Logo" className="h-12 grayscale opacity-50 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-12 lg:pt-0">
            <motion.div 
              whileHover={{ y: -10 }}
              className="aspect-[3/4] rounded-[40px] overflow-hidden border-2 border-black/10 shadow-xl"
            >
              <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600" className="w-full h-full object-cover" alt="Research Lab" />
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ delay: 0.1 }}
              className="aspect-[3/4] rounded-[40px] overflow-hidden border-2 border-black/10 shadow-xl translate-y-12"
            >
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600" className="w-full h-full object-cover" alt="Microscope" />
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ delay: 0.2 }}
              className="aspect-[3/4] rounded-[40px] overflow-hidden border-2 border-black/10 shadow-xl -translate-y-12"
            >
              <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600" className="w-full h-full object-cover" alt="Experiment" />
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ delay: 0.3 }}
              className="aspect-[3/4] rounded-[40px] overflow-hidden border-2 border-black/10 shadow-xl"
            >
              <img src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=600" className="w-full h-full object-cover" alt="Material Testing" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [isLabOpen, setIsLabOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'VISION', id: 'vision' },
    { label: 'PROCESS', id: 'procedure' },
    { label: 'SCIENCE', id: 'research' },
    { label: 'CATALOG', id: 'products' },
    { label: 'TEAM', id: 'team' },
    { label: 'LOCALE', id: 'location' }
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] selection:bg-[#00A86B] selection:text-white">
      <CustomCursor />
      <BackgroundParticles />
      <BrickLab isOpen={isLabOpen} onClose={() => setIsLabOpen(false)} />
      
      {/* Progress Line */}
      <motion.div 
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#00A86B] origin-left z-[110]"
      />

      {/* Side Navigation */}
      <SideNav 
        items={navItems} 
        onScrollTo={scrollToSection} 
        onOpenLab={() => setIsLabOpen(true)} 
      />

      {/* Top Brand (Minimal) */}
      <div className="fixed top-0 left-0 z-[100] p-8 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto bg-black text-white px-8 py-4 font-sync font-bold text-xl tracking-tighter rounded-full flex items-center gap-4 cursor-pointer shadow-2xl" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <span className="text-[#00A86B]">ECO</span>LO<span className="text-gray-400 italic">BRICK</span>
        </motion.div>
      </div>

      <main className="relative z-10 pl-0 md:pl-24 lg:pl-32">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen lg:h-screen flex items-center justify-center px-8 py-24 lg:py-0 relative overflow-hidden bg-white">
          <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
            <div className="z-10 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="h-0.5 w-12 bg-[#D2691E]" />
                  <span className="font-sync text-xs font-bold tracking-[0.5em] text-[#D2691E] uppercase">ANNABA ALGERIA</span>
                </div>
                <h1 className="font-sync text-6xl md:text-[8rem] xl:text-[10rem] leading-[0.85] font-bold tracking-tighter text-black uppercase">
                  BIO <br /> 
                  <span className="text-[#00A86B]">CORE</span> <br /> 
                  BRICK
                </h1>
                <p className="font-playfair text-2xl md:text-3xl italic text-gray-500 max-w-xl mx-auto lg:mx-0">
                  Turning your morning caffeine into tomorrow's living infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8">
                  <MagneticButton 
                    onClick={() => scrollToSection('products')} 
                    className="px-12 py-6 bg-black text-white font-sync text-[10px] font-bold rounded-full hover:bg-[#D2691E] transition-colors uppercase w-full sm:w-auto text-center"
                  >
                    EXPLORE CATALOG
                  </MagneticButton>
                  <button 
                    onClick={() => setIsLabOpen(true)} 
                    className="px-12 py-5 border-2 border-black font-sync text-[10px] font-bold rounded-full hover:bg-black hover:text-white transition-all uppercase w-full sm:w-auto"
                  >
                    LAB SIMULATOR
                  </button>
                </div>
              </motion.div>
            </div>
            <div className="relative hidden lg:block">
              <motion.div 
                initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="aspect-square bg-[#FAF9F6] rounded-[80px] overflow-hidden border-8 border-black p-4 shadow-[40px_40px_0px_rgba(0,0,0,0.05)]"
              >
                <img src="https://images.unsplash.com/photo-1590059132212-f733cb588d07?q=80&w=1000" className="w-full h-full object-cover rounded-[60px]" alt="Brick Texture" />
              </motion.div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#2E5BFF] rounded-full mix-blend-multiply opacity-20 blur-3xl" />
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00A86B] rounded-full mix-blend-multiply opacity-20 blur-3xl" />
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-48 px-8 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto">
            <ArtisticHeader title="ORGANIC MANIFESTO" subtitle="Our Vision" color="#2E5BFF" />
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7">
                <div className="aspect-[16/10] overflow-hidden rounded-[50px] shadow-2xl relative border-4 border-black">
                   <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200" className="w-full h-full object-cover" alt="Waste" />
                   <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              <div className="lg:col-span-5 space-y-12 pb-12">
                <h3 className="font-sync text-4xl font-bold text-black uppercase tracking-tighter">Zero Waste. <br /> Total Load.</h3>
                <p className="font-playfair text-2xl text-gray-500 italic leading-relaxed">
                  "We don't just recycle; we transmutate. Every coffee bean contains a structural memory we unlock using high-pressure molecular bonding."
                </p>
                <div className="bg-white border-4 border-black p-8 rounded-[30px] shadow-[15px_15px_0px_rgba(46,91,255,0.1)] hover:rotate-2 transition-transform">
                   <span className="font-sync text-[#2E5BFF] font-bold text-5xl">98%</span>
                   <p className="font-sync text-[10px] font-bold tracking-widest text-black mt-2 uppercase">SUSTAINABILITY INDEX SCORE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Procedure Gallery */}
        <HorizontalProcedure />

        {/* New Research Section */}
        <ResearchSection />

        {/* Dynamic Products Grid */}
        <section id="products" className="py-48 px-8 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24">
               <ArtisticHeader title="CATALOG OF SPECIMENS" subtitle="Products" color="#00A86B" />
               <p className="font-sync text-[10px] text-gray-400 max-w-[200px] mb-8 font-bold uppercase">EACH BLOCK IS UNIQUE DUE TO THE ORGANIC VARIATION OF ANNABA COFFEE WASTES.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {PRODUCTS.map((p, i) => (
                <motion.div 
                  key={p.id}
                  whileHover={{ y: -20 }}
                  className="bg-[#FAF9F6] border-4 border-black rounded-[50px] p-10 relative overflow-hidden group flex flex-col justify-between h-[600px] shadow-xl"
                >
                  <div>
                    <h4 className="font-sync text-3xl font-bold mb-4 uppercase">{p.name}</h4>
                    <p className="text-gray-500 font-playfair text-lg italic">{p.description}</p>
                  </div>
                  <div className="h-48 w-full rounded-3xl overflow-hidden mt-8 border-2 border-black/5">
                     <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.name} />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-8">
                    {p.features.map(f => (
                      <span key={f} className="font-sync text-[8px] font-bold border-2 border-black px-3 py-1 rounded-full uppercase">{f}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Artistic Team Layout */}
        <section id="team" className="py-64 px-8 bg-white relative">
          <div className="max-w-7xl mx-auto">
             <ArtisticHeader title="THE SIX INNOVATORS" subtitle="Our Team" color="#D2691E" />
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-12">
                {TEAM.map((m, i) => (
                  <motion.div 
                    key={m.id} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`space-y-8 ${i % 2 !== 0 ? 'lg:translate-y-24' : ''}`}
                  >
                    <div className="aspect-[4/5] rounded-[60px] overflow-hidden border-4 border-black relative group shadow-2xl">
                      <img src={m.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={m.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                        <p className="text-white font-playfair italic text-lg">{m.bio}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-sync text-2xl font-bold uppercase">{m.name}</h4>
                      <p className="font-sync text-[10px] font-bold tracking-widest text-[#D2691E] mt-2 uppercase">{m.role}</p>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Start Project CTA */}
        <section className="py-32 px-8 bg-white flex flex-col items-center justify-center text-center">
           <div className="max-w-4xl">
              <h2 className="font-sync text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-12">
                READY TO ENGINEER <br /> YOUR <span className="text-[#00A86B]">LEGACY?</span>
              </h2>
              <MagneticButton 
                onClick={() => setIsLabOpen(true)}
                className="bg-black text-white px-16 py-8 rounded-full font-sync text-xs font-bold tracking-[0.4em] uppercase shadow-[20px_20px_0px_rgba(0,168,107,0.15)] hover:scale-110 transition-transform"
              >
                START PROJECT
              </MagneticButton>
              <p className="mt-12 font-playfair italic text-gray-400 text-xl leading-relaxed">
                Step into the foundry and simulate your custom structural substrate.
              </p>
           </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-64 px-8 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto">
            <ArtisticHeader title="VOICES OF IMPACT" subtitle="Testimonials" color="#2E5BFF" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 rounded-[50px] border-4 border-black shadow-[15px_15px_0px_rgba(0,0,0,0.05)] hover:shadow-[20px_20px_0px_rgba(46,91,255,0.1)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-6xl text-[#2E5BFF] mb-6 font-serif leading-none">“</div>
                    <p className="font-playfair text-xl italic text-gray-700 leading-relaxed mb-8">
                      {t.quote}
                    </p>
                  </div>
                  <div className="border-t-2 border-black/5 pt-6">
                    <h4 className="font-sync text-sm font-bold uppercase">{t.author}</h4>
                    <p className="font-sync text-[9px] font-bold text-[#2E5BFF] tracking-widest mt-1 uppercase">{t.affiliation}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="location" className="py-48 px-8 bg-white border-t-4 border-black overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <ArtisticHeader title="THE ANNABA HUB" subtitle="Local Roots" color="#00A86B" />
              <div className="space-y-8">
                <p className="font-playfair text-3xl italic text-gray-500 leading-relaxed">
                  Situated in the heart of East Algeria, Annaba is the catalyst for EcoloBrick’s regional circular economy.
                </p>
                <p className="text-gray-400 font-sync text-xs font-bold leading-loose uppercase">
                  Our strategic location facilitates the collection of over 15 tons of organic waste monthly. This hub connects us directly to the University of Annaba and the industrial expertise of CRTI.
                </p>
              </div>
            </div>
            <div className="relative group">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-full aspect-square bg-[#FAF9F6] border-8 border-black rounded-[60px] overflow-hidden shadow-[30px_30px_0px_rgba(0,168,107,0.1)] transition-all duration-1000"
              >
                <iframe
                  title="EcoloBrick Annaba Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102068.7513337965!2d7.674998188151977!3d36.902641030310245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f0067347a59275%3A0xc664673895e634c4!2sAnnaba%2C%20Algeria!5e0!3m2!1sen!2sus!4v1715632123456!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(100%) contrast(1.1) brightness(1.1)' }}
                  allowFullScreen={true}
                  loading="lazy"
                  className="group-hover:grayscale-0 transition-all duration-1000"
                ></iframe>
              </motion.div>
              <div className="absolute -bottom-8 -right-8 bg-black text-white p-6 font-sync text-[10px] font-bold tracking-widest rounded-full shadow-2xl uppercase">
                ANNABA CENTER
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-24 px-8 overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <h2 className="font-sync text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-12 uppercase">RETHINK <br /> THE <br /> <span className="text-[#00A86B]">SOLID</span></h2>
              <div className="grid sm:grid-cols-2 gap-12 mb-12">
                <div className="space-y-4">
                  <p className="font-sync text-[10px] font-bold text-[#D2691E] uppercase">ADDRESS</p>
                  <p className="font-playfair italic text-xl opacity-80 leading-relaxed">Dept. of Civil Engineering<br />Badji Mokhtar University, DZ</p>
                </div>
                <div className="space-y-4">
                  <p className="font-sync text-[10px] font-bold text-[#D2691E] uppercase">CONTACT</p>
                  <p className="font-playfair italic text-xl opacity-80 leading-relaxed">abdoumansouri2323@gmail.com<br />+213 (0) 38 45 00 00</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map(link => (
                  <motion.a 
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, color: '#00A86B' }}
                    className="font-sync text-xs font-bold tracking-widest px-6 py-3 border border-white/20 rounded-full hover:border-[#00A86B] transition-all uppercase"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="aspect-square border-4 border-[#00A86B] rounded-[40px] p-8 flex flex-col justify-between shadow-[20px_20px_0px_rgba(0,168,107,0.1)]">
               <div className="font-sync text-xs font-bold leading-loose opacity-60 uppercase">
                 All EcoloBrick specimens are tested under ASTM-C67 standards and validated by the CRTI Laboratories. Our process reduces kiln-related CO2 emissions by 95% per structural unit.
               </div>
               <div className="flex justify-between items-end">
                 <div className="font-sync text-5xl font-bold tracking-tighter uppercase">EST. 2024</div>
                 <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black font-sync font-bold text-[8px] rotate-45 border-4 border-black">QC PASSED</div>
               </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 font-sync text-[25rem] font-bold text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase">
            BIO COMPOSITE
          </div>
        </footer>
      </main>

      <Chatbot />
      
      <style>{`
        ::-webkit-scrollbar { width: 12px; }
        ::-webkit-scrollbar-track { background: white; }
        ::-webkit-scrollbar-thumb { background: black; border: 4px solid white; }
      `}</style>
    </div>
  );
};

export default App;
