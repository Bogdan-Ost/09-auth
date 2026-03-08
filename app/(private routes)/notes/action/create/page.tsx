import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Створити нотатку | NoteHub",
  description:
    "Сторінка створення нової нотатки. Записуйте свої ідеї та думки швидко.",
  openGraph: {
    title: "Створити нотатку | NoteHub",
    description: "Створіть нову нотатку та збережіть її у хмарі.",
    url: "https://08-zustand-git-main-bogdan-osts-projects.vercel.app/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note Page",
      },
    ],
    type: "website",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
