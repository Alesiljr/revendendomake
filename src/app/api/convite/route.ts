import { NextResponse } from "next/server";

// Desligado em 22/11/2026: o link antigo (/convite?token=) não cria mais conta. Conta nova só pelo painel do dono, com o
// link /criar-acesso que ele gera.
export const GET = () => NextResponse.json({ valid: false, error: "Este link não vale mais. Peça um novo a quem te enviou." });
export const POST = () => NextResponse.json({ error: "Este link não vale mais. Peça um novo a quem te enviou." }, { status: 410 });
