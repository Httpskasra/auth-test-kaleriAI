"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({ loading, className, children, ...rest }: Props) {
  return (
    <button
      className={clsx(styles.btn, loading && styles.loading, className)}
      disabled={loading || rest.disabled}
      {...rest}>
      <span className={styles.content}>{children}</span>
      {loading && <span className={styles.spinner} aria-hidden />}
    </button>
  );
}
