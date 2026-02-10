const WHATSAPP_NUMBER = "9120797254";

export default function Appointments() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-serif text-gray-900 mb-6">
        Appointments
      </h1>

      <p className="text-gray-600 leading-relaxed mb-6">
        Book a private consultation to explore bespoke designs or
        signature collections.
      </p>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        className="inline-block px-8 py-3 rounded-full bg-black text-white hover:bg-gray-900 transition"
      >
        Book via WhatsApp
      </a>
    </section>
  );
}
