import Link from "next/link";

const NAV_LABELS = {
  brand: "Smart Working",
  userName: "유저 닉네임",
  notificationAlt: "알림",
};

export default function NavBar() {
  return (
    <nav className="navwrap fixed top-0 left-0 z-50 w-full bg-slate-800 text-white">
      <div className="navinner mx-auto flex h-14 max-w-6xl items-center justify-between">
        <div className="navlogo text-lg font-semibold">
          <Link href="/">{NAV_LABELS.brand}</Link>
        </div>
        <div className="navright flex items-center gap-4 text-sm">
          <span className="navid flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gray-400"></span>
            {NAV_LABELS.userName}
          </span>
          <button type="button" className="navtell">
            <img
              src="/img/bell.svg"
              alt={NAV_LABELS.notificationAlt}
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
