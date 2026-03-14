import { DashboardLayout } from "../../../../widgets/dashboard-layout";
import Image from "next/image";
import { CardDetails } from "../../../../shared/ui/card-profile/card-details.component";
import NotFound from "../../../not-found";
import { getItemPageData } from "./item.service";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface ItemPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const t = await getTranslations("navigation");

  const { id } = await params;

  const data = await getItemPageData(id);
  if (!data) return <NotFound />;

  const { book, coverImageUrl, cardData, details } = data;
  return (
    <DashboardLayout>
      <div className="pb-2">
        <Link href="/">
          <button className="inline-flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={20} /> {t("backToList")}
          </button>
        </Link>
      </div>

      <CardDetails
        details={details}
        data={cardData}
        media={
          <Image
            src={coverImageUrl}
            alt={book.title}
            fill
            className="object-cover rounded p-2"
          />
        }
      />
    </DashboardLayout>
  );
}
