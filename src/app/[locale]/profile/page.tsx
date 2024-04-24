"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function EventsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("General");
  const { data: session } = useSession();
  return (
    <div>
      <div>
        {t("profile")}: {session?.user?.email}
      </div>
    </div>
  );
}
