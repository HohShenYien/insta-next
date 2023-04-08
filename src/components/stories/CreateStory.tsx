import { useForm, zodResolver } from "@mantine/form";
import { Textarea, Button, Image, Text } from "@mantine/core";
import ImageUrl from "../images/ImageUrl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { modals } from "@mantine/modals";
import { createStory, getAllStories } from "@/api/stories";
import {
  CreateStoryParams,
  createStorySchema,
} from "@/features/stories/createStory/createStory.schema";

const CreateStory = () => {
  const router = useRouter();
  const postQuery = useQuery({
    queryFn: getAllStories,
    queryKey: ["all-stories"],
  });

  const createStoryMutation = useMutation({
    mutationFn: createStory,
    onSuccess: () => {
      showNotification({
        message: "Story Created Successfully!",
        color: "green",
      });
      postQuery.refetch();
      // let's close the modal send the user back to front page
      router.push("/");
      modals.closeAll();
    },
  });

  const form = useForm<CreateStoryParams>({
    validate: zodResolver(createStorySchema),
    initialValues: { caption: "", image: { url: "" } },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        createStoryMutation.mutate(values);
      })}
    >
      <Textarea
        placeholder="Post Caption..."
        {...form.getInputProps("caption")}
      />

      <ImageUrl
        onSubmit={(values) => {
          form.setFieldValue("image.url", values.url);
        }}
        reset={false}
        placeholder="Story image URL"
      />

      {form.values.image.url && (
        <Image
          src={form.values.image.url}
          alt={form.values.image.url}
          fit={"cover"}
          withPlaceholder
          placeholder={<Text align="center">The image is broken</Text>}
          classNames={{
            root: "aspect-square",
            figure: "h-full",
            imageWrapper: "h-full",
            image: "!h-full",
            placeholder: "bg-gray-100",
          }}
          className="mx-auto mt-8"
          width="300px"
        />
      )}

      <div className="flex justify-between mt-12">
        {/* Needs to validate the images in a way */}
        <div className="text-red-500">
          {form.errors["image.url"] &&
            "Please provide and submit an image URL."}
        </div>
        <Button
          type="submit"
          className="hover:bg-blue-500 bg-blue-400"
          loading={createStoryMutation.isLoading}
        >
          Post
        </Button>
      </div>
    </form>
  );
};

export default CreateStory;
