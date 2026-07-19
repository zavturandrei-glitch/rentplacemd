import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "Запрошенная страница RentPlaceMD не существует или была перемещена.",
  alternates: null,
  openGraph: null,
  twitter: null,
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-[#fffaf0]">
      <Header />
      <section className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full max-w-xl rounded-[26px] border border-[#f0dfbf] bg-white p-7 text-center shadow-[0_18px_54px_rgba(15,23,42,0.08)] sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d4146f]">Ошибка 404</p>
          <h1 className="mt-3 text-3xl font-black text-[#07111f] sm:text-4xl">Страница не найдена</h1>
          <p className="mt-4 font-semibold leading-7 text-slate-600">
            Возможно, ссылка устарела или в адресе есть опечатка.
          </p>
          <Link
            href="/apartments"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#d4146f] px-6 py-3 font-black text-white shadow-lg shadow-pink-700/20 transition hover:bg-[#bd0f60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4146f]"
          >
            Смотреть квартиры
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
