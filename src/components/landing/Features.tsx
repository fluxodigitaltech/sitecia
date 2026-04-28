"use client";

import { Scale, Zap, Trophy, HeartPulse } from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  gradient: string 
}) => (
  <div className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-2xl">
    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="mb-3 text-2xl font-black uppercase tracking-tight text-white">{title}</h3>
    <p className="text-sm font-medium leading-relaxed text-white/60">{description}</p>
    <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${gradient} transition-all duration-500 group-hover:w-full rounded-b-3xl`}></div>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Scale,
      title: "Bioimpedância",
      description: "Monitore sua evolução com balanças de última geração. Analise sua composição corporal com precisão e otimize seus resultados.",
      gradient: "from-[#139e9c] to-[#79f12c]"
    },
    {
      icon: Zap,
      title: "Cadeira de Massagem",
      description: "Recuperação muscular é fundamental. Aproveite nossas cadeiras de massagem profissionais para relaxar após um treino intenso.",
      gradient: "from-[#139e9c] to-[#0a5251]"
    },
    {
      icon: Trophy,
      title: "Equipamentos Premium",
      description: "Treine com o que há de melhor no mercado fitness mundial. Máquinas ergonômicas e seguras para todos os níveis.",
      gradient: "from-[#79f12c] to-[#45a00a]"
    },
    {
      icon: HeartPulse,
      title: "Vestiários Modernos",
      description: "Ambiente climatizado, duchas quentes e lockers seguros para seu total conforto e praticidade no dia a dia.",
      gradient: "from-blue-500 to-indigo-600"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      {/* Background Decorativo */}
      <div className="absolute left-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-[#139e9c]/20 blur-[120px]"></div>
      <div className="absolute right-[-10%] bottom-0 h-[500px] w-[500px] rounded-full bg-[#79f12c]/10 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-black uppercase tracking-[0.3em] text-[#79f12c]">
            Diferenciais
          </span>
          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-6xl lg:text-7xl">
            Sua <span className="gradient-text">experiência</span> <br />
            em outro nível
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;