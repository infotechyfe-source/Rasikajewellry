import AboutSection from "@/components/AboutPage";
import CareGuideSection from "@/components/CareGuide";
import AppointmentsSection from "@/components/Appointments";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutSection />

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-200" />
      </div>

      <CareGuideSection />

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-200" />
      </div>

      <AppointmentsSection />
    </main>
  );
}
