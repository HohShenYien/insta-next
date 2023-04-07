import SignUpForm from "@/components/auth/SignUpForm";
import { NextPageWithLayout } from "../_app";

const SignUpPage: NextPageWithLayout = () => {
  return (
    <div className="flex justify-center mt-12">
      <SignUpForm />
    </div>
  );
};

SignUpPage.isPublic = true;
// Prevents SignUpPage from using default layout
SignUpPage.getLayout = (page) => {
  return <>{page}</>;
};

export default SignUpPage;
