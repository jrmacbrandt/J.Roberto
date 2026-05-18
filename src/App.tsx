import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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



const navLinks = [
  { name: 'INÍCIO', id: 'home' },
  { name: 'SOBRE', id: 'about' },
  { name: 'SOLUÇÕES', id: 'portfolio' },
  { name: 'FAQ', id: 'faq' },
  { name: 'CONTATO', id: 'contact' },
];

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

  const links = navLinks;

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

      <div id="navigation-bar" className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-[1000] bg-black/50 backdrop-blur-md">
        <div className="logo h-12 md:h-14 flex items-center overflow-hidden">
          <img 
            src="/jrbrandt-assinatura-bg.webp" 
            alt="J.R. Brandt" 
            className="h-full w-auto object-contain" 
          />
        </div>

        {/* Desktop Navigation Link */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-xs font-bold tracking-[0.2em] hover:color transition-colors duration-300"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div 
          className="md:hidden cursor-pointer z-[1001]" 
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-col gap-1.5">
            <span className="w-8 h-0.5 bg-white"></span>
            <span className="w-8 h-0.5 bg-white"></span>
            <span className="w-8 h-0.5 bg-white"></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-4 text-white"
          >
            <X size={48} />
          </button>
          
          <nav className="flex flex-col items-center gap-10">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setIsOpen(false);
                  handleLinkClick(link.id);
                }}
                className="text-4xl font-bold uppercase tracking-widest hover:text-color transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
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
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 md:pt-28 pb-12 md:pb-16">
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions as any}
          className="absolute inset-0 z-0"
        />
      )}
      
      {/* Container Principal do Hero */}
      <div className="z-20 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-12 items-center min-h-screen md:min-h-[80vh] relative">
        
        {/* Lado Esquerdo: Textos e Botões */}
        <div className="md:col-span-8 text-center md:text-left z-20 space-y-8 flex flex-col items-center md:items-start order-1 md:order-none">
          <div className="header-content">
            <h1 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[52px] font-bold leading-[1.1] mb-6">
              Sou Webdesigner e crio <br className="hidden md:block" />
              <span className="color">Sites, Sistemas e Landing Pages</span> <br className="hidden md:block" />
              que ajudam empresas a <br className="hidden md:block" />
              conseguirem <span className="color">mais clientes</span>
            </h1>

            {/* Imagem de Perfil (Ordem 2 no Mobile) */}
            <div className="w-full mx-auto order-2 md:hidden mb-8">
              <img 
                src="/profile.webp" 
                alt="J. Roberto Brandt" 
                className="w-full h-auto object-cover object-top grayscale"
              />
            </div>
            
            <p className="secondline text-[14px] sm:text-[16px] md:text-[22px] font-light uppercase tracking-wider mb-10 max-w-3xl opacity-80 leading-relaxed">
              soluções simples para corretores, salões e negócios locais que querem crescer com estrutura própria, sem depender somente de plataformas de terceiros ou redes sociais
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center md:justify-start pointer-events-auto">
              <a href="https://wa.me/5521980914107?text=Oi,%20vim%20pelo%20site%20e%20quero%20mais%20clientes" target="_blank" rel="noreferrer" className="px-10 py-5 bg-color text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-2xl rounded-sm text-sm md:text-base">
                Quero mais clientes
              </a>
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-10 py-5 border-2 border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white transition-all shadow-xl rounded-sm text-sm md:text-base">
                Ver soluções
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Lado Direito: Imagem de Perfil (Apenas Desktop) - Alinhada à borda direita com 0 espaçamento */}
      <div className="hidden md:block absolute bottom-0 right-0 w-[31%] pointer-events-none select-none z-10">
        <img 
          src="/profile.webp" 
          alt="J. Roberto Brandt" 
          className="w-full h-auto object-cover object-top grayscale opacity-80"
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
    <section id="about" className="py-12 md:py-16 px-6 md:px-12 bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10 border-b border-white/5 pb-12">
          {/* Logo / Favicon */}
          <div className="flex items-center justify-center hover:scale-110 transition-transform p-2 bg-white/5 rounded-full backdrop-blur-sm">
            <img src="/favicon-source.webp" alt="J. Roberto Brandt" className="w-10 h-10 rounded-full object-contain" />
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10"></div>
          <div className="flex gap-6">
            <a href="mailto:jrmacbrandt@yahoo.com" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center">
              <Mail size={24} />
            </a>
            <a href="https://wa.me/5521980914107" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center">
              <Phone size={24} />
            </a>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10"></div>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/jrbrandt.webdesigner/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center"><Instagram size={24} /></a>
            <a href="#" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center"><Facebook size={24} /></a>
            <a href="https://www.linkedin.com/in/jos%C3%A9-roberto-machado-brandt-1a424460/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform color p-3 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center"><Linkedin size={24} /></a>
          </div>
        </div>


        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Coluna Esquerda: Conteúdo */}
          <div className="about-content">
            <div className="about-header mb-4 md:mb-12 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                Sobre <span className="color">Mim</span>
              </h2>
              <p className="text-muted text-xs md:text-sm mt-3 uppercase tracking-[0.4em]">
                Conheça-me <span className="color">um pouco mais.</span>
              </p>
              <div className="mt-4 text-[19px] sm:text-2xl md:text-4xl font-light uppercase tracking-widest whitespace-nowrap">
                Eu sou{' '}
                <span className="color font-bold">
                  <Typewriter
                    words={['Webdesigner.', 'Facilitador.', 'Freelancer.']} 
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

            {/* Foto visível apenas no mobile, acima do texto */}
            <div className="block lg:hidden my-3 rounded-sm overflow-hidden shadow-2xl">
              <motion.img 
                src="/about-profile.webp" 
                alt="Sobre Mim" 
                className="w-full object-cover brightness-110 contrast-105"
                initial={{ filter: 'grayscale(100%)' }}
                whileInView={{ filter: 'grayscale(0%)' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                viewport={{ once: false, amount: 0.3 }}
              />
            </div>

            <div className="about-text mt-12">
              <h3 className="text-xl md:text-2xl font-bold mb-8 leading-tight">
                Sou um <span className="color">webdesigner</span> focado em criar soluções simples e eficientes para pequenos negócios aumentarem sua presença online e automatizarem processos do dia a dia.
              </h3>
              <p className="text-muted leading-relaxed mb-10 text-base md:text-lg">
                Meu objetivo é entregar ferramentas que realmente gerem resultado, sem complexidade técnica.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/5521980914107?text=Oi,%20vim%20pelo%20site%20e%20quero%20mais%20clientes" target="_blank" rel="noreferrer" className="px-10 py-4 border-2 border-color text-white font-bold uppercase tracking-widest hover:bg-color transition-all duration-300 transform hover:-translate-y-1 inline-block">
                  Me chame no <span className="color">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Foto Alinhada Perfeitamente (apenas Desktop) */}
          <div className="about-img hidden lg:block relative w-full h-full">
            <img 
              src="/about-profile.webp" 
              alt="Sobre Mim" 
              className="absolute top-0 right-0 h-full w-auto max-w-none grayscale hover:grayscale-0 transition-all duration-700 brightness-110 contrast-105"
            />
          </div>
        </div>

        <div id="services" className="mt-12 md:mt-20 mb-12 md:mb-16">
          <div className="services-heading text-4xl font-bold mb-12 uppercase">
            Por que usar <span className="color">essas soluções?</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Mais Clientes', icon: <Globe size={40} />, desc: 'Mais clientes sem depender de plataformas.' },
              { title: 'Organização', icon: <Settings size={40} />, desc: 'Atendimento mais organizado.' },
              { title: 'Imagem Profissional', icon: <User size={40} />, desc: 'Transmita uma imagem profissional online.' },
              { title: 'Integração', icon: <Code size={40} />, desc: 'Site e sistema integrados.' },
              { title: 'Facilidade', icon: <Lightbulb size={40} />, desc: 'Fácil de usar no dia a dia.' },
              { title: 'WhatsApp', icon: <Phone size={40} />, desc: 'Integração direta com WhatsApp.' },
            ].map((s, i) => (
              <div key={i} className="p-8 bg-[#151515] hover:-translate-y-2 transition-transform duration-300 group">
                <div className="color mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
                <h4 className="text-xl font-bold mb-4 uppercase tracking-wider">{s.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Intermediary */}
        <div className="mt-12 md:mt-20 text-center bg-[#151515] p-12 rounded-sm border border-white/5 shadow-xl">
          <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">Quer um site atrativo e automatizado para o seu <span className="color">negócio?</span></h3>
          <a href="https://wa.me/5521980914107?text=Oi,%20vim%20pelo%20site%20e%20quero%20mais%20clientes" target="_blank" rel="noreferrer" className="inline-block px-10 py-4 bg-color text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg transform hover:-translate-y-1">
            Quero começar agora
          </a>
        </div>

        <div id="skills" className="mt-12 md:mt-20">
          <div className="skills-header text-4xl font-bold mb-12 uppercase">
            Resultados para o <span className="color">seu negócio</span>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { name: 'Mais clientes online', level: 95 },
              { name: 'Atendimento automatizado', level: 90 },
              { name: 'Organização do seu negócio', level: 87 },
              { name: 'Presença profissional', level: 93 },
              { name: 'Facilidade de uso', level: 94 },
              { name: 'Integração com WhatsApp', level: 100 },
              { name: 'Resultados Orgânicos com SEO avançado', level: 100 },
            ].map((skill) => (
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
    { title: 'ImobiFlow', category: 'Imóveis', img: '/images/imobiflow.webp', link: 'https://imobiflow-peach.vercel.app/', desc: 'Sistema com IA integrada, para corretores que querem ter seu próprio site e receber contatos diretos' },
    { title: 'FastBeautyPro', category: 'Salões e Barbearias', img: '/images/fastbeautypro.webp', link: 'https://fastbeautypro.vercel.app/', desc: 'Sistema de gestão para salões e barbearias que querem uma melhor gestão e agendamentos automáticos' },
    { title: 'Pack Gospel', category: 'Landing Page', img: '/images/landing.webp', link: 'https://leo-tondella.vercel.app/', desc: 'Landing page de alta conversão para venda de artes 100% editáveis no Canva voltadas para o público gospel' },
    { title: 'Poços Artesianos', category: 'Institucional', img: '/images/poco-artesiano.webp', link: 'https://www.pocoartesianorj.com.br/', desc: 'Sua empresa com presença profissional e autoridade no mercado digital' },
  ];

  return (
    <section id="portfolio" className="py-12 md:py-16 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="portfolio-header mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Soluções para <span className="color">negócios</span>
          </h2>
          <p className="text-muted text-xs md:text-sm mt-3 uppercase tracking-[0.4em]">
            Algumas das minhas <span className="color">Ferramentas</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {projects.map((p, i) => (
            <div key={i} className="portfolio-card relative overflow-hidden group aspect-[16/10] rounded-sm shadow-lg border border-red-600/30 hover:border-red-500/60 transition-all duration-300">
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="portfolio-overlay bg-black/80 backdrop-blur-sm p-6 lg:p-8 flex flex-col justify-center items-center text-center">
                <h3 className="text-lg md:text-2xl font-bold mb-2 uppercase tracking-tight">{p.title}</h3>
                <p className="text-[10px] md:text-xs color mb-4 uppercase tracking-[0.2em] font-semibold">{p.category}</p>
                {p.desc && <p className="text-xs md:text-sm text-white/80 mb-6 max-w-[85%] leading-relaxed">{p.desc}</p>}
                <a href={p.link} target="_blank" rel="noreferrer" className="px-6 py-3 border border-color text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold hover:bg-color transition-all duration-300">
                  Acessar online
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LGPDBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('lgpd_accepted');
    if (!accepted) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd_accepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 w-full z-[5000] p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto bg-[#1a1a1a] border border-white/10 p-6 md:p-8 rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
        <div className="text-sm text-white/70 leading-relaxed text-center md:text-left max-w-3xl">
          <p className="uppercase tracking-widest text-[10px] mb-2 color font-bold">Privacidade & LGPD</p>
          <p className="text-xs md:text-sm">
            Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa <a href="/politica-de-privacidade.html" target="_blank" className="color underline hover:no-underline font-bold">Política de Privacidade</a> conforme a LGPD.
          </p>
        </div>
        <button 
          onClick={handleAccept}
          className="px-10 py-3 bg-color text-white font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-lg cursor-pointer whitespace-nowrap"
        >
          Ok, entendi
        </button>
      </div>
    </motion.div>
  );
};

const FAQ = () => {
  const faqs = [
    { 
      q: "Quanto custa para criar um site profissional?", 
      a: "O investimento varia de acordo com as funcionalidades necessárias, mas meu foco é oferecer o melhor custo-benefício para que pequenos negócios possam crescer online sem custos astronômicos." 
    },
    { 
      q: "Quanto tempo leva para o site ficar pronto?", 
      a: "Geralmente o prazo de entrega fica entre 7 a 15 dias úteis, dependendo da complexidade do projeto e da agilidade no envio dos materiais básicos por parte do cliente." 
    },
    { 
      q: "Meu site vai aparecer no Google?", 
      a: "Sim! Todos os projetos que desenvolvo já saem com otimização SEO técnica básica para que seu negócio comece a ser indexado e encontrado por quem procura seus serviços na sua região." 
    },
    { 
      q: "O site funciona bem no celular?", 
      a: "Com certeza. Hoje, mais de 80% dos acessos vêm de smartphones. Por isso, utilizo a metodologia Mobile-First, garantindo que seu site seja rápido e bonito em qualquer tela." 
    },
    { 
      q: "Vou conseguir receber contatos pelo WhatsApp?", 
      a: "Sim, essa é uma das minhas especialidades. Integro botões flutuantes e chamadas para ação (CTAs) estratégicas que direcionam o cliente direto para o seu WhatsApp de atendimento." 
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-12 md:py-16 px-6 md:px-12 bg-[#0c0c0c]">
      <div className="max-w-4xl mx-auto">
        <div className="faq-header mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Perguntas <span className="color">Frequentes</span>
          </h2>
          <p className="text-muted text-xs md:text-sm mt-3 uppercase tracking-[0.4em]">
            Tire suas <span className="color">Dúvidas</span>
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-white/5 bg-[#151515] rounded-sm overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center group hover:bg-white/5 transition-colors"
              >
                <span className="text-sm md:text-lg font-bold uppercase tracking-wider group-hover:color transition-colors">
                  {faq.q}
                </span>
                <span className={cn(
                  "color transition-transform duration-300 text-2xl",
                  activeIndex === i ? "rotate-45" : "rotate-0"
                )}>+</span>
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                activeIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="p-6 pt-0 text-muted text-sm md:text-base leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
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
    <section id="contact" className="py-12 md:py-16 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="contact-header mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            Contato
          </h2>
          <p className="text-muted text-xs md:text-sm mt-3 uppercase tracking-[0.4em]">
            Fale agora <span className="color">comigo.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          <div className="contact-form">
            <h3 className="text-xl md:text-2xl font-bold mb-10 uppercase tracking-[0.3em] border-l-4 border-color pl-6">Mande uma Mensagem</h3>
            <form className="space-y-8" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name');
              const email = formData.get('email');
              const business = formData.get('business');
              const message = formData.get('message');
              
              const subject = encodeURIComponent(`Novo Contato de ${name}`);
              const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\nNegócio: ${business}\n\nMensagem:\n${message}`);
              
              window.location.href = `mailto:jrmacbrandt@yahoo.com?subject=${subject}&body=${body}`;
            }}>
              <div className="grid sm:grid-cols-2 gap-6">
                <input 
                  name="name"
                  type="text" 
                  placeholder="Nome" 
                  required
                  className="w-full bg-[#151515] border-b border-white/10 p-5 focus:border-color outline-none transition-all duration-300 focus:bg-[#1a1a1a]"
                />
                <input 
                  name="email"
                  type="email" 
                  placeholder="E-mail" 
                  required
                  className="w-full bg-[#151515] border-b border-white/10 p-5 focus:border-color outline-none transition-all duration-300 focus:bg-[#1a1a1a]"
                />
              </div>
              <input 
                name="business"
                type="text" 
                placeholder="Qual o seu negócio?" 
                className="w-full bg-[#151515] border-b border-white/10 p-5 focus:border-color outline-none transition-all duration-300 focus:bg-[#1a1a1a]"
              />
              <textarea 
                name="message"
                placeholder="Como posso te ajudar a ter mais clientes?" 
                rows={5}
                required
                className="w-full bg-[#151515] border-b border-white/10 p-5 focus:border-color outline-none transition-all duration-300 focus:bg-[#1a1a1a] resize-none"
              ></textarea>
              <button type="submit" className="w-full sm:w-auto px-12 py-4 bg-color text-white font-bold uppercase tracking-[0.3em] hover:brightness-110 transition-all shadow-lg transform hover:-translate-y-1">
                Enviar Mensagem
              </button>
            </form>
          </div>

          <div className="contact-info flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-10 uppercase tracking-[0.3em] border-l-4 border-color pl-6">Informações</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {[
                  { icon: <User className="color" />, label: 'Nome', value: 'J. Roberto Brandt' },
                  { icon: <MapPin className="color" />, label: 'Localização', value: 'Rio de Janeiro/RJ - Brasil' },
                  { icon: <Phone className="color" />, label: 'Telefone/WhatsApp', value: '+55 21 98091-4107' },
                  { icon: <Mail className="color" />, label: 'E-mail', value: 'jrmacbrandt@yahoo.com' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-[#151515] rounded-sm border border-white/5 hover:border-color/30 transition-colors group">
                    <div className="p-4 bg-black rounded-sm group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <div>
                      <h4 className="text-[11px] text-muted uppercase tracking-[0.3em] mb-1.5 font-bold">{item.label}</h4>
                      <p className={cn(
                        "text-[12px] md:text-[13px] font-medium normal-case",
                        item.label === 'E-mail' && "lowercase"
                      )}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 bg-color/10 border border-color/30 p-8 rounded-sm text-center">
              <h3 className="text-2xl font-bold mb-4">Pronto para ter mais clientes?</h3>
              <p className="text-sm text-muted mb-6">Fale agora comigo e vamos conversar sobre a melhor solução para o seu negócio.</p>
              <a href="https://wa.me/5521980914107?text=Oi,%20vim%20pelo%20site%20e%20quero%20mais%20clientes" target="_blank" rel="noreferrer" className="inline-block px-8 py-3 bg-color text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg w-full sm:w-auto">
                Me chame no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center">
          <div className="flex flex-col items-center gap-1">
            <img src="/favicon-source.webp" alt="Favicon" className="w-[90px] h-[90px] rounded-full object-contain" />
            <img src="/jrbrandt-assinatura-bg.webp" alt="Logo" className="h-12 w-auto object-contain" />
            <div className="text-lg font-bold tracking-widest uppercase">
              <span className="color">web</span>designer
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:col-span-2 gap-8 items-start">
            <div className="flex flex-col items-center gap-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Navegação</h4>
              <div className="flex flex-col items-center gap-2">
                {navLinks.map((link) => (
                  <button 
                    key={link.id}
                    onClick={() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-muted hover:text-color transition-colors text-xs uppercase tracking-widest cursor-pointer text-center"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Links Úteis</h4>
              <div className="flex flex-col items-center gap-2">
                <a href="/politica-de-privacidade.html" target="_blank" rel="noreferrer" className="text-muted hover:text-color transition-colors text-xs uppercase tracking-widest cursor-pointer text-center">Política de Privacidade</a>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="text-muted hover:text-color transition-colors text-xs uppercase tracking-widest cursor-pointer text-center">Sitemap</a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-8 border-t border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[8px] md:text-[10px] text-muted uppercase tracking-[0.15em] text-center px-4">
            <span>© 2026</span>
            <Copyright size={10} className="color" />
            <span className="color font-bold">J. Roberto Brandt</span>
            <span className="opacity-50">|</span>
            <span>Todos os Direitos Reservados</span>
          </div>
        </div>
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
        <div id="loader" className="flex flex-col items-center justify-center bg-black text-white px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-1"
          >
            <img src="/favicon-source.webp" alt="Favicon" className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-contain" />
            <img src="/jrbrandt-assinatura-bg.webp" alt="Logo" className="h-16 md:h-24 w-auto object-contain" />
            <div className="text-xl md:text-2xl font-bold tracking-[0.3em] uppercase">
              <span className="color">web</span>designer
            </div>
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
            <FAQ />
            <Contact />
          </main>

          {/* Botão WhatsApp Fixo e Flutuante */}
          <a
            href="https://wa.me/5521980914107?text=Oi,%20vim%20pelo%20site%20e%20quero%20mais%20clientes"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-8 right-8 z-[3000] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-bounce-slow"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
              alt="WhatsApp" 
              className="w-10 h-10 invert-0"
            />
          </a>

          <Footer />
          <LGPDBanner />
        </motion.div>
      )}
    </div>
  );
}
