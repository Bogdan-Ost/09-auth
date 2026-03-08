import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => {
        const path = tag === "All" ? "all" : tag;
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${path}`} className={css.menuLink}>
              {tag === "All" ? "All notes" : tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
