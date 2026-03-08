import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api/clientApi";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

async function getNote(id: string) {
  const res = await fetch(`https://api.example.com/notes/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const note = await getNote(id);

  const title = note ? `${note.title} | NoteHub` : "Нотатка не знайдена";
  const description = note ? note.content.substring(0, 160) : "Деталі нотатки";
  const url = `https://08-zustand-psi-sable.vercel.app/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global",
          width: 1200,
          height: 630,
          alt: note?.title || "NoteHub Detail",
        },
      ],
      type: "article",
    },
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
