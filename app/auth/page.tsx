"use client";

import { useState } from "react";
import styles from "./Auth.module.scss";
import { Input } from "@components/ui/Input";
import { Button } from "@components/ui/Button";
import { authSchema } from "@lib/validation";
import { useAuth } from "@hooks/useAuth";

export default function AuthPage() {
  const { login, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    const parsed = authSchema.safeParse({ phone });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "خطای نامشخص";
      setErrors(msg);
      return;
    }
    await login();
  };

  return (
    <section className={styles.authWrap}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>ورود به سامانه</h1>
          <p>برای ورود شماره موبایل خود را وارد کنید.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            label="شماره موبایل"
            placeholder="09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={11}
            dir="ltr"
            error={errors || undefined}
          />

          <Button type="submit" loading={loading} className={styles.cta}>
            ورود
          </Button>

          {errors && <div className={styles.errorMsg}>{errors}</div>}
        </form>

        <div className={styles.footerNote}>
          <span>ورود آزمایشی است و کاربر از RandomUser ایجاد می‌شود.</span>
        </div>
      </div>

      <div className={styles.decorations} aria-hidden>
        <span className={styles.blobA}></span>
        <span className={styles.blobB}></span>
        <span className={styles.ring}></span>
      </div>
    </section>
  );
}
