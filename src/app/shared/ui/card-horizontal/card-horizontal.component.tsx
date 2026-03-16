"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { BookCardData } from "../../interfaces";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useTranslations } from "next-intl";

interface CardHorizontalProps {
  data: BookCardData;
  media?: React.ReactNode;
  children?: React.ReactNode;
}

export const CardHorizontal = ({ data, media, children }: CardHorizontalProps) => {
  const t = useTranslations("book");
  const { title, author, subjects, first_publish_year } = data;

  return (
    <Card className="grid grid-cols-[auto_1fr] max-w-lg py-0 sm:flex-row sm:gap-0 transition-colors duration-200 hover:bg-accent/50 hover:border-accent h-full">
      <CardContent className="grow-1 px-0">
        <div className="relative w-[120px] h-[180px]">{media ?? null}</div>
      </CardContent>
      <div className="sm:min-w-54">
        <CardHeader className="pt-6">
          <CardTitle data-testid="item-title">{title}</CardTitle>
          <CardDescription>{author}</CardDescription>
          <CardDescription>
            {subjects.length > 0 ? (
              <>
                <span className="line-clamp-3">{subjects.join(", ")}</span>
                <span className="block mt-1">
                  <HoverCard openDelay={10} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <button
                        type="button"
                        className="text-primary font-medium cursor-pointer hover:underline text-left"
                      >
                        {t("readMore")}
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="flex w-120 flex-col gap-0.5">
                      <p className="text-sm text-muted-foreground">
                        {subjects.join(", ")}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </>
            ) : (
              t("noGenreFound")
            )}
          </CardDescription>
          <CardDescription>{first_publish_year > 0 ? first_publish_year : " —"}</CardDescription>
        </CardHeader>
        <CardContent className="gap-3 py-6 Archivo Black, sans-serif">
          {children}
        </CardContent>
      </div>
    </Card>
  );
};

export default CardHorizontal;
