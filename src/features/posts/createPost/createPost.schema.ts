import {
  CreateImageParams,
  createImageSchema,
} from "@/features/images/createImage/createImage.schema";
import { z } from "zod";

export type CreatePostParams = {
  caption: string;
  images: CreateImageParams[];
};

export const createPostSchema = z.object({
  caption: z.string().min(1, "Caption is required"),
  images: z.array(createImageSchema).min(1, "There should be at least 1 image"),
});
