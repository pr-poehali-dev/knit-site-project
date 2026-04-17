const cards = [
  { title: "Вязание спицами для начинающих", level: "Начинающий", time: "2 ч", tag: "Спицы" },
  { title: "Ажурный шарф крючком", level: "Средний", time: "3 ч", tag: "Крючок" },
  { title: "Свитер оверсайз за выходные", level: "Средний", time: "8 ч", tag: "Спицы" },
  { title: "Шапка-бини за один вечер", level: "Начинающий", time: "1.5 ч", tag: "Спицы" },
  { title: "Норвежский узор: основы", level: "Продвинутый", time: "5 ч", tag: "Спицы" },
  { title: "Сумка-шоппер крючком", level: "Средний", time: "4 ч", tag: "Крючок" },
];

export default function Masterclasses() {
  return (
    <div className="container mx-auto px-4 py-12 texture-bg min-h-screen">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-[var(--warm-brown)] font-golos mb-2">Учимся вместе</p>
        <h1 className="font-cormorant text-4xl md:text-5xl text-[var(--deep-brown)] font-semibold mb-4">
          Мастер-классы
        </h1>
        <div className="divider-gold w-32 mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div key={i} className="card-hover bg-white rounded-2xl overflow-hidden border border-[var(--beige)]">
            <div className="h-40 bg-[var(--beige)] flex items-center justify-center">
              <span className="text-5xl">🧶</span>
            </div>
            <div className="p-5">
              <div className="flex gap-2 mb-3">
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--beige)] text-[var(--warm-brown)] font-golos">
                  {c.tag}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--secondary)] text-[var(--text-muted)] font-golos">
                  {c.level}
                </span>
              </div>
              <h3 className="font-cormorant text-lg text-[var(--deep-brown)] font-semibold mb-2">
                {c.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-golos">⏱ {c.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
