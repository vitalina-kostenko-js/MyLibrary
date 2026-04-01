"use client";

import { Card, CardDescription, CardTitle } from "@/pkg/theme/ui/card";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/pkg/theme/ui/hover-card";
import { useTranslations } from "next-intl";
import type { BookCardData } from "../../interfaces";
import { ReactNode } from "react";

interface ICardHorizontalProps {
  data: BookCardData;
  media?: ReactNode;
  children?: ReactNode;
}

const CardHorizontalComponent = (props: ICardHorizontalProps) => {
  const t = useTranslations("book");

  const { data, media, children } = props;
  const { title, author, subjects, first_publish_year } = data;

  return (
    <Card className="grid grid-cols-[auto_1fr] max-w-lg overflow-hidden transition-colors duration-200 hover:bg-accent/50 hover:border-accent h-full">
      <div className="relative w-[120px] h-[180px] flex-shrink-0 bg-muted">
        {media}
      </div>

      <div className="flex flex-col p-4 min-w-0">
        <div className="flex flex-col gap-1.5 flex-1">
          <CardTitle data-testid="item-title" className="text-lg line-clamp-1">
            {title}
          </CardTitle>

          <CardDescription className="text-foreground/80">
            {author}
          </CardDescription>

          <div className="text-sm text-muted-foreground">
            {subjects.length > 0 ? (
              <>
                <span className="line-clamp-2">{subjects.join(", ")}</span>
                <HoverCard openDelay={10} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <button
                      type="button"
                      className="text-primary font-medium cursor-pointer hover:underline text-xs block mt-1"
                    >
                      {t("readMore")}
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <p className="text-sm">{subjects.join(", ")}</p>
                  </HoverCardContent>
                </HoverCard>
              </>
            ) : (
              t("noGenreFound")
            )}
          </div>

          <CardDescription className="mt-auto pt-2 text-xs">
            {first_publish_year > 0 ? first_publish_year : " —"}
          </CardDescription>
        </div>

        {children && (
          <div className="mt-4 flex items-center gap-2">{children}</div>
        )}
      </div>
    </Card>
  );
};

export default CardHorizontalComponent;
