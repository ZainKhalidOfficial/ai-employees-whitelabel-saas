"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function SiteSettingsNav() {
  const { id } = useParams() as { id?: string };
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "General",
      href: `/site/${id}/settings`,
      segment: null,
    },
    {
      name: "Domains",
      href: `/site/${id}/settings/domains`,
      segment: "domains",
    },
    {
      name: "Appearance",
      href: `/site/${id}/settings/appearance`,
      segment: "appearance",
    },
    {
      name: "Stripe Configuration",
      href: `/site/${id}/settings/paymentconfiguration`,
      segment: "paymentconfiguration",
    },
    {
      name: "Subscription Plan",
      href: `/site/${id}/settings/subscriptionplan`,
      segment: "subscriptionplan",
    },
  ];

      return (
        <div className="flex border-b border-stone-200 pb-4 pt-2 dark:border-stone-700">
          <ScrollArea className="w-full py-3 whitespace-nowrap rounded-md border">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={cn(
            "rounded-md mx-2 px-2 py-1 text-sm font-medium transition-colors active:bg-stone-200 dark:active:bg-stone-600",
            segment === item.segment
              ? "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800",
          )}
        >
          {item.name}
        </Link>
      ))}
    <ScrollBar orientation="horizontal" />
    </ScrollArea>
    </div>
  );
}
