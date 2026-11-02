import { Arrow } from "./Rich";
import { slidePath } from "@/lib/data";

// 슬라이더 화면 구조입니다. 넘기기·썸네일·원본 크기 동작은 public/site.js가 담당합니다.
export default function Slider({ slug, count, title }: { slug: string; count: number; title: string }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="slider" data-slider tabIndex={0} aria-roledescription="carousel" aria-label={`${title} 기획서`}>
      <div className="slider-stage">
        <img src={slidePath(slug, 1)} alt={`${title} 기획서 1번째 장`} data-alt={title} className="slider-img" width={1920} height={1080} />
      </div>
      <div className="slider-bar">
        <div className="slider-left">
          <span className="slider-count" aria-live="polite">
            <strong data-current>01</strong> / {pad(count)}
          </span>
          <div className="slider-thumbs">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`slider-thumb${i === 0 ? " is-active" : ""}`}
                data-full={slidePath(slug, i + 1)}
                aria-label={`${i + 1}번째 장 보기`}
                aria-current={i === 0}
              >
                <img src={slidePath(slug, i + 1, true)} alt="" loading="lazy" width={240} height={135} />
              </button>
            ))}
          </div>
        </div>
        <div className="slider-right">
          <button type="button" className="slider-zoom" data-zoom>
            원본 크기 <Arrow dir="up-right" size={14} />
          </button>
          <button type="button" className="slider-btn" data-prev aria-label="이전 장">
            <Arrow dir="left" />
          </button>
          <button type="button" className="slider-btn" data-next aria-label="다음 장">
            <Arrow />
          </button>
        </div>
      </div>

      <div className="lightbox" role="dialog" aria-modal="true" aria-label="원본 크기로 보기" hidden>
        <img alt="" />
        <div className="lightbox-bar">
          <button type="button" className="slider-btn" data-prev aria-label="이전 장">
            <Arrow dir="left" />
          </button>
          <span className="slider-count">
            <strong data-current>01</strong> / {pad(count)}
          </span>
          <button type="button" className="slider-btn" data-next aria-label="다음 장">
            <Arrow />
          </button>
          <button type="button" className="lightbox-close" data-close>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
