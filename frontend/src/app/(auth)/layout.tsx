/**
 * Authentication layout with smooth transitions.
 */

import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { AuthLayoutShell } from "@/components/layout/AuthLayoutShell";

import { getCurrentUser } from "@/lib/current-user";

import { getLandingPathForRole } from "@/lib/auth";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({
  children,
}: AuthLayoutProps) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(getLandingPathForRole(currentUser.role));
  }

  return <AuthLayoutShell>{children}</AuthLayoutShell>;
}