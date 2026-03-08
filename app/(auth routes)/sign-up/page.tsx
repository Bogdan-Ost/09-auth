"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";
import axios from "axios";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      await signUp(formData);
      router.push("/profile");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Помилка сервера";
        setError(message);
      } else {
        setError("Сталася неочікувана помилка");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
