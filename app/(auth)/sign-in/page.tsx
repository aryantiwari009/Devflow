"use client";

import AuthForm from "@/components/forms/AuthForm";
import ROUTES from "@/constants/routes";
import  Link  from "next/link";

const SignIn = () => {
  return (
    <>
      <AuthForm<{ email: string; password: string }>
        formType="SIGN_IN"
        defaultValues={{ email: "", password: "" }}
        onSubmit={(data) => Promise.resolve({ success: true, data })}
      />

      <p className="flex justify-center gap-1 paragraph-regular text-dark200_light800 py-5">
        Don't have an account?{" "}
        <Link
          href={ROUTES.SIGN_UP}
          className="font-medium text-primary-500 hover:text-primary-600"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default SignIn;
