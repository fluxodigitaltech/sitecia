"use client";

import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black py-24 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-8">
          {/* Coluna 1: Branding */}
          <div className="flex flex-col items-center md:col-span-1 md:items-start">
            <a href="#inicio" className="group flex items-center transition-transform hover:scale-105">
              <img
                src="https://raw.githubusercontent.com/cleitonSam/image-cia/refs/heads/main/teste.png"
                alt="CIA Mega Fitness Logo"
                className="h-14 w-14 rounded-full border-2 border-white/20 shadow-lg"
              />
              <span className="ml-3 text-2xl font-black uppercase tracking-tighter text-white">
                CIA <span className="gradient-text">Mega</span>
              </span>
            </a>
            <p className="mt-6 text-center text-sm font-medium leading-relaxed text-white/50 md:text-left">
              A rede de academias que mais cresce na região. Evolua com a gente em um ambiente moderno e motivador.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="text-center md:text-left">
            <h4 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[#79f12c]">
              Navegação
            </h4>
            <ul className="space-y-3">
              {["Início", "Unidades", "Parceiros"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="text-center md:text-left">
            <h4 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[#79f12c]">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <Mail className="h-4 w-4 text-[#139e9c]" />
                </div>
                <span className="text-sm font-bold text-white/80 transition-colors hover:text-white">
                  contato@ciamegafitness.com.br
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <Phone className="h-4 w-4 text-[#139e9c]" />
                </div>
                <span className="text-sm font-bold text-white/80 transition-colors hover:text-white">
                  (11) 99999-9999
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <MapPin className="h-4 w-4 text-[#139e9c]" />
                </div>
                <span className="text-sm font-bold text-white/80 transition-colors hover:text-white">
                  São Paulo - SP
                </span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div className="text-center md:text-left">
            <h4 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[#79f12c]">
              Siga-nos
            </h4>
            <div className="flex justify-center space-x-4 md:justify-start">
              {[Facebook, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 transition-all hover:bg-[#139e9c] hover:text-white hover:shadow-lg hover:shadow-[#139e9c]/20"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            © {new Date().getFullYear()} CIA Mega Fitness • BF9 FITNESS LTDA • CNPJ: 27.965.339/0001-89
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;