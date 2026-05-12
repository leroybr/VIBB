/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Eye, 
  Home, 
  Stethoscope, 
  Briefcase, 
  ShoppingBag,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
  Instagram
} from "lucide-react";

// --- Components ---

const SplashScreen = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <motion.h1
        translate="no"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="notranslate text-5xl md:text-7xl font-sans font-bold tracking-[0.4em] text-slate-900 uppercase"
      >
        VIBB
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="mt-6 text-sm md:text-base font-sans font-light tracking-[0.3em] text-slate-500 uppercase text-center px-4"
      >
        Magic glass Solutions
      </motion.p>
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 2.5, ease: "easeInOut" }}
        className="mt-12 h-[1px] w-32 bg-slate-200 origin-left"
      />
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Ventajas", href: "#smart-pdlc" },
    { label: "Constructoras", href: "#constructoras" },
    { label: "Tecnología", href: "#tecnología" },
    { label: "Aplicaciones", href: "#aplicaciones" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-slate-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div translate="no" className="notranslate text-lg font-sans tracking-[0.3em] uppercase font-bold text-indigo-950">VIBB</div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="text-[10px] uppercase tracking-widest font-bold text-slate-600 hover:text-indigo-900 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-900 transition-all group-hover:w-full" />
              </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-indigo-950">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navItems.map((item) => (
                <a 
                   key={item.label} 
                   href={item.href}
                   onClick={() => setIsOpen(false)}
                   className="text-[11px] uppercase tracking-widest font-bold text-slate-600 hover:text-indigo-900"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SubNavbar = () => null; // Replaced by inline dynamic bar

const ApplicationSection = ({ title, icon: Icon, images, aspectRatio = "aspect-video" }: { title: string; icon: any; images: string[]; aspectRatio?: string }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="group space-y-2">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-slate-50 rounded-full text-slate-800">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <h3 className="text-[13px] md:text-[14px] font-sans font-bold uppercase tracking-widest">{title}</h3>
      </div>
      <div className={`grid gap-4 ${images.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`${aspectRatio} bg-slate-100 overflow-hidden rounded-sm relative group/img cursor-zoom-in`}
            onClick={() => setSelectedImage(img)}
          >
            <img 
              src={img} 
              alt={`${title} ${idx === 0 ? 'ON' : 'OFF'}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-125"
              referrerPolicy="no-referrer"
            />
            {/* Label Overlay */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-sm shadow-sm">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-900">
                {idx === 0 ? "Modo ON" : "Modo OFF"}
              </span>
            </div>
            
            {/* Hover Info */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white text-[10px] uppercase tracking-widest font-medium border border-white/40 px-3 py-1 rounded-full backdrop-blur-sm">
                 Ver más
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Expand View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [showMain, setShowMain] = useState(false);

  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "smart-pdlc", "constructoras", "tecnología", "aplicaciones", "contacto"];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSplashComplete = () => {
    setShowMain(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <AnimatePresence mode="wait">
        {!showMain ? (
          <SplashScreen key="splash-screen" onComplete={handleSplashComplete} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Navbar />
            
            <div className="sticky top-20 left-0 w-full z-30 bg-indigo-950 text-white py-2 border-b border-white/10 shadow-sm">
              <div className="max-w-7xl mx-auto px-6 flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 pr-3 pl-1 py-1 rounded-full backdrop-blur-sm border border-white/10">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                    <img src="/arbol.jpg" alt="Zero Emission" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white whitespace-nowrap">Cero Emisión</span>
                </div>
                  <motion.span 
                    key={activeSection}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-white/80 whitespace-nowrap border-l border-white/20 pl-4"
                  >
                    {activeSection === "constructoras" 
                      ? "INNOVACION EN LA ARQUITECTURA CON VIDRIO INTELIGENTE" 
                      : `VIBB, Distribuidora de Vidrios Inteligente BIO BIO ${activeSection === "smart-pdlc" ? " | VENTAJAS Y SOLUCIONES" : ""}`}
                  </motion.span>
              </div>
            </div>

            <main className="mt-0">
              {/* Hero Section */}
              <section id="inicio" className="relative min-h-[calc(100vh-140px)] flex items-start lg:items-center bg-white text-slate-900 overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-24">
                {/* Abstract Background Elements inspired by user banner */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
                  <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[100%] bg-gradient-to-br from-sky-400/30 via-indigo-400/20 to-transparent blur-[120px] rounded-full rotate-12" />
                  <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[80%] bg-gradient-to-tr from-blue-400/20 via-indigo-300/10 to-transparent blur-[100px] rounded-full -rotate-12" />
                  <div className="absolute top-[20%] left-[10%] w-[30%] h-[40%] bg-indigo-200/10 blur-[80px] rounded-full opacity-50" />
                  
                  {/* Decorative Diagonal Light Streak */}
                  <motion.div 
                    initial={{ opacity: 0, x: -100, y: -100 }}
                    animate={{ opacity: 0.6, x: 0, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-[-50%] left-[30%] w-[1px] h-[200%] bg-gradient-to-b from-transparent via-indigo-800/20 to-transparent rotate-[35deg] blur-[2px]" />
                    <div className="absolute top-[-50%] left-[32%] w-[2px] h-[200%] bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent rotate-[35deg] blur-[4px]" />
                  </motion.div>
                </div>

                <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  {/* Content Pillar */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="z-10 order-2 lg:order-1 lg:col-span-5 text-left"
                   >

                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-4"
                    >
                      <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-800">VIBB | Magic Glass</span>
                    </motion.div>
                    
                    <h2 className="text-[20px] md:text-[24px] leading-tight font-sans font-bold text-slate-900 uppercase tracking-[0.1em] mb-6 max-w-xl">
                      Ahorra energía y gana privacidad con vidrio inteligente al instante.
                    </h2>
 
                    <div className="space-y-6 text-slate-600 font-light text-[13px] md:text-[14px] leading-relaxed max-w-2xl mb-8">
                      <p>
                        La tecnología de Cristal Líquido Disperso en Polímero (PDLC) representa un avance significativo en la innovación del vidrio inteligente, ofreciendo un control dinámico sobre la transparencia. El PDLC está compuesto por gotas de cristal líquido suspendidas en una matriz polimérica, las cuales pueden cambiar entre estados transparentes y opacos al aplicar un voltaje eléctrico. Esta transición permite a los arquitectos gestionar la luz y la privacidad dentro de los edificios de manera efectiva. Una de las principales aplicaciones de la tecnología PDLC es en fachadas y ventanas. La capacidad de controlar la transparencia mejora el atractivo estético y la privacidad de la arquitectura moderna mientras promueve la eficiencia energética al reducir la necesidad de persianas o cortinas.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href="#contacto"
                        className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-indigo-950 text-white rounded-sm text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-slate-900 transition-all shadow-xl shadow-indigo-900/10 group"
                      >
                        <span>Habla con un Experto</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a 
                        href="#formulario-contacto"
                        className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white border border-indigo-900 text-indigo-950 rounded-sm text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-slate-50 transition-all group"
                      >
                        <span>Dejar mis Datos</span>
                        <Mail size={14} className="group-hover:scale-110 transition-transform" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Right Column: Featured Video */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="relative order-1 lg:order-2 lg:col-span-7"
                  >
                    <div className="relative z-10 aspect-video rounded-sm overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src="/Clorox.mp4" type="video/mp4" />
                      </video>
                      
                      <div className="absolute inset-0 bg-[#062c1e]/5 pointer-events-none" />
                    </div>
                  </motion.div>
                </div>
              </section>

              <section id="smart-pdlc" className="relative pt-32 pb-16 bg-white overflow-hidden border-t border-slate-50 min-h-[calc(100vh-80px)] flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="mb-12">
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-800 mb-2"
                    >
                      TECNOLOGÍA SUPERIOR
                    </motion.p>
                    <h2 className="text-xl md:text-2xl font-sans font-bold text-slate-900 uppercase tracking-[0.2em] leading-tight">
                      Ventajas VIBB PDLC
                    </h2>
                  </div>

                  {/* Content Container */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      {[
                        { t: "Protección UV y Térmica", d: "Bloqueo del 99% UV y hasta 80% de rayos infrarrojos solares, protegiendo mobiliario y piel.", icon: Shield },
                        { t: "Balance Energético", d: "Contribuye a edificios con balance positivo, reduciendo hasta el 30% del gasto en climatización (HVAC).", icon: Home },
                        { t: "Seguridad y Salud", d: "Superficies asépticas que eliminan la necesidad de cortinas, reduciendo drásticamente los alérgenos.", icon: CheckCircle2 },
                        { t: "Silencio y Confort", d: "Aislamiento acústico superior que mejora la productividad y el bienestar visual en cualquier entorno.", icon: MessageCircle },
                        { t: "Estado Transparente", d: "Alineación de dominios de cristal líquido de alta precisión para una transparencia pura y vibrante.", icon: Zap },
                        { t: "Multifuncionalidad", d: "Consumo mínimo de energía, funcionando como una potente pantalla de proyección HD en modo OFF.", icon: Eye },
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="group border-l-2 border-slate-100 pl-6 hover:border-indigo-600 transition-all duration-300"
                        >
                          <div className="space-y-1">
                            <h3 className="text-[14px] md:text-[15px] font-sans font-bold text-slate-800 uppercase tracking-widest group-hover:text-indigo-900 transition-colors">
                              {item.t}
                            </h3>
                            <p className="text-[13px] md:text-[14px] text-slate-500 font-light leading-relaxed">
                              {item.d}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Q&A Section */}
              <section className="py-6 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                    {[
                      { q: "¿Para qué sirve?", a: "Control total de la transparencia en tus cristales.", icon: Eye },
                      { q: "¿Qué es?", a: "Es una película de cristal líquido (PDLC) electrosensible.", icon: Zap },
                      { q: "¿Cómo funciona?", a: "Al aplicar voltaje las moléculas se alinean para dar transparencia.", icon: ChevronRight },
                      { q: "¿Qué beneficios?", a: "Control solar, protección UV y estética minimalista.", icon: Shield },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="space-y-2"
                      >
                        <item.icon className="text-slate-400 mb-2" size={18} strokeWidth={1} />
                        <h4 className="text-[13px] font-serif font-medium">{item.q}</h4>
                        <p className="text-[11px] text-slate-500 leading-tight font-light">{item.a}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Applications Gallery */}
              <section id="aplicaciones" className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="mb-10">
                      <h2 className="text-xl md:text-2xl font-sans font-bold text-slate-800 uppercase tracking-[0.2em] mb-4">Aplicaciones del PDLC</h2>
                      <div className="h-[1px] w-20 bg-slate-900" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <ApplicationSection 
                      title="BAÑOS" 
                      icon={Shield} 
                      aspectRatio="aspect-[4/5]"
                      images={[
                        "/Shower_curvo_on.jpg",
                        "/Shower_curvo_off.jpg"
                      ]} 
                    />
                    <ApplicationSection 
                      title="COCINAS" 
                      icon={Home} 
                      images={[
                        "/cocinas%20(1).webp",
                        "/Cocina_off.jpg"
                      ]} 
                    />
                    <ApplicationSection 
                      title="CONSULTAS" 
                      icon={Stethoscope} 
                      images={[
                        "/Consultas.webp",
                        "/Consultas-off%20(1).webp"
                      ]} 
                    />
                    <ApplicationSection 
                      title="ESTAR" 
                      icon={Home} 
                      images={[
                        "/Estar.webp",
                        "/Estar-off.png"
                      ]} 
                    />
                    <ApplicationSection 
                      title="OFICINAS" 
                      icon={Briefcase} 
                      images={[
                        "/Oficinas.webp",
                        "/Oficina_Reuniones.jpg",
                        "/Caja_Los_Heroes.jpg"
                      ]} 
                    />
                  </div>
                </div>
              </section>

              {/* Constructoras & Sustainability Section */}
              <section id="constructoras" className="relative min-h-[calc(100vh-80px)] flex items-center bg-sky-50 border-y border-sky-100 overflow-hidden pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Single Column Layout for Width Coverage */}
                    <div className="lg:col-span-12 space-y-12">
                      <div className="space-y-4">
                        <motion.p 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-800"
                        >
                          LIDERAZGO & INNOVACIÓN
                        </motion.p>
                        <h2 className="text-xl md:text-2xl font-sans font-bold text-slate-900 uppercase tracking-[0.2em] leading-tight max-w-4xl">
                          Tecnología de Cristal Líquido Disperso en Polímero (PDLC)
                        </h2>
                      </div>
                      
                      <div className="space-y-10 text-slate-700 font-light text-[13px] md:text-[14px] leading-relaxed">
                        <p className="max-w-none">
                          La tecnología de Cristal Líquido Disperso en Polímero (PDLC) representa un avance significativo en la innovación del vidrio inteligente, ofreciendo un control dinámico sobre la transparencia. El PDLC está compuesto por gotas de cristal líquido suspendidas en una matriz polimérica, las cuales pueden cambiar entre estados transparentes y opacos al aplicar un voltaje eléctrico. Esta transición permite a los arquitectos gestionar la luz y la privacidad dentro de los edificios de manera efectiva. Una de las principales aplicaciones de la tecnología PDLC es en fachadas y ventanas. La capacidad de controlar la transparencia mejora el atractivo estético y la privacidad de la arquitectura moderna mientras promueve la eficiencia energética al reducir la necesidad de persianas o cortinas.
                        </p>

                        <p className="max-w-none">
                          Hoy, los edificios son responsables de casi el 40% de las emisiones globales. Nuestra tecnología PDLC permite a las constructoras liderar el <strong>compromiso de cero emisiones</strong>, transformando cada proyecto en un activo de alto desempeño que combate activamente el desperdicio energético.
                        </p>
                      </div>

                      {/* Visual Data Cards in a Row below text */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          className="bg-white p-8 border border-slate-100 rounded-sm shadow-sm group hover:border-indigo-600 transition-all"
                        >
                          <div className="text-4xl font-serif font-bold text-slate-900 mb-2 group-hover:text-indigo-900 transition-colors">-30%</div>
                          <div className="text-[10px] uppercase tracking-widest text-indigo-800 font-bold mb-2">Energía</div>
                          <p className="text-[11px] text-slate-500 font-light leading-relaxed">Ahorro garantizado en climatización HVAC.</p>
                        </motion.div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-indigo-950 p-8 rounded-sm shadow-xl text-white relative overflow-hidden group"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
                          <div className="text-4xl font-serif font-bold text-white mb-2">99%</div>
                          <div className="text-[10px] uppercase tracking-widest text-indigo-100 font-bold mb-2">Protección UV</div>
                          <p className="text-[11px] text-indigo-50 font-light leading-relaxed">Bloqueo total sin residuos plásticos.</p>
                        </motion.div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-slate-50 p-8 border border-slate-100 rounded-sm flex flex-col justify-center"
                        >
                          <div className="text-[10px] uppercase tracking-widest font-bold text-indigo-800 mb-2">Impacto Urbano</div>
                          <p className="text-[13px] text-slate-500 font-light leading-relaxed italic">
                            "Transformamos edificios pasivos en infraestructuras resilientes y descarbonizadas."
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tech & Logic Section */}
              <section id="tecnología" className="py-12 bg-blue-50 text-slate-900 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 text-blue-300">
                  {/* Abstract pattern */}
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                     <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                       <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1"/>
                     </pattern>
                     <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                  <div className="space-y-8">
                    <h2 className="text-xl md:text-2xl font-sans font-bold text-slate-900 uppercase tracking-[0.2em] leading-tight">
                      Lógica de Funcionamiento <br /> <span className="text-slate-500 italic font-light lowercase">Magic glass PDLC</span>
                    </h2>
                    <div className="space-y-12">
                      <div className="flex gap-6">
                        <span className="text-indigo-900 font-sans font-bold text-3xl">01</span>
                        <div>
                          <h4 className="text-[15px] font-sans font-bold uppercase tracking-widest mb-3">Estado OFF: Opacidad</h4>
                          <p className="text-slate-600 font-light text-[13px] md:text-[14px] leading-relaxed">
                            Sin corriente eléctrica, las gotas de cristal líquido se dispersan aleatoriamente. 
                            La luz entra pero se difumina en todas direcciones, creando una superficie 
                            blanca que garantiza un espacio íntimo y protegido.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <span className="text-indigo-900 font-sans font-bold text-3xl">02</span>
                        <div>
                          <h4 className="text-[15px] font-sans font-bold uppercase tracking-widest mb-3">Estado ON: Transparencia</h4>
                          <p className="text-slate-600 font-light text-[13px] md:text-[14px] leading-relaxed">
                            Al aplicar un campo eléctrico, las moléculas se alinean instantáneamente. 
                            La luz atraviesa el material sin distorsión, permitiendo una visión 
                            nítida a través del cristal.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                     <div className="p-8 border border-white bg-white/40 backdrop-blur-sm rounded-sm shadow-sm">
                        <h5 className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-8">Especificaciones Técnicas</h5>
                        <ul className="space-y-6">
                          {[
                            "Tiempo de respuesta < 10ms",
                            "Bloqueo UV superior al 99%",
                            "Consumo energético mínimo (5W/m2)",
                            "Vida útil > 50,000 horas ON",
                            "Control vía Switch, Remoto o Domótica"
                          ].map((spec, i) => (
                            <li key={i} className="flex items-center space-x-3 text-sm text-slate-700 font-light">
                              <CheckCircle2 size={16} className="text-indigo-900" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                     </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contacto" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Contact Info */}
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <h2 className="text-xl md:text-2xl font-sans font-bold text-slate-900 uppercase tracking-[0.2em]">Hablemos de tu Proyecto</h2>
                        <p className="text-slate-500 font-light text-[13px] md:text-[14px] leading-relaxed max-w-xl">
                          Nuestro equipo de expertos está listo para asesorarte en la integración de PDLC en tus espacios. 
                          Garantizamos una instalación profesional y un acabado impecable.
                        </p>
                      </div>

                          {/* Contact Icons */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <a href="https://wa.me/56994443591" target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-white hover:bg-slate-50 hover:text-indigo-900 transition-all rounded-sm space-x-4 border border-slate-100 hover:border-indigo-100 group">
                              <MessageCircle size={24} strokeWidth={1} className="group-hover:scale-110 transition-transform" />
                              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-700">WhatsApp</span>
                            </a>
                        <a href="https://www.instagram.com/vidriointeligente/" target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-white hover:bg-slate-100 transition-colors rounded-sm space-x-4 border border-slate-100 group">
                          <Instagram size={24} strokeWidth={1} />
                          <span className="text-[10px] uppercase tracking-widest font-medium text-slate-700">Instagram</span>
                        </a>
                        <a href="mailto:leroyresidence@gmail.com" className="flex items-center p-6 bg-white hover:bg-slate-100 transition-colors rounded-sm space-x-4 border border-slate-100 group">
                          <Mail size={24} strokeWidth={1} />
                          <span className="text-[10px] uppercase tracking-widest font-medium text-slate-700">Email</span>
                        </a>
                        <a href="tel:+56994443591" className="flex items-center p-6 bg-white hover:bg-slate-100 transition-colors rounded-sm space-x-4 border border-slate-100 group text-left">
                          <Phone size={24} strokeWidth={1} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest font-medium text-slate-500 mb-0.5">Teléfono</span>
                            <span className="text-[11px] font-bold text-slate-900">+56 9 9444 3591</span>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div id="formulario-contacto" className="bg-white p-8 md:p-10 rounded-sm shadow-xl shadow-slate-200/50 border border-slate-100">
                      <h3 className="text-sm font-sans font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 border-b border-slate-100 pb-4">Dejar mis datos</h3>
                      <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        alert("Gracias por contactarnos. Te responderemos a la brevedad.");
                      }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Nombre Completo</label>
                            <input 
                              required
                              type="text" 
                              className="w-full bg-slate-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                              placeholder="Ej: Juan Pérez"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Correo Electrónico</label>
                            <input 
                              required
                              type="email" 
                              className="w-full bg-slate-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                              placeholder="juan@ejemplo.com"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Teléfono / WhatsApp</label>
                            <input 
                              required
                              type="tel" 
                              className="w-full bg-slate-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                              placeholder="+56 9 ..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Tipo de Proyecto</label>
                            <select className="w-full bg-slate-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer">
                              <option>Residencial</option>
                              <option>Oficina / Comercial</option>
                              <option>Salud / Clínica</option>
                              <option>Constructora / Arquitecto</option>
                              <option>Otro</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Mensaje / Requerimiento</label>
                          <textarea 
                            rows={4}
                            className="w-full bg-slate-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                            placeholder="Cuéntanos brevemente sobre tu proyecto..."
                          ></textarea>
                        </div>
                        <button 
                          type="submit"
                          className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-[10px] uppercase tracking-[0.3em] py-4 transition-all shadow-lg"
                        >
                          Enviar Solicitud
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>

              {/* Floating WhatsApp Button */}
              <motion.a
                href="https://wa.me/56994443591"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-colors"
                title="Contactar por WhatsApp"
              >
                <MessageCircle size={28} />
                <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-xl text-[12px] font-bold whitespace-nowrap opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 hidden md:block">
                  ¿En qué podemos ayudarte?
                </span>
              </motion.a>
            </main>

            <footer className="py-12 border-t border-slate-100 text-center">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center">
                <div className="text-sm font-sans tracking-[0.3em] uppercase font-bold text-slate-900">VIBB</div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
