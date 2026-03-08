import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Notes from "./Notes.client";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const filterValue = slug.join(" / ");

  const title = `Фільтр: ${filterValue} | NoteHub`;
  const description = `Перегляд нотаток за фільтром: ${filterValue}. Знаходьте ваші записи швидко та зручно.`;
  const url = `https://08-zustand-git-main-bogdan-osts-projects.vercel.app/notes/filter/${slug.join("/")}`;

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
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub Filter: ${filterValue}`,
        },
      ],
      locale: "uk_UA",
      type: "website",
    },
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const queryClient = new QueryClient();
  const activeTag = resolvedParams.slug?.[0] || "all";

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, activeTag],
    queryFn: () =>
      fetchNotes({
        search: "",
        page: 1,
        tag: activeTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={activeTag} />
    </HydrationBoundary>
  );
}
