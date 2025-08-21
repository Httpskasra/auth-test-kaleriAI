"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...rest }, ref) => {
    const id = rest.id || `input-${Math.random().toString(36).slice(2, 8)}`;
    return (
      <div className={clsx(styles.field, className)}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={clsx(styles.input, error && styles.hasError)}
          {...rest}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
