// Tüm landing içeriği tek yerde — marka/metin değişiklikleri buradan
export const site = {
  brand: "tektiklasite.com",
  tagline: "Web Stüdyosu",
  nav: [
    { label: "İşler", href: "#projeler" },
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Fiyat", href: "#hesapla" },
    { label: "Paketler", href: "#paketler" },
    { label: "S.S.S", href: "#sss" },
  ],
  hero: {
    eyebrow: "TEKTIKLASITE.COM® — WEB STÜDYOSU",
    availability: "TEMMUZ'26 → 2 PROJE İÇİN YER VAR",
    titleTop: "TEK TIKLA.",
    titleBottom: "Gerisi bizde.",
    rotatingPrefix: "sana",
    rotatingWords: ["satan", "hızlı", "akılda kalan", "büyüten"],
    rotatingSuffix: "bir site lazım.",
    subtitle:
      "İsim şaka değil: senin tarafında iş gerçekten tek tık — formu doldur. Tasarım, kod, hosting, yayın... gerisini biz hallederiz. Şablonsuz, sıfırdan.",
    ctaPrimary: "O tek tıkı at",
    ctaSecondary: "İşlere bak",
  },

  manifesto: {
    // Her satır segment listesi — accent: true olan parçalar lime renkte vurgulanır
    lines: [
      [
        { t: "Hazır tema alıp üstüne ", accent: false },
        { t: "logo yapıştırmıyoruz.", accent: true },
      ],
      [
        { t: "Yavaş açılan, telefonda dağılan, Google'da kaybolan site ", accent: false },
        { t: "teslim etmedik — etmeyiz.", accent: true },
      ],
    ],

    references: [
      {
        name: "Modatepe Resort",
        detail: "Restoran & butik konaklama — Trabzon",
        url: "https://modateperesort.com",
      },
      {
        name: "WhiteMedia",
        detail: "Dijital pazarlama ajansı",
        url: "https://whitemedia.com.tr",
      },
      {
        name: "Matematik Pusulası",
        detail: "Dijital eğitim dergisi",
        url: "https://matematikpusulasi.vercel.app",
      },
    ],
  },
  services: [
    {
      no: "01",
      title: "Kurumsal Site",
      detail: "Şirketinin internetteki yüzü. Kartvizit değil — satış elemanı gibi çalışır.",
    },

    {
      no: "03",
      title: "Landing Page",
      detail: "Tek sayfa, tek hedef: ziyaretçiyi müşteriye çevirmek. Reklam bütçen boşa akmasın.",
    },
    {
      no: "04",
      title: "Admin Panel",
      detail: "Fiyat, içerik, ürün — hepsini kendin yönet. Her değişiklik için bize muhtaç olma.",
    },
    {
      no: "05",
      title: "SEO & Hız",
      detail: "Site var ama Google'da yok? Teknik SEO + performans. Ölçüyoruz, düzeltiyoruz.",
    },
    {
      no: "06",
      title: "Bakım & Destek",
      detail: "Yayından sonra ortadan kaybolmuyoruz. Güncelleme, yedek, acil müdahale.",
    },
  ],
  process: [
    {
      no: "01",
      title: "Keşif",
      detail: "30 dakikalık görüşme. Ne satıyorsun, kime satıyorsun, rakibin kim — önce bunu anlıyoruz.",
    },
    {
      no: "02",
      title: "Tasarım",
      detail: "Önce taslak, sonra ekran tasarımı. Sen onaylamadan tek satır kod yazılmaz.",
    },
    {
      no: "03",
      title: "Geliştirme",
      detail: "Sıfırdan kod. Şablon yok, eklenti çöplüğü yok, sürpriz maliyet yok.",
    },
    {
      no: "04",
      title: "Yayın + Destek",
      detail: "Domain, hosting, SSL, panel eğitimi. Sonrası için telefonun ucundayız.",
    },
  ],
  portfolio: [
    {
      title: "Modatepe Resort",
      category: "Kurumsal Site",
      url: "https://modateperesort.com",
      description:
        "Karadeniz manzaralı restoran & butik otel için tanıtım ve rezervasyon sitesi — Trabzon.",
      features: [
        "Oda ve restoran tanıtım sayfaları",
        "3 dil desteği (TR / EN / AR)",
        "Fotoğraf galerisi",
        "WhatsApp'tan hızlı rezervasyon",
        "Google Haritalar yol tarifi",
        "Mobil uyumlu tasarım",
        "Temel SEO kurulumu",
      ],
      price: "₺14.900",
    },
    {
      title: "WhiteMedia",
      category: "Ajans Sitesi",
      url: "https://whitemedia.com.tr",
      description: "Dijital pazarlama ajansı için kurumsal vitrin ve teklif kanalı.",
      features: [
        "Hizmet sayfaları",
        "Referans / iş vitrini",
        "Teklif alma formu",
        "Kurumsal kimliğe özel arayüz",
        "Hız optimizasyonu",
        "SEO altyapısı",
      ],
      price: "₺9.900",
    },
    {
      title: "Matematik Pusulası",
      category: "Eğitim Platformu",
      url: "https://matematikpusulasi.vercel.app",
      description: "Lise öğrencileri için dijital matematik dergisi platformu.",
      features: [
        "Dijital dergi okuma deneyimi",
        "Sayı ve içerik arşivi",
        "Mobilde akıcı okuma",
        "Çok hızlı açılış",
        "Kolay içerik güncelleme",
      ],
      price: "₺4.900",
    },
  ],
  faq: [
    {
      q: "Ne kadar sürede teslim ediyorsunuz?",
      a: "Landing page 1 hafta, kurumsal site 2-4 hafta, özel yazılım 6-10 hafta. Net takvimi ilk görüşmede birlikte çıkarıyoruz — ve o takvime uyuyoruz.",
    },
    {
      q: "Ödeme nasıl işliyor?",
      a: "Başta %50, teslimde %50. Büyük projelerde aşamalı plan yapıyoruz. Teslim etmeden ikinci yarıyı istemiyoruz.",
    },
    {
      q: "Hosting ve domain sizden mi?",
      a: "İstersen senin adına alıp kuruyoruz, istersen mevcut altyapına teslim ediyoruz. İki durumda da kurulum bizde — sen şifreleri al, yeter.",
    },
    {
      q: "İçeriği kendim güncelleyebilir miyim?",
      a: "Evet. Admin panelli paketlerde metin, görsel ve fiyatları kendin yönetirsin. Panel kullanımını da öğretiyoruz — video kaydıyla birlikte.",
    },
    {
      q: "Teslimden sonra ortadan kaybolur musunuz?",
      a: "Hayır. Her pakette ücretsiz destek süresi var (1-6 ay). Sonrasında dilersen aylık bakım anlaşmasıyla devam ederiz. Mesajına 24 saat içinde dönüyoruz.",
    },
  ],
  footer: {
    ctaBig: "PROJEN Mİ VAR? TEK",
    ctaAction: "TIKLA",
    description: "Şablon değil, sıfırdan kod. Trabzon'dan tüm Türkiye'ye.",
    email: "tektiklasite@gmail.com",
    phone: "+90 530 842 00 61",
  },
} as const;
