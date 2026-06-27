export default function Footer() {
  return (
    <footer className="bg-[#1f2937] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-black text-[#ffb800]">
            RentPlaceMD™
          </h2>

          <p className="mt-3 text-lg text-gray-300">
            Квартиры посуточно в Кишинёве
          </p>

          <div className="mt-8 space-y-3 text-lg font-semibold">
            <a
              href="tel:+37369990190"
              className="block transition hover:text-[#ffb800]"
            >
              📞 +373 69 990 190
            </a>

            <a
              href="tel:+37379990190"
              className="block transition hover:text-[#ffb800]"
            >
              📞 +373 79 990 190
            </a>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="https://wa.me/37369990190"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white transition hover:scale-105"
            >
              WhatsApp
            </a>

            <a
              href="viber://chat?number=%2B37369990190"
              className="rounded-xl bg-[#7360F2] px-5 py-3 font-bold text-white transition hover:scale-105"
            >
              Viber
            </a>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-gray-400">
            © 2026 RentPlaceMD™<br />
            Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}