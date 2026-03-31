import { MainComponent } from "@/app/modules/main";

//interface
interface IHomePageProps {
  params: Promise<{ locale: string }>;
}

//page
const HomePage = async (props: IHomePageProps) => {
  const { params } = props;

  const { locale } = await params;
  
  return <MainComponent locale={locale} />;
};

export default HomePage;
