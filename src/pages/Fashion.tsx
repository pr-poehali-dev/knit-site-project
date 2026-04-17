const trends = [
  {
    season: "Осень–Зима 2026",
    title: "Объёмные свитера оверсайз",
    desc: "Тёплые фактурные свитера из толстой пряжи — главный тренд сезона. Носят навыпуск с широкими брюками или джинсами.",
  },
  {
    season: "Весна 2026",
    title: "Ажурные топы и жилеты",
    desc: "Лёгкие вязаные топы из хлопка и льна стали хитом весеннего сезона. Идеальны как самостоятельный лук, так и в слоях.",
  },
  {
    season: "Тренд сезона",
    title: "Аксессуары ручной работы",
    desc: "Берет, шарф и варежки в едином стиле — комплекты ручной работы снова в моде. Хорошо смотрятся с пальто и шубами.",
  },
  {
    season: "Всесезонно",
    title: "Вязаные сумки",
    desc: "Сумки-шоппер, клатчи и рюкзаки из рафии и хлопкового шнура — стильный аксессуар на все случаи жизни.",
  },
];

export default function Fashion() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen texture-bg">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-[var(--warm-brown)] font-golos mb-2">Стиль & вдохновение</p>
        <h1 className="font-cormorant text-4xl md:text-5xl text-[var(--deep-brown)] font-semibold mb-4">
          О моде
        </h1>
        <div className="divider-gold w-32 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {trends.map((t, i) => (
          <div key={i} className="card-hover bg-white rounded-2xl p-6 border border-[var(--beige)]">
            <span className="text-xs uppercase tracking-wider text-[var(--gold)] font-golos font-semibold">
              {t.season}
            </span>
            <h2 className="font-cormorant text-2xl text-[var(--deep-brown)] font-semibold mt-2 mb-3">
              {t.title}
            </h2>
            <p className="text-sm text-[var(--text-muted)] font-golos leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
