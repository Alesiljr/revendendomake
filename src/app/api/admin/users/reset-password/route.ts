import { NextResponse } from "next/server";

// Desligado em 22/11/2026: troca de senha só pelo painel do dono. Antes, qualquer editora aprovada trocava a senha de
// qualquer conta, inclusive a da dona.
export const POST = () => NextResponse.json({ error: "Troca de senha agora é feita só pelo administrador." }, { status: 410 });
