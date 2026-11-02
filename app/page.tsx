import { Arrow, Rich } from "@/components/Rich";
import { hero, howIWork, profile, projects, recognition, site, skills, slidePath } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <>
      <div className="tint">
        <div className="wrap">
          <header className="topbar">
            <span>{site.tagline}</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </header>

          <section className="hero" aria-label="소개">
            <div className="hero-photo">
              <img src="/profile.webp" alt="고백빈 프로필 사진" width={800} height={1000} />
            </div>
            <div className="hero-text">
              <h1>
                {hero.titleLines.map((l, i) => (
                  <span key={i} className="line">
                    <Rich text={l} />
                  </span>
                ))}
              </h1>
              {hero.paragraphs.map((p, i) => (
                <p key={i}>
                  {p.map((l, j) => (
                    <span key={j} className="line-pc">
                      <Rich text={l} />{" "}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </section>

          <div className="keywords">
            {hero.keywords.map((k, i) => (
              <div key={k.title} className="keyword">
                <span className="num-sm">{pad(i + 1)}</span>
                <strong>{k.title}</strong>
                <span>{k.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <section className="split section" id="profile">
          <h2 className="display">Profile.</h2>
          <div className="split-body rule-top">
            {profile.map((r) => (
              <div key={r.title} className="profile-row">
                <span className="profile-label">{r.label ?? ""}</span>
                <div className="profile-main">
                  <strong>{r.title}</strong>
                  {r.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
                <span className="profile-date">{r.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="split section" aria-label="What I do">
          <h2 className="display">What I do.</h2>
          <div className="split-body rule-top pills">
            <div className="pill-row">
              {skills.primary.map((s) => (
                <span key={s} className="pill pill-dark">
                  {s}
                </span>
              ))}
            </div>
            <div className="pill-row">
              {skills.tools.map((s) => (
                <span key={s} className="pill pill-light">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="tint section-pad" aria-label="How I work">
        <div className="wrap split">
          <h2 className="display">
            How I<br />
            work.
          </h2>
          <ol className="split-body how">
            {howIWork.map((h, i) => (
              <li key={h.title}>
                <span className="how-num">{pad(i + 1)}</span>
                <div>
                  <strong>{h.title}</strong>
                  <p>
                    {h.body.map((b) => (
                      <span key={b} className="line-pc">
                        {b}{" "}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="wrap">
        <section className="section" id="work">
          <h2 className="display">Selected work.</h2>
          <p className="lead-muted">데이터를 이용한 대표 프로젝트입니다. 판단의 근거는 각 프로젝트 페이지에 정리했습니다.</p>
          <div className="works">
            {featured.map((p, i) => (
              <article key={p.slug} className="work">
                <a href={`/projects/${p.slug}`} className="work-thumb" aria-label={`${p.card.title} 자세히 보기`}>
                  <img src={slidePath(p.slug, 1)} alt="" width={1920} height={1080} loading={i ? "lazy" : "eager"} />
                </a>
                <div className="work-body">
                  <div className="work-top">
                    <span className="num-sm">{pad(i + 1)}</span>
                    {p.card.badge && <span className="badge">{p.card.badge}</span>}
                  </div>
                  <h3>{p.card.title}</h3>
                  <span className="work-meta">{p.card.meta}</span>
                  <p className="work-one">{p.card.oneliner}</p>
                  <dl className="work-facts">
                    {p.card.judge && (
                      <div>
                        <dt>판단</dt>
                        <dd>{p.card.judge}</dd>
                      </div>
                    )}
                    <div>
                      <dt>역할</dt>
                      <dd>{p.card.role}</dd>
                    </div>
                  </dl>
                  <span className="kp-label">KEY POINT</span>
                  <ul className="kp">
                    {p.card.keyPoints?.map((k) => (
                      <li key={k.to}>
                        <span className="kp-from">{k.from ?? ""}</span>
                        <span className="kp-arrow" aria-hidden="true">
                          {k.from ? <Arrow size={14} /> : null}
                        </span>
                        <strong className="kp-to">{k.to}</strong>
                        <span className="kp-note">{k.note}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={`/projects/${p.slug}`} className="btn-pill">
                    자세히 보기 <Arrow size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="split section" aria-label="More work">
          <div>
            <h2 className="display">
              More
              <br />
              work.
            </h2>
            <p className="lead-muted">대표 프로젝트 외의 기획 경험입니다.</p>
          </div>
          <div className="split-body rule-top">
            {more.map((p) => (
              <a key={p.slug} href={`/projects/${p.slug}`} className="more-row">
                <img src={slidePath(p.slug, 1, true)} alt="" width={240} height={135} loading="lazy" />
                <div>
                  <span className="more-date">{p.card.moreDate}</span>
                  <strong>{p.card.moreName}</strong>
                  <span className="more-desc">{p.card.moreDesc}</span>
                </div>
                <span className="more-go" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="split section" aria-label="Recognition">
          <h2 className="display">Recognition.</h2>
          <div className="split-body rule-top">
            {recognition.map((r) => (
              <div key={r.title} className="rec-row">
                <span className="rec-date">{r.date}</span>
                <div>
                  <strong>{r.title}</strong>
                  {r.note && <span className="rec-note">{r.note}</span>}
                  {r.sub.map((s) => (
                    <span key={s} className="rec-sub">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="contact" id="contact">
        <div className="wrap">
          <h2 className="display">Contact.</h2>
          <p className="contact-lead">채용 · 협업 관련 연락은 이메일로 부탁드립니다.</p>
          <a className="contact-mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="contact-links">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>
          <div className="footer-bar">
            <span>{site.name}</span>
            <span>Portfolio</span>
          </div>
        </div>
      </footer>
    </>
  );
}
