"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"; // Importando SheetTitle e SheetDescription
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import GeolocationToggle from "./GeolocationToggle";

interface MobileMenuProps {
  geolocationActive: boolean;
  isLocating: boolean;
  handleGeolocationToggle: (checked: boolean) => void;
}

const MobileMenu = ({
  geolocationActive,
  isLocating,
  handleGeolocationToggle,
}: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Fecha o menu ao clicar em um link
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] gradient-background flex flex-col p-6">
        {/* Títulos e descrições para acessibilidade, visualmente ocultos */}
        <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
        <SheetDescription className="sr-only">
          Navegue pelas seções do site e ative a geolocalização.
        </SheetDescription>

        <div className="flex items-center justify-between mb-8">
          <a href="#inicio" className="flex items-center" onClick={handleLinkClick}>
            <img
              src="https://raw.githubusercontent.com/cleitonSam/image-cia/refs/heads/main/teste.png"
              alt="CIA Mega Fitness Logo"
              className="h-12 rounded-full"
            />
          </a>
        </div>

        <nav className="flex flex-col space-y-6 text-lg font-bold flex-grow">
          <a
            href="#inicio"
            className="text-white/90 transition-all duration-200 hover:scale-105 hover:text-white"
            onClick={handleLinkClick}
          >
            Início
          </a>
          <a
            href="#unidades"
            className="text-white/90 transition-all duration-200 hover:scale-105 hover:text-white"
            onClick={handleLinkClick}
          >
            Unidades
          </a>
          <a
            href="#parceiros"
            className="text-white/90 transition-all duration-200 hover:scale-105 hover:text-white"
            onClick={handleLinkClick}
          >
            Parceiros
          </a>
          <Separator className="bg-white/30 my-4" />
          <GeolocationToggle
            isActive={geolocationActive}
            isLocating={isLocating}
            onToggle={handleGeolocationToggle}
            variant="dark"
          />
        </nav>

        <div className="mt-auto pt-8">
          <a href="#unidades" onClick={handleLinkClick}>
            <Button
              variant="outline"
              className="w-full border-white bg-transparent font-bold text-white transition-all hover:scale-105 hover:bg-white hover:text-[#139e9c]"
            >
              Matricule-se Já
            </Button>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;