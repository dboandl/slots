"use client";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useState } from "react";

const navigation = [
  { i18nKey: "overview", href: "/" },
  { i18nKey: "events", href: "/events" },
  { i18nKey: "profile", href: "/profile" },
];

export const NavBar = () => {
  const locale = useLocale();
  const t = useTranslations("General");

  const { data: session, status } = useSession();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isSignedIn = useCallback(() => session && session.user, [session]);

  const renderSignIn = () => {
    if (status === "loading" || isSignedIn()) {
      return null;
    }
    return (
      <button
        onClick={() => signIn()}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    );
  };

  const renderSignOut = () => {
    if (isSignedIn()) {
      return (
        <button
          onClick={() => signOut()}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign out
        </button>
      );
    }
    return null;
  };

  const renderNavItems = (itemClassName: string) => {
    if (isSignedIn()) {
      return (
        <>
          {navigation.map((item) => (
            <Link
              key={item.i18nKey}
              href={`/${locale ?? "en"}${item.href}`}
              className={itemClassName}
            >
              {t(item.i18nKey)}
            </Link>
          ))}
        </>
      );
    }
    return null;
  };

  const renderNavBar = () => {
    const renderOpenMobileNavBtn = () => {
      if (isSignedIn()) {
        return (
          <>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileNavOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:block">{renderSignOut()}</div>
          </>
        );
      }
      return null;
    };

    return (
      <nav
        className="flex items-center justify-between gap-x-6 py-6"
        aria-label="Navigation"
      >
        <div className="flex lg:flex-1">
          <span className="py-2">SlotFinder</span>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {renderNavItems("text-sm font-semibold leading-6 text-gray-900")}
        </div>

        <div className="flex flex-1 justify-end">{renderSignIn()}</div>

        {renderOpenMobileNavBtn()}
      </nav>
    );
  };

  const renderMobileNavSidebar = () => {
    if (isSignedIn()) {
      return (
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileNavOpen}
          onClose={setMobileNavOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center gap-x-6">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileNavOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {renderNavItems(
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  )}
                  {renderSignOut()}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      );
    }
    return null;
  };

  return (
    <header className="bg-white">
      {renderNavBar()}
      {renderMobileNavSidebar()}
    </header>
  );
};
