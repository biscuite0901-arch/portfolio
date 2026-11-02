"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow } from "./Rich";
import { slidePath } from "@/lib/data";

export default function Slider({ slug, count, title }: { slug: string; count: number; title: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  // 현재 썸네일이 보이도록 썸네일 줄을 스크롤
  useEffect(() => {
    const strip = thumbsRef.current;
    const el = strip?.children[index] as HTMLElement | undefined;
    if (strip && el) {
      const left = el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2;
      strip.scrollTo({ left, behavior: "smooth" });
    }
  }, [index]);

  // 다음 장 미리 불러오기
  useEffect(() => {
    const img = new Image();
    img.src = slidePath(slug, ((index + 1) % count) + 1);
  }, [index, slug, count]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, index, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="slider" tabIndex={0} onKeyDown={onKeyDown} aria-roledescription="carousel" aria-label={`${title} 기획서`}>
      <div className="slider-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img
          key={index}
          src={slidePath(slug, index + 1)}
          alt={`${title} 기획서 ${index + 1}번째 장`}
          className="slider-img"
          width={1920}
          height={1080}
        />
      </div>
      <div className="slider-bar">
        <div className="slider-left">
          <span className="slider-count" aria-live="polite">
            <strong>{pad(index + 1)}</strong> / {pad(count)}
          </span>
          <div className="slider-thumbs" ref={thumbsRef}>
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`slider-thumb${i === index ? " is-active" : ""}`}
                onClick={() => go(i)}
                aria-label={`${i + 1}번째 장 보기`}
                aria-current={i === index}
              >
                <img src={slidePath(slug, i + 1, true)} alt="" loading="lazy" width={240} height={135} />
              </button>
            ))}
          </div>
        </div>
        <div className="slider-right">
          <button type="button" className="slider-zoom" onClick={() => setZoom(true)}>
            원본 크기 <Arrow dir="up-right" size={14} />
          </button>
          <button type="button" className="slider-btn" onClick={() => go(index - 1)} aria-label="이전 장">
            <Arrow dir="left" />
          </button>
          <button type="button" className="slider-btn" onClick={() => go(index + 1)} aria-label="다음 장">
            <Arrow />
          </button>
        </div>
      </div>

      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="원본 크기로 보기" onClick={() => setZoom(false)}>
          <img src={slidePath(slug, index + 1)} alt={`${title} 기획서 ${index + 1}번째 장`} onClick={(e) => e.stopPropagation()} />
          <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="slider-btn" onClick={() => go(index - 1)} aria-label="이전 장">
              <Arrow dir="left" />
            </button>
            <span className="slider-count">
              <strong>{pad(index + 1)}</strong> / {pad(count)}
            </span>
            <button type="button" className="slider-btn" onClick={() => go(index + 1)} aria-label="다음 장">
              <Arrow />
            </button>
            <button type="button" className="lightbox-close" onClick={() => setZoom(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
