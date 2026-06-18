"use client";

import { useState } from "react";

export default function Hero() {
  const [showRequest, setShowRequest] = useState(false);
  const [message, setMessage] = useState("");
  const [apartmentId, setApartmentId] = useState("");

  const whatsappText =
    message.trim() ||
    "Здравствуйте! Хочу квартиру посуточно. Дата заезда: ___ . Дата выселения: ___ . Количество персон: ___.";

  const whatsappLink = `https://wa.me/37369990190?text=${encodeURIComponent(
    whatsappText
  )}`;

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

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Квартиры посуточно <br />в Кишинёве
          </h1>

          <p className="mt-8 text-2xl font-black text-white sm:text-3xl">
            От 800 лей • Центр города • Заселение 24/7
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-2xl border border-white/20 bg-white/15 px-6 py-4 text-white backdrop-blur">
              <p className="text-sm font-bold text-white/70">В одном доме</p>
              <p className="text-2xl font-black">12 квартир рядом</p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/15 px-6 py-4 text-white backdrop-blur">
              <p className="text-sm font-bold text-white/70">Цена</p>
              <p className="text-2xl font-black">от 800 лей</p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/15 px-6 py-4 text-white backdrop-blur">
              <p className="text-sm font-bold text-white/70">Связь</p>
              <p className="text-2xl font-black">24/7</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:+37369990190"
              className="rounded-2xl bg-[#ffd21f] px-10 py-5 text-center text-xl font-black text-black shadow-xl transition hover:scale-105"
            >
              Позвонить сейчас
            </a>

            <a
              href="viber://chat?number=%2B37369990190"
              className="rounded-2xl bg-[#d4146f] px-10 py-5 text-center text-xl font-black text-white shadow-xl transition hover:scale-105"
            >
              Написать в Viber
            </a>
          </div>
        </div>

        <div className="relative z-10 mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-7 shadow-2xl">
            {!showRequest ? (
              <>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffd21f] text-3xl shadow-lg">
                  🔑
                </div>

                <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">
                  Быстрый подбор
                </p>

                <h2 className="text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
                  Подобрать квартиру в один клик
                </h2>

                <p className="mt-4 text-lg font-semibold leading-7 text-gray-600">
                  Нажмите кнопку и напишите дату заезда, дату выселения и
                  сколько будет персон.
                </p>

                <button
                  onClick={() => setShowRequest(true)}
                  className="mt-7 w-full rounded-3xl bg-[#d4146f] px-8 py-6 text-xl font-black text-white shadow-xl transition hover:scale-105"
                >
                  Подобрать квартиру
                </button>
              </>
            ) : (
              <>
                <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">
                  Заявка на квартиру
                </p>

                <h2 className="text-3xl font-black text-gray-950">
                  Напишите одним текстом
                </h2>

                <p className="mt-3 text-lg font-semibold leading-7 text-gray-600">
                  Напишите дату заезда, дату выселения и сколько персон.
                </p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Например: с 20 по 23 июня, 2 взрослых..."
                  className="mt-5 min-h-32 w-full resize-none rounded-3xl border border-gray-200 bg-gray-50 p-5 text-lg font-semibold text-gray-800 outline-none transition focus:border-[#d4146f] focus:bg-white"
                />

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    className="rounded-2xl bg-[#25D366] px-6 py-5 text-center text-lg font-black text-white shadow-lg transition hover:scale-105"
                  >
                    Отправить в WhatsApp
                  </a>

                  <button
                    onClick={() => setShowRequest(false)}
                    className="rounded-2xl border border-gray-200 px-6 py-5 text-lg font-black text-gray-700"
                  >
                    Назад
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="rounded-[2rem] bg-[#ffd21f] p-7 shadow-2xl">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
              🆔
            </div>

            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">
              Быстрый переход
            </p>

            <h2 className="text-3xl font-black leading-tight text-black sm:text-4xl">
              Поиск по ID
            </h2>

            <p className="mt-4 text-lg font-semibold leading-7 text-black/70">
              Если вам сказали номер квартиры, введите ID и сразу откройте
              нужную страницу.
            </p>

            <div className="mt-7 flex gap-3">
              <input
                value={apartmentId}
                onChange={(e) => setApartmentId(e.target.value)}
                placeholder="Например: 20"
                className="w-full rounded-3xl border border-black/10 bg-white px-6 py-6 text-xl font-black text-black outline-none placeholder:text-black/40"
              />

              <button
                onClick={openApartmentById}
                className="rounded-3xl bg-[#d4146f] px-8 py-6 text-xl font-black text-white shadow-xl transition hover:scale-105"
              >
                OK
              </button>
            </div>

            <p className="mt-4 text-sm font-black text-black/70">
              Пример: ID 20, ID 42 или ID 13.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}