"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
