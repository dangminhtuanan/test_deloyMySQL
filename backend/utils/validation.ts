import validator from "validator";

export function getNormalizedEmail(email?: string): string {
  return email && typeof email === "string" ? email.trim().toLowerCase() : "";
}

export function isValidVietnamesePhone(phone?: string): boolean {
  if (!phone) return true;
  return validator.isMobilePhone(phone, "vi-VN") && phone.length >= 9 && phone.length <= 12;
}

export function isValidOptionalAddress(address?: string | null): boolean {
  return address === undefined || address === null || address === "" || address.trim().length > 0;
}

export function isValidEmail(email: string): boolean {
  return validator.isEmail(email);
}
