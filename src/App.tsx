/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { Instagram, Send, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SECTION_GAP = "py-24 md:py-32 lg:py-48";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });

    return unsubscribe;
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Почему я?", href: "#approach" },
    { name: "Портфолио", href: "#portfolio" },
    { name: "Обучение", href: "#education" },
  ];

  return (
    <>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[140] bg-black"
        />
      )}

      <nav className={`fixed top-0 left-0 w-full z-[110] px-6 py-6 flex justify-between items-center transition-all duration-500 ${
        isOpen
          ? "bg-transparent text-white"
          : isScrolled
            ? "bg-black text-white py-4"
            : "bg-transparent text-white mix-blend-difference"
      }`}>
        <a href="#hero" className="font-display font-black text-2xl tracking-tighter uppercase relative z-[150]">
          Nikita Boroda
        </a>
        
        <div className="hidden md:flex gap-12 font-mono text-xs uppercase tracking-widest">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-accent transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <a href="#contacts" className={`hidden md:block px-6 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
          isScrolled ? "bg-white text-black hover:bg-accent hover:text-white" : "bg-white text-black hover:bg-accent hover:text-white"
        }`}>
          Контакты
        </a>

        <button
          className={`md:hidden relative z-[150] ${isOpen ? "text-white" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed inset-0 z-[145] flex flex-col items-center justify-center gap-8 text-white"
        >
          <button
            className="absolute top-6 right-6 z-[160] text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Закрыть меню"
          >
            <X size={24} />
          </button>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className="font-display text-4xl font-black uppercase"
            >
              {link.name}
            </a>
          ))}
          <a href="#contacts" onClick={() => setIsOpen(false)} className="bg-accent text-white px-12 py-4 font-display text-xl font-black uppercase">Контакты</a>
        </motion.div>
      )}
    </>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end px-6 pb-12 overflow-hidden noise-overlay">
      <div className="absolute inset-0 z-0">
        <video
          src="/images/video.MOV"
          className="w-full h-full object-cover opacity-40 grayscale"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-6xl md:text-[8rem] lg:text-[11rem] leading-[0.85] mb-8 uppercase"
        >
          Никита<br />Боро<span className="text-accent">да</span>
        </motion.h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-md">
            <div className="inline-block bg-accent text-white px-3 py-1 font-mono text-xs uppercase tracking-widest mb-6">
              Тату-мастер | Нижний Новгород
            </div>
            <p className="text-xl md:text-2xl font-medium leading-tight">
              От миниатюры до большого проекта, практически любая сложность.
            </p>
          </div>
          
          <div className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.5em] vertical-text opacity-30">
            Realism / Neotradition / Real graphics
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyMe = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-140%", "140%"]);
  const trailOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const items = [
    { id: "01", label: "FOCUS", title: "Индивидуальный подход к каждому клиенту" },
    { id: "02", label: "SPACE", title: "Работаю в большой, чистой и комфортной студии" },
    { id: "03", label: "SAFETY", title: "Только одноразовые расходные материалы" },
    { id: "04", label: "TALK", title: "Бесплатная консультация (онлайн или очно)" },
  ];

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="approach" ref={containerRef} className={`${SECTION_GAP} px-6 bg-surface-lowest relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={listVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl mb-12">Почему<br /><span className="text-accent">Я?</span></motion.h2>
          <motion.div variants={listVariants} className="space-y-12">
            {items.map((item) => (
              <motion.div key={item.id} variants={itemVariants} className="group">
                <span className="font-mono text-xs text-accent mb-2 block">{item.id} / {item.label}</span>
                <h3 className="text-2xl md:text-3xl font-light group-hover:translate-x-4 transition-transform duration-300">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/4] bg-surface-low overflow-hidden"
        >
          <img 
            src="/images/me.jfif" 
            alt="Nikita Boroda" 
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute bottom-12 right-12">
            <button className="bg-accent text-white px-12 py-6 font-display text-xl font-black uppercase cursor-pointer hover:scale-105 transition-transform">
              Записаться
            </button>
          </div>
        </motion.div>
      </div>

      {/* Moving Icon: Left to Right, Pointing Down */}
      <motion.div 
        style={{ x, opacity: trailOpacity }}
        className="absolute bottom-6 left-0 z-20 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-0">
          <img 
            src="/icons/icongun.png" 
            alt="Tattoo Machine" 
            className="w-10 h-10 md:w-14 md:h-14 brightness-0 invert"
            style={{ transform: "rotate(0deg)" }}
          />
          <div className="-mt-px h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

const PortfolioImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <motion.div 
    whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
    className="relative overflow-hidden bg-surface-low"
  >
    <img 
      src={src} 
      alt={alt} 
      className={`w-full transition-all duration-700 md:grayscale md:brightness-60 md:saturate-75 md:hover:grayscale-0 md:hover:brightness-100 md:hover:saturate-100 ${className}`} 
      referrerPolicy="no-referrer" 
    />
  </motion.div>
);

const Portfolio = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-400%"]);
  const trailOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const revealVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const images = [
    "/images/Porfolio1.jfif",
    "/images/Porfolio2.jfif",
    "/images/Porfolio3.jfif",
    "/images/Porfolio4.jfif",
    "/images/Porfolio5.jfif",
  ];

  return (
    <section id="portfolio" ref={containerRef} className={`${SECTION_GAP} px-6 relative overflow-hidden`}>
      {/* Moving Icon: Right to Left, Pointing Up */}
      <motion.div 
        style={{ x, opacity: trailOpacity }}
        className="absolute top-6 right-0 z-20 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-0">
          <div className="-mt-px h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          <img 
            src="/icons/icongun.png" 
            alt="Tattoo Machine" 
            className="w-10 h-10 md:w-14 md:h-14 brightness-0 invert"
            style={{ transform: "rotate(180deg)" }}
          />
          
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={revealVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-9xl">Портфолио</h2>
          <span className="font-mono text-[10px] opacity-40 mb-4">WORKS</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <PortfolioImage src={images[1]} alt="Tattoo 2" />
            <PortfolioImage src={images[2]} alt="Tattoo 3" />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-1 pt-12 space-y-6">
            <PortfolioImage src={images[3]} alt="Tattoo 4" />
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-surface-highest p-12 aspect-square flex flex-col justify-center items-center text-center cursor-pointer transition-colors hover:bg-accent active:bg-accent group"
            >
              <h4 className="text-2xl mb-4 group-hover:text-white group-active:text-white">Больше работ в моем VK</h4>
              <ArrowRight className="text-accent group-hover:text-white group-active:text-white group-hover:translate-x-2 transition-all" />
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <PortfolioImage src={images[4]} alt="Tattoo 5" />
            <PortfolioImage src={images[0]} alt="Tattoo 5" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const Education = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section 
      id="education" 
      ref={containerRef}
      className="min-h-screen flex items-center py-24 px-6 relative overflow-hidden bg-surface text-white"
    >
      {/* Background Image with horizontal scroll and rotation effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.img 
          style={{ x, y, rotate, scale: 1.8 }}
          src="/images/edu.jpg" 
          alt="Education Background" 
          className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] object-cover grayscale opacity-50 brightness-90 origin-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface opacity-80" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={listVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-7xl mb-8">Обучение</motion.h2>
          <motion.div variants={itemVariants} className="inline-block bg-accent text-white px-6 py-4 font-normal text-lg md:text-2xl uppercase mb-12">
            Я не обучаю с нуля. Только для тех, кто уже в деле.
          </motion.div>
          
          <motion.div variants={listVariants} className="space-y-6">
            {["Композиция и динамика", "Техника", "Личные фишки и наработки"].map((text, i) => (
              <motion.div key={i} variants={itemVariants} className="flex gap-6 items-center border-b border-white/10 pb-6">
                <span className="font-display text-4xl font-black text-accent">0{i + 1}</span>
                <span className="text-2xl font-medium uppercase">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white text-black p-12 md:p-24 relative overflow-hidden border border-black/10"
        >
          <div className="relative z-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent block mb-8">EDUCATION / 2026</span>
            <h3 className="text-4xl md:text-6xl mb-12 leading-none">Хватит делать грязь.<br />Делай стиль.</h3>
            <p className="text-lg opacity-80 mb-12 max-w-sm">Разбор твоих работ, выявление ошибок в технике и построение индивидуальной стратегии роста.</p>
            <button className="w-full border-2 border-black py-6 font-display font-black uppercase hover:bg-accent hover:text-white hover:border-accent transition-colors">
              Узнать подробности
            </button>
          </div>
          <div className="absolute top-0 right-0 text-[20rem] font-black opacity-[0.03] leading-none select-none -translate-y-1/4 translate-x-1/4">
            STYLE
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contacts" className={`${SECTION_GAP} px-6`}>
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-[12rem] mb-24 leading-none"
        >
          Связаться<br />со мной
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="group border border-white/20 p-12 hover:bg-white hover:text-black transition-all duration-500"
          >
            <Instagram className="mx-auto mb-6 group-hover:text-accent" />
            <span className="text-3xl font-display font-black uppercase">Instagram</span>
          </motion.a>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group border border-white/20 p-12 hover:bg-white hover:text-black transition-all duration-500"
          >
            <Send className="mx-auto mb-6 group-hover:text-accent" />
            <span className="text-3xl font-display font-black uppercase">Telegram</span>
          </motion.a>
          <motion.a
            href="#"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="group border border-white/20 p-12 hover:bg-white hover:text-black transition-all duration-500"
          >
            <img
              src="/icons/vk.png"
              alt="VK"
              className="mx-auto mb-6 h-6 w-6 object-contain transition-all [filter:brightness(0)_invert(1)] group-hover:[filter:brightness(0)_saturate(100%)_invert(12%)_sepia(97%)_saturate(7403%)_hue-rotate(2deg)_brightness(94%)_contrast(119%)]"
            />
            <span className="text-3xl font-display font-black uppercase">VKONTAKTE</span>
          </motion.a>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 md:mt-48 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
        >
          <div className="lg:col-span-7 relative group order-2 lg:order-1">
            <div className="w-full aspect-video lg:aspect-[21/9] bg-surface-low border border-white/10 overflow-hidden transition-all duration-700">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=44.005986%2C56.326797&mode=search&text=%D0%9D%D0%B8%D0%B6%D0%BD%D0%B8%D0%B9%20%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4&z=11"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Яндекс Карты: Нижний Новгород"
              />
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 text-left lg:text-right">
            <h2 className="font-display font-black text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-accent leading-[0.8] whitespace-nowrap">
              Локация
            </h2>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
              г. Нижний Новгород, ул. ТакаяСекая 20, падик 1
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="px-6 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-8">
        <div className="font-mono text-[10px] opacity-40 uppercase tracking-widest text-center md:text-left">
          © 2026 tg: <a href="https://t.me/corusaint" target="_blank" rel="noopener noreferrer" className="hover:text-accent underline transition-colors">corusaint</a>. NO MERCY. ALL RIGHTS RESERVED.
        </div>
        <div className="font-display font-black text-xl uppercase tracking-tighter opacity-20">
          Nikita Boroda
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="selection:bg-accent selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <WhyMe />
        <Portfolio />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
