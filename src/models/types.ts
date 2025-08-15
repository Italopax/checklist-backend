export type SensitiveColumns = {
  password?: boolean;
  verificationCode?: boolean;
}

export type SameSiteCookieConfiguration = boolean | "lax" | "strict" | "none";