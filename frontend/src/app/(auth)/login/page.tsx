"use client";

/**
 * Login page.
 */

import Link from "next/link";

import { motion } from "framer-motion";

import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function LoginPage() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
    >
      <AuthCard
        title="Welcome back"
        description="Login to continue your CampusX experience."
      >
        <form className="space-y-6">
          {/* Email */}
          <div>
            <Label htmlFor="email">
              University Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="you@university.edu"
              className="mt-2"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-2"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
          >
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Create account
          </Link>
        </p>
      </AuthCard>
    </motion.div>
  );
}