import Image from "next/image";
import Link from "next/link";

const NAV_LABELS = {
  brand: "Smart Working",
  userName: "홍길동 사원",
  notificationAlt: "알림",
};

export default function NavBar() {
  return (
    <nav
      className="fixed left-0 top-0 z-50 w-full text-white shadow-md"
      style={{ backgroundColor: "#3451c6", borderBottom: "1px solid #263ea1" }}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-[18px] font-extrabold tracking-tight text-white"
        >
          {NAV_LABELS.brand}
        </Link>

        <div className="flex items-center gap-3 text-sm font-medium text-blue-50">
          <span className="hidden items-center gap-2 rounded-full border border-blue-300/35 bg-blue-800/35 px-3 py-1.5 sm:flex">
            <span className="h-6 w-6 rounded-full bg-blue-200/70" />
            {NAV_LABELS.userName}
          </span>
          <button
            type="button"
            className="rounded-full border border-blue-300/35 bg-blue-800/35 p-2 transition-colors hover:bg-blue-800/55"
            aria-label={NAV_LABELS.notificationAlt}
          >
            <Image
              src="/img/bell.svg"
              alt={NAV_LABELS.notificationAlt}
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
