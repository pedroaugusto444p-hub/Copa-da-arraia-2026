import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  AlertCircle,
  BookOpen,
  Star,
  ShieldCheck,
  ArrowRight,
  Download,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Flame,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, AnimatedSection } from "@/components/Section";
import { Button } from "@/components/Button";
import { useCreateLead } from "@workspace/api-client-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const kitPreviews = [
  {
    url: "https://i.ibb.co/6JBW0Bch/Guia-Pratico-do-Marcador-de-Quadrilha.png",
    title: "Guia do Marcador",
    desc: "Guia da quadrilha com falas clássicas e comandos divertidos com termos do futebol.",
  },
  {
    url: "https://i.ibb.co/rR90pkVL/Roteiro-Detalhado-do-Cerimonial.png",
    title: "Roteiro do Cerimonial",
    desc: "Passo a passo cerimonial completo da festa, do início até o encerramento.",
  },
  {
    url: "https://i.ibb.co/0y7wn70X/Guia-Pratico-de-Ensaios.png",
    title: "Guia de Ensaios",
    desc: "Estrutura e dinâmicas criadas para organizar o pátio e prender a atenção das crianças.",
  },
  {
    url: "https://i.ibb.co/sJsqLRmG/Gemini-Generated-Image.png",
    title: "Painel Gigante 'Arraiá do Hexa'",
    desc: "Painel ilustrado gigante dividido em formato de folhas A4, pronto para imprimir e montar.",
  },
  {
    url: "https://i.ibb.co/230kt3gM/Captura-de-Tela-344.png",
    title: "Material Completo do Kit",
    desc: "Visão geral de todos os materiais incluídos no Kit Arraiá da Copa 2026.",
  },
  {
    url: "https://i.ibb.co/57xFLmD/Captura-de-Tela-335.png",
    title: "Kit Completo 2026",
    desc: "Todo o material de apoio, brincadeiras e coreografias para um São João inesquecível.",
  },
  {
    url: "https://i.ibb.co/rfQGnGdD/Captura-de-Tela-336.png",
    title: "Atividades de Alfabetização",
    desc: "Folhas temáticas e lúdicas prontas para aplicar em sala de aula.",
  },
  {
    url: "https://i.ibb.co/sJzQ4ThR/Captura-de-Tela-337.png",
    title: "Atividades de Matemática & Junina",
    desc: "Jogos e exercícios divertidos interligando São João e Copa do Mundo.",
  },
];

export default function LandingPage() {
  const createLead = useCreateLead();
  const [purchaseNotification, setPurchaseNotification] = useState<{ name: string; plan: string; city: string } | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      setCarouselIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % kitPreviews.length;
        const container = document.getElementById("compact-carousel");
        if (container) {
          const width = container.clientWidth;
          container.scrollTo({
            left: nextIndex * width,
            behavior: "smooth",
          });
        }
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(autoplayInterval);
  }, [kitPreviews.length]);

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const width = container.clientWidth;
    if (width > 0) {
      const index = Math.round(container.scrollLeft / width);
      if (index !== carouselIndex && index >= 0 && index < kitPreviews.length) {
        setCarouselIndex(index);
      }
    }
  };

  const scrollCarousel = (direction: "left" | "right") => {
    const container = document.getElementById("compact-carousel");
    if (!container) return;
    const width = container.clientWidth;
    let nextIndex = carouselIndex;
    if (direction === "left") {
      nextIndex = (carouselIndex - 1 + kitPreviews.length) % kitPreviews.length;
    } else {
      nextIndex = (carouselIndex + 1) % kitPreviews.length;
    }
    container.scrollTo({
      left: nextIndex * width,
      behavior: "smooth",
    });
    setCarouselIndex(nextIndex);
  };

  useEffect(() => {
    const purchases = [
      { name: "Patrícia", plan: "Kit Completo 2026", city: "Curitiba" },
      { name: "Ana Maria", plan: "Kit Completo 2026", city: "São Paulo" },
      { name: "Juliana Santos", plan: "Acesso Essencial", city: "Belo Horizonte" },
      { name: "Carla Silveira", plan: "Kit Completo 2026", city: "Porto Alegre" },
      { name: "Prof. Renata", plan: "Kit Completo 2026", city: "Rio de Janeiro" },
      { name: "Sandra Regina", plan: "Kit Completo 2026", city: "Salvador" },
      { name: "Amanda Melo", plan: "Acesso Essencial", city: "Fortaleza" },
    ];

    let currentIndex = 0;

    const showNotification = () => {
      const current = purchases[currentIndex];
      setPurchaseNotification({ name: current.name, plan: current.plan, city: current.city });
      currentIndex = (currentIndex + 1) % purchases.length;
      setTimeout(() => setPurchaseNotification(null), 6000);
    };

    const interval = setInterval(showNotification, 14000);
    const initialTimeout = setTimeout(showNotification, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) pricingSection.scrollIntoView({ behavior: "smooth" });
  };

  const handlePurchase = (productName: string) => {
    createLead.mutate({
      data: { name: `Interessada em ${productName}`, email: "cliente@venda.com" },
    });

    if (productName === "Acesso Essencial") {
      setShowUpsell(true);
    } else if (productName === "Kit Completo 2026") {
      window.location.href = "https://pay.wiapy.com/lV6fBJ4kvs";
    } else if (productName === "Oferta Especial") {
      window.location.href = "https://pay.wiapy.com/CbLh-Nx9Bz";
    } else {
      window.location.href = "https://pay.wiapy.com/YXpgWOT2I4";
    }
  };

  const confirmEssencial = () => {
    setShowUpsell(false);
    window.location.href = "https://pay.wiapy.com/YXpgWOT2I4";
  };

  return (
    <div className="min-h-screen text-slate-700 overflow-x-hidden selection:bg-yellow-200 selection:text-green-900 bg-slate-50/50">

      {/* TOP BANNER */}
      <div className="bg-yellow-400 text-green-900 py-2.5 px-4 font-bold text-center text-xs md:text-sm tracking-wide shadow-sm flex items-center justify-center gap-2">
        <Sparkles size={16} className="animate-spin text-green-800" />
        <span>FESTA JUNINA TEMÁTICA DA SELEÇÃO BRASILEIRA EM 2026! 🇧🇷🎉⚽️</span>
      </div>

      {/* 1. HERO */}
      <div className="relative bg-gradient-to-b from-green-50/40 via-yellow-50/30 to-white pt-12 pb-16 md:pt-24 md:pb-24 overflow-hidden border-b border-green-100/40">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-green-200/30 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
            <div className="flex-1 text-center md:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-full border border-green-200/60 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs sm:text-sm font-bold text-green-700">Material Inédito 2026</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 leading-[1.1] tracking-tight">
                  KIT ARRAIÁ <br />
                  <span className="font-handwriting inline-block transform -rotate-2 py-1 bg-yellow-300 px-3 rounded shadow-md text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-green-700">
                    DA COPA 2026
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-xl text-slate-700 font-bold mb-4 px-2 md:px-0 leading-relaxed">
                  Professora ou mãe, garanta sua Festa Junina Temática da Seleção com tudo pronto!
                </p>

                <p className="text-slate-600 mb-8 max-w-xl mx-auto md:mx-0 text-sm sm:text-base leading-relaxed">
                  Planeje agora, antes do dia do evento, e evite a correria de última hora com ensaios e decoração.
                </p>

                <div className="flex flex-col gap-3.5 mb-8 max-w-md mx-auto md:mx-0 text-left">
                  {[
                    "Kit atualizado para a Copa do Mundo 2026",
                    "Educação Infantil e Ensino Fundamental",
                    "Ideal para planejamento antecipado do evento",
                    "Tudo pronto para imprimir e aplicar",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-green-700 font-bold">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 font-medium text-sm sm:text-base">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button
                    onClick={scrollToPricing}
                    variant="cta"
                    size="lg"
                    className="w-full sm:w-auto min-w-[280px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all text-sm md:text-base tracking-wider"
                  >
                    COMEÇAR O ARRAIÁ PREPARADA
                  </Button>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5 text-xs text-slate-500">
                  <span className="font-semibold text-green-700">Kit Completo 2026</span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span>Mais de 2.000 professoras e mães já garantiram.</span>
                </div>
              </motion.div>
            </div>

            <div className="flex-1 w-full max-w-lg md:max-w-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/30 to-green-600/20 rounded-3xl transform rotate-2 scale-105 blur-md"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl border-4 border-yellow-300 overflow-hidden flex flex-col bg-slate-50">
                  <img
                    src="https://i.ibb.co/3yYQ45Fj/Chat-GPT-Image-1-de-jun-de-2026-22-39-24-1.png"
                    alt="Kit Arraiá da Copa 2026"
                    className="w-full h-auto"
                  />
                  <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-extrabold text-sm sm:text-base">Arraiá do Hexa 2026 🇧🇷</p>
                        <p className="text-xs text-yellow-300 font-medium">Festa Junina Temática Integrada</p>
                      </div>
                      <div className="flex -space-x-1.5 align-middle">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full border-2 border-green-800 bg-cover bg-center"
                            style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 45})` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-white px-3.5 py-2.5 rounded-xl shadow-xl border border-yellow-100 transform rotate-6 flex items-center gap-2"
                >
                  <div className="bg-yellow-400 p-1.5 rounded-lg text-green-900">
                    <Star size={16} fill="currentColor" stroke="none" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avaliação</p>
                    <p className="text-xs font-extrabold text-slate-800">5.0 Estrelas ★★★★★</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DOR */}
      <AnimatedSection background="light" className="border-b border-slate-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight leading-tight">
              Seja sincera... <br />
              <span className="text-red-600 font-bold text-xl md:text-2xl inline-block mt-1">
                Você já passou por isso na hora de organizar a Festa Junina na escola?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              "A data do evento chegando e você ainda sem nada pronto",
              "A apresentação batendo na porta e os alunos dispersos",
              "Passos e coreografias para preparar em cima da hora",
              "Noites cansativas e pouco tempo para organizar toda a decoração e roteiro",
            ].map((text, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-start gap-3.5 hover:shadow-md transition-all">
                <div className="bg-red-50 p-2.5 rounded-lg text-red-500 shrink-0">
                  <AlertCircle size={22} className="stroke-2" />
                </div>
                <p className="text-sm md:text-base text-slate-700 font-semibold pt-0.5 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-50/50 p-6 md:p-8 rounded-2xl border-l-4 border-yellow-500 shadow-md max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-xl text-green-800 font-extrabold italic leading-relaxed">
              "O problema não é falta de dedicação. É falta de tempo e excesso de tarefas."
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* 3. VIRADA */}
      <AnimatedSection background="white" className="py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto px-4">
          <div className="relative order-2 md:order-1 max-w-sm md:max-w-none mx-auto w-full">
            <div className="absolute inset-0 bg-green-200/40 rounded-3xl transform -rotate-2 scale-102 blur-sm"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://i.ibb.co/KcDK1svT/Design-sem-nome.png"
                alt="Professora tranquila se organizando com antecedência"
                className="w-full h-auto object-cover max-h-[360px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold tracking-wider uppercase">Festeje Sem Stress</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-full font-extrabold text-xs uppercase tracking-wider mb-4 border border-yellow-200">
              A VIRADA DE CHAVE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 text-slate-800 leading-tight">
              Quem usa as ferramentas certas...
            </h2>
            <p className="text-slate-500 text-sm mb-6 font-medium">
              Ter tudo pronto com o material certo muda tudo o que você sente na semana da festa:
            </p>
            <div className="space-y-6">
              {[
                { title: "Começa o mês do evento mais tranquila", desc: "Sem aquela ansiedade ou estresse nos dias que antecedem a festa." },
                { title: "Evita o caos da última semana", desc: "Tudo já está impresso, planejado e os passos definidos." },
                { title: "Consegue aproveitar melhor os finais de semana", desc: "Descanse de verdade sabendo que o trabalho duro de roteiro e painel já foi feito." },
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 bg-green-50 w-9 h-9 rounded-full flex items-center justify-center text-green-700 flex-shrink-0 border border-green-200">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800 leading-snug">{benefit.title}</h3>
                    <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. PRODUTO */}
      <Section background="primary" className="text-center py-16 md:py-20 bg-gradient-to-r from-green-800 to-emerald-900 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            KIT ARRAIÁ DA COPA 2026
          </h2>
          <p className="text-md sm:text-lg md:text-xl text-yellow-100 mb-8 leading-relaxed max-w-3xl mx-auto font-medium">
            Um kit de atividades, roteiros e decorações organizado especialmente para a{" "}
            <span className="text-white font-bold underline decoration-yellow-400 underline-offset-4">
              união das duas maiores paixões nacionais
            </span>{" "}
            em 2026, pensado para: <br />
            <span className="font-extrabold text-white text-lg sm:text-xl mt-2 block">
              Professoras, Mães educadoras e Reforço escolar.
            </span>
          </p>
          <div className="bg-yellow-400 text-green-950 rounded-2xl py-4 px-6 md:px-10 inline-block shadow-lg border border-yellow-300">
            <p className="text-lg md:text-xl font-extrabold tracking-wide">
              🎉 Tudo já está pronto. Você só imprime e aplica.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* 5. CAROUSEL */}
      <AnimatedSection background="white" className="py-16 md:py-20 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100 inline-block mb-3">Conteúdo do Kit</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 leading-tight">O que você vai receber</h2>
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">Confira os detalhes de cada material incluído no seu kit completo.</p>
          </div>

          <div className="relative group max-w-md mx-auto">
            <div 
              className="relative flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth px-2" 
              id="compact-carousel"
              onScroll={handleCarouselScroll}
            >
              {kitPreviews.map((item, i) => (
                <div key={i} className="min-w-full snap-center px-1">
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col h-full">
                    <div className="relative bg-slate-50 flex items-center justify-center p-2">
                      <img src={item.url} alt={item.title} referrerPolicy="no-referrer" className="w-full h-auto object-contain max-h-72" />
                      <div className="absolute top-3 right-3 bg-green-700 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
                        {i + 1} / {kitPreviews.length}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-center text-center border-t border-slate-50">
                      <h4 className="font-extrabold text-slate-800 text-base sm:text-lg mb-1.5">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 px-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 rounded-full shadow-sm hover:bg-slate-100 transition-all"
                onClick={() => scrollCarousel("left")}
              >
                <ChevronLeft size={16} className="text-slate-600" />
              </Button>
              <div className="flex gap-1.5 items-center">
                {kitPreviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const container = document.getElementById("compact-carousel");
                      if (container) {
                        container.scrollTo({
                          left: idx * container.clientWidth,
                          behavior: "smooth",
                        });
                        setCarouselIndex(idx);
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      carouselIndex === idx ? "bg-green-700 w-4" : "bg-slate-200 hover:bg-slate-300"
                    }`}
                    style={{ width: carouselIndex === idx ? "1rem" : "0.5rem" }}
                    aria-label={`Ir para slide ${idx + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 rounded-full shadow-sm hover:bg-slate-100 transition-all"
                onClick={() => scrollCarousel("right")}
              >
                <ChevronRight size={16} className="text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 6. DETALHAMENTO */}
      <AnimatedSection background="light" className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2 leading-tight">O que você vai receber?</h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium">Materiais completos e prontos para facilitar sua vida escolar</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4"></div>
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6 border border-green-200">
                <BookOpen size={24} />
              </div>
              <h3 className="text-2xl font-extrabold mb-6 text-slate-800">Itens do Kit</h3>
              <ul className="space-y-4">
                {[
                  "Kit Completo (Educação Infantil e Ensino Fundamental)",
                  "Acesso vitalício ao material",
                  "PDFs prontos em alta resolução para imprimir",
                  "Acesso imediato no seu e-mail e WhatsApp",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-slate-700 font-semibold text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-yellow-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-yellow-50 rounded-bl-full -mr-4 -mt-4"></div>
              <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-xl flex items-center justify-center mb-6 border border-yellow-200">
                <Star size={24} fill="currentColor" stroke="none" />
              </div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-extrabold text-slate-800">Bônus Grátis Incluso</h3>
                <span className="bg-yellow-400 text-green-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Incluso</span>
              </div>
              <ul className="space-y-4">
                {["Roteiro de Ensaios da Quadrilha", "Roteiro Detalhado do Início ao Fim", "Guia do Marcador com Falas Prontas"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-yellow-600 flex-shrink-0 mt-1" size={18} strokeWidth={3} />
                    <span className="text-slate-700 text-sm sm:text-base font-semibold leading-relaxed">
                      <span className="text-yellow-700 font-extrabold text-[9px] uppercase mr-1.5 bg-yellow-100 border border-yellow-200 px-1.5 py-0.5 rounded">🎁 Bônus Grátis</span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 7. PÚBLICO-ALVO */}
      <Section background="white" className="py-16">
        <div className="max-w-4xl mx-auto px-4 bg-gradient-to-br from-slate-50 to-green-50/20 rounded-3xl p-8 md:p-12 border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10 text-slate-800 tracking-tight">PARA QUEM É ESSE KIT?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "É professora da educação infantil ou ensino fundamental.",
              "É mãe e acompanha/ajuda nos eventos e aprendizado do filho.",
              "Trabalha com reforço escolar ou projetos comunitários/igrejas.",
              "Quer salvar este mês de São João com tudo perfeitamente organizado.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:-translate-y-0.5 transition-transform">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-green-950 font-extrabold text-sm shrink-0">
                  {i + 1}
                </div>
                <span className="font-semibold text-slate-700 text-sm sm:text-base pt-1 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 8. POR QUE FUNCIONA */}
      <AnimatedSection background="light" className="border-y border-slate-100 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-4 tracking-tight uppercase">POR QUE ESSE KIT FUNCIONA?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              "Pensado especificamente para a sazonalidade e o ano letivo de 2026.",
              "Economiza dezenas de horas de planejamento e montagem de roteiros.",
              "Reduz drasticamente o estresse com ensaios e preparativos de última hora.",
              "Ajuda você a comandar o evento da escola com muito mais segurança.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 bg-green-50 w-7 h-7 rounded-full flex items-center justify-center text-green-700 flex-shrink-0 border border-green-200">
                  <Check size={16} strokeWidth={3} />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-slate-700 font-bold leading-normal">{item}</p>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 max-w-xl mx-auto shadow-sm">
            <p className="text-base sm:text-lg text-center text-green-700 font-extrabold italic">"Planejar antes muda tudo."</p>
          </div>
        </div>
      </AnimatedSection>

      {/* 9. OFERTA */}
      <Section background="white" className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-red-600 mb-2">
              Festa este mês? Resolva o seu planejamento e ensaios AGORA!
            </h3>
            <p className="text-sm font-semibold text-slate-500">Valor promocional por tempo limitado</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border-2 border-dashed border-red-200 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base font-extrabold text-slate-800 mb-5">Esse valor promocional é exclusivo para quem:</p>
            <div className="space-y-4 mb-6">
              {["Planeja com antecedência", "Quer descansar nos dias de folga", "Não quer sofrer na semana da apresentação"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0 border border-green-200">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm text-center">
              <p className="text-sm md:text-base text-red-600 font-extrabold italic">"Quem deixa para depois, paga com estresse."</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 10. PRICING */}
      <AnimatedSection id="pricing" background="light" className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-green-700 bg-yellow-300 border border-yellow-400 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3">Valor Simbólico</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">ESCOLHA A MELHOR OPÇÃO PARA VOCÊ</h2>

          <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-slate-700 mb-12 font-medium bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="flex items-center justify-center gap-2">
              <span>Quer apenas o essencial?</span>
              <span className="font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded text-xs sm:text-sm">R$ 10 resolve.</span>
            </p>
            <p className="flex items-center justify-center gap-2 flex-wrap">
              <span>💡 Quer garantir o Painel Gigante, as Brincadeiras e todas as Atividades?</span>
              <span className="font-extrabold text-green-700 bg-green-50 px-2.5 py-0.5 rounded text-xs sm:text-sm">R$ 29,90 é a melhor opção.</span>
            </p>
            <p className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center justify-center gap-1">
              <span>👉 O Kit Completo 2026 é o mais escolhido.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-4xl mx-auto text-left">

            {/* OPÇÃO 1 */}
            <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 relative flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wide mb-1">Acesso Essencial</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <div>
                    <span className="text-xs line-through font-bold text-black">R$ 49,90</span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">R$ 10,00</div>
                  </div>
                  <span className="bg-red-100 text-red-600 border border-red-200 px-2 py-0.5 rounded font-extrabold text-xs">-80% de desconto</span>
                </div>
                <p className="text-slate-500 mb-6 text-xs sm:text-sm font-semibold">Ideal para quem quer apenas a base da apresentação gastando pouco.</p>
                <div className="space-y-3 mb-8 text-xs sm:text-sm">
                  {["Coreografia Passo a Passo", "Roteiro de Ensaio Prático", "Cronograma Completo da Apresentação", "Acesso vitalício", "PDFs prontos para imprimir", "Acesso imediato por e-mail e WhatsApp", "Suporte básico", "Templates de roteiro prontos para imprimir"].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check size={14} className="text-emerald-600 mt-1 shrink-0" strokeWidth={3} />
                      <span className="text-slate-700 font-semibold">{feat}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-slate-100 mt-3 space-y-2">
                    <p className="text-[10px] font-extrabold text-yellow-600 tracking-wider uppercase">Bônus Grátis:</p>
                    {["🎁 Roteiro de Ensaios da Quadrilha", "🎁 Roteiro Detalhado do Início ao Fim", "🎁 Guia do Marcador com Falas Prontas"].map((bonus, i) => (
                      <div key={i} className="flex items-start gap-2 bg-yellow-50/20 p-1.5 rounded border border-yellow-100/30">
                        <span className="text-[11px] font-extrabold text-slate-700">{bonus}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-extrabold text-red-600 border border-red-100 bg-red-50 p-2.5 rounded mt-4">
                    📢 (Atenção: Não inclui Painel Gigante, Figurinos ou Atividades Pedagógicas)
                  </p>
                </div>
              </div>
              <Button onClick={() => handlePurchase("Acesso Essencial")} variant="default" size="lg" className="w-full text-sm font-extrabold uppercase bg-green-600 hover:bg-green-700 text-white border-0 transition-all mt-4 shadow-lg shadow-green-600/30 animate-pulse-scale">
                QUERO O ESSENCIAL
              </Button>
            </motion.div>

            {/* OPÇÃO 2 */}
            <motion.div whileHover={{ y: -6 }} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-yellow-400 relative flex flex-col justify-between transform md:scale-[1.03] z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-green-950 px-4 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
                O mais escolhido 🙌
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-green-700 uppercase tracking-wide mb-1">Kit Completo 2026</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <div>
                    <span className="text-xs line-through font-bold text-black">R$ 97,00</span>
                    <div className="text-3xl sm:text-5xl font-extrabold text-slate-900">R$ 29,90</div>
                  </div>
                  <div className="flex flex-col">
                    <span className="bg-green-500 text-white px-2 py-0.5 rounded font-extrabold text-xs block text-center">PROMO</span>
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase mt-0.5">Lote 1</span>
                  </div>
                </div>
                <div className="space-y-3 mb-8 text-xs sm:text-sm">
                  {["Coreografia Passo a Passo", "Roteiro de Ensaio Prático", "Cronograma Completo da Apresentação", "Acesso vitalício", "PDFs prontos para imprimir", "Acesso imediato por e-mail e WhatsApp", "WhatsApp do suporte prioritário", "Templates prontos para imprimir"].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check size={14} className="text-emerald-600 mt-1 shrink-0" strokeWidth={3} />
                      <span className="text-slate-700 font-semibold">{feat}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-slate-100 mt-3 space-y-2">
                    <p className="text-[10px] font-extrabold text-green-700 tracking-wider uppercase">Bônus Grátis:</p>
                    {["🎁 Roteiro de Ensaios da Quadrilha", "🎁 Roteiro Detalhado do Início ao Fim", "🎁 Guia do Marcador com Falas Prontas"].map((bonus, i) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-50 p-1.5 rounded border border-slate-200">
                        <span className="text-[11px] font-semibold text-slate-700">{bonus}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-slate-100 mt-3 space-y-2">
                    <p className="text-[10px] font-extrabold text-red-600 tracking-wider uppercase flex items-center gap-1">
                      <Flame size={12} className="text-red-500" /> Bônus Exclusivos Lote 1:
                    </p>
                    {[
                      '🔥 Painel Gigante de Parede "Arraiá do Hexa" para Imprimir',
                      "🔥 Apostila Completa de Atividades Juninas Pedagógicas",
                      "🔥 Guia de Figurinos Criativos Verde e Amarelo para os Pais",
                      "🔥 Caderno de Jogos e Brincadeiras Juninas da Copa",
                    ].map((exBonus, i) => (
                      <div key={i} className="flex items-start gap-2 bg-green-50 p-1.5 rounded border border-green-100">
                        <span className="text-[11.5px] font-bold text-green-800">{exBonus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button onClick={() => handlePurchase("Kit Completo 2026")} variant="default" size="lg" className="w-full text-base font-extrabold uppercase bg-green-600 hover:bg-green-700 text-white border-0 transition-transform py-6 rounded-xl shadow-lg shadow-green-600/30 animate-pulse-scale">
                QUERO O KIT COMPLETO
              </Button>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* 11. DEPOIMENTOS */}
      <AnimatedSection background="light" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 leading-tight">O que professoras e mães dizem</h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium">Histórias reais de quem já começou a organizar o evento com o material preparado</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { text: "Este kit salvou a minha Festa Junina. Vou apresentar uma quadrilha linda da Seleção, super organizada, e ainda sobrou tempo para curtir meu final de semana. Recomendo muito!", author: "Professora Ana", role: "Ensino Fundamental", avatar: "https://i.ibb.co/BRS5bbS/Depoimento-07.png" },
              { text: "Organizei tudo antes da semana de correria e vou passar o mês tranquila. Não tive aquele caos de última hora com figurino ou painel.", author: "Priscila Santos", role: "Mãe de 2 filhos", avatar: "https://i.ibb.co/vvsKf4kY/Personagem-14-Copia.jpg" },
              { text: "Vale muito a pena. Os materiais de Copa e São João vêm todos prontos para usar e economizam horas exaustivas de planejamento.", author: "Professora Marina", role: "Educação Infantil", avatar: "https://i.ibb.co/Vc339k0Z/Personagem-02.png" },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, star) => (
                      <div key={star} className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-900">★</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic leading-relaxed text-xs sm:text-sm">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                  <img src={testimonial.avatar} alt={testimonial.author} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-100" />
                  <div>
                    <span className="block font-extrabold text-slate-800 text-xs sm:text-sm">{testimonial.author}</span>
                    <span className="block text-[10px] sm:text-xs text-slate-400 font-medium">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 12. GARANTIA */}
      <Section background="white" className="py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-200">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold mb-3 text-slate-800">RISCO ZERO PARA VOCÊ</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
            Você tem <span className="font-extrabold text-slate-800">7 dias de garantia incondicional</span>. Se o material não fizer sentido para a sua turma ou não for o que esperava, devolvemos 100% do seu dinheiro sem perguntas e sem complicação.
          </p>
          <div className="h-1 w-16 bg-slate-100 mx-auto rounded-full"></div>
        </div>
      </Section>

      {/* 13. FAQ */}
      <div className="bg-slate-50 py-16 border-t border-slate-200/60">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="h-px flex-1 bg-slate-200"></div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 flex items-center gap-2">
              <HelpCircle size={20} className="text-slate-400" /> Dúvidas Frequentes
            </h2>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Como vou receber o material?", a: "Você recebe acesso por e-mail e WhatsApp imediatamente após a confirmação do pagamento. O material é 100% digital, em PDF de alta resolução." },
              { q: "Qual o nível escolar atendido?", a: "O kit foi desenvolvido para Educação Infantil e Ensino Fundamental, com materiais adaptados para diferentes faixas etárias." },
              { q: "Preciso de algum programa especial para abrir?", a: "Não! Os arquivos são em PDF e podem ser abertos em qualquer dispositivo — computador, celular ou tablet — com qualquer leitor de PDF gratuito." },
              { q: "E se eu não gostar do material?", a: "Você tem 7 dias de garantia incondicional. Se não ficar satisfeita, devolvemos 100% do valor pago, sem burocracia." },
              { q: "Funciona para quadrilha de adultos também?", a: "O conteúdo foi pensado principalmente para o ambiente escolar com crianças, mas os roteiros e guias são adaptáveis para qualquer contexto." },
              { q: "O material é atualizado para 2026?", a: "Sim! Todo o conteúdo foi criado exclusivamente para 2026, com a temática da Copa do Mundo integrada à Festa Junina." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-left font-bold text-slate-800 text-sm sm:text-base py-4 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm leading-relaxed pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 font-semibold">Ainda tem dúvidas?</p>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 text-green-700 font-bold hover:underline text-sm uppercase tracking-wider">
              <ArrowRight size={14} /> FALE NO WHATSAPP
            </a>
          </div>
        </div>
      </div>

      {/* 14. RODAPÉ CTA */}
      <Section background="dark" className="text-center py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-white leading-tight">
            Quero começar o Arraiá da Copa preparada
          </h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium">
            Não deixe para a última hora. Garanta sua tranquilidade e organização agora mesmo.
          </p>
          <Button
            onClick={scrollToPricing}
            variant="cta"
            size="lg"
            className="w-full sm:w-auto px-8 md:px-12 py-6 text-base font-extrabold uppercase rounded-2xl bg-yellow-400 text-slate-950 hover:bg-yellow-300 shadow-xl border-0 transition-transform hover:scale-105 active:scale-95 tracking-wide"
          >
            GARANTIR MEU KIT ARRAIÁ DA COPA
          </Button>
          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" /> Compra Segura
            </div>
            <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
            <div className="flex items-center gap-1.5">
              <Download size={14} className="text-emerald-500" /> Acesso Imediato
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 text-center text-slate-500 text-xs font-semibold">
        <div className="container mx-auto px-4">
          <p className="mb-2">&copy; 2026 Kit Arraiá da Copa. Todos os direitos reservados.</p>
          <p className="text-[10px] opacity-80">(Imagens ilustrativas para fins publicitários do kit educacional)</p>
        </div>
      </footer>

      {/* SOCIAL PROOF NOTIFICATION */}
      <AnimatePresence>
        {purchaseNotification && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            className="fixed bottom-3 left-3 md:bottom-4 md:left-4 z-[100] max-w-[210px] md:max-w-xs bg-white rounded-xl shadow-xl border border-slate-100 p-2.5 md:p-3.5 flex items-center gap-2 md:gap-3 pointer-events-none"
          >
            <div className="bg-yellow-100 p-1.5 md:p-2 rounded-full text-green-700 shrink-0 border border-yellow-200">
              <ShoppingBag className="h-3.5 w-3.5 md:h-[18px] md:w-[18px]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs md:text-sm font-extrabold text-slate-800 leading-tight">
                {purchaseNotification.name} acabou de comprar!
              </p>
              <p className="text-[9px] md:text-[11px] text-slate-500 font-bold">
                Plano: <span className="text-green-700">{purchaseNotification.plan}</span>
              </p>
              <p className="text-[8px] md:text-[9px] text-slate-400 font-semibold pt-0.5">
                {purchaseNotification.city} • Há poucos segundos
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UPSELL DIALOG */}
      <Dialog open={showUpsell} onOpenChange={setShowUpsell}>
        <DialogContent className="max-w-[420px] bg-white border border-slate-100 rounded-3xl p-5 pb-6 shadow-2xl">
          {/* Title */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <DialogTitle className="text-xl font-extrabold text-slate-900 tracking-tight">OFERTA ESPECIAL</DialogTitle>
            <span className="text-xl">🔥</span>
          </div>

          {/* Subtitle */}
          <DialogDescription className="text-xs text-slate-600 text-center leading-snug mb-3">
            Leve o Pacote Completo por{" "}
            <span className="font-extrabold text-green-700">R$ 14,90</span>
            {" "}com todos os bônus incluso
          </DialogDescription>

          {/* Bonus box */}
          <div className="bg-orange-50 rounded-xl border border-orange-100 p-3 mb-4">
            <p className="text-[10px] font-extrabold text-orange-500 uppercase tracking-wider flex items-center gap-1 mb-2">
              <Sparkles size={10} className="text-orange-400" />
              Bônus exclusivos inclusos:
            </p>
            <ul className="space-y-1.5">
              {[
                'Painel Gigante "Arraiá do Hexa" para Imprimir',
                "Apostila de Atividades Juninas Pedagógicas",
                "Guia de Figurinos Verde e Amarelo para os Pais",
                "Caderno de Jogos e Brincadeiras Juninas da Copa",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                    <Check size={7} className="text-green-500" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => handlePurchase("Oferta Especial")}
              className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-green-500/30 tracking-wide"
            >
              QUERO O PACOTE COMPLETO
            </Button>
            <button
              onClick={confirmEssencial}
              className="w-full text-[11px] text-slate-400 font-bold hover:text-slate-600 transition-colors py-1 uppercase tracking-wider"
            >
              QUERO A OFERTA DE 10
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
