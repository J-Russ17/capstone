import { z } from "zod";

const schema = z.object({
  fen: z.string(),
});

export default schema;
