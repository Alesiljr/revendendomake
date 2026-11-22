import { NextResponse } from "next/server";

// Desligado em 22/11/2026: conta nova no painel só nasce pelo painel do dono (pedido dele: "só eu crio conta").
// O convite antigo (link /convite?token=) não é mais gerado.
const fora = () => NextResponse.json({ error: "Convites agora são feitos só pelo administrador." }, { status: 410 });
export const GET = fora;
export const POST = fora;
