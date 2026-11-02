import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: "고백빈 | PM 포트폴리오",
  description: "가설에 머무는 아이디어를 넘어, 시작할 수 있는 비즈니스로 만드는 기획자 고백빈의 포트폴리오입니다.",
  openGraph: {
    title: "고백빈 | PM 포트폴리오",
    description: "데이터 기반 서비스 기획 · PM 포트폴리오",
    images: ["/slides/comento/01.webp"],
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <button type="button" className="to-top" aria-label="맨 위로">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
        <script src="/site.js" defer></script>
      </body>
    </html>
  );
}
