"use client";

const PartnerCard = ({
  href,
  imgSrc,
  alt,
}: {
  href: string;
  imgSrc: string;
  alt: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex h-48 w-full items-center justify-center overflow-hidden rounded-3xl bg-white p-10 shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white opacity-100 transition-opacity duration-300 group-hover:opacity-0"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-[#139e9c]/5 to-[#79f12c]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    <img
      src={imgSrc}
      alt={alt}
      className="relative z-10 h-auto w-full max-w-[200px] object-contain transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale-[0.5]"
    />
  </a>
);

const Partners = () => {
  return (
    <section id="parceiros" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-black uppercase tracking-[0.3em] text-[#139e9c]">
            Benefícios Corporativos
          </span>
          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-gray-900 md:text-6xl lg:text-7xl">
            Treine com <br />
            <span className="gradient-text">seu convênio</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-gray-500 leading-relaxed">
            Utilize seu benefício corporativo em qualquer uma de nossas unidades. 
            Aceitamos os principais parceiros de bem-estar do mercado.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <PartnerCard
            href="#"
            imgSrc="https://raw.githubusercontent.com/cleitonSam/image-cia/refs/heads/main/Meta_CMO_c310c39eb0.avif"
            alt="Logo WellHub"
          />
          <PartnerCard
            href="#"
            imgSrc="https://raw.githubusercontent.com/cleitonSam/image-cia/refs/heads/main/Captura-de-tela-2024-06-16-161459.webp"
            alt="Logo TotalPass"
          />
        </div>
      </div>
    </section>
  );
};

export default Partners;