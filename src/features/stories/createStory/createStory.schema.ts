import { CreateImageParams } from "@/features/images/createImage/createImage.schema";
import { z } from "zod";

export type CreateStoryParams = {
  caption: string;
  image: CreateImageParams;
};

export const createStorySchema = z.object({
  caption: z.string().min(1, "Caption is required"),
  image: z.object({
    url: z.string().url("Invalid URL"),
  }),
});
