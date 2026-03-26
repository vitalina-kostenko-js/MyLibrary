"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/pkg/theme/ui/card";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import {
  BookCardData,
  BookDetails,
  BookExcerpts,
  BookFromList,
} from "../../interfaces";

interface ICardDetalisProps {
  details: BookDetails;
  data: BookCardData;
  children?: ReactNode;
  media: ReactNode;
  excerpts: BookExcerpts[];
  editionDetails: BookFromList;
}

const CardDetailsComponent = (props: ICardDetalisProps) => {
  const t = useTranslations("book");

  const [isExpanded, setIsExpanded] = useState(false);
  const { details, data, children, media, excerpts, editionDetails } = props;
  const { description, publish_date } = details;
  const { title, author, subjects } = data;
  const { languages, number_of_pages, publishers } = editionDetails;

  return (
    <Card className="w-full transition-colors duration-200 p-6">
      {/* book cover and information */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-shrink-0 flex justify-center">
          <div className="relative w-[200px] h-[300px] sm:w-[350px] sm:h-[500px] shadow-xl">
            {media ?? null}
          </div>
        </div>

        {/* book information */}
        <div className="flex flex-col gap-4 flex-1">
          <CardTitle className="text-3xl font-bold">{title}</CardTitle>
          <CardDescription>
            Publishers: {publishers?.join(", ")}
          </CardDescription>
          <div>
            <span className="font-semibold">{t("description")}: </span>
            <span>{description || "—"}</span>
          </div>
          <div>
            <span className="font-semibold">{t("author")}: </span>
            <span>{author || "—"}</span>
          </div>
          <div>
            <div
              className={isExpanded ? "" : "line-clamp-3 text-muted-foreground"}
            >
              {subjects}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm text-primary font-semibold hover:underline"
            >
              {isExpanded ? "Collapse" : "Read more"}
            </button>
          </div>
          <div className="mt-auto pt-4 border-t italic text-sm text-muted-foreground">
            <div>
              {t("year")}: {publish_date}
            </div>
            <div>Languages: {languages?.join(", ")}</div>
            <div>Number of pages: {number_of_pages}</div>
          </div>
        </div>
      </div>

      {/* fragments book */}
      <div className="flex flex-col items-center justify-center w-full border-t pt-10">
        <h3 className="text-xl font-bold mb-6">Text fragments</h3>
        <Card className="w-full max-w-3xl bg-secondary/20">
          <CardContent className="flex flex-col items-center justify-center text-center p-8 min-h-[150px] gap-6">
            {excerpts.map((excerpt, index) => (
              <div key={index} className="space-y-2">
                <blockquote className="text-lg italic font-medium leading-relaxed">
                  &quot;{excerpt.excerpt}&quot;
                </blockquote>
                <div className="text-sm text-muted-foreground">
                  {excerpt.comment}
                </div>
                <div className="font-semibold">— {excerpt.author}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {children && <div className="mt-6">{children}</div>}
    </Card>
  );
};

export default CardDetailsComponent;