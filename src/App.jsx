import React, { useState, useEffect, useRef } from 'react';
// Para las animaciones avanzadas, este código asume que 'framer-motion' está disponible.
// Es la librería estándar de la industria para animaciones complejas en React.
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// --- TIPOGRAFÍA (Cargada desde Google Fonts) ---
const FontLoader = () => {
    useEffect(() => {
        const head = document.head;
        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;700&display=swap";
        link.rel = "stylesheet";
        head.appendChild(link);
        return () => { head.removeChild(link); };
    }, []);
    return null;
};

// --- ÍCONOS ---
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.287.468-1.173 4.244 4.352-1.14z" />
    </svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className || "w-6 h-6 text-green-500 mr-3 flex-shrink-0"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);


// --- CURSORES PERSONALIZADOS ANIMADOS ---
const CursorMonedas = () => (
    <motion.svg width="64" height="64" viewBox="0 0 64 64" >
        {[0, 1, 2, 3].map(i => (
            <motion.circle key={i} cx="32" cy="48" r="12" fill="none" stroke="#FFD700" strokeWidth="2" initial={{ y: -15, opacity: 0 }} animate={{ y: [-15, -i * 8], opacity: 1, transition: { delay: i * 0.2 + 0.5, duration: 0.3, ease: "easeOut" } }} exit={{ y: -15, opacity: 0 }}>
                <animate attributeName="cy" values="48;40;48" dur="1.5s" begin={`${i*0.2}s`} repeatCount="indefinite"/>
            </motion.circle>
        ))}
    </motion.svg>
);
const CursorSemilla = () => (
    <motion.svg width="64" height="64" viewBox="0 0 64 64">
        <path d="M22 52 L 42 52 L 46 40 L 18 40 Z" fill="#8B4513" />
        <path d="M20 40 Q 32 36 44 40" fill="#5C4033" />
        <motion.path d="M32 40 C 32 40, 32 40, 32 40" stroke="#228B22" strokeWidth="2" fill="none" strokeLinecap="round" animate={{ d: ["M32 40 C 32 35, 32 35, 32 30", "M32 40 C 30 30, 34 20, 32 15", "M32 40 C 30 30, 34 20, 32 15", "M32 40 C 32 35, 32 35, 32 30", "M32 40 C 32 40, 32 40, 32 40"]}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}/>
    </motion.svg>
);
const CursorCasa = () => (
    <motion.svg width="64" height="64" viewBox="0 0 64 64">
        <motion.rect x="22" y="42" width="20" height="10" fill="#A0522D" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
        <motion.rect x="22" y="32" width="20" height="10" fill="#A0522D" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }} />
        <motion.rect x="22" y="22" width="20" height="10" fill="#A0522D" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.5 }} />
        <motion.path d="M20 22 L 32 12 L 44 22 Z" fill="#D2691E" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 3.0 }} />
        <motion.div animate={{ transition: { repeat: Infinity, duration: 4 } }} />
    </motion.svg>
);
const CursorPluma = () => (
    <motion.svg width="64" height="64" viewBox="0 0 64 64">
        <motion.path d="M20 44 Q 40 44, 44 20" stroke="#D1D5DB" strokeWidth="2.5" fill="none" strokeLinecap="round" initial={{ pathLength: 0, rotate: -15 }} animate={{ pathLength: 1, rotate: 0 }} transition={{ duration: 1, ease: "easeInOut" }}/>
        <motion.path d="M30 30 L 44 20" stroke="#D1D5DB" strokeWidth="1" fill="none" strokeLinecap="round" initial={{ pathLength: 0, rotate: -15 }} animate={{ pathLength: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}/>
        <motion.path d="M44 20 C 40 22, 38 25, 38 28" stroke="#D1D5DB" strokeWidth="1" fill="none" strokeLinecap="round" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}/>
        <motion.path d="M20 44 L 18 46" stroke="#FFD700" strokeWidth="3" fill="none" strokeLinecap="round" animate={{ pathLength: [0, 1, 0], transition: { duration: 1.5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}}/>
    </motion.svg>
);

const CustomCursor = ({ currentPage }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isIdle, setIsIdle] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const idleTimer = useRef(null);
    useEffect(() => {
        const mouseMove = e => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsIdle(false);
            clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => setIsIdle(true), 1000);
        };
        window.addEventListener("mousemove", mouseMove);
        const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });
        return () => {
            window.removeEventListener("mousemove", mouseMove);
            clearTimeout(idleTimer.current);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, [currentPage]);
    const variants = {
        default: { x: mousePosition.x - 8, y: mousePosition.y - 8, backgroundColor: "#FFD700", scale: 1 },
        idle: { x: mousePosition.x - 32, y: mousePosition.y - 32, backgroundColor: "transparent", scale: 1.2 },
        hover: { x: mousePosition.x - 16, y: mousePosition.y - 16, height: 32, width: 32, backgroundColor: "#fff", mixBlendMode: "difference" }
    };
    const getIdleCursor = () => {
        switch (currentPage) {
            case 'agroecologia': return <CursorSemilla />;
            case 'inmobiliaria': return <CursorCasa />;
            case 'historia': return <CursorPluma />;
            case 'home':
            default: return <CursorMonedas />;
        }
    };
    return (
        <motion.div className="fixed top-0 left-0 h-4 w-4 rounded-full pointer-events-none z-50" variants={variants} animate={isHovering ? "hover" : (isIdle ? "idle" : "default")} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
            {isIdle && !isHovering && getIdleCursor()}
        </motion.div>
    );
};

// --- COMPONENTES REUTILIZABLES ---
const Header = ({ setCurrentPage }) => {
  const navLinks = [
    { name: 'Inicio', page: 'home' },
    { name: 'Mi Historia', page: 'historia' },
    { name: 'Agroecología', page: 'agroecologia' },
    { name: 'Inmobiliaria', page: 'inmobiliaria' },
    { name: 'Servicios Web', page: 'servicios-web' },
    { name: 'Podcast', page: 'podcast' },
    { name: 'Asesorías', page: 'asesorias' },
    { name: 'Activos Digitales', page: 'activos-digitales' },
    { name: 'Estemos en Contacto', page: 'contacto' },
  ];
  return (
    <header className="bg-green-900 text-gray-200 sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4 gap-4">
        <motion.div className="text-xl font-serif cursor-pointer flex-shrink-0" onClick={() => setCurrentPage('home')} whileHover={{ scale: 1.05 }}>
          Estratega<span className="text-gold-400">.</span>
        </motion.div>
        <nav className="flex-1 min-w-0">
            <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1">
                {navLinks.map(link => (
                    <motion.button key={link.page} onClick={() => setCurrentPage(link.page)} className="hover:text-gold-300 transition-colors duration-300 whitespace-nowrap px-2 py-1 text-sm font-sans" whileHover={{ y: -2 }}>
                        {link.name}
                    </motion.button>
                ))}
            </div>
        </nav>
        <div className="flex-shrink-0 flex items-center gap-4">
            <motion.button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-300 whitespace-nowrap text-sm font-sans" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Iniciar Sesión
            </motion.button>
            <motion.button onClick={() => setCurrentPage('cart')} className="relative text-gray-200 hover:text-gold-300 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <CartIcon />
            </motion.button>
        </div>
      </div>
    </header>
  );
};

const PageLayout = ({ title, children, theme = 'light' }) => {
    const bgColor = theme === 'light' ? 'bg-cream' : 'bg-green-900';
    const titleColor = theme === 'light' ? 'text-dark-primary' : 'text-gold-200';
    const mainTextColor = theme === 'light' ? 'text-dark-secondary' : 'text-white';

    return (
        <main className={`${bgColor} ${mainTextColor} py-16 sm:py-20`}>
            <div className="container mx-auto px-4">
                <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className={`text-4xl md:text-5xl font-serif font-bold text-center mb-12 ${titleColor}`}>
                    {title}
                </motion.h1>
                {children}
            </div>
        </main>
    );
};


const PortalCard = ({ title, description, buttonText, onClick, isAnchor = false }) => {
    const x = useMotionValue(0); const y = useMotionValue(0);
    const mouseXSpring = useSpring(x); const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);
    const handleMouseMove = (e) => { const rect = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - rect.left) / rect.width - 0.5); y.set((e.clientY - rect.top) / rect.height - 0.5); };
    const handleMouseLeave = () => { x.set(0); y.set(0); };
    
    const content = (
        <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-md border border-gold-900 rounded-xl p-8 text-left shadow-lg relative h-full flex flex-col">
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="flex flex-col flex-grow">
                <h3 className="text-2xl font-serif text-white mb-4">{title}</h3>
                <p className="text-gray-300 mb-6 font-sans flex-grow">{description}</p>
                <motion.button onClick={onClick} className="bg-gold-500 hover:bg-gold-400 text-green-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300 font-sans mt-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} role="button" aria-label={`Ir a la sección ${title}`}>
                    {buttonText}
                </motion.button>
            </div>
        </motion.div>
    );

    if (isAnchor) {
        return <a href={onClick} className="block h-full">{content}</a>;
    }

    return content;
};

const ProductCard = ({ product, small = false }) => {
    return (
        <motion.div 
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col border border-gray-200"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"}}
        >
            <div className="relative pb-2/3">
                <img src={product.image} alt={product.title} className="absolute h-full w-full object-cover" />
            </div>
            <div className={`p-4 flex flex-col flex-grow`}>
                <h3 className={`${small ? 'text-base' : 'text-lg'} font-serif text-dark-primary mb-1`}>{product.title}</h3>
                <p className={`${small ? 'text-lg' : 'text-xl'} font-sans font-bold text-green-700 mb-2`}>{product.price}</p>
                <p className={`text-dark-secondary font-sans text-sm mb-4 flex-grow`}>{product.description}</p>
                <motion.button 
                    className="mt-auto w-full bg-gold-500 hover:bg-gold-400 text-green-900 font-bold py-2 px-3 text-sm rounded-lg transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Añadir al Carrito
                </motion.button>
            </div>
        </motion.div>
    );
};


const AnimatedGuideText = ({ show }) => {
    const text = "¿Primera vez aquí? Sigue explorando para conocer mi historia y mi filosofía.";
    const words = text.split(" ");
    const container = { hidden: { opacity: 0 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.08, delayChildren: i * 0.04 } }) };
    const child = { visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }, hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } } };
    if (!show) return null;
    return (
        <motion.div className="mt-16 text-lg text-gray-400 font-sans" variants={container} initial="hidden" animate="visible">
            {words.map((word, index) => ( <motion.span key={index} variants={child} style={{ marginRight: "5px" }}> {word} </motion.span> ))}
        </motion.div>
    );
};

const HistoriaInteractiva = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
    const hitos = [
        { valor: "$10.000", desc: "Activos digitales como mi libro." },
        { valor: "$1.000.000", desc: "Páginas web y servicios de diseño." },
        { valor: "$3.000.000", desc: "Comisiones por ventas inmobiliarias." },
        { valor: "$28.000.000", desc: "Ventas de parcelas propias desde cero." },
        { valor: "Resort", desc: "Mi meta final: un resort de bienestar en Lefincul." },
    ];
    return (
        <section ref={targetRef} className="py-20 px-4 bg-cream text-dark-primary">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">Mi historia: desde mi esfuerzo a mis logros.</h2>
                <p className="text-center text-green-700 mb-16 font-sans">¡Tú igual puedes!</p>
                <div className="relative">
                    <motion.div style={{ scaleY: scrollYProgress, transformOrigin: 'top' }} className="absolute left-1/2 top-0 w-1 bg-gold-400 h-full -ml-0.5" />
                    <div className="space-y-16">
                        {hitos.map((hito, index) => (
                            <motion.div key={index} className="flex items-center" initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                                <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                                    <h3 className="text-3xl font-bold text-dark-primary font-serif">{hito.valor}</h3>
                                    <p className="text-gray-600 font-sans">{hito.desc}</p>
                                </div>
                                <div className="w-12 h-12 bg-cream border-2 border-green-700 rounded-full flex-shrink-0 absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-green-700 rounded-full"></div>
                                </div>
                                <div className="w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ContactSection = () => (
    <section className="py-20 px-4 bg-green-900 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">¿Listo para diseñar tu próxima estrategia?</h2>
        <p className="text-xl text-gold-200 mb-8 font-sans">Contáctame y empecemos a construir tu abundancia.</p>
        <motion.a href="https://wa.me/56900000000?text=Hola,%20estoy%20interesado%20en%20diseñar%20una%20estrategia." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 text-lg shadow-xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <WhatsAppIcon />
            INICIAR CONVERSACIÓN ESTRATÉGICA
        </motion.a>
    </section>
);

const FaqItem = ({ q, a }) => (
    <motion.div 
        className="border-b border-gray-300 py-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
    >
        <h4 className="text-lg font-serif font-bold text-dark-primary mb-2">{q}</h4>
        <p className="text-dark-secondary font-sans">{a}</p>
    </motion.div>
);

// --- DATOS ---
const allProducts = [
    {
        id: 1,
        title: "Libro: 'Estrategia de Abundancia'",
        price: "$10.000 CLP",
        description: "Mi libro digital donde condenso mi filosofía y las estrategias prácticas que me han permitido construir valor.",
        image: "https://placehold.co/600x400/1a3c3c/FFD700?text=Libro",
        category: 'digital'
    },
    {
        id: 2,
        title: "Asesoría Estratégica 1 a 1",
        price: "$100.000 CLP",
        description: "Una sesión intensiva de 90 minutos para diagnosticar tu negocio, resolver trabas y diseñar un plan de acción.",
        image: "https://placehold.co/600x400/FBF8F1/1a3c3c?text=Asesoría",
        category: 'asesoria'
    },
    {
        id: 4,
        title: "Reserva Parcela 5000m2 Huichahue",
        price: "$250.000 CLP",
        description: "Asegura tu futuro en un entorno natural único. Reserva tu parcela en nuestro exclusivo condominio.",
        image: "https://placehold.co/600x400/1a3c3c/FFD700?text=Reserva+Huichahue",
        category: 'digital'
    },
    {
        id: 5,
        title: "Reserva Parcela 5000m2 Lefincul",
        price: "$500.000 CLP",
        description: "Invierte en un estilo de vida sustentable. Reserva tu espacio en nuestro proyecto agro-residencial.",
        image: "https://placehold.co/600x400/2E8555/FFFFFF?text=Reserva+Lefincul",
        category: 'digital'
    },
    {
        id: 6,
        title: "Tiempo Compartido Resort Lefincul",
        price: "$3.500.000 CLP",
        description: "Sé parte de nuestro exclusivo resort de bienestar. Adquiere tu tiempo compartido y asegura vacaciones de lujo.",
        image: "https://placehold.co/600x400/0c1a1a/FFEC99?text=Resort",
        category: 'digital'
    },
    {
        id: 7,
        title: "Página Informativa / Landing Page",
        price: "$300.000 CLP",
        description: "Sitio de una página para mostrar tu producto o servicio de manera atractiva y efectiva.",
        image: "https://placehold.co/600x400/1a3c3c/FFD700?text=Landing+Page",
        category: 'web'
    },
    {
        id: 8,
        title: "Tienda Online (E-commerce)",
        price: "$500.000 CLP",
        description: "Solución completa con carrito de compras para vender tus productos en línea de forma profesional.",
        image: "https://placehold.co/600x400/FBF8F1/1a3c3c?text=Tienda+Online",
        category: 'web'
    },
    {
        id: 9,
        title: "Aplicación Web a Medida",
        price: "$1.000.000 CLP",
        description: "Desarrollo avanzado con inicio de sesión, monetización y alta escalabilidad para tu negocio.",
        image: "https://placehold.co/600x400/0c1a1a/FFEC99?text=Web+App",
        category: 'web'
    }
];

// --- PÁGINAS COMPLETAS ---

const HomePage = ({ setCurrentPage }) => {
  const [showGuide, setShowGuide] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setShowGuide(true), 4000); return () => clearTimeout(timer); }, []);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none" poster="https://placehold.co/1920x1080/0c1a1a/FFFFFF?text=Cargando+Video..." src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" />
        <div className="absolute inset-0 bg-green-900 bg-opacity-60"></div>
        <div className="relative z-10 p-4">
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 leading-tight text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Más que una Página Web, una <span className="text-gold-300">Estrategia de Abundancia.</span>
          </motion.h1>
          <motion.p className="text-lg md:text-2xl max-w-4xl mx-auto text-gray-200 font-sans" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Soy un estratega de negocios que construye las plataformas que necesitas para materializar tus metas.
          </motion.p>
        </div>
      </section>
      <section className="py-20 px-4 bg-green-900 relative">
        <div className="container mx-auto text-center relative">
          <h2 className="text-4xl font-serif text-white mb-2">Elige tu Objetivo.</h2>
          <p className="text-xl mb-12 text-gold-200 font-sans">Aquí valoramos tu tiempo.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PortalCard title="Agroecología para Todos" description="Un proyecto para volver a la tierra. Aprende, participa y sé parte de una comunidad que cultiva un futuro sustentable en el corazón de los Andes." buttonText="Descubrir Visión Agroecológica" onClick={() => setCurrentPage('agroecologia')} />
            <PortalCard title="Proyectos Inmobiliarios" description="Invierte en activos reales con plusvalía garantizada. Descubre mis proyectos de parcelas en el corazón de Pucón, diseñados con una visión de futuro." buttonText="Ver Proyectos" onClick={() => setCurrentPage('inmobiliaria')} />
            <PortalCard title="Plataformas Web y Monetización" description="Tu negocio necesita un motor digital. Construyo la plataforma web que necesitas para posicionar tu marca, atraer clientes y generar ingresos." buttonText="Explorar Servicios Web" onClick={() => setCurrentPage('servicios-web')} />
            <PortalCard title="Podcast 'Alma de Estratega'" description="Escucha las estrategias y la mentalidad detrás de la creación de valor. Cada episodio es una lección práctica para forjar tu propia abundancia." buttonText="Escuchar Ahora" onClick={() => setCurrentPage('podcast')} />
            <PortalCard title="Estrategias y Asesorías Comerciales" description="Accede a mi experiencia como estratega. Sesiones 1 a 1 para resolver tus desafíos y diseñar un plan de crecimiento a tu medida." buttonText="Conocer Asesorías" onClick={() => setCurrentPage('asesorias')} />
            <PortalCard title="Creación y Venta de Activos Digitales" description="El conocimiento es el mejor activo. Adquiere mi libro y otras herramientas digitales para acelerar tu camino." buttonText="Descubrir el Libro y más" onClick={() => setCurrentPage('activos-digitales')} />
          </div>
          <AnimatedGuideText show={showGuide} />
        </div>
      </section>
      <HistoriaInteractiva />
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-dark-primary">Activos para tu Estrategia</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {allProducts.slice(0, 8).map(product => ( // Show a selection of products
                    <ProductCard key={product.id} product={product} small={true} />
                ))}
            </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
};

const HistoriaPage = () => (
    <PageLayout title="Si quieres hacer un buen negocio, tienes que conocer primero con quién estás haciendo negocios." theme="light">
        <div className="max-w-4xl mx-auto text-dark-secondary space-y-4 text-lg font-sans">
            <p>Mi filosofía es simple: la abundancia se construye, no aparece por arte de magia.</p>
            <p>Como Gestor Inmobiliario y empresario, mi camino no ha sido una línea recta. He navegado éxitos y también quiebras profundas. He aprendido que la verdadera estrategia no se mide solo en los millones que generas, sino en tu capacidad para levantarte cuando te lo quitan todo y seguir creando.</p>
            <p>Mi trayectoria es la prueba de mi método. He creado valor en todo el espectro: desde activos digitales como mi libro por $10.000, pasando por servicios de diseño y asesorías comerciales de $100.000, y páginas web desde $300.000 hasta $1.000.000. En el mundo inmobiliario, he generado comisiones por ventas para terceros desde $1 millón hasta $3 millones, y di el salto para crear mi propio negocio, generando ventas de parcelas propias desde $6 millones en blanco hasta $28 millones en verde, construyendo el 100% del valor desde cero, solo con pensamientos y estrategias.</p>
            <p>Ahora, mi visión sigue creciendo. Con más de 30 parcelas aún por vender en mi campo en Pucón —un terreno estratégicamente ubicado a solo 6 kilómetros de centros de alto flujo como Termas Pucón Indómito y Termas de Huife— mi meta final es la materialización de mi proyecto más grande: la construcción del primer resort de montaña en Lefincul. Un resort para el bienestar, diseñado para que cada visitante logre avanzar a su próximo mejor nivel: físico/motriz, mental/financiero y espiritual/en conexión a todo.</p>
            <p>Este es mi camino: superar constantemente mis propios límites para vivir mi filosofía, mientras ayudo a más personas a materializar sus propias metas y objetivos.</p>
        </div>
    </PageLayout>
);

const InmobiliariaPage = () => {
    const parallaxRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: parallaxRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const scrollToAnchor = (e, anchorId) => {
        e.preventDefault();
        document.getElementById(anchorId).scrollIntoView({
            behavior: 'smooth'
        });
    };
    
    const faqs = [
        {
            q: "Busco parcelas en Pucón, ¿tienen opciones?",
            a: "Sí, te encuentras en el lugar indicado. Nos especializamos en la venta de parcelas en Pucón y sus alrededores, ofreciendo proyectos exclusivos con alta plusvalía en entornos naturales únicos como Lefincul."
        },
        {
            q: "¿Tienen parcelas en venta en Cunco o cerca?",
            a: "Absolutamente. Contamos con proyectos de parcelas en venta a solo 15 km de Cunco, una zona de gran proyección y belleza en el sur de Chile. Son oportunidades de inversión con excelente potencial."
        },
        {
            q: "¿Dónde venden parcelas en el sur de Chile?",
            a: "Nuestra especialidad son las parcelas en el sur de Chile, con un enfoque en las zonas más cotizadas de la Araucanía como Pucón, Cunco y el lago Colico. Ofrecemos terrenos seleccionados estratégicamente para inversión y calidad de vida."
        },
        {
            q: "Busco comprar un terreno o parcela de 5000 m2.",
            a: "Perfecto. Todos nuestros proyectos ofrecen terrenos y parcelas de 5000 m2 (media hectárea), el tamaño ideal para construir tu proyecto de vida, ya sea para una residencia o como inversión a largo plazo."
        }
    ];

    return (
        <PageLayout title="Invirtiendo en Activos Reales, Creando Futuro" theme="light">
            <section className="mb-16">
                <p className="text-lg text-dark-secondary max-w-3xl mx-auto text-center font-sans">
                    "Mi trabajo en el mundo inmobiliario va más allá de una simple transacción. Lo veo como la creación de legados y la construcción de abundancia tangible. Cada proyecto que desarrollo está impregnado de una visión estratégica a largo plazo, buscando no solo la rentabilidad, sino también la plusvalía, la sustentabilidad y la conexión con el entorno único de Pucón. Aquí no compras un terreno, inviertes en un proyecto de vida."
                </p>
            </section>
            
            <section className="py-20 bg-green-900 -mx-4 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-12">Explora Nuestras Oportunidades de Inversión</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <PortalCard title="Venta en Verde en Lefincul" description="Parcelas exclusivas en un entorno natural privilegiado, ideal para construir tu futuro." buttonText="Ver Detalles" onClick={(e) => scrollToAnchor(e, 'lefincul-verde')} />
                        <PortalCard title="Resort del Bienestar" description="Invierte en tiempo compartido en nuestro próximo resort, un santuario de bienestar y conexión." buttonText="Saber Más" onClick={(e) => scrollToAnchor(e, 'resort-lefincul')} />
                        <PortalCard title="Venta en Verde cerca de Cunco" description="Oportunidades únicas de inversión en una zona con gran potencial de crecimiento." buttonText="Ver Detalles" onClick={(e) => scrollToAnchor(e, 'cunco-verde')} />
                        <PortalCard title="Vista al Lago Colico" description="Parcelas con rol propio y vistas espectaculares al lago. Una inversión segura y de alta plusvalía." buttonText="Saber Más" onClick={(e) => scrollToAnchor(e, 'colico-lago')} />
                    </div>
                </div>
            </section>

            <section id="lefincul-verde" className="py-20">
                <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">Mis Parcelas Venta en Verde en Lefincul</h3>
                <p className="text-center max-w-3xl mx-auto mb-8 font-sans">Contenido descriptivo, galería de fotos, mapa KMZ y un llamado a la acción para una página de nivel 3 irán aquí.</p>
            </section>

            <section id="resort-lefincul" className="py-20 bg-cream">
                <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">Tiempo Compartido: Resort del Bienestar en Lefincul</h3>
                <p className="text-center max-w-3xl mx-auto mb-8 font-sans">Contenido descriptivo, galería de fotos, mapa KMZ y un llamado a la acción para una página de nivel 3 irán aquí.</p>
            </section>
            
            <section id="cunco-verde" className="py-20">
                 <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">Parcelas Venta en Verde a 15 km de Cunco</h3>
                 <p className="text-center max-w-3xl mx-auto mb-8 font-sans">Contenido descriptivo, galería de fotos, mapa KMZ y un llamado a la acción para una página de nivel 3 irán aquí.</p>
            </section>

             <section id="colico-lago" className="py-20 bg-cream">
                 <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">Parcelas Venta rol listo con vista al lago Colico</h3>
                 <p className="text-center max-w-3xl mx-auto mb-8 font-sans">Contenido descriptivo, galería de fotos, mapa KMZ y un llamado a la acción para una página de nivel 3 irán aquí.</p>
            </section>
            
            <section className="bg-white mt-10 p-8 md:p-12 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">Preguntas Frecuentes sobre Inversión en Terrenos</h3>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </section>

            <section ref={parallaxRef} className="py-20 relative overflow-hidden mt-20">
                <motion.div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", y }}></motion.div>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="container mx-auto relative z-10">
                    <h2 className="text-4xl font-serif text-center mb-12 text-white">Tu Inversión, Paso a Paso</h2>
                    <div className="max-w-2xl mx-auto space-y-8">
                        {['Contacto y Asesoría', 'Visita en Terreno', 'Reserva', 'Proceso Legal y Firma', '¡Bienvenido!'].map((step, index) => (
                            <motion.div key={index} className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg flex items-center space-x-4" initial={{opacity:0, x: -30}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.5, delay: index * 0.1}} viewport={{once: true}}>
                                <div className="text-gold-300 font-bold text-3xl font-serif">{index + 1}</div>
                                <p className="text-white text-xl font-sans">{step}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

const AgroecologiaPage = () => {
    const videos = [
        { id: 'dQw4w9WgXcQ', title: 'Episodio 3: Cosechando Nuestros Primeros Frutos', description: 'Una mirada a los resultados de nuestro trabajo inicial.' },
        { id: '3tmd-ClpJxA', title: 'Episodio 2: Preparando la Tierra y el Compost', description: 'Los fundamentos de un suelo sano y productivo.' },
        { id: 'L_LUpnjgPso', title: 'Episodio 1: Introducción a la Agroecología', description: 'Comenzando el viaje: nuestra filosofía y metas.' },
    ];
    const galleryImages = [
        "https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/302873/pexels-photo-302873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/289377/pexels-photo-289377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/60013/wood-vegetables-chopping-board-cooking-60013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/257393/pexels-photo-257393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/217326/pexels-photo-217326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ];
    
    const faqs = [
        { q: "¿Cómo empezar un huerto agroecológico?", a: "Comienza con un buen diagnóstico de tu espacio y suelo. En nuestro canal de video 'Sembrando Conciencia' te mostramos el paso a paso, desde la preparación de la tierra y el compost hasta la siembra y cosecha." },
        { q: "¿Qué es la vida sustentable?", a: "Es un estilo de vida que busca reducir el impacto ambiental y vivir en armonía con la naturaleza. Nuestro proyecto en Lefincul es un ejemplo práctico de cómo aplicar principios de sustentabilidad y permacultura." },
        { q: "¿Dónde aprender sobre agroecología en Chile?", a: "Ofrecemos una plataforma de aprendizaje práctico. A través de nuestros videos, y próximamente talleres, puedes aprender directamente de nuestra experiencia construyendo un sistema autosuficiente en el sur de Chile." },
        { q: "Busco proyectos de permacultura en el sur de Chile.", a: "Nuestro campo en Pucón es un proyecto vivo de permacultura y agroecología. Te invitamos a seguir nuestros avances y a participar en futuras oportunidades de voluntariado e inversión para ser parte de esta comunidad." }
    ];

    return (
        <PageLayout title="Agroecología para Todos: Sembrando un Futuro Sustentable" theme="light">
            <section className="mb-16">
                <p className="text-lg text-dark-secondary max-w-3xl mx-auto text-center font-sans">
                    "La verdadera abundancia nace de la tierra. Este proyecto es mi compromiso personal y estratégico con un futuro más sustentable. No se trata solo de cultivar alimentos, sino de cultivar un ecosistema, de restaurar el equilibrio y de aprender a vivir en armonía con los ciclos de la naturaleza. Aquí comparto mi viaje práctico en la construcción de un sistema autosuficiente en el corazón de la montaña."
                </p>
            </section>

            <section className="py-16 bg-green-900 -mx-4 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-white">Mi Canal de Video: Sembrando Conciencia</h2>
                    <div className="mb-12">
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
                            <iframe src={`https://www.youtube.com/embed/${videos[0].id}`} title={videos[0].title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <h3 className="text-2xl font-serif text-gold-200 mt-4">{videos[0].title}</h3>
                        <p className="text-gray-300 font-sans">{videos[0].description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {videos.slice(1).map(video => (
                            <div key={video.id}>
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                                    <iframe src={`https://www.youtube.com/embed/${video.id}`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </div>
                                <h4 className="text-xl font-serif text-gold-300 mt-3">{video.title}</h4>
                                <p className="text-gray-400 font-sans text-sm">{video.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-dark-primary">El Proyecto en Imágenes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((src, index) => (
                        <motion.div key={index} className="overflow-hidden rounded-lg shadow-lg" whileHover={{ scale: 1.05, zIndex: 10 }} transition={{type: 'spring', stiffness: 300}}>
                            <img src={src} alt={`Galería del proyecto agroecológico ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        </motion.div>
                    ))}
                </div>
            </section>
            
            <section className="bg-white mt-10 p-8 md:p-12 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">Preguntas sobre Agroecología y Vida Sustentable</h3>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </section>

            <section className="text-center py-16">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-dark-primary">Oportunidades para Involucrarse</h2>
                <p className="text-lg text-dark-secondary max-w-3xl mx-auto font-sans">
                    Actualmente estamos sentando las bases del proyecto. Próximamente anunciaremos oportunidades para participar en talleres, voluntariado y otras formas de inversión. ¡Mantente atento!
                </p>
            </section>
        </PageLayout>
    );
};

const PodcastPage = () => {
    const episodios = [
        { id: '5qap5aO4i9A', title: 'Episodio 5: La Mentalidad del Inversor a Largo Plazo', description: 'Cómo pensar en décadas, no en días.', cta: 'Conoce mis proyectos de inversión' },
        { id: 'U_DA_K_M0gY', title: 'Episodio 4: De la Quiebra a la Creación de Valor', description: 'Lecciones aprendidas en los momentos más difíciles.', cta: 'Lee mi historia completa' },
        { id: '8_4fe1lqrHw', title: 'Episodio 3: Estrategias de Monetización Digital', description: 'Cómo transformar tu conocimiento en un activo.', cta: 'Descubre mis servicios web' },
        { id: 'ScMzIvxBSi4', title: 'Episodio 2: El Poder de un Buen Branding', description: 'Más allá de un logo: construyendo una marca con alma.', cta: 'Hablemos de tu marca' },
        { id: 'NlOF03DUoWc', title: 'Episodio 1: ¿Qué es una Estrategia de Abundancia?', description: 'La filosofía que guía cada uno de mis proyectos.', cta: 'Inicia tu estrategia' },
    ];
    
    const faqs = [
        { q: "¿Cuál es el mejor podcast de negocios en español?", a: "Si buscas estrategias reales y sin filtro, 'Alma de Estratega' es tu podcast. Aquí comparto mi bitácora personal de fracasos y victorias en el mundo del emprendimiento." },
        { q: "Busco un podcast sobre emprendimiento y estrategia.", a: "Has llegado al lugar indicado. Cada episodio de nuestro podcast es una lección práctica sobre la mentalidad y las tácticas necesarias para forjar tu propia abundancia." },
        { q: "¿Dónde puedo escuchar consejos de empresarios reales?", a: "En 'Alma de Estratega' encontrarás exactamente eso. Comparto mi viaje como empresario, desde la creación de activos digitales hasta grandes proyectos inmobiliarios, para que puedas aplicar las lecciones en tu propio camino." },
        { q: "Recomiéndenme un podcast para emprendedores en Chile.", a: "Nuestro podcast está hecho por y para emprendedores con una visión estratégica. Cubrimos temas de monetización, inversión y mentalidad, todo desde una perspectiva práctica y aplicable al mercado actual." }
    ];
    
    return (
        <PageLayout title="Podcast: La Bitácora del Creador de Abundancia" theme="light">
            <section className="mb-16">
                <p className="text-lg text-dark-secondary max-w-3xl mx-auto text-center font-sans">
                    "Bienvenido a mi bitácora personal. En este espacio comparto de forma directa y sin filtros las estrategias, mentalidades, fracasos y victorias que he acumulado en mi viaje como empresario. Cada episodio es una herramienta para que puedas aplicarla en tu propio campo de batalla. La abundancia no solo se crea, se comparte."
                </p>
            </section>

            <section className="mb-20">
                <h2 className="text-3xl font-serif text-center mb-8 text-dark-primary">Episodio Destacado</h2>
                <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-6">
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                        <iframe src={`https://www.youtube.com/embed/${episodios[0].id}`} title={episodios[0].title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-md"></iframe>
                    </div>
                    <h3 className="text-2xl font-serif text-dark-primary">{episodios[0].title}</h3>
                    <p className="text-dark-secondary mt-2 mb-4 font-sans">{episodios[0].description}</p>
                    <motion.button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 font-sans" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {episodios[0].cta}
                    </motion.button>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-serif text-center mb-12 text-dark-primary">Archivo de Episodios</h2>
                <div className="max-w-4xl mx-auto space-y-12">
                    {episodios.slice(1).map(ep => (
                        <motion.div key={ep.id} className="md:flex items-center gap-8" initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}}>
                            <div className="md:w-1/3 mb-4 md:mb-0">
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                                    <iframe src={`https://www.youtube.com/embed/${ep.id}`} title={ep.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <h3 className="text-xl font-serif text-dark-primary">{ep.title}</h3>
                                <p className="text-dark-secondary mt-1 mb-3 font-sans">{ep.description}</p>
                                <motion.button className="bg-gold-500 hover:bg-gold-400 text-green-900 font-bold py-2 px-3 rounded-lg text-sm transition-colors duration-300 font-sans" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    {ep.cta}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            
            <section className="bg-white mt-20 p-8 md:p-12 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">¿Buscas un Podcast de Negocios?</h3>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </section>
        </PageLayout>
    );
};

const WorkStepCard = ({ number, title, description }) => (
    <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} transition={{duration:0.5}} viewport={{once:true}} className="flex items-start space-x-6">
        <div className="flex-shrink-0 bg-green-700 text-gold-300 rounded-full h-16 w-16 flex items-center justify-center font-bold text-2xl border-2 border-gold-400 font-serif">
            {number}
        </div>
        <div>
            <h4 className="text-xl font-serif font-bold mb-2 text-dark-primary">{title}</h4>
            <p className="text-gray-700 font-sans">{description}</p>
        </div>
    </motion.div>
);

const ServiciosWebPage = () => {
    const services = [
        {
            title: "Páginas Informativas y Landing Pages",
            price: "$300.000 CLP",
            description: "La solución perfecta para presentar tu proyecto, producto o servicio con un diseño de alto impacto, enfocado en la conversión y la rapidez.",
            features: [
                "Creación de un sitio web de una sola página.",
                "Enfoque en un diseño tope de línea y carga rápida.",
                "SEO (Optimización para Motores de Búsqueda).",
                "Dominio gratis por un año (.cl o .com).",
                "Creación de cuenta con GitHub y Netlify para que seas dueño de tus archivos."
            ],
            note: "Importante sobre Netlify: Tu página se hospeda en Netlify, una empresa externa de servicios de servidor, con un plan gratuito. Si tu sitio web se hiciera viral y el tráfico superara el límite de ese plan, podrías perder una gran oportunidad de ganar dinero por las visualizaciones. Si deseas evitar este riesgo, puedes optar por nuestra 'casi aplicación web con sistema de monetización incluido' y pagar la diferencia en cuotas mensuales."
        },
        {
            title: "Tiendas Online",
            price: "$500.000 CLP",
            description: "Transforma tu negocio en una tienda virtual profesional, con todo lo necesario para gestionar tus productos, ventas y clientes.",
            features: [
                "Página web multi-sección para organizar tu tienda.",
                "Solución de comercio electrónico completa con carrito de compras.",
                "SEO (Optimización para Motores de Búsqueda).",
                "Dominio gratis por dos años (.cl o .com).",
                "Creación de cuenta con GitHub y Netlify."
            ],
            note: "Importante sobre Netlify: Tu página se hospeda en Netlify, una empresa externa de servicios de servidor, con un plan gratuito. Si tu sitio web se hiciera viral y el tráfico superara el límite de ese plan, podrías perder una gran oportunidad de ganar dinero por las visualizaciones. Si deseas evitar este riesgo, puedes optar por nuestra 'casi aplicación web con sistema de monetización incluido' y pagar la diferencia en cuotas mensuales."
        },
        {
            title: "Tu Propia Aplicación Web",
            price: "$1.000.000 CLP",
            description: "El siguiente nivel para tu negocio. Una plataforma robusta, escalable y con funcionalidades avanzadas para una experiencia de usuario única.",
            features: [
                "Una página web casi como tu propia aplicación web.",
                "Carrito de compras y venta en línea.",
                "Opción de inicio de sesión para clientes.",
                "Varias secciones y páginas.",
                "SEO avanzado y monetización de tu sitio.",
                "Dominio gratis por tres años (.cl o .com).",
                "Creación de cuenta con GitHub y Netlify."
            ],
            note: "Importante sobre Netlify: El uso de Netlify, una empresa externa de servicios de servidor, como servidor de alta escalabilidad es un gran beneficio de este plan. Esto te protege contra la pérdida de ingresos si tu sitio se hace viral. Netlify se encargará de gestionar el tráfico de forma automática para que tu negocio siga funcionando y puedas monetizar tu popularidad."
        }
    ];
    
    const faqs = [
        {
            q: "¿Quién hace páginas web?",
            a: "Nosotros. Somos estrategas y desarrolladores que construimos plataformas web profesionales. No solo diseñamos, creamos el motor digital para tu negocio."
        },
        {
            q: "¿Cómo hago mi página web?",
            a: "El proceso es más simple de lo que crees. Comienza con una idea y una estrategia. Nosotros te guiamos en cada paso, desde el concepto inicial hasta el lanzamiento."
        },
        {
            q: "¿Dónde hago mi página web?",
            a: "Estás en el lugar correcto. Aquí no solo obtienes un sitio web, sino una plataforma diseñada a medida para tus objetivos, con la tecnología y el soporte que necesitas para crecer."
        },
        {
            q: "Quiero hacer mi página web.",
            a: "¡Excelente decisión! Es el primer paso para potenciar tu marca. Explora nuestros planes o contáctanos directamente para comenzar a diseñar la estrategia digital que tu negocio merece."
        },
        {
            q: "¿Dónde compro la página web que quiero hacer?",
            a: "Más que una compra, es una inversión en tu futuro. Ofrecemos planes claros y un proceso transparente para que adquieras la plataforma web perfecta para tu visión, desde una landing page hasta una aplicación completa."
        }
    ];

    return (
        <PageLayout title="Plataformas Digitales para tu Crecimiento" theme="light">
            <p className="text-center max-w-3xl mx-auto text-lg text-dark-secondary mb-20 font-sans">
                Tu presencia digital es más que una simple página; es el motor de tu estrategia. Construyo plataformas web a medida que no solo se ven increíbles, sino que están diseñadas para atraer clientes, generar ingresos y posicionar tu marca.
            </p>

            <div className="space-y-16">
                {services.map((service, index) => (
                    <motion.section 
                        key={index} 
                        className="bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-200"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-serif text-dark-primary">{service.title}</h3>
                            <p className="text-4xl font-sans font-bold text-green-700 mt-2">{service.price}</p>
                            <p className="max-w-2xl mx-auto mt-4 text-dark-secondary">{service.description}</p>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto mb-8">
                            {service.features.map((feature, fIndex) => (
                                <li key={fIndex} className="flex items-center">
                                    <CheckIcon />
                                    <span className="font-sans text-dark-secondary">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-center text-xs text-gray-500 font-sans italic max-w-3xl mx-auto mt-6">{service.note}</p>
                    </motion.section>
                ))}
            </div>
            
            <motion.section 
                className="mt-20 text-center bg-green-900 text-white p-10 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                <h3 className="text-2xl font-serif text-gold-300 mb-2">¿Necesitas Actualizaciones?</h3>
                <p className="text-3xl font-sans font-bold mb-4">$100.000 CLP</p>
                <p className="max-w-2xl mx-auto text-gray-300 font-sans">
                    ¿Necesitas cambios? Haz una lista con todas las modificaciones o nuevo contenido que quieras agregar, y yo me encargo de implementarlos todos juntos en una sola actualización integral.
                </p>
            </motion.section>

            <section className="bg-white mt-20 p-8 md:p-12 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">Cómo nos encuentran nuestros clientes</h3>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </section>

            <section className="bg-cream py-20 -mx-4 px-4 mt-10">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-dark-primary">Mi Proceso de Trabajo para Crear tu Mejor Web</h3>
                <div className="max-w-3xl mx-auto space-y-8">
                    <WorkStepCard number="1" title="Activación y Briefing" description="Para dar inicio a tu proyecto, se comienza con un pago inicial del 30%. Una vez confirmado, recibirás un correo de bienvenida con un link a un cuestionario detallado. Tus respuestas serán la base para construir una web que refleje tu visión." />
                    <WorkStepCard number="2" title="Agendamos Nuestra Primera Reunión" description="En el mismo correo, encontrarás un enlace para que reserves directamente una videollamada conmigo. En esta reunión, te presentaré el primer boceto de tu página web, creado a partir de la información que nos entregaste." />
                    <WorkStepCard number="3" title="Revisión y Feedback en Vivo" description="Durante nuestra videollamada, revisaremos juntos el boceto inicial. Tomaré nota de todos los cambios, ajustes e ideas nuevas que quieras implementar para asegurarme de que el diseño vaya en la dirección correcta." />
                    <WorkStepCard number="4" title="Ajustes Finales y Entrega" description="Después de nuestra reunión, realizaré todas las correcciones discutidas y subiré la nueva versión del boceto. A partir de esa entrega, dispondrás de un período de 5 días hábiles para una última revisión. Si tienes alguna corrección final, solo necesitas enviármela de manera ordenada en un solo correo para realizar el ajuste definitivo." />
                </div>
            </section>
        </PageLayout>
    );
};


const AsesoriasPage = () => {
    const faqs = [
        { q: "¿Necesito una asesoría para mi negocio?", a: "Si sientes que tu negocio está estancado, enfrentas un desafío que no sabes cómo resolver o simplemente quieres una perspectiva externa y estratégica, una asesoría es la mejor inversión que puedes hacer." },
        { q: "¿Cómo contratar un asesor o consultor comercial?", a: "El proceso es directo. Contáctanos para agendar una sesión 1 a 1. En esta primera reunión, diagnosticaremos tus necesidades y diseñaremos un plan de crecimiento a medida para tu empresa." },
        { q: "Busco sesiones de estrategia para emprendedores.", a: "Ofrecemos precisamente eso. Sesiones de estrategia enfocadas en resolver problemas reales, optimizar tus operaciones y alinear tu negocio con tus metas de abundancia." },
        { q: "¿Qué es una consultoría de negocios en Chile?", a: "Es un servicio donde un experto con experiencia probada, como yo, analiza tu negocio y te entrega un plan de acción claro y ejecutable, adaptado al mercado chileno, para que alcances tu máximo potencial." }
    ];
    const aresoriaProduct = allProducts.find(p => p.category === 'asesoria');

    return (
        <PageLayout title="Estrategias y Asesorías Comerciales" theme="light">
            <p className="text-center max-w-3xl mx-auto text-lg text-dark-secondary mb-16 font-sans">
                A veces, la visión de un estratega externo es todo lo que necesitas para desbloquear el siguiente nivel de tu negocio. Pongo a tu disposición mis años de experiencia en el campo de batalla empresarial a través de sesiones 1 a 1, diseñadas para darte claridad, dirección y un plan de acción concreto.
            </p>
            
            <div className="max-w-md mx-auto mb-16">
                <ProductCard product={aresoriaProduct} />
            </div>

            <section className="bg-white mt-10 p-8 md:p-12 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">¿Necesitas un Estratega para tu Negocio?</h3>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </section>
        </PageLayout>
    );
};

const ActivosDigitalesPage = () => {
    const faqs = [
        { q: "¿Qué son los activos digitales?", a: "Son productos de conocimiento y herramientas que no existen físicamente pero que tienen un valor inmenso. Mi libro 'Estrategia de Abundancia' es un ejemplo: conocimiento empaquetado que puedes adquirir y usar para acelerar tu crecimiento." },
        { q: "¿Cómo puedo comprar un libro digital o ebook?", a: "Es muy fácil. En esta sección, puedes añadir el libro a tu carrito y procesar la compra de forma segura. Recibirás el acceso para descargarlo inmediatamente." },
        { q: "Busco libros sobre estrategia de negocios y abundancia.", a: "Mi libro 'Estrategia de Abundancia' condensa mi filosofía y las lecciones prácticas que he aprendido construyendo negocios desde cero. Es la herramienta perfecta si buscas un enfoque estratégico y probado." },
        { q: "¿Venden herramientas para emprendedores?", a: "Sí. Además de mi libro, constantemente estoy desarrollando nuevas herramientas digitales, como plantillas y guías, diseñadas para que los emprendedores puedan aplicar mis estrategias de forma rápida y efectiva." }
    ];
    const digitalProducts = allProducts.filter(p => p.category === 'digital');

    return (
        <PageLayout title="Creación y Venta de Activos Digitales" theme="light">
            <p className="text-center max-w-3xl mx-auto text-lg text-dark-secondary mb-16 font-sans">
                El conocimiento, cuando se estructura y se empaqueta, se convierte en uno de los activos más poderosos. Aquí encontrarás mis productos digitales: libros, guías y herramientas diseñadas para darte una ventaja estratégica y acelerar tu camino hacia la abundancia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {digitalProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

             <section className="bg-white mt-10 p-8 md:p-12 rounded-lg shadow-xl border border-gray-200">
                <h3 className="text-3xl font-serif text-center mb-8 text-dark-primary">Invierte en Conocimiento Estratégico</h3>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </section>
        </PageLayout>
    );
};

const ContactoPage = () => (
    <PageLayout title="Estemos en Contacto">
        <ContactSection />
    </PageLayout>
);

const CartPage = ({ setCurrentPage }) => (
    <PageLayout title="Carrito de Compras" theme="light">
        <div className="text-center">
            <p className="text-lg text-dark-secondary font-sans mb-8">Tu carrito está actualmente vacío.</p>
            <motion.button 
                onClick={() => setCurrentPage('home')}
                className="bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 font-sans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Seguir Explorando
            </motion.button>
        </div>
    </PageLayout>
);


// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const pageVariants = { initial: { opacity: 0 }, in: { opacity: 1 }, out: { opacity: 0 } };
  const pageTransition = { type: "tween", ease: "anticipate", duration: 0.6 };

  const renderPage = () => {
    let pageComponent;
    switch (currentPage) {
      case 'home': pageComponent = <HomePage setCurrentPage={setCurrentPage} />; break;
      case 'historia': pageComponent = <HistoriaPage />; break;
      case 'inmobiliaria': pageComponent = <InmobiliariaPage />; break;
      case 'agroecologia': pageComponent = <AgroecologiaPage />; break;
      case 'servicios-web': pageComponent = <ServiciosWebPage />; break;
      case 'podcast': pageComponent = <PodcastPage />; break;
      case 'asesorias': pageComponent = <AsesoriasPage />; break;
      case 'activos-digitales': pageComponent = <ActivosDigitalesPage />; break;
      case 'contacto': pageComponent = <ContactoPage />; break;
      case 'cart': pageComponent = <CartPage setCurrentPage={setCurrentPage} />; break;
      default: pageComponent = <HomePage setCurrentPage={setCurrentPage} />;
    }
    return (
        <motion.div key={currentPage} initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            {pageComponent}
        </motion.div>
    );
  };

  return (
    <div className="bg-cream font-sans" style={{ cursor: 'none' }}>
        
        <FontLoader />
        <CustomCursor currentPage={currentPage} />
        <Header setCurrentPage={setCurrentPage} />
        <AnimatePresence mode="wait">
            {renderPage()}
        </AnimatePresence>
    </div>
  );
}
