import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  Settings, 
  Code, 
  Globe, 
  Lightbulb, 
  MapPin,
  User,
  X,
  Menu,
  Copyright
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---



const ColorChanger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const colors = [
    { name: 'red', value: '#ff0000' },
    { name: 'purple', value: '#8e44ad' },
    { name: 'malt', value: '#d35400' },
    { name: 'green', value: '#27ae60' },
    { name: 'blue', value: '#2980b9' },
    { name: 'orange', value: '#f39c12' },
  ];

  const changeColor = (color: string) => {
    document.documentElement.style.setProperty('--primary', color);
  };

  return (
    <div className={cn("color-panel-container", isOpen && "open")}>
      <div className="color-panel-toggle" onClick={() => setIsOpen(!isOpen)}>
        <Settings className="w-6 h-6 animate-spin-slow text-white" />
      </div>
      <div className="color-panel-content">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-widest">Cores</h3>
        <div className="flex gap-2 flex-wrap w-32">
          {colors.map((c) => (
            <button
              key={c.name}
              className="w-8 h-8 rounded-full border border-white/20"
              style={{ backgroundColor: c.value }}
              onClick={() => changeColor(c.value)}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Navigation = ({ setActiveSection }: { setActiveSection: (s: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBreakerActive, setIsBreakerActive] = useState(false);

  const links = [
    { name: 'INÍCIO', id: 'home' },
    { name: 'SOBRE', id: 'about' },
    { name: 'BLOG', id: 'blog' },
    { name: 'PORTFÓLIO', id: 'portfolio' },
    { name: 'CONTATO', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsBreakerActive(true);
    setIsOpen(false);
    
    setTimeout(() => {
      setActiveSection(id);
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
      setTimeout(() => {
        setIsBreakerActive(false);
      }, 500);
    }, 500);
  };

  return (
    <>
      {/* Breaker Effect */}
      <div 
        className={cn(
          "fixed inset-0 z-[2000] bg-black transition-transform duration-500 ease-in-out translate-y-full",
          isBreakerActive && "translate-y-0"
        )} 
      />
      <div 
        className={cn(
          "fixed inset-0 z-[2001] bg-color transition-transform duration-500 ease-in-out translate-y-full delay-100",
          isBreakerActive && "translate-y-0"
        )} 
      />

      <div id="navigation-bar" className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-[1000]">
        <div className="logo text-xl md:text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-color rounded-full flex items-center justify-center text-white text-xs">B</div>
          <span className="color">J. Roberto</span> Brandt
        </div>
        <div className="menubar cursor-pointer" onClick={() => setIsOpen(true)}>
          <div className="flex flex-col gap-1.5">
            <span className="w-8 h-0.5 bg-white"></span>
            <span className="w-8 h-0.5 bg-white"></span>
            <span className="w-8 h-0.5 bg-white"></span>
          </div>
        </div>
      </div>

      <div id="navigation-content" className={cn(isOpen && "active")}>
        <div className="absolute top-6 right-6 cursor-pointer" onClick={() => setIsOpen(false)}>
          <X className="text-white" size={40} />
        </div>
        <div className="navigation-links flex flex-col items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-4xl font-bold tracking-[0.2em] hover:color transition-colors duration-300"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

const Header = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo(() => ({
    particles: {
      number: { value: 40, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: { repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  }), []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions as any}
          className="absolute inset-0 z-0"
        />
      )}
      
      <div className="header-content z-20 text-center px-4 max-w-4xl mx-auto mt-[45vh] md:mt-0">
        <div className="firstline text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="color">J. Roberto </span>Brandt
        </div>
        <div className="secondline text-xl sm:text-2xl md:text-4xl font-light tracking-widest uppercase">
          Eu sou{' '}
          <span className="color font-bold">
            <Typewriter
              words={['Designer.', 'Blogueiro.', 'Freelancer.']}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </div>
      </div>
        
      <div className="header-image absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 w-[85%] sm:w-[70%] md:w-[35%] opacity-40 md:opacity-90 pointer-events-none select-none z-10 transition-all duration-1000">
        <img 
          src="/profile.png" 
          alt="J. Roberto Brandt" 
          className="w-full h-full object-cover object-top grayscale brightness-110 contrast-125"
        />
      </div>
    </section>
  );
};

const About = () => {
  const skills = [
    { name: 'HTML/CSS', level: 95 },
    { name: 'Javascript', level: 90 },
    { name: 'Adobe Ps', level: 83 },
    { name: 'PHP', level: 87 },
    { name: 'JQuery', level: 94 },
    { name: 'SEO', level: 84 },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-16 border-b border-white/5 pb-12">
          <div className="flex gap-6">
            <a href="mailto:jrmacbrandt@yahoo.com" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center">
              <Mail size={24} />
            </a>
            <a href="tel:+5521980914107" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center">
              <Phone size={24} />
            </a>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10"></div>
          <div className="flex gap-6">
            <a href="#" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center"><Instagram size={24} /></a>
            <a href="#" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center"><Facebook size={24} /></a>
            <a href="#" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center"><Linkedin size={24} /></a>
          </div>
        </div>

        <div className="about-header mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Sobre <span className="color">Mim</span>
          </h2>
          <p className="text-muted text-xs md:text-sm mt-3 uppercase tracking-[0.4em]">
            Conheça-me <span className="color">um pouco mais.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="about-text order-2 lg:order-1">
            <h3 className="text-2xl md:text-4xl font-bold mb-8 leading-tight">
              Sou um <span className="color">desenvolvedor web</span> criativo baseado no Rio de Janeiro, Brasil
            </h3>
            <p className="text-muted leading-relaxed mb-10 text-base md:text-lg">
              Com 20 anos de experiência como desenvolvedor Web profissional, adquiri as habilidades e o conhecimento necessários para tornar seu projeto um sucesso. Aproveito cada etapa do trabalho.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-10 py-4 border-2 border-color text-white font-bold uppercase tracking-widest hover:bg-color transition-all duration-300 transform hover:-translate-y-1">
                Baixar <span className="color">CV</span>
              </button>
            </div>
          </div>
          <div className="about-img relative order-1 lg:order-2 max-w-md mx-auto lg:max-w-none">
            <div className="absolute -inset-4 border-2 border-color z-0 opacity-30"></div>
            <div className="relative z-10 overflow-hidden rounded-sm shadow-2xl">
              <img 
                src="/about-profile.png" 
                alt="Sobre Mim" 
                className="grayscale hover:grayscale-0 transition-all duration-700 w-full object-cover aspect-[4/5] lg:aspect-auto brightness-110 contrast-105"
              />
            </div>
          </div>
        </div>

        <div id="services" className="mb-20">
          <div className="services-heading text-4xl font-bold mb-12 uppercase">
            <span className="color">Meus</span> Serviços
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Web Design', icon: <Code size={40} />, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quibusdam possimus' },
              { title: 'Mídias Sociais', icon: <Globe size={40} />, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quibusdam possimus' },
              { title: 'Design Criativo', icon: <Lightbulb size={40} />, desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quibusdam possimus' },
            ].map((s, i) => (
              <div key={i} className="p-8 bg-[#151515] hover:-translate-y-2 transition-transform duration-300 group">
                <div className="color mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-wider">{s.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="skills">
          <div className="skills-header text-4xl font-bold mb-12 uppercase">
            Minhas <span className="color">Habilidades</span>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-item">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold uppercase tracking-widest">{skill.name}</span>
                  <span className="text-xs color">{skill.level}%</span>
                </div>
                <div className="prog">
                  <motion.div 
                    className="prog-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { title: 'Ideia de App', category: 'App', img: 'https://picsum.photos/seed/p1/1200/800' },
    { title: 'Web Design', category: 'Web', img: 'https://picsum.photos/seed/p2/1200/800' },
    { title: 'Design de UI', category: 'UI', img: 'https://picsum.photos/seed/p3/1200/800' },
    { title: 'Gráficos Incríveis', category: 'Graphics', img: 'https://picsum.photos/seed/p4/1200/800' },
  ];

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="portfolio-header mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Meu <span className="color">Portfólio</span>
          </h2>
          <p className="text-muted text-xs md:text-sm mt-3 uppercase tracking-[0.4em]">
            Alguns dos meus <span className="color">Trabalhos</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
          {projects.map((p, i) => (
            <div key={i} className="portfolio-card relative overflow-hidden group aspect-[16/10] rounded-sm shadow-lg">
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="portfolio-overlay bg-black/80 backdrop-blur-sm p-8 flex flex-col justify-center items-center text-center">
                <h3 className="text-xl md:text-3xl font-bold mb-3 uppercase tracking-tight">{p.title}</h3>
                <p className="text-xs md:text-sm color mb-8 uppercase tracking-[0.2em] font-semibold">{p.category}</p>
                <button className="px-8 py-3 border border-color text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold hover:bg-color transition-all duration-300">
                  Ver Projeto
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    { title: 'Harleys no Havaí', date: '8 Mai, 20', img: 'https://picsum.photos/seed/b1/800/600' },
    { title: 'Chave para Produtividade', date: '16 Jan, 20', img: 'https://picsum.photos/seed/b2/800/600' },
    { title: 'Viciado em Cafeína', date: '30 Nov, 19', img: 'https://picsum.photos/seed/b3/800/600' },
    { title: 'Desenvolvimento Web', date: '6 Jul, 19', img: 'https://picsum.photos/seed/b4/800/600' },
    { title: 'Trabalho Remoto', date: '1 Jun, 19', img: 'https://picsum.photos/seed/b5/800/600' },
    { title: 'Viagem de Negócios', date: '28 Fev, 19', img: 'https://picsum.photos/seed/b6/800/600' },
  ];

  return (
    <section id="blog" className="py-24 px-6 md:px-12 bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto">
        <div className="blog-header mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Blog</h2>
          <p className="text-muted text-xs md:text-sm mt-3 uppercase tracking-[0.4em]">
            Meus posts mais <span className="color">recentes.</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post, i) => (
            <div key={i} className="blog-item bg-[#151515] group overflow-hidden rounded-sm shadow-xl border border-white/5">
              <div className="relative overflow-hidden">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-color px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                  {post.date}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wider group-hover:color transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed line-clamp-3 opacity-80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus alias dolore recusandae illum, corrupti quo veniam saepe aliquid!
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="contact-header mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Contato
          </h2>
          <p className="text-muted text-xs md:text-sm mt-3 uppercase tracking-[0.4em]">
            Entre em <span className="color">Contato.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          <div className="contact-form">
            <h3 className="text-xl md:text-2xl font-bold mb-10 uppercase tracking-[0.3em] border-l-4 border-color pl-6">Mande uma Mensagem</h3>
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Nome" 
                  className="w-full bg-[#151515] border-b border-white/10 p-5 focus:border-color outline-none transition-all duration-300 focus:bg-[#1a1a1a]"
                />
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  className="w-full bg-[#151515] border-b border-white/10 p-5 focus:border-color outline-none transition-all duration-300 focus:bg-[#1a1a1a]"
                />
              </div>
              <input 
                type="text" 
                placeholder="Assunto" 
                className="w-full bg-[#151515] border-b border-white/10 p-5 focus:border-color outline-none transition-all duration-300 focus:bg-[#1a1a1a]"
              />
              <textarea 
                placeholder="Mensagem" 
                rows={5}
                className="w-full bg-[#151515] border-b border-white/10 p-5 focus:border-color outline-none transition-all duration-300 focus:bg-[#1a1a1a] resize-none"
              ></textarea>
              <button className="w-full sm:w-auto px-12 py-4 bg-color text-white font-bold uppercase tracking-[0.3em] hover:brightness-110 transition-all shadow-lg transform hover:-translate-y-1">
                Enviar Mensagem
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h3 className="text-xl md:text-2xl font-bold mb-10 uppercase tracking-[0.3em] border-l-4 border-color pl-6">Informações</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {[
                { icon: <User className="color" />, label: 'Nome', value: 'J. Roberto Brandt' },
                { icon: <MapPin className="color" />, label: 'Localização', value: 'Rio de Janeiro/RJ - Brasil' },
                { icon: <Phone className="color" />, label: 'Telefone', value: '+55 21 98091-4107' },
                { icon: <Mail className="color" />, label: 'E-mail', value: 'jrmacbrandt@yahoo.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-[#151515] rounded-sm border border-white/5 hover:border-color/30 transition-colors group">
                  <div className="p-4 bg-black rounded-sm group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <div>
                    <h4 className="text-[10px] text-muted uppercase tracking-[0.3em] mb-1.5 font-bold">{item.label}</h4>
                    <p className={cn(
                      "text-[11px] md:text-[12px] font-medium normal-case",
                      item.label === 'E-mail' && "lowercase"
                    )}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-10 border-t border-white/5 bg-[#0a0a0a] text-center">
      <div className="flex items-center justify-center gap-2 text-xs text-muted uppercase tracking-widest">
        <span>© 2026</span>
        <Copyright size={14} className="color" />
        <span className="color font-bold">J. Roberto Brandt</span>
        <span>Todos os Direitos Reservados</span>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    console.log("App mounted, starting loader...");
    const timer = setTimeout(() => {
      console.log("Loading complete, showing main content.");
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="all" className="font-sans selection:bg-color selection:text-white bg-[#0a0a0a] min-h-screen">
      {loading ? (
        <div id="loader" className="flex items-center justify-center bg-black text-white text-3xl md:text-4xl font-bold px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="color">J. Roberto</span> Brandt
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          <ColorChanger />
          <Navigation setActiveSection={setActiveSection} />
          
          <main>
            <Header />
            <About />
            <Portfolio />
            <Blog />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </div>
  );
}
