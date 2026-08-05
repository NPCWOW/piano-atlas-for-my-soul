const destinations = [
  {
    number: "01",
    title: "Atlas",
    description: "Эпохи, композиторы и произведения в единой музыкальной карте.",
    meta: "7 эпох · 30 композиторов",
  },
  {
    number: "02",
    title: "Musical Passport",
    description: "История, форма, сложность и исполнительская жизнь произведения.",
    meta: "Первый паспорт: Рахманинов",
  },
  {
    number: "03",
    title: "Collections",
    description: "ХТК Баха, концертные программы и тематические маршруты.",
    meta: "48 прелюдий и фуг",
  },
  {
    number: "04",
    title: "My Soul Library",
    description: "Личная история: люблю, учу, исполнял и хочу сыграть.",
    meta: "Ваш музыкальный путь",
  },
];

const eras = [
  ["1600", "Барокко"],
  ["1750", "Классицизм"],
  ["1810", "Романтизм"],
  ["1880", "Импрессионизм"],
  ["1900", "XX век"],
  ["2000", "Неоклассика"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Piano Atlas — на главную">
          <span className="brand-mark" aria-hidden="true">
            <span>L</span>
            <span>V</span>
          </span>
          <span className="brand-copy">
            <strong>Piano Atlas</strong>
            <small>for my soul</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Главная навигация">
          <a href="#atlas">Atlas</a>
          <a href="#passport">Passport</a>
          <a href="#journey">Journey</a>
        </nav>

        <button className="language-button" type="button" aria-label="Выбор языка">
          RU <span aria-hidden="true">⌄</span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-inner">
          <p className="eyebrow">PRELUDE · ПЕРВАЯ ГЛАВА</p>
          <h1>
            Музыка — это больше,
            <span>чем ноты.</span>
          </h1>
          <p className="hero-description">
            Изучайте историю произведений, понимайте их форму и создавайте
            собственный путь пианиста.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#atlas">
              Открыть атлас <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#passport">
              Посмотреть музыкальный паспорт
            </a>
          </div>

          <div className="dedication">
            <span className="dedication-line" />
            <p>
              Создано Ильёй Лыгиным
              <br />
              для Валерии Лыгиной
            </p>
          </div>
        </div>

        <div className="piano-art" aria-hidden="true">
          <div className="piano-lid" />
          <div className="piano-body">
            <div className="music-lines">
              <i />
              <i />
              <i />
              <i />
              <i />
              <b className="note note-one">♪</b>
              <b className="note note-two">♩</b>
              <b className="note note-three">♫</b>
            </div>
            <div className="keys">
              {Array.from({ length: 18 }).map((_, index) => (
                <span key={index} className={index % 7 === 1 || index % 7 === 3 || index % 7 === 6 ? "black-key" : ""} />
              ))}
            </div>
          </div>
          <div className="piano-leg piano-leg-one" />
          <div className="piano-leg piano-leg-two" />
        </div>

        <a className="scroll-cue" href="#atlas" aria-label="Прокрутить вниз">
          <span>ПРОДОЛЖИТЬ</span>
          <i>↓</i>
        </a>
      </section>

      <section className="section atlas-section" id="atlas">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ВАШЕ ПРОСТРАНСТВО</p>
            <h2>Откройте музыку по-своему.</h2>
          </div>
          <p>
            Piano Atlas объединяет энциклопедию, обучение и личную библиотеку
            в одном спокойном пространстве.
          </p>
        </div>

        <div className="destination-grid">
          {destinations.map((item) => (
            <article className="destination-card" key={item.number}>
              <span className="card-number">{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="card-footer">
                <small>{item.meta}</small>
                <span aria-hidden="true">↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section passport-section" id="passport">
        <div className="passport-copy">
          <p className="eyebrow">MUSICAL PASSPORT</p>
          <h2>У каждого произведения есть биография.</h2>
          <p>
            Не просто PDF с нотами, а живое досье: когда и где написано,
            сколько лет было автору, как устроена форма и какие исполнения
            изменили историю произведения.
          </p>
          <a className="text-link dark-link" href="#journey">
            Изучить концепцию <span aria-hidden="true">→</span>
          </a>
        </div>

        <article className="passport-preview">
          <div className="passport-topline">
            <span>PA · 1892 · 0032</span>
            <span>ROMANTIC ERA</span>
          </div>
          <div className="passport-title">
            <p>Сергей Рахманинов</p>
            <h3>Прелюдия до-диез минор</h3>
            <span>Op. 3 №2</span>
          </div>
          <div className="passport-facts">
            <div>
              <small>ГОД</small>
              <strong>1892</strong>
            </div>
            <div>
              <small>ВОЗРАСТ</small>
              <strong>19 лет</strong>
            </div>
            <div>
              <small>МЕСТО</small>
              <strong>Москва</strong>
            </div>
            <div>
              <small>ФОРМА</small>
              <strong>A–B–A′</strong>
            </div>
          </div>
          <div className="form-map">
            <span>A · LENTO</span>
            <span>B · AGITATO</span>
            <span>A′ · TEMPO I</span>
          </div>
          <blockquote>
            «Музыка пришла ко мне настолько настойчиво, что я должен был её
            записать».
          </blockquote>
        </article>
      </section>

      <section className="section timeline-section" id="journey">
        <div className="section-heading compact-heading">
          <div>
            <p className="eyebrow">ИСТОРИЯ ВО ВРЕМЕНИ</p>
            <h2>От Баха до неоклассики.</h2>
          </div>
          <p>Шесть эпох — одна непрерывная история фортепианной музыки.</p>
        </div>

        <div className="timeline">
          {eras.map(([year, era], index) => (
            <div className="timeline-item" key={era}>
              <span className="timeline-dot" />
              <small>{year}</small>
              <strong>{era}</strong>
              {index < eras.length - 1 && <i aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-mark">LV</div>
        <p>Piano Atlas for my soul</p>
        <small>By Lygin Ilya for Lygina Valeriya.</small>
      </footer>
    </main>
  );
}
