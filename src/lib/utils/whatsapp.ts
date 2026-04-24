/**
 * WhatsApp utility — build wa.me links for use across the site.
 *
 * Usage examples:
 *   buildWhatsAppLink('5511999999999', WHATSAPP_MESSAGES.default)
 *   → 'https://wa.me/5511999999999?text=Ol%C3%A1...'
 */

export const WHATSAPP_MESSAGES = {
  default: "Olá! Tenho interesse em ser revendedora da Revendendo Make.",
  product: (productName: string) =>
    `Olá! Tenho interesse no produto: ${productName}`,
  contact: "Olá! Gostaria de mais informações.",
} as const;

/**
 * Build a wa.me WhatsApp link.
 * @param phone - Phone number (any format — digits stripped automatically)
 * @param message - Pre-filled message text
 * @returns Full WhatsApp URL
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
