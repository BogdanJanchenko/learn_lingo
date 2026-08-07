// validation/registerSchema.ts

import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Min 2 characters")
    .max(16, "Max 16 characters")
    .required("Required"),

  email: Yup.string()
    .email("Invalid email")
    .max(128, "Max 128 characters")
    .required("Required"),

  password: Yup.string()
    .min(8, "Min 8 characters")
    .max(128, "Max 128 characters")
    .required("Required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});