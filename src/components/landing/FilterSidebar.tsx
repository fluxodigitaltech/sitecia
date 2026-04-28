"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import GeolocationToggle from "./GeolocationToggle";

interface FilterSidebarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  cities: string[];
  selectedDistrict: string;
  setSelectedDistrict: (value: string) => void;
  districts: string[];
  onClear: () => void;
  geolocationActive: boolean;
  onToggleGeolocation: (checked: boolean) => void;
}

const FilterSidebar = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
  cities,
  selectedDistrict,
  setSelectedDistrict,
  districts,
  onClear,
  geolocationActive,
  onToggleGeolocation,
}: FilterSidebarProps) => {
  return (
    <div className="space-y-6 rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="h-5 w-5 text-[#139e9c]" />
        <h3 className="text-lg font-black uppercase tracking-tight text-gray-900">Filtros</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search" className="text-xs font-bold uppercase tracking-widest text-gray-500">
          Buscar Unidade
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="search"
            placeholder="Nome ou endereço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 focus:ring-[#139e9c] rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Cidade</Label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="border-gray-200 rounded-xl">
            <SelectValue placeholder="Todas as cidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as cidades</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-widest text-gray-500">Bairro</Label>
        <Select
          value={selectedDistrict}
          onValueChange={setSelectedDistrict}
          disabled={!selectedCity || selectedCity === "all"}
        >
          <SelectTrigger className="border-gray-200 rounded-xl">
            <SelectValue placeholder="Todos os bairros" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os bairros</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 border-t border-gray-100 space-y-4">
        <GeolocationToggle
          isActive={geolocationActive}
          isLocating={false}
          onToggle={onToggleGeolocation}
          variant="light"
        />

        <Button
          variant="ghost"
          onClick={onClear}
          className="w-full text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
        >
          <X className="mr-2 h-4 w-4" /> Limpar Filtros
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;