import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/login-page";
import AuthButtons from "../components/auth-buttons";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | wemake" }];
};

const formDataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formDataSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success)
    return { loginError: null, formErrors: error.flatten().fieldErrors };
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) return { loginError: loginError.message, formErrors: null };
  return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>
        <Form className="w-full space-y-4" method="POST">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          <InputPair
            label="Password"
            description="Enter your password"
            name="password"
            id="password"
            required
            type="password"
            placeholder="Enter your password"
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Log in"
            )}
          </Button>
          {actionData && "loginError" in actionData && (
            <p className="text-sm text-red-500">{actionData.loginError}</p>
          )}
          {actionData && "formErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.formErrors?.email?.join(", ")}
            </p>
          )}
          {actionData && "formErrors" in actionData && (
            <p className="text-sm text-red-500">
              {actionData.formErrors?.password?.join(", ")}
            </p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
