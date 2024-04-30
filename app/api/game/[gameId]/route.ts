import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const game = await prisma.game.findUnique({
    where: { id: params.id },
  });
  if (!game)
    return NextResponse.json({ error: "Game not found" }, { status: 404 });

  return NextResponse.json(game);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  const game = await prisma.game.findUnique({
    where: { id: params.id },
  });

  if (!game)
    return NextResponse.json({ error: "Game not found" }, { status: 404 });

  const updateGame = await prisma.game.update({
    where: { id: game.id },
    data: {
      fen: body.fen,
    },
  });
  return NextResponse.json(updateGame);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const game = await prisma.game.findUnique({
    where: { id: params.id },
  });

  if (!game)
    return NextResponse.json({ error: "Game not found" }, { status: 404 });

  const deleteGame = await prisma.game.delete({
    where: { id: game.id },
  });

  return NextResponse.json({});
}
