import {
  CreatePostParams,
  createPostSchema,
} from "@/features/posts/createPost/createPost.schema";
import { useForm, zodResolver } from "@mantine/form";
import { Textarea, Text, Image, Button } from "@mantine/core";
import ImageUrl from "./ImageUrl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPost, getAllPosts } from "@/api/posts";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { modals } from "@mantine/modals";

const CreatePost = () => {
  const router = useRouter();
  const postQuery = useQuery({ queryFn: getAllPosts, queryKey: ["all-posts"] });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      showNotification({
        message: "Post Created Successfully!",
        color: "green",
      });
      postQuery.refetch();
      // let's close the modal send the user back to front page
      router.push("/");
      modals.closeAll();
    },
  });

  const form = useForm<CreatePostParams>({
    validate: zodResolver(createPostSchema),
    initialValues: { caption: "", images: [] },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        createPostMutation.mutate({
          caption: values.caption,
          images: values.images.map((image, index) => ({
            ...image,
            // updating the sequence following the current arrangement
            sequence: index,
          })),
        });
      })}
    >
      <Textarea
        placeholder="Post Caption..."
        {...form.getInputProps("caption")}
      />

      <ImageUrl
        onSubmit={(values) => {
          form.insertListItem("images", values);
        }}
      />
      <div className="grid grid-cols-3 gap-1 mt-8">
        {form.values.images.map((image) => {
          return (
            <Image
              src={image.url}
              alt={image.url}
              fit={"cover"}
              key={image.sequence}
              withPlaceholder
              placeholder={<Text align="center">The image is broken</Text>}
              classNames={{
                root: "aspect-square",
                figure: "h-full",
                imageWrapper: "h-full",
                image: "!h-full",
                placeholder: "bg-gray-100",
              }}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-12">
        {/* Needs to validate the images in a way */}
        <div className="text-red-500">{form.errors["images"]}</div>
        <Button
          type="submit"
          className="hover:bg-blue-500 bg-blue-400"
          loading={createPostMutation.isLoading}
        >
          Post
        </Button>
      </div>
    </form>
  );
};

export default CreatePost;
