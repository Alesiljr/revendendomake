/**
 * Formatting utilities — locale pt-BR.
 *
 * formatPrice(29.9)   → 'R$ 29,90'
 * formatDate('2026-04-24') → '24/04/2026'
 * formatPhone('11999999999') → '(11) 9 9999-9999'
 */

/**
 * Format a numeric value as Brazilian currency.
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Format a date string or Date object as DD/MM/YYYY.
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

/**
 * Format a phone number for display.
 * Input: '11999999999' → Output: '(11) 9 9999-9999'
 * Input: '1133334444'  → Output: '(11) 3333-4444'
 */
export function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean[2]} ${clean.slice(3, 7)}-${clean.slice(7)}`;
  }
  if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }
  return phone;
}
