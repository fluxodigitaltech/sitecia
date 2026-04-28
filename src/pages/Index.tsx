"use client";

import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Banner from "@/components/landing/Banner";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import Units from "@/components/landing/Units";
import Partners from "@/components/landing/Partners";
import Features from "@/components/landing/Features";
import { useState, useCallback, useEffect } from "react";
import { showSuccess, showError } from "@/utils/toast";

const Index = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [geolocationActive, setGeolocationActive] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleGeolocationToggle = useCallback((checked: boolean) => {
    if (checked) {
      if (navigator.geolocation) {
        setIsLocating(true);
        setLocationError(null);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            console.log("User Location:", {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            showSuccess(
              "Geolocalização ativada! Unidades ordenadas por proximidade.",
            );
            setGeolocationActive(true);
            setIsLocating(false);
          },
          (error) => {
            let errorMessage = "Não foi possível obter sua localização. Verifique as permissões do navegador.";
            if (error.code === error.PERMISSION_DENIED) {
              errorMessage = "Permissão de geolocalização negada. Por favor, habilite-a nas configurações do seu navegador para usar este recurso.";
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              errorMessage = "Informações de localização indisponíveis.";
            } else if (error.code === error.TIMEOUT) {
              errorMessage = "A requisição para obter a localização expirou.";
            }
            setLocationError(errorMessage);
            showError("Erro ao obter localização: " + errorMessage);
            setGeolocationActive(false);
            setIsLocating(false);
          },
        );
      } else {
        setLocationError("Geolocalização não é suportada por este navegador.");
        showError("Geolocalização não é suportada por este navegador.");
        setGeolocationActive(false);
      }
    } else {
      setUserLocation(null);
      setGeolocationActive(false);
      showSuccess("Ordenação por proximidade desativada.");
    }
  }, []);

  // Solicita geolocalização automaticamente ao carregar a página
  useEffect(() => {
    handleGeolocationToggle(true);
  }, [handleGeolocationToggle]);

  return (
    <div className="antialiased bg-white text-gray-900 overflow-x-hidden">
      <Header
        geolocationActive={geolocationActive}
        isLocating={isLocating}
        handleGeolocationToggle={handleGeolocationToggle}
      />
      <main>
        <Banner />
        <Features />
        <Units
          userLocation={userLocation}
          geolocationActive={geolocationActive}
          locationError={locationError}
          onToggleGeolocation={() => handleGeolocationToggle(!geolocationActive)}
        />
        <Partners />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;