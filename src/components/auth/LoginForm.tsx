import { Button, Image, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginForm = () => {
  const form = useForm<{ email: string; password: string }>();
  return (
    <div className="pt-12">
      <div className="mx-auto max-w-[800px] grid grid-cols-2">
        <div className="flex justify-center items-center">
          <Image
            alt="InstaNext Promo Picture"
            src="/login-phone.png"
            width={420}
            height="auto"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="min-w-[340px]">
            <form
              className="border-gray-200 border-solid border-2 px-10 py-12"
              onSubmit={form.onSubmit((values) =>
                signIn("credentials", values)
              )}
            >
              <Link href="/">
                <Image
                  src="/brand.svg"
                  alt="InstaNext"
                  width="200"
                  className="mx-auto"
                />
              </Link>
              <div className="mt-10 space-y-1 ">
                <TextInput
                  placeholder="Email"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />
              </div>
              <Button
                fullWidth
                className="mt-2 bg-blue-400 hover:bg-blue-500 rounded-md"
                type="submit"
              >
                Log in
              </Button>
            </form>
            <div className="text-center border-gray-200 border-solid border-2 py-4 mt-3">
              Don{"'"}t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="text-blue-400 font-semibold"
              >
                Sign up
              </Link>
            </div>
          </div>
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

export default LoginForm;
