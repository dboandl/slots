import { useTranslations } from "next-intl";

export default function EventsPage() {
  const t = useTranslations("General");

  return <div>{t("events")}</div>;
}
