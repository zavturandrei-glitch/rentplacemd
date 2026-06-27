export default function Benefits() {
  const benefits = [
    {
      title: "Квартиры в центре",
      text: "Удобные локации в Кишинёве — рядом магазины, транспорт и всё необходимое.",
      icon: "🏠",
    },
    {
      title: "Заселение каждый день",
      text: "Помогаем быстро подобрать квартиру и заселиться без лишней суеты.",
      icon: "🔑",
    },
    {
      title: "Чисто и аккуратно",
      text: "После каждого гостя проводится уборка, готовится бельё и полотенца.",
      icon: "🧹",
    },
    {
      title: "Связь напрямую",
      text: "Можно сразу позвонить или написать, уточнить цену, даты и свободные варианты.",
      icon: "📞",
    },
    {
      title: "Квартиры рядом",
      text: "Есть несколько квартир в одном районе — удобно для семей, компаний и командировок.",
      icon: "📍",
    },
    {
      title: "Без лишних комиссий",
      text: "Работаем просто и понятно: показываем реальные варианты и актуальную цену.",
      icon: "💰",
    },
  ];

  return (
    <section id="benefits" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#d4146f]">
            Почему выбирают нас
          </p>

          <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Почему RentPlaceMD
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Посуточные квартиры в Кишинёве для гостей, командировок, семей и
            тех, кому нужно быстрое и понятное заселение.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-100 bg-[#fffaf0] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffb800] text-2xl shadow-md">
                {item.icon}
              </div>

              <h3 className="mb-3 text-xl font-black text-gray-950">
                {item.title}
              </h3>

              <p className="text-sm leading-6 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}