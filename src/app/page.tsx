import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-offWhite">
      <h1 className="sm:text-5xl font-bold text-base mb-4">
        🎠 Welcome to Consis
      </h1>
      <p className="text-base leading-relaxed text-gray-700 mb-8 max-w-md">
        ✨مسیر رشدتو شروع کن، با ثبت قدم‌های کوچیک اما مداوم ✨
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-orangeAccent px-6 py-3 rounded-xl shadow-md hover:bg-orangeAccent/90 transition-all font-medium"
        >
          ورود
        </Link>
        <Link
          href="/register"
          className="border-2 border-orangeAccent text-orangeAccent px-6 py-3 rounded-xl hover:bg-orangeAccent/10 transition-all font-medium"
        >
          ثبت‌نام
        </Link>
      </div>
    </main>
  );
}
