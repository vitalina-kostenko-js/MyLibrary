import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookCardData, BookDetails } from "../../interfaces";
import { useTranslations } from "next-intl";

interface CardDetalisProps {
  details: BookDetails;
  data: BookCardData;
  children?: React.ReactNode;
  media: React.ReactNode;
}

export const CardDetails = ({
  details,
  data,
  children,
  media,
}: CardDetalisProps) => {
  const t = useTranslations("book");

  const { description } = details;
  const { title, author, subjects, first_publish_year  } = data;
  return (
    <Card className="grid grid-cols-[auto_1fr] w-full py-0 sm:flex-row sm:gap-0 transition-colors duration-200 hover:bg-accent/50 hover:border-accent h-full">
      <CardContent className="grow-1 px-0">
        <div className="relative sm:w-[400px] sm:h-[600px] w-[200px] h-[300px]">{media ?? null}</div>
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{t("description") + ": " + (description ? description : " —")}</CardDescription>
        <CardDescription>{t("author") + ": " + (author ? author : " —")}</CardDescription>
        <CardDescription>{t("genre") + ": " + (subjects.length > 0 ? subjects.join(", ") : " —")}</CardDescription>
        <CardDescription>{t("year") + ": " + (first_publish_year > 0 ? first_publish_year : " —") }</CardDescription>
      </CardHeader> 
      <CardContent>{children}</CardContent>
    </Card>
  );
};
