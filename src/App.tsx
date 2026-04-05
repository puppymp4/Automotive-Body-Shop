import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Shield, 
  Zap, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Award,
  Menu,
  X,
  ChevronRight,
  Phone
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-black rotate-45" />
          </div>
          <span className="text-white font-bold tracking-tighter text-xl uppercase">AutoCraft</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#results" className="hover:text-white transition-colors">Results</a>
          <a href="#warranty" className="hover:text-white transition-colors">Warranty</a>
          <a href="#insurance" className="hover:text-white transition-colors">Insurance</a>
          <button className="bg-white text-black px-5 py-2 rounded-full hover:bg-white/90 transition-all">
            Get Estimate
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-t border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#process" className="text-white text-lg" onClick={() => setIsMobileMenuOpen(false)}>Process</a>
            <a href="#results" className="text-white text-lg" onClick={() => setIsMobileMenuOpen(false)}>Results</a>
            <a href="#warranty" className="text-white text-lg" onClick={() => setIsMobileMenuOpen(false)}>Warranty</a>
            <a href="#insurance" className="text-white text-lg" onClick={() => setIsMobileMenuOpen(false)}>Insurance</a>
            <button className="bg-white text-black px-5 py-3 rounded-full w-full font-bold">
              Get Estimate
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image */}
      <img 
        src="https://images.unsplash.com/photo-1603584173870-7f3ca9128110?auto=format&fit=crop&q=80&w=2000" 
        alt="After repair"
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      
      {/* Before Image */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=2000" 
          alt="Before repair"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${100 / (sliderPos / 100)}%` }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded uppercase tracking-widest">Before</div>
      </div>

      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded uppercase tracking-widest">After</div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-black/20 rounded-full" />
            <div className="w-1 h-3 bg-black/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StickyCTA = () => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <button className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 transition-all group">
        <div className="bg-black text-white p-2 rounded-full group-hover:rotate-12 transition-transform">
          <MessageSquare size={20} />
        </div>
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 leading-none mb-1">Fast Track</p>
          <p className="font-bold text-sm leading-none">Text for Estimate</p>
        </div>
      </button>
    </motion.div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen font-sans">
      <Navbar />
      <StickyCTA />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2560" 
            alt="Luxury car detail"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold mb-8">
              The Gold Standard in Restoration
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              Precision Repair.<br />
              <span className="text-white/40 italic">Invisible Results.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Experience the future of automotive body work. High-end videography, 
              frictionless claims, and a lifetime warranty on every restoration.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button className="w-full md:w-auto bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                Start My Estimate <ChevronRight size={20} />
              </button>
              <button className="w-full md:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                View Gallery
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 to-white/50" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">Scroll to Explore</span>
        </motion.div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Award className="text-white" /> I-CAR GOLD CLASS
          </div>
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <Shield className="text-white" /> LIFETIME WARRANTY
          </div>
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <CheckCircle2 className="text-white" /> ALL INSURANCE ACCEPTED
          </div>
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter uppercase">
            <Zap className="text-white" /> 48H FAST TRACK
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section id="results" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4 block">Visual Proof</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                We don't just fix cars.<br />
                <span className="text-white/40">We restore perfection.</span>
              </h2>
              <p className="text-lg text-white/60 mb-12 leading-relaxed font-light">
                Our master technicians use state-of-the-art laser alignment and 
                spectrophotometer color matching to ensure your vehicle returns 
                to factory specifications. Slide to see the AutoCraft difference.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Zap size={18} />, title: "Precision Color Match", desc: "Digital paint matching for a seamless finish." },
                  { icon: <Shield size={18} />, title: "Structural Integrity", desc: "Laser-guided frame straightening." },
                  { icon: <Award size={18} />, title: "OEM Parts", desc: "Only genuine manufacturer parts used." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <BeforeAfterSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance Claims Step Guide */}
      <section id="insurance" className="py-32 bg-white text-black rounded-[3rem] mx-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 mb-4 block">Frictionless Claims</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Zero Stress. Three Steps.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                step: "01", 
                title: "Digital Estimate", 
                desc: "Text us photos of the damage. Our AI-assisted estimators provide a preliminary quote in minutes.",
                icon: <FileText size={40} strokeWidth={1} />
              },
              { 
                step: "02", 
                title: "Direct Billing", 
                desc: "We handle all communication with your insurance provider. No paperwork, no phone tag, no hassle.",
                icon: <Shield size={40} strokeWidth={1} />
              },
              { 
                step: "03", 
                title: "White Glove Return", 
                desc: "Your car is repaired, detailed, and delivered back to you. Backed by our Lifetime Warranty.",
                icon: <Zap size={40} strokeWidth={1} />
              }
            ].map((item, i) => (
              <div key={i} className="relative group p-8 rounded-3xl hover:bg-black/5 transition-colors">
                <div className="text-6xl font-bold opacity-5 mb-8 group-hover:opacity-10 transition-opacity">{item.step}</div>
                <div className="mb-6 text-black/80">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-black/60 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-black text-white rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold tracking-tighter mb-4">Ready to start your claim?</h3>
              <p className="text-white/60 font-light">Join over 10,000 satisfied customers who experienced a frictionless repair process.</p>
            </div>
            <button className="whitespace-nowrap bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all">
              Contact Claims Specialist
            </button>
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section id="warranty" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield size={40} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 italic">
              Our Promise is Permanent.
            </h2>
            <div className="inline-block px-8 py-4 bg-white/5 border border-white/10 rounded-2xl mb-12">
              <p className="text-2xl font-bold tracking-tighter">LIFETIME WARRANTY</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-1">On all paint and structural repairs</p>
            </div>
            <p className="max-w-2xl mx-auto text-white/60 text-lg font-light leading-relaxed">
              We stand behind our work for as long as you own your vehicle. 
              Our commitment to quality is absolute, ensuring your peace of 
              mind on every mile of the road.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black rotate-45" />
                </div>
                <span className="text-white font-bold tracking-tighter text-xl uppercase">AutoCraft</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed text-sm">
                Redefining automotive restoration through technology, 
                precision, and an unwavering commitment to quality.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-white/30">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#process" className="hover:text-white transition-colors">Process</a></li>
                <li><a href="#results" className="hover:text-white transition-colors">Results</a></li>
                <li><a href="#warranty" className="hover:text-white transition-colors">Warranty</a></li>
                <li><a href="#insurance" className="hover:text-white transition-colors">Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-white/30">Contact</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-center gap-2"><Phone size={14} /> (555) 012-3456</li>
                <li className="flex items-center gap-2 underline">hello@autocraft.com</li>
                <li className="text-white/40">123 Restoration Way,<br />Automotive District, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold text-white/20">
            <p>© 2026 AutoCraft Body Shop. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
