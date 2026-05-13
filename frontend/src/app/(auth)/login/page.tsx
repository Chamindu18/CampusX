"use client";

/**
 * Login page.
 */

import Link from "next/link";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth";

import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function LoginPage() {
  /**
   * React Hook Form setup.
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  /**
   * Form submit handler.
   */
  async function onSubmit(
    data: LoginFormValues
  ) {
    console.log(data);

    /**
     * Simulate request.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    toast.success("Login successful");
  }

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
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
              {...register("email")}
            />

            <FormError
              message={errors.email?.message}
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
              {...register("password")}
            />

            <FormError
              message={errors.password?.message}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Logging in..."
              : "Login"}
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