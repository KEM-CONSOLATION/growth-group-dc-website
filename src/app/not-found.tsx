"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Header } from "@/src/components/Header";
import {
  Home,
  Search,
  Calendar,
  BookOpenText,
  Users,
  Info,
} from "lucide-react";

export default function NotFound() {
  const quickLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/blog", label: "Blog", icon: BookOpenText },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/groups", label: "Groups", icon: Users },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="px-4">
        <section className="relative max-w-5xl mx-auto pt-16 pb-12">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />
          <Card className="overflow-hidden border-none shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-10">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                Page not found
              </h1>
              <p className="mt-3 text-blue-100 max-w-2xl">
                The page you’re looking for doesn’t exist or may have moved.
                Let’s help you find the right place.
              </p>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                Where would you like to go?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {quickLinks.map(({ href, label, icon: Icon }) => (
                  <Button
                    key={href}
                    asChild
                    variant="outline"
                    className="justify-start gap-2"
                  >
                    <Link href={href}>
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  </Button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Go back home
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="flex-1">
                  <Link href="/blog">
                    <Search className="h-4 w-4 mr-2" />
                    Explore the blog
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
