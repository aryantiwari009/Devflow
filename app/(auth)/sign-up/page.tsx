"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const SignUp = () => {
  return (
    <>
      <AuthForm
        formType="SIGN_UP"
        schema={SignUpSchema as any}
        defaultValues={{ email: "", password: "", name: "", username: "" }}
        onSubmit={(data) => Promise.resolve({ success: true, data })}
      />

      <p className="paragraph-regular text-dark200_light800 py-5">
        Already have an account?{" "}
        <Link
          href={ROUTES.SIGN_IN}
          className="font-medium text-primary-500 hover:text-primary-600"
        >
          Log in
        </Link>
      </p>
    </>
  );
};

export default SignUp;
