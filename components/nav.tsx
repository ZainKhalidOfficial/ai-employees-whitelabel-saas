"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  Layout,
  LayoutDashboard,
  Coins,
  Menu,
  Newspaper,
  Settings,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { getSiteFromPostId } from "@/lib/actions";
import Image from "next/image";
import { FileCode, Github } from "lucide-react";

const externalLinks = [
  // {
  //   name: "Your Subscription",
  //   href: "",
  //   icon: <Coins className="text-yellow-600" width={18} />,
  // },
];

export default function Nav({ children }: { children: ReactNode }) {

  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const [siteId, setSiteId] = useState<string | null>();

  useEffect(() => {
    if (segments[0] === "post" && id) {
      getSiteFromPostId(id).then((id) => {
        setSiteId(id);
      });
    }
  }, [segments, id]);

  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        {
          name: "Back to All Sites",
          href: "/sites",
          icon: <ArrowLeft width={18} />,
        },
        // {
        //   name: "Posts",
        //   href: `/site/${id}`,
        //   isActive: segments.length === 2,
        //   icon: <Newspaper width={18} />,
        // },
        // {
        //   name: "Analytics",
        //   href: `/site/${id}/analytics`,
        //   isActive: segments.includes("analytics"),
        //   icon: <BarChart3 width={18} />,
        // },
        {
          name: "Settings",
          href: `/site/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    } 
    // else if (segments[0] === "post" && id) {
    //   return [
    //     {
    //       name: "Back to All Posts",
    //       href: siteId ? `/site/${siteId}` : "/sites",
    //       icon: <ArrowLeft width={18} />,
    //     },
    //     {
    //       name: "Editor",
    //       href: `/post/${id}`,
    //       isActive: segments.length === 2,
    //       icon: <Edit3 width={18} />,
    //     },
    //     {
    //       name: "Settings",
    //       href: `/post/${id}/settings`,
    //       isActive: segments.includes("settings"),
    //       icon: <Settings width={18} />,
    //     },
    //   ];
    // }
    return [
      // {
      //   name: "Overview",
      //   href: "/",
      //   isActive: segments.length === 0,
      //   icon: <LayoutDashboard width={18} />,
      // },
      {
        name: "My Sites",
        href: "/sites",
        isActive: segments[0] === "sites",
        icon: <Globe className="text-purple-600" width={18} />,
      },
      {
        name: "My Plan",
        href: "/plan",
        isActive: segments[0] === "plan",
        icon: <Coins className="text-yellow-600" width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings className="text-blue-500" width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          // segments[0] === "post" && segments.length === 2 && 
          !showSidebar
            ? "right-5 top-5 "  //left-5
            : "right-5 top-7 text-white"
        } sm:hidden text-black`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />

      </button>

      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-gray-500 bg-gray-900 p-4 transition-all  sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">

            {/* <div className="h-6 rotate-[30deg] border-l border-stone-400 dark:border-stone-500" /> */}
            <Link
              href="/"
              className="rounded-lg p-2 gap-2 text-white flex"
            >
              <Image
                src="/logo.png"
                width={24}
                height={24}
                alt="Logo"
                className="dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
              />

              Genius Whitelabel

            </Link>
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-slate-600 text-white" : "text-gray-300"
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-slate-600 hover:text-white active:bg-slate-600`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          {/* <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div> */}
          <div className="my-2 border-t border-stone-600" />
          {children}
        </div>
        
      </div>
    </>
  );
}
