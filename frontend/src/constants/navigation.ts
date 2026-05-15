/**
 * Platform navigation items.
 */

import {
  LayoutDashboard,
  Store,
  Gavel,
  MessageSquare,
  User,
  Settings,
  Heart,
  ShieldCheck,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Marketplace",
    href: "/marketplace",
    icon: Store,
  },

  {
    title: "Auctions",
    href: "/auctions",
    icon: Gavel,
  },

  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },

  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },

  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },

  {
  title: "Saved",
  href: "/saved",
  icon: Heart,
  },

  {
  title: "Settings",
  href: "/settings",
  icon: Settings,
  },

  {
  title: "Admin",
  href: "/admin",
  icon: ShieldCheck,
  },
];