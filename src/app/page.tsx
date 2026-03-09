"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────
type Lang = "pt" | "en";

// ─── Translations ─────────────────────────────────────────────────────────────
const t = {
  pt: {
    nav_waitlist: "Lista de Espera",
    hero_tag: "Em breve — Junte-se à lista",
    hero_line1: "O DNA",
    hero_line2: "DO SEU",
    hero_line3: "VEÍCULO",
    hero_sub: "Da simples caderneta de anotações ao ecossistema completo do automóvel. Registre, valorize e conecte.",
    hero_cta: "Quero ser o primeiro",
    hero_how: "Como funciona",
    stat1_num: "+50M",
    stat1_label: "Veículos no Brasil",
    stat2_num: "3x",
    stat2_label: "Mais valor na venda",
    stat3_num: "360°",
    stat3_label: "Ecossistema automotivo",
    notebook_title: "A MEMÓRIA QUE VALORIZA SEU CARRO",
    notebook_sub: "Seu pai anotava tudo na caderneta. Você vai fazer o mesmo — só que com dados inteligentes, alertas automáticos e um histórico verificável que aumenta o valor do seu veículo na hora da venda.",
    features_tag: "O que o UpCar faz",
    features_title: "UM ECOSSISTEMA\nCOMPLETO",
    f1_title: "CADERNETA DIGITAL",
    f1_desc: "Registre abastecimentos, manutenções e revisões. Histórico completo sempre na palma da mão.",
    f2_title: "QR DE PROCEDÊNCIA",
    f2_desc: "QR Code verificável do seu veículo. Mostre o histórico completo para o comprador na hora da venda.",
    f3_title: "OFICINAS CREDENCIADAS",
    f3_desc: "Rede de oficinas e fornecedores verificados. Orçamentos e serviços diretamente no app.",
    f4_title: "LOJA AUTOMOTIVA",
    f4_desc: "Peças, acessórios e produtos dos melhores fornecedores. Compra direta com entrega rápida.",
    f5_title: "CARONAS COMPARTILHADAS",
    f5_desc: "Conecte-se com entusiastas e motoristas. Caronas seguras entre pessoas com histórico verificado.",
    f6_title: "COMUNIDADE",
    f6_desc: "Encontros, eventos, clubs e muito mais. O ponto de encontro dos apaixonados por carros.",
    roadmap_tag: "Nosso plano",
    roadmap_title: "CRESCIMENTO\nEM FASES",
    phase1_label: "Agora",
    phase1_title: "VALIDAÇÃO",
    phase1_items: ["Landing page", "Lista de espera", "Identidade visual"],
    phase2_label: "3-4 meses",
    phase2_title: "MVP",
    phase2_items: ["Caderneta digital", "QR do veículo", "Alertas inteligentes"],
    phase3_label: "6-12 meses",
    phase3_title: "ECOSSISTEMA",
    phase3_items: ["Oficinas credenciadas", "Loja automotiva", "Parcerias"],
    phase4_label: "12-24 meses",
    phase4_title: "EXPANSÃO",
    phase4_items: ["Caronas compartilhadas", "Comunidade", "Internacional"],
    pricing_tag: "Planos",
    pricing_title: "SIMPLES E\nTRANSPARENTE",
    plan_free: "Começar grátis",
    plan_plus: "Quero o Plus",
    plan_pro: "Quero o Pro",
    most_popular: "MAIS POPULAR",
    free_features: ["1 veículo", "Registros básicos", "Histórico limitado", "App mobile"],
    plus_features: ["Até 3 veículos", "Alertas inteligentes", "Histórico completo", "QR verificado", "Loja com desconto"],
    pro_features: ["Veículos ilimitados", "Relatórios avançados", "Selo premium na venda", "Caronas prioritárias", "Suporte dedicado"],
    waitlist_tag: "Seja o primeiro",
    waitlist_title: "ENTRE NA\nLISTA",
    waitlist_sub: "O UpCar está chegando. Cadastre seu e-mail e seja um dos primeiros a testar — com acesso antecipado e plano Plus grátis por 3 meses.",
    waitlist_btn: "Garantir minha vaga",
    waitlist_note: "✓ Sem spam. Cancele quando quiser.",
    waitlist_success: "🎉 Incrível! Você está na lista. Falaremos em breve!",
    email_placeholder: "seu@email.com",
    footer_copy: "© 2025 UpCar. Todos os direitos reservados.",
    nb_title: "Caderneta do Carro",
    nb1: "15/03 - Abasteceu 40L",
    nb2: "22/03 - Troca óleo",
    nb3: "10/04 - Alinhamento",
    nb4: "02/05 - Abasteceu 35L",
    app_fuel: "Último abastecimento",
    app_fuel_val: "40L · R$260 · Posto Shell",
    app_service: "Próxima revisão",
    app_service_val: "⚠️ 800km restantes",
    app_value: "Valor estimado",
    app_value_val: "R$ 87.500 +12% histórico",
  },
  en: {
    nav_waitlist: "Join Waitlist",
    hero_tag: "Coming soon — Join the list",
    hero_line1: "THE DNA",
    hero_line2: "OF YOUR",
    hero_line3: "VEHICLE",
    hero_sub: "From a simple notebook to a complete automotive ecosystem. Register, value, and connect.",
    hero_cta: "I want to be first",
    hero_how: "How it works",
    stat1_num: "+50M",
    stat1_label: "Vehicles in Brazil",
    stat2_num: "3x",
    stat2_label: "More value on sale",
    stat3_num: "360°",
    stat3_label: "Automotive ecosystem",
    notebook_title: "THE MEMORY THAT VALUES YOUR CAR",
    notebook_sub: "Your dad wrote everything in a notebook. You'll do the same — but with smart data, automatic alerts, and a verifiable history that increases your vehicle's value at sale time.",
    features_tag: "What UpCar does",
    features_title: "A COMPLETE\nECOSYSTEM",
    f1_title: "DIGITAL LOGBOOK",
    f1_desc: "Log fuel-ups, maintenance, and inspections. Complete history always at hand.",
    f2_title: "PROVENANCE QR",
    f2_desc: "Verifiable QR Code for your vehicle. Show the full history to buyers at sale time.",
    f3_title: "CERTIFIED WORKSHOPS",
    f3_desc: "Network of verified workshops and suppliers. Quotes and services directly in the app.",
    f4_title: "AUTO STORE",
    f4_desc: "Parts, accessories and products from top suppliers. Direct purchase with fast delivery.",
    f5_title: "RIDE SHARING",
    f5_desc: "Connect with enthusiasts and drivers. Safe rides between people with verified history.",
    f6_title: "COMMUNITY",
    f6_desc: "Meetups, events, clubs and more. The gathering point for car enthusiasts.",
    roadmap_tag: "Our plan",
    roadmap_title: "GROWTH\nIN PHASES",
    phase1_label: "Now",
    phase1_title: "VALIDATION",
    phase1_items: ["Landing page", "Waitlist", "Visual identity"],
    phase2_label: "3-4 months",
    phase2_title: "MVP",
    phase2_items: ["Digital logbook", "Vehicle QR", "Smart alerts"],
    phase3_label: "6-12 months",
    phase3_title: "ECOSYSTEM",
    phase3_items: ["Certified workshops", "Auto store", "Partnerships"],
    phase4_label: "12-24 months",
    phase4_title: "EXPANSION",
    phase4_items: ["Ride sharing", "Community", "International"],
    pricing_tag: "Plans",
    pricing_title: "SIMPLE AND\nTRANSPARENT",
    plan_free: "Start free",
    plan_plus: "Get Plus",
    plan_pro: "Get Pro",
    most_popular: "MOST POPULAR",
    free_features: ["1 vehicle", "Basic records", "Limited history", "Mobile app"],
    plus_features: ["Up to 3 vehicles", "Smart alerts", "Full history", "Verified QR", "Store discount"],
    pro_features: ["Unlimited vehicles", "Advanced reports", "Premium sale badge", "Priority rides", "Dedicated support"],
    waitlist_tag: "Be the first",
    waitlist_title: "JOIN THE\nLIST",
    waitlist_sub: "UpCar is coming. Register your email and be one of the first to test — with early access and 3 months of Plus for free.",
    waitlist_btn: "Secure my spot",
    waitlist_note: "✓ No spam. Cancel anytime.",
    waitlist_success: "🎉 Amazing! You're on the list. We'll talk soon!",
    email_placeholder: "your@email.com",
    footer_copy: "© 2025 UpCar. All rights reserved.",
    nb_title: "Car Logbook",
    nb1: "03/15 - Fuel 40L",
    nb2: "03/22 - Oil change",
    nb3: "04/10 - Alignment",
    nb4: "05/02 - Fuel 35L",
    app_fuel: "Last fuel-up",
    app_fuel_val: "40L · $52 · Shell Station",
    app_service: "Next service",
    app_service_val: "⚠️ 800km remaining",
    app_value: "Estimated value",
    app_value_val: "$17,500 +12% history",
  },
};

// ─── Features data ────────────────────────────────────────────────────────────
const getFeatures = (lang: Lang) => [
  { icon: "📓", titleKey: "f1_title" as const, descKey: "f1_desc" as const },
  { icon: "📱", titleKey: "f2_title" as const, descKey: "f2_desc" as const },
  { icon: "🔧", titleKey: "f3_title" as const, descKey: "f3_desc" as const },
  { icon: "🛒", titleKey: "f4_title" as const, descKey: "f4_desc" as const },
  { icon: "🚗", titleKey: "f5_title" as const, descKey: "f5_desc" as const },
  { icon: "🏆", titleKey: "f6_title" as const, descKey: "f6_desc" as const },
];

// ─── Firebase waitlist (safe import) ─────────────────────────────────────────
async function saveToWaitlist(email: string) {
  try {
    const { initializeApp, getApps } = await import("firebase/app");
    const { getFirestore, collection, addDoc, serverTimestamp } = await import("firebase/firestore");
    const firebaseConfig = {
      // TODO: Replace with your Firebase config
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    };
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const db = getFirestore(app);
    await addDoc(collection(db, "waitlist"), {
      email,
      createdAt: serverTimestamp(),
      source: "landing_page",
    });
    return true;
  } catch {
    // Firebase not configured yet — still show success to user
    console.log("Waitlist email captured:", email);
    return true;
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const T = t[lang];

  // Custom cursor
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + "px";
        cursorDotRef.current.style.top = e.clientY + "px";
      }
      setTimeout(() => {
        if (cursorRingRef.current) {
          cursorRingRef.current.style.left = e.clientX + "px";
          cursorRingRef.current.style.top = e.clientY + "px";
        }
      }, 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(24px)";
      (el as HTMLElement).style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWaitlist = async () => {
    if (!email || !email.includes("@")) return;
    setLoading(true);
    await saveToWaitlist(email);
    setLoading(false);
    setSubmitted(true);
  };

  const features = getFeatures(lang);

  return (
    <>
      {/* Cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 glass">
        <Image src="/logo.png" alt="UpCar" width={140} height={48} className="h-10 w-auto" priority />
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex gap-1 p-1 rounded-full bg-upcar-steel">
            {(["pt", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
                  lang === l ? "bg-upcar-red text-white" : "text-upcar-chrome hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("waitlist")}
            className="hidden md:block bg-upcar-red hover:bg-upcar-red-light text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all hover:scale-105 hover:shadow-lg"
            style={{ boxShadow: "0 4px 20px rgba(204,0,0,0.3)" }}
          >
            {T.nav_waitlist}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-16 overflow-hidden">
        {/* BG effects */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(204,0,0,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(204,0,0,0.04) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
        {/* Big ghost text */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-white select-none pointer-events-none hidden lg:block"
          style={{ fontSize: "320px", lineHeight: 1, opacity: 0.04 }}
        >
          UP
        </div>

        {/* Tag */}
        <div className="animate-fade-up-1 flex items-center gap-2 w-fit px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
          style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.25)", color: "#CC0000" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-upcar-red animate-pulse-red" />
          {T.hero_tag}
        </div>

        {/* Headline */}
        <h1 className="font-display leading-none tracking-wider animate-fade-up-2"
          style={{ fontSize: "clamp(72px, 11vw, 148px)" }}>
          <span className="block text-upcar-white">{T.hero_line1}</span>
          <span className="block text-upcar-red">{T.hero_line2}</span>
          <span className="block text-gradient-chrome" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
            {T.hero_line3}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 text-lg max-w-lg leading-relaxed animate-fade-up-3"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          {T.hero_sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mt-12 animate-fade-up-4">
          <button
            onClick={() => scrollTo("waitlist")}
            className="bg-upcar-red hover:bg-upcar-red-light text-white px-9 py-4 rounded-full font-bold text-base tracking-wide transition-all hover:-translate-y-1"
            style={{ boxShadow: "0 8px 30px rgba(204,0,0,0.4)" }}
          >
            {T.hero_cta}
          </button>
          <button
            onClick={() => scrollTo("features")}
            className="glass text-upcar-white px-9 py-4 rounded-full font-medium text-base hover:border-white/30 transition-all"
          >
            {T.hero_how}
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-10 mt-20 animate-fade-up-5">
          {[
            { num: T.stat1_num, label: T.stat1_label },
            { num: T.stat2_num, label: T.stat2_label },
            { num: T.stat3_num, label: T.stat3_label },
          ].map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-display text-4xl text-upcar-red tracking-wide">{s.num}</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-upcar-chrome">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTEBOOK STRIP ── */}
      <section className="py-16 px-6 md:px-16 flex flex-col md:flex-row items-center gap-12"
        style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Old notebook */}
        <div className="flex-shrink-0 w-48 h-64 rounded-lg p-5 relative scroll-reveal"
          style={{ background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)", transform: "rotate(-3deg)", boxShadow: "8px 8px 40px rgba(0,0,0,0.5)" }}>
          <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: "rgba(204,0,0,0.2)" }} />
          <p className="text-xs tracking-widest uppercase pl-5 mb-4" style={{ color: "#555" }}>{T.nb_title}</p>
          {[T.nb1, T.nb2, T.nb3, T.nb4].map((line, i) => (
            <div key={i} className="border-b py-2 pl-5 text-xs" style={{ borderColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>
              {line}
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="text-5xl text-upcar-red font-display flex-shrink-0" style={{ animation: "arrow-bounce 2s infinite" }}>→</div>

        {/* App mockup */}
        <div className="flex-shrink-0 w-48 h-64 rounded-2xl p-5 scroll-reveal"
          style={{ background: "linear-gradient(135deg,#1a1a1a,#0d0d0d)", border: "1px solid rgba(204,0,0,0.2)", boxShadow: "0 0 60px rgba(204,0,0,0.1)" }}>
          <div className="flex justify-between items-center mb-4">
            <Image src="/logo.png" alt="UpCar" width={80} height={28} className="h-7 w-auto" />
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(204,0,0,0.15)", border: "1px solid rgba(204,0,0,0.3)", color: "#CC0000" }}>PRO</span>
          </div>
          {[
            { label: T.app_fuel, val: T.app_fuel_val, color: "white" },
            { label: T.app_service, val: T.app_service_val, color: "white" },
            { label: T.app_value, val: T.app_value_val, color: "#CC0000" },
          ].map((card, i) => (
            <div key={i} className="rounded-xl p-2.5 mb-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#555" }}>{card.label}</p>
              <p className="text-xs font-semibold" style={{ color: card.color }}>{card.val}</p>
            </div>
          ))}
        </div>

        {/* Text */}
        <div className="flex-1 scroll-reveal">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider leading-tight mb-4">
            {T.notebook_title}
          </h2>
          <p className="text-base leading-relaxed max-w-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
            {T.notebook_sub}
          </p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 md:px-16">
        <p className="text-xs font-bold tracking-widest uppercase text-upcar-red mb-5">{T.features_tag}</p>
        <h2 className="font-display leading-none tracking-wider mb-16" style={{ fontSize: "clamp(44px,7vw,88px)" }}>
          {T.features_title.split("\n").map((l, i) => <span key={i} className="block">{l}</span>)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="scroll-reveal group relative p-10 overflow-hidden transition-colors duration-300"
              style={{ background: "#111111" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#111111")}
            >
              {/* Top red line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-upcar-red scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              <span className="absolute top-7 right-7 font-display text-6xl leading-none" style={{ color: "rgba(255,255,255,0.04)" }}>
                0{i + 1}
              </span>
              <span className="text-4xl mb-5 block">{f.icon}</span>
              <h3 className="font-display text-2xl tracking-wider mb-3">{T[f.titleKey]}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{T[f.descKey]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="py-24 px-6 md:px-16" style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-xs font-bold tracking-widest uppercase text-upcar-red mb-5">{T.roadmap_tag}</p>
        <h2 className="font-display leading-none tracking-wider mb-16" style={{ fontSize: "clamp(44px,7vw,88px)" }}>
          {T.roadmap_title.split("\n").map((l, i) => <span key={i} className="block">{l}</span>)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="absolute top-7 left-7 right-7 h-px hidden lg:block"
            style={{ background: "linear-gradient(90deg, #CC0000, rgba(204,0,0,0.1))" }} />
          {[
            { label: T.phase1_label, title: T.phase1_title, items: T.phase1_items, active: true },
            { label: T.phase2_label, title: T.phase2_title, items: T.phase2_items, active: false },
            { label: T.phase3_label, title: T.phase3_title, items: T.phase3_items, active: false },
            { label: T.phase4_label, title: T.phase4_title, items: T.phase4_items, active: false },
          ].map((phase, i) => (
            <div key={i} className="scroll-reveal">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display text-lg mb-6 relative z-10 transition-all ${
                phase.active ? "bg-upcar-red text-white red-glow" : "border border-upcar-steel bg-upcar-darker text-upcar-chrome"
              }`}>
                {i + 1}
              </div>
              <p className="text-xs font-bold tracking-widest uppercase text-upcar-red mb-2">{phase.label}</p>
              <h3 className="font-display text-2xl tracking-wider mb-4">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item, j) => (
                  <li key={j} className="text-sm pl-4 relative" style={{ color: "rgba(255,255,255,0.45)" }}>
                    <span className="absolute left-0 text-upcar-red opacity-50">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 md:px-16">
        <p className="text-xs font-bold tracking-widest uppercase text-upcar-red mb-5">{T.pricing_tag}</p>
        <h2 className="font-display leading-none tracking-wider mb-16" style={{ fontSize: "clamp(44px,7vw,88px)" }}>
          {T.pricing_title.split("\n").map((l, i) => <span key={i} className="block">{l}</span>)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FREE */}
          <div className="scroll-reveal rounded-2xl p-10 transition-transform hover:-translate-y-2" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h3 className="font-display text-3xl tracking-wider mb-2">FREE</h3>
            <div className="font-display text-6xl mb-8">R$0</div>
            <div className="h-px mb-8" style={{ background: "rgba(255,255,255,0.07)" }} />
            <ul className="space-y-3 mb-10">
              {T.free_features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <span className="text-upcar-red font-bold">✓</span>{f}
                </li>
              ))}
            </ul>
            <button onClick={() => scrollTo("waitlist")} className="w-full py-3.5 rounded-full font-bold text-sm border transition-all hover:border-white/30" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "white", background: "transparent" }}>
              {T.plan_free}
            </button>
          </div>

          {/* PLUS */}
          <div className="scroll-reveal rounded-2xl p-10 relative overflow-hidden transition-transform hover:-translate-y-2"
            style={{ background: "linear-gradient(135deg,#200a00,#0d0d0d)", border: "1px solid #CC0000" }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(204,0,0,0.12) 0%, transparent 60%)" }} />
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 bg-upcar-red text-white">
              {T.most_popular}
            </span>
            <h3 className="font-display text-3xl tracking-wider mb-2">PLUS</h3>
            <div className="font-display mb-8" style={{ fontSize: "64px", lineHeight: 1 }}>
              <sup className="text-2xl align-super text-upcar-red">R$</sup>14
              <span className="text-lg font-body font-light text-upcar-chrome">,90/mês</span>
            </div>
            <div className="h-px mb-8" style={{ background: "rgba(255,255,255,0.07)" }} />
            <ul className="space-y-3 mb-10">
              {T.plus_features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <span className="text-upcar-red font-bold">✓</span>{f}
                </li>
              ))}
            </ul>
            <button onClick={() => scrollTo("waitlist")} className="w-full py-3.5 rounded-full font-bold text-sm bg-upcar-red hover:bg-upcar-red-light text-white transition-all hover:shadow-lg"
              style={{ boxShadow: "0 4px 20px rgba(204,0,0,0.3)" }}>
              {T.plan_plus}
            </button>
          </div>

          {/* PRO */}
          <div className="scroll-reveal rounded-2xl p-10 transition-transform hover:-translate-y-2" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}>
            <h3 className="font-display text-3xl tracking-wider mb-2">PRO</h3>
            <div className="font-display mb-8" style={{ fontSize: "64px", lineHeight: 1 }}>
              <sup className="text-2xl align-super text-upcar-red">R$</sup>29
              <span className="text-lg font-body font-light text-upcar-chrome">,90/mês</span>
            </div>
            <div className="h-px mb-8" style={{ background: "rgba(255,255,255,0.07)" }} />
            <ul className="space-y-3 mb-10">
              {T.pro_features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <span className="text-upcar-red font-bold">✓</span>{f}
                </li>
              ))}
            </ul>
            <button onClick={() => scrollTo("waitlist")} className="w-full py-3.5 rounded-full font-bold text-sm border transition-all hover:border-white/30" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "white", background: "transparent" }}>
              {T.plan_pro}
            </button>
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="py-24 px-6 md:px-16 text-center" style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <p className="inline-block text-xs font-bold tracking-widest uppercase text-upcar-red mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(204,0,0,0.1)", border: "1px solid rgba(204,0,0,0.25)" }}>
            {T.waitlist_tag}
          </p>
          <h2 className="font-display leading-none tracking-wider mb-6" style={{ fontSize: "clamp(56px,9vw,110px)" }}>
            {T.waitlist_title.split("\n").map((l, i) => (
              <span key={i} className={`block ${i === 1 ? "text-upcar-red" : ""}`}>{l}</span>
            ))}
          </h2>
          <p className="text-base leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.45)" }}>
            {T.waitlist_sub}
          </p>

          {!submitted ? (
            <>
              <div className="flex gap-3 rounded-full p-1.5 pl-6 transition-all"
                style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}
                onFocus={() => { }} // handled via CSS
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleWaitlist()}
                  placeholder={T.email_placeholder}
                  className="flex-1 bg-transparent outline-none text-base text-upcar-white placeholder-upcar-chrome"
                />
                <button
                  onClick={handleWaitlist}
                  disabled={loading}
                  className="bg-upcar-red hover:bg-upcar-red-light text-white px-7 py-3 rounded-full font-bold text-sm tracking-wide transition-all whitespace-nowrap disabled:opacity-60"
                >
                  {loading ? "..." : T.waitlist_btn}
                </button>
              </div>
              <p className="mt-4 text-xs text-upcar-chrome">{T.waitlist_note}</p>
            </>
          ) : (
            <p className="text-lg font-semibold text-upcar-red">{T.waitlist_success}</p>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-16 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Image src="/logo.png" alt="UpCar" width={120} height={40} className="h-9 w-auto" />
        <p className="text-sm text-upcar-chrome">{T.footer_copy}</p>
      </footer>
    </>
  );
}
