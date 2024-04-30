// import { NextRequest, NextResponse } from "next/server";
// import schema from "./schema";
// import prisma from "@/prisma/client";

// export async function GET(request: NextRequest) {
//   const games = await prisma.game.findMany();
//   return NextResponse.json(games);
// }

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const validation = schema.safeParse(body);
//   if (!validation.success)
//     return NextResponse.json(validation.error.errors, { status: 400 });

//   const game = await prisma.game.create({
//     data: {
//       fen: body.fen,
//     },
//   });

//   return NextResponse.json(game, { status: 201 });
// }
