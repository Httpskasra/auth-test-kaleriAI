"use client";
import { HTMLAttributes } from "react";

export default function FadeIn({
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      style={{
        animation: "fadeIn .6s ease both",
      }}>
      {children}
    </div>
  );
}
