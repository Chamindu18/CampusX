"use client";

/**
 * Signup page.
 */

import Link from "next/link";

import { motion } from "framer-motion";

import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function SignupPage() {
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
        title="Create account"
        description="Join CampusX and start connecting with your campus community."
      >
        <form className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">
              Full Name
            </Label>

            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              className="mt-2"
            />
          </div>

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
              placeholder="Create a password"
              className="mt-2"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
          >
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </AuthCard>
    </motion.div>
  );
}