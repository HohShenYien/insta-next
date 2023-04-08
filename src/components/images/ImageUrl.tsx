import {
  CreateImageParams,
  createImageSchema,
} from "@/features/images/createImage/createImage.schema";
import { ActionIcon, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IoSend } from "react-icons/io5";

interface ImageUrlProps {
  onSubmit: (image: CreateImageParams) => void;
  reset?: boolean;
  placeholder?: string;
}

const ImageUrl = ({
  onSubmit,
  reset = true,
  placeholder = "New image URL",
}: ImageUrlProps) => {
  const defaultImageValues = () => ({
    url: "",
    // let's take sequence as the key by default, we will rearrange the sequence
    // on submit
    sequence: Math.ceil(Math.random() * 9999),
  });
  const newImage = useForm<CreateImageParams>({
    validate: zodResolver(createImageSchema),
    initialValues: defaultImageValues(),
  });

  const onNewImageSubmit = () => {
    newImage.onSubmit((values) => {
      onSubmit(values);
      reset && newImage.setValues(defaultImageValues());
    })();
  };

  return (
    // Note that I didn't use form here, because nested form is not allowed
    // and I planned to use form from the outside
    <div className="flex space-x-2 items-start mt-6">
      <TextInput
        placeholder={placeholder}
        {...newImage.getInputProps("url")}
        className="flex-1"
        onKeyDown={(evt) => {
          if (evt.key == "Enter") {
            onNewImageSubmit();
            evt.preventDefault();
          }
        }}
      />
      <div className="flex items-center h-[36px]">
        <ActionIcon color="blue" onClick={onNewImageSubmit}>
          <IoSend />
        </ActionIcon>
      </div>
    </div>
  );
};

export default ImageUrl;
