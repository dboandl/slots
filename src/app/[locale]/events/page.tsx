import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function EventsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("General");

  return <div>{t("events")}</div>;
}
