import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Профіль користувача | My App",
  description: "Перегляд інформації профілю",
};

export default async function ProfilePage() {
  const user = await getMe();

  if (!user) {
    return (
      <main className={css.mainContent}>
        Користувача не знайдено або ви не авторизовані.
      </main>
    );
  }

  const fallbackAvatar = `https://ui-avatars.com{encodeURIComponent(user.username)}&background=random`;
  const avatarUrl = user.avatar || fallbackAvatar;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={avatarUrl}
            alt={`Аватар користувача ${user.username}`}
            width={120}
            height={120}
            className={css.avatar}
            priority
            unoptimized
          />
        </div>

        <div className={css.profileInfo}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}
