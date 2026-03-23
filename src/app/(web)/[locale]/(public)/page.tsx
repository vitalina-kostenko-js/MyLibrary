import { MainComponent } from "@/app/modules/main";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <MainComponent locale={locale} />;
}