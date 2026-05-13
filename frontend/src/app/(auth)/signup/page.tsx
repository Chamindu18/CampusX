"use client";

/**
 * Signup page.
 */

import Link from "next/link";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  signupSchema,
  type SignupFormValues,
} from "@/lib/validations/auth";

import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function SignupPage() {
  /**
   * Form setup.
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  /**
   * Submit handler.
   */
  async function onSubmit(
    data: SignupFormValues
  ) {
    console.log(data);

    /**
     * Simulated request.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    toast.success("Account created");
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
        title="Create account"
        description="Join CampusX and start connecting with your campus community."
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
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
              {...register("name")}
            />

            <FormError
              message={errors.name?.message}
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
              placeholder="Create a password"
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
              ? "Creating account..."
              : "Create Account"}
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