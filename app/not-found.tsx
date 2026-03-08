import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Сторінку не знайдено | NoteHub",
  description:
    "На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.",

  openGraph: {
    title: "404 - Сторінку не знайдено",
    description: "На жаль, ми не змогли знайти те, що ви шукаєте.",
    url: "https://08-zustand-psi-sable.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Error",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
