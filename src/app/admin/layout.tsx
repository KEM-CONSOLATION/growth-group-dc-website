"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/src/lib/supabase";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  Music,
  BookOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const isUnauthorizedPage = pathname === "/admin/unauthorized";

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      try {
        if (!isLoginPage) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (isLoginPage) {
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        if (error || !session) {
          if (mounted) {
            router.push("/admin/login");
          }
          return;
        }

        if (mounted) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        if (mounted && !isLoginPage) {
          router.push("/admin/login");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        if (isLoginPage) {
          const redirect = new URLSearchParams(window.location.search).get("redirect") || "/admin";
          router.push(redirect);
          router.refresh();
        }
        return;
      }

      if (isLoginPage || isUnauthorizedPage) {
        if (session) {
          setUser(session.user);
        }
        return;
      }

      if (event === 'SIGNED_OUT' || !session) {
        router.push("/admin/login");
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, isLoginPage, isUnauthorizedPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Groups", href: "/admin/groups", icon: Users },
    { name: "Departments", href: "/admin/departments", icon: Users },
    { name: "Weekly Reports", href: "/admin/weekly-reports", icon: FileText },
    { name: "Comments", href: "/admin/comments", icon: MessageSquare },
    { name: "Devotions", href: "/admin/devotions", icon: BookOpen },
    { name: "Audio Messages", href: "/admin/audio-messages", icon: Music },
    { name: "Authors", href: "/admin/authors", icon: Users },
    { name: "Categories", href: "/admin/categories", icon: FileText },
  ];

  if (isLoginPage || isUnauthorizedPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none`}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-500 mt-1">
                {user?.email || "Admin"}
              </p>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

