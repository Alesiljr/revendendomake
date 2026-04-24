"use client";

import { MessageCircle } from "lucide-react";
import {
  buildWhatsAppLink,
  WHATSAPP_MESSAGES,
} from "@/lib/utils/whatsapp";

interface WhatsAppFABProps {
  phone?: string;
  message?: string;
}

export function WhatsAppFAB({
  phone = process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT ?? "5511999999999",
  message = WHATSAPP_MESSAGES.default,
}: WhatsAppFABProps) {
  const url = buildWhatsAppLink(phone, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp-dark)] text-white rounded-full flex items-center justify-center shadow-whatsapp transition-all duration-200 hover:scale-105"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
    </a>
  );
}
