import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RentPlaceMD - квартиры посуточно в Кишинёве",
    short_name: "RentPlaceMD",
    description: "Квартиры посуточно в центре Кишинёва, комплекс Измаил 88. Заселение 24/7, прямой контакт без посредников.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fffaf0",
    theme_color: "#07111f",
    categories: ["travel", "business", "lifestyle"],
    lang: "ru",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/og-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
