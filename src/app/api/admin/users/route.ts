import { NextResponse } from "next/server";

// Desligado em 22/11/2026: listar, aprovar e revogar contas do painel agora só pelo painel do dono (criar, travar,
// trocar senha e apagar).
const fora = () => NextResponse.json({ error: "As contas do painel agora são cuidadas só pelo administrador." }, { status: 410 });
export const GET = fora;
export const PATCH = fora;
