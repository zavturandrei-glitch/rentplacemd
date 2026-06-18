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
    const section =
      document.getElementById("today-free") ||
      document.getElementById("apartments");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
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

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Квартиры посуточно в Кишинёве
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-xl font-bold leading-8 text-white/90 sm:text-2xl">
            12 проверенных квартир в центре города • Заселение 24/7
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-7 shadow-2xl">
            {!showRequest ? (
              <>
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d4146f] text-3xl shadow-lg">
                  🔑
                </div>

                <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">
                  Быстрый подбор
                </p>

                <h2 className="text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
                  Подобрать квартиру в один клик
                </h2>

                <p className="mt-4 text-lg font-semibold leading-7 text-gray-600">
                  Напишите дату заезда, дату выезда и сколько будет персон.
                  Мы подберём подходящий вариант.
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
                  Дата заезда, дата выезда и сколько персон.
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

          <div className="grid gap-6">
            <button
              onClick={scrollToApartments}
              className="rounded-[2rem] bg-[#ffd21f] p-7 text-left shadow-2xl transition hover:scale-[1.02]"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
                🏠
              </div>

              <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">
                Каталог
              </p>

              <h2 className="text-3xl font-black leading-tight text-black sm:text-4xl">
                Смотреть квартиры
              </h2>

              <p className="mt-4 text-lg font-semibold leading-7 text-black/70">
                Откройте актуальные квартиры, фото, цены и ID каждого варианта.
              </p>
            </button>

            <div className="rounded-[2rem] bg-white p-7 shadow-2xl">
              <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#d4146f]">
                Быстрый переход
              </p>

              <h2 className="text-3xl font-black text-gray-950">
                Поиск по ID
              </h2>

              <p className="mt-3 text-base font-semibold text-gray-600">
                Введите номер квартиры, который вам сказали по телефону.
              </p>

              <div className="mt-5 flex gap-3">
                <input
                  value={apartmentId}
                  onChange={(e) => setApartmentId(e.target.value)}
                  placeholder="Например: 20"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-lg font-black text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#d4146f] focus:bg-white"
                />

                <button
                  onClick={openApartmentById}
                  className="rounded-2xl bg-[#d4146f] px-7 py-4 text-lg font-black text-white shadow-lg transition hover:scale-105"
                >
                  Найти
                </button>
              </div>

              <p className="mt-4 text-sm font-bold text-gray-500">
                Пример: ID 20, ID 42 или ID 13.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}