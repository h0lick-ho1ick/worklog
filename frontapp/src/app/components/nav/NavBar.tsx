import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="navwrap fixed top-0 left-0 z-50 w-full bg-slate-800 text-white">
      <div className="navinner mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* 좌측 로고 */}
        <div className="navlogo text-lg font-semibold"><Link href="/">Smart Working</Link></div>
        {/* 우측 정보 */}
        <div className="navright flex items-center gap-4 text-sm">
          <span className="navid flex items-center gap-2"><span className="h-8 w-8 rounded-full bg-gray-400"></span>유저 닉네임</span>
          <button type="button" className="navtell"><img src="/img/bell.svg" alt="알림" className="h-5 w-5" /></button>
        </div>
      </div>
    </nav>
  );
}
