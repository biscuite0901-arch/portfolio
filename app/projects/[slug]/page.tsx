import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Slider from "@/components/Slider";
import { Arrow, Rich } from "@/components/Rich";
import { projects, site, slidePath } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.nav.name} | 고백빈 포트폴리오`,
    description: p.sub,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const prev = projects[i - 1];
  const next = projects[i + 1];

  return (
    <>
      <div className="tint">
        <div className="wrap wrap-d detail-head">
          <a href="/#work" className="back-pill">
            <Arrow dir="left" size={14} /> 대표 프로젝트 목록
          </a>
          <p className="eyebrow">{p.eyebrow}</p>
          <h1>
            {p.headline.map((l) => (
              <span key={l} className="line">
                {l}
              </span>
            ))}
          </h1>
          <p className="detail-sub">{p.sub}</p>
          <dl className="detail-meta">
            {p.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="band" style={{ background: p.bandColor }} aria-label="기획서">
        <div className="band-inner">
          <Slider slug={p.slug} count={p.slideCount} title={p.nav.name} />
        </div>
      </section>

      <div className="wrap wrap-d">
        <section className="dsec dsec-summary">
          <h2 className="dsec-title">요약</h2>
          <p className="dsec-body summary">{p.summary}</p>
        </section>

        <section className="dsec">
          <div className="dsec-head">
            <span className="num-sm">01</span>
            <h2 className="dsec-title">배경</h2>
          </div>
          <div className="dsec-body">
            <p className="bg-lead">{p.background.lead}</p>
            {p.background.note && <p className="note note-tint">{p.background.note}</p>}
          </div>
        </section>
      </div>

      <section className="tint section-pad">
        <div className="wrap wrap-d">
          <div className="dsec dsec-flush">
            <div className="dsec-head">
              <span className="num-sm">02</span>
              <h2 className="dsec-title">실행</h2>
            </div>
            <ol className="dsec-body exec">
              {p.execution.map((e, k) => (
                <li key={e.title}>
                  <h3>
                    <span className="exec-num">{k + 1}</span>
                    {e.title}
                  </h3>
                  <ul>
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {e.note && <p className="note note-white">{e.note}</p>}
                </li>
              ))}
            </ol>
          </div>

          {p.extraCards?.map((c) => (
            <div key={c.title} className="step-card">
              <h3>{c.title}</h3>
              <div className={`steps steps-${c.columns.length}`}>
                {c.columns.map((col, k) => (
                  <div key={col.label} className={`step${col.highlight ? " is-final" : ""}`}>
                    <div className="step-label">
                      <span>{col.label}</span>
                      {c.arrows && k < c.columns.length - 1 && <Arrow size={14} />}
                    </div>
                    <strong className={col.titleStrike ? "strike" : ""}>
                      <Rich text={col.title} />
                    </strong>
                    {col.tag &&
                      (col.tagPlain ? (
                        <span className="step-plain">{col.tag}</span>
                      ) : (
                        <span className="step-tag">{col.tag}</span>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="wrap wrap-d">
        <section className="dsec">
          <div className="dsec-head">
            <span className="num-sm">03</span>
            <h2 className="dsec-title">결과</h2>
          </div>
          <ul className="dsec-body results">
            {p.results.map((r) => (
              <li key={r}>
                <Rich text={r} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="navy section-pad">
        <div className="wrap wrap-d dsec dsec-flush">
          <div className="dsec-head">
            <span className="num-sm">04</span>
            <h2 className="dsec-title">배운 점</h2>
          </div>
          <ul className="dsec-body lessons">
            {p.lessons.map((l) => (
              <li key={l.body}>
                {l.head && <strong className="lesson-head">{l.head}</strong>}
                <Rich text={l.body} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="wrap wrap-d">
        <nav className="pn" aria-label="다른 프로젝트">
          <div className="pn-col">
            {prev && (
              <a href={`/projects/${prev.slug}`} className="pn-link">
                <span className="pn-dir">
                  <Arrow dir="left" size={14} /> 이전 프로젝트
                </span>
                <strong>{prev.nav.name}</strong>
                <span>{prev.nav.desc}</span>
              </a>
            )}
          </div>
          <div className="pn-col pn-right">
            {next && (
              <a href={`/projects/${next.slug}`} className="pn-link">
                <span className="pn-dir">
                  다음 프로젝트 <Arrow size={14} />
                </span>
                <strong>{next.nav.name}</strong>
                <span>{next.nav.desc}</span>
              </a>
            )}
          </div>
        </nav>
        <a href="/#work" className="all-link">
          전체 프로젝트 목록 <Arrow size={14} />
        </a>
      </div>

      <footer className="detail-foot">
        <div className="wrap wrap-d">
          <span>{site.name}</span>
          <span>서비스 기획 · PM</span>
        </div>
      </footer>
    </>
  );
}

export const dynamicParams = false;
