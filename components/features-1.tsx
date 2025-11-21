'use client'; // 1. Add use client directive

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, Calendar, UserPlus } from "lucide-react";
import { ReactNode } from "react";
// 2. Import motion
import { motion } from "framer-motion";

export default function Features() {
  return (
    // 3. Wrap the section with motion.section and apply animation props
    <motion.section 
      className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent"
      initial={{ opacity: 0, y: 50 }} // Start invisible and slightly below its final position
      whileInView={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
      viewport={{ once: true, amount: 0.1 }} // Animation runs only once when 10% of the section is visible
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth 0.8 second transition
    >
      <div className="@container mx-auto max-w-5xl px-6">
        {/* The rest of the content remains the same */}
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Turn Your Tutoring into a Business
          </h2>
          <p className="mt-4 text-muted-foreground">
            Centralized tools to manage students, sessions, and enrollment seamlessly.
          </p>
        </div>

        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 text-center md:mt-16">
          {/* Card 1 */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Users className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Your Own Space</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                A dedicated hub where students can view your services, access resources, and connect with you—your tutoring business, all in one place.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Calendar className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Schedule & Task Management</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Assign tasks, schedule sessions, and track student progress and your hours efficiently—all from one dashboard.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <UserPlus className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Seamless Enrollment</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Students enroll via unique access codes. Manage enrollments, track attendance, and streamline your operations effortlessly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);