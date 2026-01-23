import Image from "next/image";

type Product = {
  name: string;
  price: number;
  metal: string;
  image: string;
};

const WHATSAPP_NUMBER = "919999999999"; // replace with client number

export function ProductCard({ name, price, metal, image }: Product) {
  const whatsappMessage = `Hello, I am interested in this jewellery:%0A%0AName: ${name}%0AMetal: ${metal}%0APrice: ₹${price}`;

  return (
    <div className="group cursor-pointer">

      {/* ================= IMAGE ================= */}
      <div className="relative overflow-hidden rounded-xl bg-[#f7f5f2]">

        <Image
          src={image}
          alt={name}
          width={500}
          height={650}
          className="
            w-full h-[420px] object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-105
          "
        />

        {/* Hover Overlay */}
        <div
          className="
            absolute inset-0 bg-black/30 opacity-0
            group-hover:opacity-100 transition
            flex items-center justify-center
          "
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            className="
              px-8 py-3 border border-white text-white
              text-xs tracking-[0.25em]
              hover:bg-white hover:text-black transition
            "
          >
            ENQUIRE NOW
          </a>
        </div>
      </div>

      {/* ================= INFO ================= */}
      <div className="mt-6 text-center px-2">

        <h3 className="font-serif text-lg md:text-xl mb-1">
          {name}
        </h3>

        <p className="text-[11px] tracking-widest uppercase text-gray-500 mb-2">
          {metal} Jewellery
        </p>

        <p className="text-[#9c7c3d] text-lg font-medium">
          ₹{price.toLocaleString()}
        </p>
      </div>

    </div>
  );
}
