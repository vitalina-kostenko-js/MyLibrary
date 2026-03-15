import Link from "next/link";
import { LoginForm } from "../../../features/auth-form";

interface Props { params: Promise<{ locale: string }> };

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <LoginForm />
      <p className="text-muted-foreground text-sm">
        Don&apos;t have an account?{" "}
        <Link href={`/${locale}/register`} className="text-primary underline-offset-4 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
