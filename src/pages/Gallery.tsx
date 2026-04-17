const items = [
  { emoji: "🧣", title: "Ажурный шарф", author: "Мария К." },
  { emoji: "🧤", title: "Варежки с узором", author: "Анна П." },
  { emoji: "👒", title: "Летняя шляпа", author: "Елена В." },
  { emoji: "🧥", title: "Пальто крючком", author: "Ольга С." },
  { emoji: "🎀", title: "Детский плед", author: "Татьяна М." },
  { emoji: "👜", title: "Сумка-корзина", author: "Ирина Д." },
  { emoji: "🧶", title: "Свитер-оверсайз", author: "Наталья Р." },
  { emoji: "🌸", title: "Цветочный топ", author: "Светлана Ф." },
  { emoji: "🏠", title: "Подставки для кружек", author: "Людмила Г." },
];

export default function Gallery() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-[var(--warm-brown)] font-golos mb-2">Работы мастериц</p>
        <h1 className="font-cormorant text-4xl md:text-5xl text-[var(--deep-brown)] font-semibold mb-4">
          Галерея
        </h1>
        <div className="divider-gold w-32 mx-auto" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={i} className="card-hover bg-white rounded-2xl overflow-hidden border border-[var(--beige)] group cursor-pointer">
            <div className="h-36 bg-[var(--beige)] flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
              {item.emoji}
            </div>
            <div className="p-3">
              <p className="font-cormorant text-base text-[var(--deep-brown)] font-semibold">
                {item.title}
              </p>
              <p className="text-xs text-[var(--text-muted)] font-golos mt-1">
                {item.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
