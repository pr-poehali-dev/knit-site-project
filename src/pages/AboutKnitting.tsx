const sections = [
  {
    title: "История вязания",
    text: "Вязание — одно из древнейших ремёсел человечества. Первые вязаные изделия датируются XI веком. Арабские торговцы привезли это искусство в Европу, откуда оно распространилось по всему миру.",
  },
  {
    title: "Виды техник",
    text: "Спицевое вязание, вязание крючком, тунисское вязание, бриошь, жаккард, фриформ — каждая техника открывает новые возможности для творчества.",
  },
  {
    title: "Виды пряжи",
    text: "Хлопок, шерсть, мохер, альпака, акрил, кашемир — выбор пряжи влияет на тактильность, тепло и внешний вид изделия. Знание свойств помогает создавать идеальные вещи.",
  },
  {
    title: "Инструменты",
    text: "Круговые и прямые спицы, крючки, маркеры, счётчики рядов, иглы для сшивания — каждый инструмент делает процесс удобнее и результат лучше.",
  },
];

export default function AboutKnitting() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-[var(--warm-brown)] font-golos mb-2">Познаём ремесло</p>
        <h1 className="font-cormorant text-4xl md:text-5xl text-[var(--deep-brown)] font-semibold mb-4">
          О вязании
        </h1>
        <div className="divider-gold w-32 mx-auto" />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {sections.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-8 border border-[var(--beige)] card-hover">
            <h2 className="font-cormorant text-2xl text-[var(--deep-brown)] font-semibold mb-3">
              {s.title}
            </h2>
            <div className="divider-gold mb-4" />
            <p className="text-[var(--text-muted)] font-golos leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
