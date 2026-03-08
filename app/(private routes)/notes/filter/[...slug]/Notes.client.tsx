"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./page.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Pagination } from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

interface NotesClientProps {
  tag: string;
}

export default function Notes({ tag }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 500);

  const handleSearch = (value: string) => {
    setPage(1);
    debouncedSetSearchQuery(value);
  };

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["notes", searchQuery, page, tag],
    queryFn: () => fetchNotes(searchQuery, page, tag),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onSearch={handleSearch} />
        {!isLoading && totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            forcePage={page}
            onPageChange={(selected) => {
              if (!isPlaceholderData) {
                setPage(selected);
              }
            }}
          />
        )}
        {
          <Link href="/notes/action/create" className={css.createButton}>
            Create note +
          </Link>
        }
      </header>
      {!isLoading && data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
    </div>
  );
}
