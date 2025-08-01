import React, { useState, useEffect, useRef } from 'react';
// Importamos solo lo necesario de 'framer-motion' para evitar advertencias de variables no utilizadas.
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

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

const CheckIcon = ({ className }) => {
  // La prop className se aplica directamente al componente donde se usa.
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
  );
};

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);


// --- CURSOR DE MONEDAS DE ORO REALISTAS QUE CAEN PLANAS Y SE APILAN ---
const GoldCoinCursor = () => {
    const coinWidth = 20; // Ancho de la moneda
    const coinHeight = 8; // Altura de la moneda (para efecto 3D aplanado)
    const stackOverlap = 1; // Cuánto se superponen las monedas en la pila (más pequeño para que se vean apiladas)
    const initialStackSize = 5; // Número de monedas visibles en la pila inicial
    const numFallingCoins = 5; // Número de monedas que caen en secuencia

    // Calcula la altura total de la pila visible (base de la pila)
    const stackBaseY = (initialStackSize - 1) * stackOverlap + coinHeight / 2;

    return (
        <motion.div
            className="relative"
            // Ajustar altura del contenedor para que las monedas caídas no lo desborden
            style={{ width: coinWidth, height: stackBaseY + coinWidth + (numFallingCoins * stackOverlap) }} 
        >
            {/* Definiciones de gradiente y filtro de sombra para las monedas */}
            <svg width="0" height="0">
                <defs>
                    <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#FFD700" /> {/* Oro brillante */}
                        <stop offset="50%" stopColor="#DAA520" /> {/* Tono medio de oro */}
                        <stop offset="100%" stopColor="#B8860B" /> {/* Oro oscuro */}
                    </radialGradient>
                    <filter id="coinShadow">
                        <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.5"/>
                    </filter>
                </defs>
            </svg>

            {/* Pila de monedas estáticas inicial */}
            {[...Array(initialStackSize)].map((_, i) => (
                <svg key={`stack-${i}`} className="absolute" style={{ top: i * stackOverlap, left: 0 }} width={coinWidth} height={coinHeight}>
                    <ellipse cx={coinWidth / 2} cy={coinHeight / 2} rx={coinWidth / 2} ry={coinHeight / 2} fill="url(#goldGradient)" filter="url(#coinShadow)" />
                </svg>
            ))}

            {/* Monedas animadas cayendo planas */}
            {[...Array(numFallingCoins)].map((_, i) => (
                <motion.svg
                    key={`falling-coin-${i}`}
                    className="absolute"
                    style={{ left: 0, transformOrigin: 'center center' }} // Asegura la rotación desde el centro
                    width={coinWidth}
                    height={coinHeight}
                    initial={{ y: -coinWidth * 2, opacity: 0, rotateX: 0, scale: 0.8 }} // Inicia arriba, transparente, sin rotación
                    animate={{
                        // Cae hasta la posición de la pila + el índice de la moneda, simulando apilamiento
                        y: [ -coinWidth * 2, stackBaseY + (i * stackOverlap) ], 
                        opacity: [0, 1, 1], // Aparece y se mantiene visible
                        rotateX: [0, 90, 90], // Rota para caer plana
                        transition: {
                            delay: i * 0.3, // Retraso para que caigan en secuencia (más rápido)
                            duration: 0.8, // Duración de la caída (más rápido)
                            ease: ["easeIn", "linear", "easeOut"], // Aceleración, lineal, desaceleración
                            repeat: Infinity, // Repite infinitamente
                            repeatDelay: numFallingCoins * 0.3 // Retraso antes de que la secuencia se repita
                        }
                    }}
                >
                    <ellipse cx={coinWidth / 2} cy={coinHeight / 2} rx={coinWidth / 2} ry={coinHeight / 2} fill="url(#goldGradient)" filter="url(#coinShadow)" />
                </motion.svg>
            ))}
        </motion.div>
    );
};


// --- COMPONENTE PRINCIPAL DEL CURSOR ---
const CustomCursor = ({ currentPage }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const idleTimer = useRef(null); // Se mantiene por si se desea añadir lógica de inactividad o hover en el futuro.

    useEffect(() => {
        const mouseMove = e => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => { /* Lógica de inactividad si se necesita */ }, 1000); 
        };
        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            clearTimeout(idleTimer.current);
        };
    }, []); 

    // Renderiza el GoldCoinCursor en la posición del ratón
    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50"
            // Ajuste para centrar el cursor ligeramente sobre el punto del ratón
            style={{ x: mousePosition.x - (20 / 2), y: mousePosition.y - (20 / 2) }} 
        >
            <GoldCoinCursor />
        </motion.div>
    );
};


// --- COMPONENTES REUTILIZABLES ---
const Header = ({ setCurrentPage }) => {
  const navLinks = [
    { name: 'Inicio', page: 'home' },
    // Removed 'Mi Historia' tab
    { name: 'Agroecología', page: 'agroecologia' },
    { name: 'Inmobiliaria', page: 'inmobiliaria' },
    { name: 'Servicios Web', page: 'servicios-web' },
    { name: 'Podcast', page: 'podcast' },
    { name: 'Asesorías', page: 'asesorias' },
    { name: 'Activos Digitales', page: 'activos-digitales' },
    { name: 'Tiempo Compartido', page: 'tiempo-compartido' }, // Added new 'Tiempo Compartido' tab
    { name: 'En Contacto', page: 'contacto' }, // Shortened name here
  ];
  return (
    <header className="bg-green-900/90 backdrop-blur-sm text-gray-200 sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4 gap-4">
        <motion.div className="text-xl font-serif cursor-pointer flex-shrink-0 text-white" onClick={() => setCurrentPage('home')} whileHover={{ scale: 1.05 }}>
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
                Iniciador de Sesión
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

const GatewayCard = ({ title, description, videoId, onClick }) => {
    return (
        <motion.div 
            className="bg-green-800 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row group" // Reverted to green background
            whileHover={{ boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
        >
            <div className="md:w-1/2 w-full h-full"> {/* h-full to make it fill vertical space */}
                <iframe 
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`}
                    title={title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full object-cover" // Video fills its parent's height and width
                ></iframe>
            </div>
            <div className="md:w-1/2 w-full p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{title}</h3> {/* Changed text color to white */}
                <p className="font-sans text-gray-300 mb-4 flex-grow">{description}</p> 
                <button 
                    onClick={onClick}
                    className="mt-auto w-full bg-gold-300 hover:bg-gold-400 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center group border-2 border-gold-400" // Changed text color to white
                >
                    Explorar
                    <ArrowRightIcon />
                </button>
            </div>
        </motion.div>
    );
};

// New component to wrap GatewayCard and handle subtitle animation
const HoverableGatewayCard = ({ title, description, videoId, onClick, subtitle }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex flex-col items-center"
        >
            <GatewayCard 
                title={title} 
                description={description} 
                videoId={videoId} 
                onClick={onClick} 
            />
            <AnimatePresence>
                {isHovered && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-gray-200 text-center mt-2 max-w-md" 
                        style={{ textShadow: '0 0 8px #FFD700' }} // Golden glow effect
                    >
                        {subtitle}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
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


// Eliminado AnimatedGuideText y su lógica relacionada ya que no se utiliza.
/*
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
*/

const HistoriaInteractiva = ({ setCurrentPage }) => { // Receive setCurrentPage as prop
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
    const hitos = [
        { valor: "$1.000 - Tu primera guia visual informativa.", desc: "Aprende a crear tu primer producto de solo mil pesos o un dolar, aca tienes mi guia por mil pesos o un dolar para ordenar tu tiempo y y aprender a apalancarte para lograr producir mas con menos! Si leiste bien! Hacer mas abundancia con menos recursos! comprala ya e invierte solo una luca o un dolar en comenzar tu viaje hacia tu mejor version de ti mismo!" },
        { valor: "$10.000 - Tu primer Libro Digital", desc: "Puedes partir desde 100 CLP en adelante, yo preferi comenzar con un producto que pueda vender en 10.000 CLP y para hacerlo recopile varias experiencias de vida en mi Libro 'ALMA DE EMPRENDEDOR' para compartir mi historia de resiliencia, de superacion personal y de exito comercial." },
        { valor: "$100.000 - Tu Primer Servicio diferenciador", desc: "Continuando con esta regla de oro, dispuse a la venta mis asesorías comerciales personalizadas por 100.000 CLP en 90 minutos de trabajo, personalizando tu estrategia comercial por videollamada." },
        { valor: "$1.000.000 - Tu primera Comision o trabajo Grande", desc: "Después logré crear el área de ventas de mis páginas y/o aplicaciones web, con precios desde 300.000 CLP hasta 1.000.000 CLP y varios millones más dependiendo de la complejidad de la app web." },
        { valor: "Tiempo compartido [2030-2042 venta en verde]", desc: "Igual tengo en venta en verde el tiempo compartido en el resort tu proximo nivel que construire en mi campo de montaña en Huife, Pucón y lo estoy vendiendo en 3.500.000 CLP. Mi meta final: un resort de bienestar en Lefincul.", page: 'tiempo-compartido' }, // Added page property
        { valor: "$10.000.000 - Tu primer sueño cumplido", desc: "He vendido parcelas de 5000m2 de otros dueños sobre los 10.000.000 CLP, generando ganancias significativas en comisiones." },
        { valor: "$28.000.000", desc: "Ademas tengo parcelas mias en mi campo donde construire mi resort tu proximo nivel, parcelas de 5000m2 en 28 millones venta en verde, las que costaran 88 millones al estar todo listo." },
        { valor: "$100.000.000 - Tu Primer gran Negocio", desc: "Aunque una vez vendi un producto de mas de 100.000.000 pero me estafaron y no me cumplieron y perdi y sufri mucho por eso jaja pero bueno otra historia que puedes leer comprando mi libro por $10.000 ;)"}
    ];
    return (
        <section ref={targetRef} className="py-20 px-4 bg-cream text-dark-primary">
            <div className="container mx-auto max-w-4xl">
                {/* Nuevo título para la sección de historia en la landing page, sin negrita y con subrayado dorado */}
                <h3 className="text-xl md:text-2xl font-serif text-center mb-4 text-dark-primary"> {/* Reduced font size here */}
                    Genera un buen vivir lleno de abundancia con mi regla: <br/> <span className="underline" style={{textDecorationColor: '#FFD700'}}>"La abundancia como un conjunto integral"</span>
                </h3>
                {/* Texto descriptivo debajo del título */}
                <p className="text-lg text-dark-secondary text-center mb-16 font-sans">
                    Cuando colocas la abundancia como un eje central, empezaras a mejorarte a ti mismo y asi podras alcanzar a vibrar hacia tu mejor proximo nivel para de verdad serlo. y bueno lo primero, primero, si necesitas generar mas dinero para existir como quieres o debes, debieses ir creando tu primer activo digital para comenzar a venderlo y asi poder ir escalando en mi metodo de 8 productos ganadores a los que les vas incrementando un cero por cada nuevo producto!
                </p>
                <div className="relative">
                    <motion.div style={{ scaleY: scrollYProgress, transformOrigin: 'top' }} className="absolute left-1/2 top-0 w-1 bg-gold-400 h-full -ml-0.5" />
                    <div className="space-y-16">
                        {hitos.map((hito, index) => (
                            <motion.div 
                                key={index} 
                                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} ${hito.page ? 'cursor-pointer' : ''}`} // Add cursor-pointer conditionally
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                onClick={() => hito.page && setCurrentPage(hito.page)} // Add onClick handler
                            >
                                <div className={`w-full md:w-1/2 p-4 rounded-lg shadow-lg bg-white ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                    <h3 className="text-xl font-bold text-dark-primary font-serif mb-2">{hito.valor}</h3> {/* Reduced font size here */}
                                    <p className="text-dark-secondary font-sans">{hito.desc}</p>
                                </div>
                                <div className={`w-12 h-12 bg-cream border-2 border-green-700 rounded-full flex-shrink-0 absolute left-1/2 -translate-x-1/2 flex items-center justify-center`}>
                                    <div className="w-4 h-4 bg-green-700 rounded-full"></div>
                                </div>
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
        className="border-b border-gray-200 py-4"
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
        image: "https://placehold.co/600x400/0B2027/FFFFFF?text=Libro",
        category: 'digital'
    },
    {
        id: 2,
        title: "Asesoría Estratégica 1 a 1",
        price: "$100.000 CLP",
        description: "Una sesión intensiva de 90 minutos para diagnosticar tu negocio, resolver trabas y diseñar un plan de acción.",
        image: "https://placehold.co/600x400/FFFFFF/0B2027?text=Asesoría",
        category: 'asesoria'
    },
    {
        id: 4,
        title: "Reserva Parcela 5000m2 Huichahue",
        price: "$250.000 CLP",
        description: "Asegura tu futuro en un entorno natural único. Reserva tu parcela en nuestro exclusivo condominio.",
        image: "https://placehold.co/600x400/2E8B57/FFFFFF?text=Reserva+Huichahue",
        category: 'digital'
    },
    {
        id: 5,
        title: "Reserva Parcela 5000m2 Lefincul",
        price: "$500.000 CLP",
        description: "Invierte en un estilo de vida sustentable. Reserva tu espacio en nuestro proyecto agro-residencial.",
        image: "https://placehold.co/600x400/2E8B57/FFFFFF?text=Reserva+Lefincul",
        category: 'digital'
    },
    {
        id: 6,
        title: "Tiempo Compartido Resort Lefincul",
        price: "$3.500.000 CLP",
        description: "Sé parte de nuestro exclusivo resort de bienestar. Adquiere tu tiempo compartido y asegura vacaciones de lujo.",
        image: "https://placehold.co/600x400/0B2027/D4AF37?text=Resort",
        category: 'digital'
    },
    {
        id: 7,
        title: "Página Informativa / Landing Page",
        price: "$300.000 CLP",
        description: "Sitio de una página para mostrar tu producto o servicio de manera atractiva y efectiva.",
        image: "https://placehold.co/600x400/0B2027/FFFFFF?text=Landing+Page",
        category: 'web'
    },
    {
        id: 8,
        title: "Tienda Online (E-commerce)",
        price: "$500.000 CLP",
        description: "Solución completa con carrito de compras para vender tus productos en línea de forma profesional.",
        image: "https://placehold.co/600x400/FFFFFF/0B2027?text=Tienda+Online",
        category: 'web'
    },
    {
        id: 9,
        title: "Aplicación Web a Medida",
        price: "$1.000.000 CLP",
        description: "Desarrollo avanzado con inicio de sesión, monetización y alta escalabilidad para tu negocio.",
        image: "https://placehold.co/600x400/0B2027/D4AF37?text=Web+App",
        category: 'web'
    }
];

// --- PÁGINAS COMPLETAS ---

const HomePage = ({ setCurrentPage }) => {
  // Eliminado showGuide y su lógica relacionada ya que AnimatedGuideText no se usa.
  // const [showGuide, setShowGuide] = useState(false);
  // useEffect(() => { const timer = setTimeout(() => setShowGuide(true), 4000); return () => clearTimeout(timer); }, []);

  const gateways = [
    {
        title: "Agroecología para Todos",
        subtitle: "Aprende a ser sustentable y agroecológico con mi área dedicada.",
        description: "Vuelve a la tierra y cultiva un futuro sustentable.",
        page: 'agroecologia',
        videoId: 'b_t0wK-l_lQ' // Video ID genérico y funcional
    },
    {
        title: "Proyectos Inmobiliarios",
        subtitle: "Avanza en tus inversiones con la sección inmobiliaria, diseñada para ti.",
        description: "Invierte en activos reales con plusvalía garantizada.",
        page: 'inmobiliaria',
        videoId: 'b_t0wK-l_lQ' // Video ID genérico y funcional
    },
    {
        title: "Plataformas Web",
        subtitle: "Construye tu motor digital y potencia tu negocio con soluciones web a medida.",
        description: "Construyo el motor digital que tu negocio necesita.",
        page: 'servicios-web',
        videoId: 'b_t0wK-l_lQ' // Video ID genérico y funcional
    },
    {
        title: "Podcast 'Alma de Estratega'",
        subtitle: "Escucha lecciones prácticas para forjar tu propia abundancia en mi podcast.",
        description: "Lecciones prácticas para forjar tu propia abundancia.",
        page: 'podcast',
        videoId: 'b_t0wK-l_lQ' // Video ID genérico y funcional
    },
    {
        title: "Asesorías Comerciales",
        subtitle: "Accede a mi experiencia para diseñar tu plan de crecimiento personalizado.",
        description: "Accede a mi experiencia para diseñar tu plan de crecimiento.",
        page: 'asesorias',
        videoId: 'b_t0wK-l_lQ' // Video ID genérico y funcional
    },
    {
        title: "Activos Digitales",
        subtitle: "Adquiere mi libro y herramientas digitales para acelerar tu camino.",
        description: "Adquiere mi libro y herramientas para acelerar tu camino.",
        page: 'activos-digitales',
        videoId: 'b_t0wK-l_lQ' // Video ID genérico y funcional
    },
    {
        title: "Tiempo Compartido", // Title for the new card
        subtitle: "Invierte en tu bienestar futuro y alcanza tu próxima versión en nuestro resort de tiempo compartido.", // Updated subtitle for the new card
        description: "Sé parte de nuestro exclusivo resort de bienestar. Adquiere tu tiempo compartido y asegura vacaciones de lujo.",
        page: 'tiempo-compartido',
        videoId: 'b_t0wK-l_lQ' // Video ID genérico y funcional
    },
    {
        title: "En Contacto",
        subtitle: "Conoce mi gestión como Presidente de nuestro Club Deportivo Social y Cultural 'La Gran Familia' en Pucón.",
        description: "Ponte en contacto para saber más sobre mi trabajo comunitario y cómo puedes unirte.",
        page: 'contacto',
        videoId: 'b_t0wK-l_lQ' // Video ID genérico y funcional
    },
  ];

  return (
    <>
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none" poster="https://placehold.co/1920x1080/0c1a1a/FFFFFF?text=Cargando+Video..." src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" />
        <div className="absolute inset-0 bg-green-900 bg-opacity-70"></div>
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 leading-tight text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Bienvenido a mi mundo.
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-gray-200 font-sans" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Bienvenido a aprender, a crecer, a comprar, y a mejorar en tus negocios, en tus productos digitales, en un estilo de vida agroecológico y sustentable y ¿por qué no? ¡en tu vida! Te entrego mi conocimiento por un mundo mejor. Soy Cristobal Hernandez, y en mi web está tu próximo punto de partida.
          </motion.p>
        </div>
      </section>
      <section className="py-20 px-4 bg-green-900 relative">
        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-serif text-white mb-4">Elige tu Objetivo</h2>
            {/* Div con fondo de papiro */}
            <div 
                className="p-6 rounded-lg my-8" 
                style={{ 
                    backgroundImage: "url('papiro libre.jpg')", // Usando la imagen de papiro
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
            >
                <p className="text-lg font-sans leading-relaxed text-yellow-500">
                  Elige tu Objetivo bien porque una sola decisión puede modificar toda tu línea de tiempo. ¿Quieres ser millonario? ¿Quieres ser mejor? O ¿quiere perder tu tiempo todos los días y perder los mejores años que aún tienes a tu disposición? Mejor será si quieres valorar tu tiempo y así lograr invertir en conseguir todos tus objetivos. ¡Estas son las diferencias del coste de oportunidad, y son diferencias que valen oro y más aún que valen vida!
                </p>
            </div>
             <p className="text-2xl text-white font-serif mt-8">
                ¡Ahora tú eliges!
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {gateways.map((gateway) => (
                <HoverableGatewayCard 
                    key={gateway.page}
                    title={gateway.title}
                    description={gateway.description}
                    videoId={gateway.videoId}
                    onClick={() => setCurrentPage(gateway.page)}
                    subtitle={gateway.subtitle} 
                />
            ))}
          </div>
        </div>
      </section>
      <HistoriaInteractiva setCurrentPage={setCurrentPage} /> {/* Pass setCurrentPage to HistoriaInteractiva */}
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

const TiempoCompartidoPage = () => (
    <PageLayout title="Tiempo Compartido: Tu Inversión en Bienestar" theme="light">
        <div className="max-w-4xl mx-auto text-dark-secondary space-y-4 text-lg font-sans">
            <p>
                Descubre cómo el tiempo compartido en nuestro exclusivo resort en Lefincul puede ser tu próxima gran inversión en calidad de vida y abundancia.
            </p>
            <p>
                Ofrecemos una oportunidad única para asegurar tus vacaciones de lujo y ser parte de un proyecto que valora la sustentabilidad y el bienestar.
            </p>
            {/* Puedes añadir más contenido aquí, como imágenes, detalles de los planes, etc. */}
        </div>
    </PageLayout>
);


const HistoriaPage = () => (
    <PageLayout title="Si quieres hacer un buen negocio, tienes que conocer primero con quién estás haciendo negocios." theme="light">
        <div className="max-w-4xl mx-auto text-dark-secondary space-y-4 text-lg font-sans">
            {/* The content for the dedicated HistoriaPage remains as is, separate from the new section on HomePage */}
            <p className="text-gold-400 font-bold">El Dinero sostiene el sistema que existe hoy en dia, asi que debes saber generarlo, fijate lo simple que es crecer cuando aprendes a cobrar un cero mas! La regla de Abundancia del Cero:</p>
            <p>Puedes partir desde 100 CLP en adelante, yo preferi comenzar con un producto que pueda vender en 10.000 CLP y para hacerlo recopile varias experiencias de vida en mi Libro "ALMA DE EMPRENDEDOR" para compartir mi historia de resiliencia, de superacion personal y de exito comercial.</p>
            <p>Continuando con esta regla de oro dispuse a la venta mis asesorias comerciales personalizadas por 100.000 CLP en 90 minutos de trabajo personalizando tu estrategia comercial por video llamada, despues logre crear el area de ventas de mis paginas y/o app web desde 300.000 CLP hasta 1.000.000 CLP y varios millones mas dependiendo de la complejidad de la app web. </p>
            <p>Tambien vendo parcelas de 5000m2 de otros dueños sobre los 10.000.000 pero de esas obtengo ganancias en comisiones desde los 2.000.000 CLP, igual tengo en venta en verde el tiempo compartido en el resort tu proximo nivel que construire en mi campo de montaña en Huife, Pucón y lo estoy vendiendo en 3.500.000 CLP, ademas tengo parcelas mias en mi campo donde construire mi resort tu proximo nivel, parcelas de 5000m2 en 28 millones venta en verde, las que costaran 88 millones al estar todo listo.</p>
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
                        {/* Se asigna un videoId genérico a todas las GatewayCard para uniformar el tamaño */}
                        <GatewayCard title="Venta en Verde en Lefincul" description="Parcelas exclusivas en un entorno natural privilegiado." videoId="b_t0wK-l_lQ" onClick={(e) => scrollToAnchor(e, 'lefincul-verde')} />
                        <GatewayCard title="Resort del Bienestar" description="Invierte en tiempo compartido en nuestro próximo resort." videoId="b_t0wK-l_lQ" onClick={(e) => scrollToAnchor(e, 'resort-lefincul')} />
                        <GatewayCard title="Venta en Verde cerca de Cunco" description="Oportunidades únicas de inversión en una zona con gran potencial." videoId="b_t0wK-l_lQ" onClick={(e) => scrollToAnchor(e, 'cunco-verde')} />
                        <GatewayCard title="Vista al Lago Colico" description="Parcelas con rol propio y vistas espectaculares al lago." videoId="b_t0wK-l_lQ" onClick={(e) => scrollToAnchor(e, 'colico-lago')} />
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
                            <motion.div key={index} className="bg-white/20 backdrop-blur-sm p-6 rounded-lg flex items-center space-x-4" initial={{opacity:0, x: -30}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.5, delay: index * 0.1}} viewport={{once: true}}>
                                <div className="flex-shrink-0 text-gold-300 font-bold text-3xl font-serif">{index + 1}</div>
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
        { q: "¿Dónde aprender sobre agroecología en Chile?", a: "Ofrecemos una plataforma de aprendizaje práctico. A través de nuestros videos, y próximamente talleres, puedes aprender directamente de nuestra experiencia construyendo un sistema autosuficiente en el corazón de Chile." },
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
                        {videos.slice(1).map(ep => (
                            <div key={ep.id}>
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                                    <iframe src={`https://www.youtube.com/embed/${ep.id}`} title={ep.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
                                <h4 className="text-xl font-serif text-gold-300 mt-3">{ep.title}</h4>
                                <p className="text-gray-400 font-sans text-sm">{ep.description}</p>
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
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
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
                    <p className="text-dark-secondary font-sans">{description}</p>
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
                                            <CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
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
              case 'tiempo-compartido': pageComponent = <TiempoCompartidoPage />; break; // Added new page case
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
            <div className="bg-cream font-sans">
                <FontLoader />
                {/* CustomCursor está habilitado y usa el nuevo GoldCoinCursor */}
                <CustomCursor currentPage={currentPage} />
                <Header setCurrentPage={setCurrentPage} />
                <AnimatePresence mode="wait">
                    {renderPage()}
                </AnimatePresence>
            </div>
          );
        }
