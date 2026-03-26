import { MainComponent } from "@/app/modules/main";

interface IHomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async (props: IHomePageProps) => {
  const { params } = props;

  const { locale } = await params;
  
  return <MainComponent locale={locale} />;
};

export default HomePage;
