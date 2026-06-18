"use client";

import { useState } from "react";

export default function Hero() {
  const [showRequest, setShowRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [apartmentId, setApartmentId] = useState("");

  const whatsappText =
    message.trim() ||
    "Здравствуйте! Хочу квартиру посуточно. Дата заезда: ___ . Дата выезда: ___ . Количество персон: ___.";

  const whatsappLink = `https://wa.me/37369990190?text=${encodeURIComponent(
    whatsappText
  )}`;

  function scrollToApartments() {
    const section = document.getElementById("today-free");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  function openApartmentById() {
    const id = apartmentId.trim();

    if (id === "20") {
      window.location.href = "/apartment/izmail88-20";
      return;
    }

    if (id === "42") {
      window.location.href = "/apartment/izmail88-42";
      return;
    }

    if (id === "13") {
      window.location.href = "/apartment/izmail88-13";
      return;
    }

    alert("Квартира с таким ID пока не найдена. Позвоните нам, и мы подскажем.");
  }

  return (
    <section className="relative overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/main.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-5xl text-center">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Квартиры посуточно в Кишинёве
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-lg font-bold leading-8 text-white/90 sm:text-2xl">
            12 проверенных квартир в центре города • Заселение 24/7
          </p>
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/25 bg-[#d4146f]/70 p-6 text-white shadow-2xl backdrop-blur-xl transition hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(212,20,111,0.35)]">
            {!showRequest ? (
              <>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl shadow-lg">
                  🔑
                </div>

                <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-white/80">
                  Быстрый подбор
                </p>

                <h2 className="text-2xl font-black leading-tight">
                  Подобрать квартиру в один клик
                </h2>

                <p className="mt-4 text-base font-semibold leading-6 text-white/90">
                  Напишите дату заезда, дату выезда и сколько будет персон.
                </p>

                <button
                  onClick={() => setShowRequest(true)}
                  className="mt-5 w-full rounded-2xl bg-white px-6 py-4 text-lg font-black text-[#d4146f] shadow-xl transition hover:scale-105"
                >
                  Подобрать
                </button>
              </>
            ) : (
              <>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-white/80">
                  Заявка
                </p>

                <h2 className="text-2xl font-black">Напишите одним текстом</h2>

                <p className="mt-3 text-base font-semibold leading-6 text-white/90">
                  Дата заезда, дата выезда и сколько персон.
                </p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Например: с 20 по 23 июня, 2 взрослых..."
                  className="mt-4 min-h-24 w-full resize-none rounded-2xl border border-white/30 bg-white/20 p-4 text-base font-semibold text-white outline-none placeholder:text-white/70 focus:bg-white/25"
                />

                <div className="mt-4 grid gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    className="rounded-2xl bg-[#25D366] px-6 py-4 text-center text-base font-black text-white shadow-lg transition hover:scale-105"
                  >
                    Отправить в WhatsApp
                  </a>

                  <button
                    onClick={() => setShowRequest(false)}
                    className="rounded-2xl border border-white/30 px-6 py-3 text-base font-black text-white transition hover:bg-white/10"
                  >
                    Назад
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={scrollToApartments}
            className="rounded-[2rem] border border-white/25 bg-[#ffd21f]/75 p-6 text-left text-black shadow-2xl backdrop-blur-xl transition hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(255,210,31,0.35)]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/35 text-2xl shadow-lg">
              🏠
            </div>

            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#d4146f]">
              Каталог
            </p>

            <h2 className="text-2xl font-black leading-tight">
              Смотреть квартиры
            </h2>

            <p className="mt-4 text-base font-semibold leading-6 text-black/75">
              Фото, цены, описание и ID каждого варианта.
            </p>

            <div className="mt-5 rounded-2xl bg-black px-6 py-4 text-center text-lg font-black text-white shadow-xl transition hover:scale-105">
              Открыть каталог
            </div>
          </button>

          <div className="rounded-[2rem] border border-white/25 bg-white/25 p-6 text-white shadow-2xl backdrop-blur-xl transition hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(255,255,255,0.25)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/25 text-2xl shadow-lg">
              🆔
            </div>

            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#ffd21f]">
              Быстрый переход
            </p>

            <h2 className="text-2xl font-black leading-tight">Поиск по ID</h2>

            <p className="mt-4 text-base font-semibold leading-6 text-white/90">
              Введите номер квартиры, который вам сказали по телефону.
            </p>

            <div className="mt-5 flex gap-3">
              <input
                value={apartmentId}
                onChange={(e) => setApartmentId(e.target.value)}
                placeholder="20"
                className="w-full rounded-2xl border border-white/30 bg-white/25 px-5 py-4 text-lg font-black text-white outline-none placeholder:text-white/70 focus:bg-white/30"
              />

              <button
                onClick={openApartmentById}
                className="rounded-2xl bg-[#d4146f] px-6 py-4 text-lg font-black text-white shadow-lg transition hover:scale-105"
              >
                Найти
              </button>
            </div>

            <p className="mt-4 text-sm font-bold text-white/75">
              Пример: ID 20, ID 42 или ID 13.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}