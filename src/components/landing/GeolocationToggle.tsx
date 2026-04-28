"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, Loader2 } from "lucide-react";

interface GeolocationToggleProps {
  isActive: boolean;
  isLocating: boolean;
  onToggle: (checked: boolean) => void;
  variant?: "light" | "dark";
}

const GeolocationToggle = ({
  isActive,
  isLocating,
  onToggle,
  variant = "light",
}: GeolocationToggleProps) => {
  const isDark = variant === "dark";

  return (
    <div className="flex items-center justify-center">
      <div
        className={`flex items-center space-x-3 rounded-full p-2 pr-4 shadow-sm ${
          isDark
            ? "bg-black/20 border border-white/30"
            : "bg-white border border-gray-200"
        }`}
      >
        {isLocating ? (
          <Loader2
            className={`h-5 w-5 animate-spin ${
              isDark ? "text-white" : "text-gray-500"
            }`}
          />
        ) : (
          <MapPin
            className={`h-5 w-5 transition-colors ${
              isActive
                ? "text-green-400"
                : isDark
                  ? "text-white/70"
                  : "text-gray-400"
            }`}
          />
        )}
        <Label
          htmlFor="geolocation-toggle"
          className={`cursor-pointer font-medium transition-colors ${
            isActive
              ? isDark
                ? "text-white"
                : "text-gray-800"
              : isDark
                ? "text-white/80"
                : "text-gray-500"
          }`}
        >
          {isLocating
            ? "Localizando..."
            : isActive
              ? "Proximidade Ativada"
              : "Ordenar por Proximidade"}
        </Label>
        <Switch
          id="geolocation-toggle"
          checked={isActive}
          onCheckedChange={onToggle}
          disabled={isLocating}
        />
      </div>
    </div>
  );
};

export default GeolocationToggle;