import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--deep-brown)] text-[var(--cream)] mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-cormorant text-2xl font-semibold mb-3">
              Рукотворная красота
            </h3>
            <p className="text-sm text-[var(--beige)] leading-relaxed">
              Всё о вязании: мастер-классы, вдохновение, мода и уютные идеи для
              дома и гардероба.
            </p>
          </div>
          <div>
            <h4 className="font-cormorant text-lg font-semibold mb-3">
              Разделы
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-[var(--beige)]">
              <li>
                <Link to="/masterclasses" className="hover:text-[var(--gold)] transition-colors">
                  Мастер-классы
                </Link>
              </li>
              <li>
                <Link to="/about-knitting" className="hover:text-[var(--gold)] transition-colors">
                  О вязании
                </Link>
              </li>
              <li>
                <Link to="/fashion" className="hover:text-[var(--gold)] transition-colors">
                  О моде
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[var(--gold)] transition-colors">
                  Галерея
                </Link>
              </li>
              <li>
                <Link to="/feed" className="hover:text-[var(--gold)] transition-colors">
                  Лента
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-cormorant text-lg font-semibold mb-3">
              Контакты
            </h4>
            <p className="text-sm text-[var(--beige)]">
              info@nit-style.ru
            </p>
          </div>
        </div>
        <div className="divider-gold mt-8 mb-4" />
        <p className="text-center text-xs text-[var(--beige)] opacity-60">
          © 2026 Нить & Стиль. Все права защищены.
        </p>
      </div>
    </footer>
  );
}