import { useForm, zodResolver } from "@mantine/form";
import {
  Button,
  Image,
  PasswordInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import Link from "next/link";
import {
  SignUpUserParams,
  signUpUserSchema,
} from "@/features/users/signUpUser/signUpUser.schema";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/api/users";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

const SignUpForm = () => {
  const form = useForm<SignUpUserParams>({
    validate: zodResolver(signUpUserSchema),
  });

  const router = useRouter();
  const signUp = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      router.push("/");
      showNotification({
        message: "You have signed up successfully! You may login now.",
        color: "green",
      });
    },
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[360px]">
        <form
          className="border-gray-200 border-solid border-2 px-10 py-12"
          onSubmit={form.onSubmit((values) => signUp.mutate(values))}
        >
          <Link href="/">
            <Image
              src="/brand.svg"
              alt="InstaNext"
              width="200"
              className="mx-auto"
            />
          </Link>
          <div className="text-center font-semibold text-gray-600 mt-6">
            Sign up to see photos and videos from your friends
          </div>
          <div className="mt-10 space-y-1 ">
            <TextInput placeholder="Email" {...form.getInputProps("email")} />
            <TextInput
              placeholder="Username"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              placeholder="Password"
              {...form.getInputProps("password")}
            />
            <Textarea
              placeholder="Description"
              {...form.getInputProps("description")}
            />
          </div>
          <Button
            fullWidth
            className="mt-2 bg-blue-400 hover:bg-blue-500 rounded-md"
            type="submit"
            loading={signUp.isLoading}
          >
            Sign Up
          </Button>
        </form>
        <div className="text-center border-gray-200 border-solid border-2 py-4 mt-3">
          Have an Account?{" "}
          <Link href="/" className="text-blue-400 font-semibold">
            Log in
          </Link>
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-gray-400">
        InstaNext - Instagram Clone by{" "}
        <Link
          href="https://shenyien.cyou"
          target="_blank"
          className="text-blue-400"
        >
          Shen Yien
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
