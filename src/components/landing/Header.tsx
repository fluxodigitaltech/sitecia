"use client";

import { Button } from "@/components/ui/button";
import GeolocationToggle from "./GeolocationToggle";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  geolocationActive: boolean;
  isLocating: boolean;
  handleGeolocationToggle: (checked: boolean) => void;
}

const Header = ({
  geolocationActive,
  isLocating,
  handleGeolocationToggle,
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md py-3 shadow-xl" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <a href="#inicio" className="group flex items-center transition-transform hover:scale-105">
          <img
            src="https://raw.githubusercontent.com/cleitonSam/image-cia/refs/heads/main/teste.png"
            alt="CIA Mega Fitness Logo"
            className="h-12 w-12 rounded-full border-2 border-white/20 shadow-lg"
          />
          <span className="ml-3 text-xl font-black uppercase tracking-tighter text-white">
            CIA <span className="gradient-text">Mega</span>
          </span>
        </a>

        <div className="flex items-center gap-6">
          {/* Navegação Desktop */}
          <nav className="hidden items-center space-x-8 md:flex">
            {["Início", "Unidades", "Parceiros"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-bold uppercase tracking-widest text-white/80 transition-colors hover:text-white group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#139e9c] to-[#79f12c] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <GeolocationToggle
              isActive={geolocationActive}
              isLocating={isLocating}
              onToggle={handleGeolocationToggle}
              variant="dark"
            />
            
            <a href="#unidades">
              <Button
                className="gradient-button h-10 px-6 text-xs font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Matricule-se Já
              </Button>
            </a>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <MobileMenu
              geolocationActive={geolocationActive}
              isLocating={isLocating}
              handleGeolocationToggle={handleGeolocationToggle}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;