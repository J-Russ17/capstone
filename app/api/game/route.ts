// pages/api/game.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type ErrorResponse = {
  error: string;
};

type PostResponse = {
  id: string;
  fen: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

type PutRequestData = {
  gameId: string;
  fen: string;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse | ErrorResponse>
) {
  if (req.method === "POST") {
    try {
      const newGame = await prisma.game.create({
        data: {
          fen: "start",
        },
      });
      res.status(200).json(newGame);
    } catch (error) {
      res.status(500).json({ error: "Unable to create new game." });
    }
  } else if (req.method === "PUT") {
    const { gameId, fen } = req.body as PutRequestData;
    try {
      const updatedGame = await prisma.game.update({
        where: { id: gameId },
        data: { fen },
      });
      res.status(200).json(updatedGame);
    } catch (error) {
      res.status(500).json({ error: "Unable to update game." });
    }
  } else {
    res.setHeader("Allow", ["POST", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
