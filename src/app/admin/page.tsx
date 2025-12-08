"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  FileText,
  Calendar,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogPosts: 0,
    events: 0,
    groups: 0,
    weeklyReports: 0,
    comments: 0,
    pendingReports: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const fetchStats = async () => {
    try {
      const [
        { count: blogCount },
        { count: eventsCount },
        { count: groupsCount },
        { count: reportsCount },
        { count: commentsCount },
        { count: pendingCount },
      ] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("groups").select("*", { count: "exact", head: true }),
        supabase.from("weekly_reports").select("*", { count: "exact", head: true }),
        supabase.from("comments").select("*", { count: "exact", head: true }),
        supabase
          .from("weekly_reports")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
      ]);

      setStats({
        blogPosts: blogCount || 0,
        events: eventsCount || 0,
        groups: groupsCount || 0,
        weeklyReports: reportsCount || 0,
        comments: commentsCount || 0,
        pendingReports: pendingCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      href: "/admin/blog",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Events",
      value: stats.events,
      icon: Calendar,
      href: "/admin/events",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Groups",
      value: stats.groups,
      icon: Users,
      href: "/admin/groups",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Weekly Reports",
      value: stats.weeklyReports,
      icon: FileText,
      href: "/admin/weekly-reports",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Comments",
      value: stats.comments,
      icon: MessageSquare,
      href: "/admin/comments",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Pending Reports",
      value: stats.pendingReports,
      icon: Clock,
      href: "/admin/weekly-reports?status=pending",
      color: "from-red-500 to-red-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of your website content and activity
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div
                  className={`p-2 bg-gradient-to-br ${stat.color} rounded-lg`}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <CardDescription className="mt-2">
                  Click to manage
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/blog/new">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Create New Blog Post
              </Button>
            </Link>
            <Link href="/admin/events/new">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Create New Event
              </Button>
            </Link>
            <Link href="/admin/groups/new">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Add New Group
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">
                    {stats.pendingReports} weekly reports pending review
                  </p>
                  <p className="text-xs text-gray-500">Requires attention</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">
                    {stats.comments} total comments
                  </p>
                  <p className="text-xs text-gray-500">May need moderation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

