"use client";

import React, { useState, useEffect, useMemo } from "react";
import UnitCard from "./UnitCard";
import FilterSidebar from "./FilterSidebar";
import { calculateDistance } from "@/lib/utils";

interface Unit {
  id: number;
  name: string;
  address: string;
  horario: string;
  district: string;
  city: string;
  image: string;
  badgeText: string;
  modalidade: string;
  latitude: number;
  longitude: number;
  link: string;
  number: string;
  instagram?: string;
  promotion?: string;
  brief?: string;
}

interface UnitWithDistance extends Unit {
  distance?: number;
}

interface UnitsProps {
  userLocation: { latitude: number; longitude: number } | null;
  geolocationActive: boolean;
  locationError: string | null;
  onToggleGeolocation: () => void;
}

const Units = ({ userLocation, geolocationActive, locationError, onToggleGeolocation }: UnitsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch(
          "https://api.sheety.co/129fd1f83f6798ca5c4ea7b7cf138bed/cpAlimentos/unidades",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Corrigindo o formato da latitude e longitude que podem vir com vírgula
        const parsedUnits = data.unidades.map((unit: any) => ({
          ...unit,
          latitude: parseFloat(String(unit.latitude).replace(",", ".")),
          longitude: parseFloat(String(unit.longitude).replace(",", ".")),
        }));

        setUnits(parsedUnits);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  const cities = useMemo(
    () => [...new Set(units.map((u) => u.city).filter(Boolean))].sort(),
    [units],
  );
  const districts = useMemo(
    () =>
      selectedCity && selectedCity !== "all"
        ? [
            ...new Set(
              units
                .filter((u) => u.city === selectedCity)
                .map((u) => u.district)
                .filter(Boolean),
            ),
          ].sort()
        : [],
    [units, selectedCity],
  );

  const processedUnits = useMemo(() => {
    let unitsToProcess: UnitWithDistance[] = [...units];

    if (userLocation && geolocationActive) {
      console.log("User Location for distance calculation:", userLocation); // Log user location
      unitsToProcess = unitsToProcess.map((unit) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          unit.latitude,
          unit.longitude,
        );
        // Log unit coordinates and calculated distance for debugging
        console.log(`Unit: ${unit.name}, Lat: ${unit.latitude}, Lng: ${unit.longitude}, Distance: ${distance.toFixed(1)}`);
        return {
          ...unit,
          distance: distance,
        };
      });
      unitsToProcess.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return unitsToProcess.filter((unit) => {
      const searchMatch =
        !searchTerm ||
        unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.address.toLowerCase().includes(searchTerm.toLowerCase());

      const cityMatch = !selectedCity || selectedCity === "all" || unit.city === selectedCity;
      const districtMatch =
        !selectedDistrict || selectedDistrict === "all" || unit.district === selectedDistrict;

      return searchMatch && cityMatch && districtMatch;
    });
  }, [
    units,
    userLocation,
    geolocationActive,
    searchTerm,
    selectedCity,
    selectedDistrict,
  ]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCity("all");
    setSelectedDistrict("all");
  };

  return (
    <section id="unidades" className="bg-[#f0f2f5] pt-24 pb-32 md:pt-32 md:pb-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-black uppercase tracking-[0.3em] text-[#139e9c]">
            Presença Nacional
          </span>
          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-gray-900 md:text-6xl lg:text-7xl">
            Escolha sua <span className="gradient-text">unidade</span>
          </h2>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="w-full lg:w-80 lg:shrink-0">
            <FilterSidebar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              cities={cities}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              districts={districts}
              onClear={handleClearFilters}
              geolocationActive={geolocationActive}
              onToggleGeolocation={onToggleGeolocation}
            />
          </aside>

          <div className="flex-1">
            {loading && (
              <div className="flex h-96 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#139e9c] border-t-transparent"></div>
              </div>
            )}
            
            {!loading && error && (
              <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                <p className="text-lg text-red-600 font-bold uppercase tracking-tight">Erro ao carregar</p>
                <p className="mt-2 text-sm text-gray-500">{error}</p>
              </div>
            )}

            {!loading && !error && processedUnits.length === 0 && (
              <div className="rounded-3xl bg-white p-16 text-center shadow-xl border border-gray-100">
                <p className="text-2xl font-black uppercase tracking-tight text-gray-900">Sem resultados</p>
                <p className="mt-4 text-gray-500">Tente buscar por outra localização ou remova os filtros.</p>
                <button 
                  onClick={handleClearFilters}
                  className="mt-8 gradient-button h-12 px-8 rounded-full font-black uppercase tracking-widest transition-all hover:scale-105"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {!loading &&
                !error &&
                processedUnits.map((unit, index) => (
                  <UnitCard
                    key={unit.id}
                    name={unit.name}
                    address={unit.address}
                    horario={unit.horario}
                    motto={unit.modalidade}
                    image={unit.image}
                    link={unit.link}
                    number={unit.number}
                    distance={unit.distance}
                    district={unit.district}
                    city={unit.city}
                    promotion={unit.promotion}
                    brief={unit.brief}
                    isClosest={geolocationActive && index === 0}
                    instagram={unit.instagram}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Units;