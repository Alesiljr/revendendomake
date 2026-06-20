import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade | Revendendo Make",
  description: "Saiba como a Revendendo Make coleta, usa e protege seus dados pessoais.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-white border-b border-neutral-100 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
            <Link href="/" className="hover:text-primary-700 transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-600">Política de Privacidade</span>
          </nav>
          <h1 className="font-playfair font-bold text-3xl text-neutral-900">
            Política de Privacidade
          </h1>
          <p className="text-neutral-500 text-sm mt-2">
            Última atualização: abril de 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8 space-y-8 text-neutral-700 leading-relaxed">

            <div>
              <h2 className="font-playfair font-bold text-xl text-neutral-900 mb-3">
                1. Quem somos
              </h2>
              <p>
                A <strong>Revendendo Make</strong> é uma plataforma de revenda de cosméticos e maquiagem que conecta
                revendedoras a fornecedores em todo o Brasil. Esta Política de Privacidade descreve como coletamos,
                usamos, armazenamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de Proteção
                de Dados (Lei nº 13.709/2018 — LGPD).
              </p>
            </div>

            <div>
              <h2 className="font-playfair font-bold text-xl text-neutral-900 mb-3">
                2. Dados que coletamos
              </h2>
              <p className="mb-3">Ao preencher nosso formulário de cadastro, coletamos:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Nome completo</strong></li>
                <li><strong>Número de telefone/WhatsApp</strong></li>
                <li><strong>Cidade de residência</strong></li>
                <li><strong>Consentimento LGPD</strong> (registro de aceite dos termos)</li>
              </ul>
              <p className="mt-3">
                Também podemos coletar automaticamente dados de navegação como páginas visitadas, cliques em botões
                e identificador de sessão anônimo, utilizados exclusivamente para análise interna de desempenho do site.
              </p>
            </div>

            <div>
              <h2 className="font-playfair font-bold text-xl text-neutral-900 mb-3">
                3. Como usamos seus dados
              </h2>
              <p className="mb-3">Seus dados são utilizados para:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Entrar em contato via WhatsApp para orientar o processo de cadastro como revendedora</li>
                <li>Responder dúvidas e oferecer suporte comercial</li>
                <li>Enviar informações relevantes sobre produtos e oportunidades (somente se você consentiu)</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </div>

            <div>
              <h2 className="font-playfair font-bold text-xl text-neutral-900 mb-3">
                4. Base legal (LGPD)
              </h2>
              <p>
                O tratamento dos seus dados é baseado no seu <strong>consentimento expresso</strong> fornecido no
                momento do cadastro, conforme o Art. 7º, inciso I da LGPD. Você pode retirar seu consentimento a
                qualquer momento entrando em contato conosco.
              </p>
            </div>

            <div>
              <h2 className="font-playfair font-bold text-xl text-neutral-900 mb-3">
                5. Compartilhamento de dados
              </h2>
              <p>
                Seus dados pessoais <strong>não são vendidos</strong> a terceiros. Podemos compartilhá-los apenas
                com fornecedores de tecnologia essenciais para a operação do site (como servidores e banco de dados),
                sempre sob acordos de confidencialidade e dentro dos limites da LGPD.
              </p>
            </div>

            <div>
              <h2 className="font-playfair font-bold text-xl text-neutral-900 mb-3">
                6. Retenção de dados
              </h2>
              <p>
                Seus dados são mantidos pelo tempo necessário para cumprir a finalidade de contato comercial,
                ou até que você solicite a exclusão. Dados de navegação anônimos são retidos por até 90 dias.
              </p>
            </div>

            <div>
              <h2 className="font-playfair font-bold text-xl text-neutral-900 mb-3">
                7. Seus direitos (LGPD)
              </h2>
              <p className="mb-3">Como titular de dados, você tem direito a:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar seus dados armazenados</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação dos dados</li>
                <li>Retirar o consentimento a qualquer momento</li>
                <li>Apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-playfair font-bold text-xl text-neutral-900 mb-3">
                8. Segurança
              </h2>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso
                não autorizado, perda ou divulgação indevida, incluindo criptografia em trânsito (HTTPS) e
                controles de acesso no banco de dados.
              </p>
            </div>

            <div>
              <h2 className="font-playfair font-bold text-xl text-neutral-900 mb-3">
                9. Contato
              </h2>
              <p>
                Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato pelo
                WhatsApp ou e-mail disponíveis no rodapé do site. Responderemos em até 15 dias úteis.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
