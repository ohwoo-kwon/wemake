import { Form, Link, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { checkUsernameExists } from "../queries";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Join | wemake" }];
};

const formSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { signUpError: null, formErrors: error.flatten().fieldErrors };
  }
  const usernameExists = await checkUsernameExists(request, {
    username: data.username,
  });
  if (usernameExists) {
    return {
      signUpError: null,
      formErrors: { username: ["Username already exists"] },
    };
  }
  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: { data: { name: data.name, username: data.username } },
  });
  if (signUpError) {
    return { signUpError: signUpError.message, formErrors: null };
  }
  const { error: loginError } = await client.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (loginError) return { loginError: loginError.message, formErrors: null };
  return redirect("/", { headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex flex-col items-center justify-center gap-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4" method="POST">
          <InputPair
            label="Name"
            description="Enter your name"
            name="name"
            id="name"
            required
            type="text"
            placeholder="Enter your name"
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-xs text-red-500">
              {actionData.formErrors?.name}
            </p>
          )}
          <InputPair
            label="Username"
            description="Enter your username"
            name="username"
            id="username"
            required
            type="text"
            placeholder="i.e wemake"
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-xs text-red-500">
              {actionData.formErrors?.username}
            </p>
          )}
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-xs text-red-500">
              {actionData.formErrors?.email}
            </p>
          )}
          <InputPair
            label="Password"
            description="Enter your password"
            name="password"
            id="password"
            required
            type="password"
            placeholder="Enter your password"
          />
          {actionData && "formErrors" in actionData && (
            <p className="text-xs text-red-500">
              {actionData.formErrors?.password}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>
          {actionData && "formErrors" in actionData && (
            <p className="text-xs text-red-500">{actionData.signUpError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
