/**
 * Homepage content data.
 *
 * Separating content from UI
 * makes components cleaner and scalable.
 */

import {
  BookOpen,
  Laptop,
  Sofa,
  Gamepad2,
  ShieldCheck,
  MessageCircle,
  BadgeCheck,
  Gavel,
} from "lucide-react";

/**
 * Marketplace categories.
 */
export const categories = [
  {
    title: "Textbooks",
    description:
      "Buy and sell academic materials easily.",
    icon: BookOpen,
  },

  {
    title: "Electronics",
    description:
      "Devices, accessories, and student tech.",
    icon: Laptop,
  },

  {
    title: "Furniture",
    description:
      "Affordable dorm and apartment essentials.",
    icon: Sofa,
  },

  {
    title: "Gaming",
    description:
      "Consoles, accessories, and games.",
    icon: Gamepad2,
  },
];

/**
 * Platform features.
 */
export const features = [
  {
    title: "Verified Students",
    description:
      "Campus-only access improves safety and trust.",
    icon: BadgeCheck,
  },

  {
    title: "Secure Messaging",
    description:
      "Communicate safely before meeting or trading.",
    icon: MessageCircle,
  },

  {
    title: "Campus Moderation",
    description:
      "Reporting and moderation tools for safer interactions.",
    icon: ShieldCheck,
  },

  {
    title: "Live Auctions",
    description:
      "Auction valuable items transparently in real time.",
    icon: Gavel,
  },
];

/**
 * How it works steps.
 */
export const steps = [
  {
    number: "01",
    title: "Create Account",
    description:
      "Sign up using your university email.",
  },

  {
    number: "02",
    title: "Browse or List",
    description:
      "Explore listings or post your own items.",
  },

  {
    number: "03",
    title: "Connect Safely",
    description:
      "Chat and trade inside your student community.",
  },
];