"use client";

import styles from "./Dashboard.module.scss";
import { useAuth } from "@hooks/useAuth";
import Image from "next/image";

export default function DashboardPage() {
  const { user, requireAuth } = useAuth();
  requireAuth(); // برای اینکه اگر لوکال استورج خالی بود ریدایرکت کنه
  if (!user) return null;

  const fullName = `${user.name.first} ${user.name.last}`;

  return (
    <section className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.profile}>
          <Image
            src={user.picture.large}
            alt={fullName}
            width={96}
            height={96}
            className={styles.avatar}
            priority
          />
          <div>
            <h1>خوش آمدی، {fullName} ✨</h1>
            <p>Welcome to the Dashboard</p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.tile}>
            <h3>اطلاعات حساب</h3>
            <ul>
              <li>ایمیل: {user.email}</li>
              <li>شهر: {user.location.city}</li>
              <li>کشور: {user.location.country}</li>
            </ul>
          </div>

          <div className={styles.tile}>
            <h3>توسط</h3>
            <p>کسری رحمانیان</p>
          </div>
        </div>
      </div>
    </section>
  );
}
