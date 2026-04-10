"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
// 1. Import your schemas here so they stay on the client side
import { SignInSchema, SignUpSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  // 2. Remove 'schema' from this interface
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();

  // 3. Select the schema locally inside the client component
  const activeSchema = formType === "SIGN_IN" ? SignInSchema : SignUpSchema;

  const form = useForm<T>({
    resolver: zodResolver(activeSchema) as any,
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      router.push(ROUTES.HOME);
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit as any)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control as any}
            name={field as Path<T>}
            render={({ field: fieldProps }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {fieldProps.name === "email"
                    ? "Email Address"
                    : fieldProps.name.charAt(0).toUpperCase() +
                      fieldProps.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    type={fieldProps.name === "password" ? "password" : "text"}
                    {...fieldProps}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900!"
        >
          {form.formState.isSubmitting
            ? formType === "SIGN_IN"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>

        {/* Link Logic... */}
      </form>
    </Form>
  );
};

export default AuthForm;
