import { useTranslations } from "next-intl";

//interface
interface IProps {}

//loading
const ItemLoading = () => {
  const t = useTranslations("loading");

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-muted-foreground">{t("loading")}</p>
    </div>
  );
};

export default ItemLoading;