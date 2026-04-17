import { useState } from "react";

const categories = ["Все", "Пряжа", "Схемы", "Спицы и крючки", "Аксессуары"];

const products = [
  { name: "Пряжа «Альпака Люкс»", category: "Пряжа", price: "490 ₽", emoji: "🧶", desc: "100% альпака, 100 м/50 г" },
  { name: "Пряжа «Мохер Silk»", category: "Пряжа", price: "380 ₽", emoji: "🧶", desc: "70% мохер, 30% шёлк" },
  { name: "Схема «Свитер Айлет»", category: "Схемы", price: "250 ₽", emoji: "📄", desc: "Размеры XS–XL, PDF" },
  { name: "Схема «Шапка Бини»", category: "Схемы", price: "150 ₽", emoji: "📄", desc: "Для начинающих, PDF" },
  { name: "Спицы круговые 4 мм", category: "Спицы и крючки", price: "320 ₽", emoji: "🪡", desc: "Длина 80 см, нержавейка" },
  { name: "Крючок 3.5 мм", category: "Спицы и крючки", price: "180 ₽", emoji: "🪡", desc: "Эргономичная ручка" },
  { name: "Маркеры для петель", category: "Аксессуары", price: "120 ₽", emoji: "🔖", desc: "Набор 20 штук" },
  { name: "Сумка для вязания", category: "Аксессуары", price: "890 ₽", emoji: "👜", desc: "Хлопок, с карманами" },
];

export default function Catalog() {
  const [active, setActive] = useState("Все");

  const filtered = active === "Все" ? products : products.filter((p) => p.category === active);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen texture-bg">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-[var(--warm-brown)] font-golos mb-2">Всё для творчества</p>
        <h1 className="font-cormorant text-4xl md:text-5xl text-[var(--deep-brown)] font-semibold mb-4">
          Каталог
        </h1>
        <div className="divider-gold w-32 mx-auto" />
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-golos border transition-colors ${
              active === cat
                ? "bg-[var(--deep-brown)] text-[var(--cream)] border-[var(--deep-brown)]"
                : "bg-white text-[var(--text-main)] border-[var(--beige)] hover:border-[var(--warm-brown)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Товары */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((p, i) => (
          <div key={i} className="card-hover bg-white rounded-2xl border border-[var(--beige)] overflow-hidden">
            <div className="h-36 bg-[var(--beige)] flex items-center justify-center text-5xl">
              {p.emoji}
            </div>
            <div className="p-4">
              <span className="text-xs text-[var(--warm-brown)] font-golos">{p.category}</span>
              <h3 className="font-cormorant text-lg text-[var(--deep-brown)] font-semibold mt-1 mb-1">
                {p.name}
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-golos mb-3">{p.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-golos font-semibold text-[var(--deep-brown)]">{p.price}</span>
                <button className="px-4 py-1.5 bg-[var(--deep-brown)] text-[var(--cream)] rounded-full text-xs font-golos hover:bg-[var(--warm-brown)] transition-colors">
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
