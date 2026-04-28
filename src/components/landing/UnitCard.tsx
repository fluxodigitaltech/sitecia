"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, MapPin, MessageCircle, Star, Instagram, Gift, CalendarDays, Route } from "lucide-react";

interface UnitCardProps {
  name: string;
  address: string;
  horario?: string;
  motto?: string;
  image: string;
  link: string;
  number: string;
  isClosest?: boolean;
  district: string;
  city: string;
  instagram?: string;
  promotion?: string;
  brief?: string;
  distance?: number;
}

const UnitCard = ({
  name,
  address,
  horario,
  motto,
  image,
  link,
  number,
  isClosest,
  district,
  city,
  instagram,
  promotion,
  brief,
  distance,
}: UnitCardProps) => {
  const handleCardClick = () => {
    window.open(number, "_blank", "noopener,noreferrer");
  };

  const showPromotionBadge = promotion?.toLowerCase() === "sim";
  const isBrieflySubscribed = brief?.toLowerCase() === "sim";

  return (
    <div
      className="group relative transform cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2"
      onClick={handleCardClick}
    >
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-xl border-none bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-2xl",
          isClosest && "ring-2 ring-green-500 ring-offset-2",
          showPromotionBadge && "ring-2 ring-green-500 ring-offset-2",
          isBrieflySubscribed && "ring-2 ring-gray-400 ring-offset-2",
        )}
      >
        {isClosest && (
          <div className="absolute left-0 top-4 z-10 -ml-1 rounded-r-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" fill="white" />
              <span>MAIS PRÓXIMA</span>
            </div>
          </div>
        )}
        {showPromotionBadge && (
          <div className="absolute right-0 top-4 z-10 -mr-1 rounded-l-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            <div className="flex items-center gap-1">
              <Gift className="h-3 w-3" fill="white" />
              <span>PROMOÇÃO</span>
            </div>
          </div>
        )}
        {isBrieflySubscribed && (
          <div className="absolute left-0 top-12 z-10 -ml-1 rounded-r-full bg-gray-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" fill="white" />
              <span>EM BREVE</span>
            </div>
          </div>
        )}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <CardContent className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
            </div>
            {motto && (
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-green-600">
                {motto}
              </p>
            )}
            <div className="mt-4 space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-sm text-gray-600">
                  {address}
                  {district && city && (
                    <span className="block text-xs text-gray-500">
                      {district} - {city}
                    </span>
                  )}
                </span>
              </div>
              {horario && (
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-sm text-gray-600">{horario}</span>
                </div>
              )}
              {distance !== undefined && (
                <div className="flex items-center space-x-2">
                  <Route className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                    {distance.toFixed(1)} km de distância
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col space-y-2">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Button
                  className="gradient-button w-full font-bold"
                  disabled={isBrieflySubscribed}
                >
                  {isBrieflySubscribed ? "Inauguração em Breve" : "Assine Agora"}
                </Button>
              </a>
              <a href={number} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Fale no WhatsApp
                </Button>
              </a>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 transition-colors hover:text-purple-600"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitCard;