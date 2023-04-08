import { z } from "zod";

export type CreateImageParams = {
  url: string;
  sequence?: number;
};

export const createImageSchema = z.object({
  url: z.string().url("Invalid URL"),
  sequence: z.number().gte(0),
});
