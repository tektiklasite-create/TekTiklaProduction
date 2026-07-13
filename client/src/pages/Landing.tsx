import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import Manifesto from "../components/Manifesto";
import Services from "../components/Services";
import Process from "../components/Process";
import Portfolio from "../components/Portfolio";
import Calculator from "../components/Calculator";
import Pricing from "../components/Pricing";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";

type PaymentStatus = "basarili" | "iptal" | null;

export default function Landing() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [prefillMessage, setPrefillMessage] = useState("");
  const [payment, setPayment] = useState<PaymentStatus>(null);

  // Stripe dönüşü: ?odeme=basarili | iptal — URL'i temizleyip banner göster
  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("odeme");
    if (status === "basarili" || status === "iptal") {
      setPayment(status);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  function scrollToContact() {
    document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSelectPackage(name: string) {
    setSelectedPackage(name);
    scrollToContact();
  }

  function handleQuote(message: string) {
    setPrefillMessage(message);
    scrollToContact();
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      {payment && (
        <div
          role="status"
          className={`fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl items-center justify-between gap-4 border px-5 py-4 backdrop-blur-md ${
            payment === "basarili"
              ? "border-lime bg-ink/95 text-bright"
              : "border-line bg-ink/95 text-body"
          }`}
        >
          <p className="text-sm">
            {payment === "basarili" ? (
              <>
                <span className="font-bold text-lime">Ödemen alındı.</span> En geç 24 saat içinde
                proje başlangıcı için seninle iletişime geçeceğiz.
              </>
            ) : (
              "Ödeme tamamlanmadı. İstersen iletişim formundan bize ulaş — birlikte çözelim."
            )}
          </p>
          <button
            type="button"
            aria-label="Bildirimi kapat"
            onClick={() => setPayment(null)}
            className="shrink-0 p-1 text-body transition-colors duration-150 hover:text-lime"
          >
            ✕
          </button>
        </div>
      )}
      <main>
        <Hero />

        <Manifesto />
        <Services />
        <Process />
        <Portfolio />
        <Calculator onQuote={handleQuote} />
        <Pricing onSelectPackage={handleSelectPackage} />
        <Faq />
        <Contact selectedPackage={selectedPackage} prefillMessage={prefillMessage} />
      </main>
      <Footer />
    </>
  );
}
