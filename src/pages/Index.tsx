import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const features = [
  {
    icon: "BookOpen",
    title: "Мастер-классы",
    desc: "Пошаговые уроки для начинающих и опытных вязальщиц",
    path: "/masterclasses",
  },
  {
    icon: "Layers",
    title: "О вязании",
    desc: "История, техники, виды пряжи и инструментов",
    path: "/about-knitting",
  },
  {
    icon: "Sparkles",
    title: "О моде",
    desc: "Тренды и вдохновение из мира вязаной моды",
    path: "/fashion",
  },
  {
    icon: "Image",
    title: "Галерея",
    desc: "Красивые работы нашего сообщества",
    path: "/gallery",
  },
  {
    icon: "ShoppingBag",
    title: "Каталог",
    desc: "Схемы, пряжа и всё для творчества",
    path: "/catalog",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen texture-bg">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <p className="text-sm uppercase tracking-widest text-[var(--warm-brown)] font-golos mb-4 animate-fade-in">
          Тепло в каждой петле
        </p>
        <h1 className="font-cormorant text-5xl md:text-7xl font-semibold text-[var(--deep-brown)] leading-tight mb-6 animate-fade-in-up">
          Нить & Стиль
        </h1>
        <div className="divider-gold w-40 mx-auto mb-6" />
        <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto font-golos mb-10 animate-fade-in-up delay-200">
          Место, где вязание становится искусством. Мастер-классы, вдохновение и
          каталог всего нужного для творчества.
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-300">
          <Link
            to="/masterclasses"
            className="px-8 py-3 bg-[var(--deep-brown)] text-[var(--cream)] rounded-full font-golos text-sm hover:bg-[var(--warm-brown)] transition-colors"
          >
            Начать учиться
          </Link>
          <Link
            to="/catalog"
            className="px-8 py-3 border border-[var(--warm-brown)] text-[var(--warm-brown)] rounded-full font-golos text-sm hover:bg-[var(--beige)] transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-cormorant text-3xl md:text-4xl text-center text-[var(--deep-brown)] mb-12">
          Что вас ждёт
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              key={f.path}
              to={f.path}
              className="card-hover bg-white rounded-2xl p-6 border border-[var(--beige)] flex flex-col gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--beige)] flex items-center justify-center">
                <Icon name={f.icon} size={22} className="text-[var(--warm-brown)]" />
              </div>
              <h3 className="font-cormorant text-xl text-[var(--deep-brown)] font-semibold">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] font-golos leading-relaxed">
                {f.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-3xl bg-[var(--deep-brown)] text-[var(--cream)] p-10 md:p-16 text-center knit-pattern">
          <h2 className="font-cormorant text-3xl md:text-5xl font-semibold mb-4">
            Начните своё путешествие в мир вязания
          </h2>
          <p className="text-[var(--beige)] font-golos mb-8 max-w-lg mx-auto">
            Сотни схем, полезных советов и вдохновения — всё в одном месте.
          </p>
          <Link
            to="/masterclasses"
            className="inline-block px-10 py-3 bg-[var(--gold)] text-[var(--deep-brown)] rounded-full font-golos font-semibold hover:opacity-90 transition-opacity"
          >
            Смотреть мастер-классы
          </Link>
        </div>
      </section>
    </div>
  );
}