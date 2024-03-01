import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/#",
    newTab: false,
  },
  {
    id: 2,
    title: "Features",
    path: "/#features",
    newTab: false,
  },
  {
    id: 33,
    title: "Pricing",
    path: "/#pricing",
    newTab: false,
  },
  {
    id: 3,
    title: "Support",
    path: "/#support",
    newTab: false,
  },
  {
    id: 4,
    title: "Terms",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Terms & Conditions",
        path: "/terms-&-conditions",
        newTab: false,
      },
      {
        id: 42,
        title: "Privacy Policy",
        path: "/privacy-policy",
        newTab: false,
      }
      
    ],
  },
];
export default menuData;
