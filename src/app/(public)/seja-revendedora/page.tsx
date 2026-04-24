"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const benefits = [
  "Trabalhe no seu horário, em casa ou onde quiser",
  "Sem taxa de adesão — cadastro 100% gratuito",
  "Margem de lucro de até 40% em cada produto",
  "Mais de 200 produtos de alta qualidade no catálogo",
  "Suporte completo da nossa equipe via WhatsApp",
];

interface FormData {
  name: string;
  phone: string;
  city: string;
  lgpd: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  city?: string;
  lgpd?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Informe seu nome completo (mínimo 2 caracteres).";
  }
  const cleanPhone = data.phone.replace(/\D/g, "");
  if (!cleanPhone || cleanPhone.length < 10) {
    errors.phone = "Informe um telefone válido com DDD.";
  }
  if (!data.city || data.city.trim().length < 2) {
    errors.city = "Informe sua cidade.";
  }
  if (!data.lgpd) {
    errors.lgpd = "Você precisa aceitar os termos para continuar.";
  }
  return errors;
}

export default function SejaRevendedoraPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    city: "",
    lgpd: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    // Simulate async — real submission goes to /api/leads (Story 2.2)
    await new Promise((res) => setTimeout(res, 1200));
    setSubmitting(false);
    setSuccess(true);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-4xl mb-4 block">💄</span>
          <h1 className="font-playfair font-bold text-3xl md:text-5xl mb-4 leading-tight">
            Comece a Ganhar Dinheiro Hoje
          </h1>
          <p className="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto">
            Seja uma revendedora Revendendo Make. Cadastro gratuito, suporte
            completo e os melhores produtos do mercado.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div>
              <h2 className="font-playfair font-bold text-2xl md:text-3xl text-neutral-900 mb-6">
                Por que ser revendedora Revendendo Make?
              </h2>
              <ul className="space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                <p className="text-neutral-600 text-sm leading-relaxed">
                  <strong className="text-neutral-900">Como funciona?</strong>
                  <br />
                  Após o cadastro, nossa equipe entra em contato em até 24 horas
                  pelo WhatsApp para orientar você sobre os próximos passos. Sem
                  burocracia, sem taxa.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-md border border-neutral-100 p-8">
              {success ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="font-playfair font-bold text-2xl text-neutral-900 mb-2">
                    Cadastro enviado! 🎉
                  </h3>
                  <p className="text-neutral-600">
                    Nossa equipe vai entrar em contato em até 24 horas pelo
                    WhatsApp. Fique de olho!
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-playfair font-bold text-xl text-neutral-900 mb-6">
                    Cadastre-se Gratuitamente
                  </h3>
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Nome completo <span className="text-error">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Seu nome"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-shadow min-h-[48px]",
                          errors.name
                            ? "border-error focus:ring-error"
                            : "border-neutral-200"
                        )}
                      />
                      {errors.name && (
                        <p role="alert" className="text-error text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        WhatsApp / Telefone <span className="text-error">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="(11) 9 9999-9999"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-shadow min-h-[48px]",
                          errors.phone
                            ? "border-error focus:ring-error"
                            : "border-neutral-200"
                        )}
                      />
                      {errors.phone && (
                        <p role="alert" className="text-error text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Cidade <span className="text-error">*</span>
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Sua cidade"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-shadow min-h-[48px]",
                          errors.city
                            ? "border-error focus:ring-error"
                            : "border-neutral-200"
                        )}
                      />
                      {errors.city && (
                        <p role="alert" className="text-error text-xs mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    {/* LGPD */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          id="lgpd"
                          type="checkbox"
                          checked={form.lgpd}
                          onChange={(e) => handleChange("lgpd", e.target.checked)}
                          className="mt-1 w-4 h-4 accent-primary-700 cursor-pointer"
                        />
                        <span className="text-sm text-neutral-600">
                          Concordo com a{" "}
                          <a
                            href="/politica-privacidade"
                            className="text-primary-700 hover:underline"
                          >
                            Política de Privacidade
                          </a>{" "}
                          e autorizo o contato via WhatsApp.{" "}
                          <span className="text-error">*</span>
                        </span>
                      </label>
                      {errors.lgpd && (
                        <p role="alert" className="text-error text-xs mt-1">
                          {errors.lgpd}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl shadow-primary transition-all duration-200 min-h-[48px]"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Quero Ser Revendedora
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
