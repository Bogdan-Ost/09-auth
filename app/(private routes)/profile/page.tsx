"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import Link from "next/link";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <main className={css.mainContent}>Loading profile...</main>;
  }

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
            src={user.avatar || `https://ui-avatars.com{user.username}`}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            unoptimized
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
