"use client";
import { z } from "zod";

export const authSchema = z.object({
  phone: z
    .string()
    .nonempty("شماره موبایل الزامی است")
    .regex(/^09\d{9}$/, "شماره باید 11 رقم و با 09 شروع شود"),
});

export type AuthInputs = z.infer<typeof authSchema>;
