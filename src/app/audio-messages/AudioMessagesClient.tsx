"use client";

import { useMemo, useState } from "react";
import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Download, Play, Calendar, User, Clock } from "lucide-react";
import type { AudioMessageRow } from "@/src/lib/content";

function formatDuration(seconds: number | null) {
  if (seconds == null || seconds <= 0) return "—";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s ? `${m}m ${s}s` : `${m}m`;
}

export default function AudioMessagesClient({
  initialMessages,
  categories,
}: {
  initialMessages: AudioMessageRow[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = useMemo(() => {
    return initialMessages.filter((message) => {
      const matchesCategory =
        selectedCategory === "all" || message.category === selectedCategory;
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        message.title.toLowerCase().includes(q) ||
        (message.speaker ?? "").toLowerCase().includes(q) ||
        (message.description ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [initialMessages, selectedCategory, searchTerm]);

  const handleOpen = (message: AudioMessageRow) => {
    window.open(message.audioUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100">
      <Header />

      <div className="bg-gradient-to-r from-brand-600 to-brand-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Audio Messages
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Listen to inspiring sermons, teachings, and testimonies from our
            church community.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search audio messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-600 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-600 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {filteredMessages.length} audio message
            {filteredMessages.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No audio messages found
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Check back later for new audio messages."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {message.category || "General"}
                    </Badge>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDuration(message.durationSeconds)}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {message.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {message.speaker ?? "Speaker"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {message.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {message.date
                      ? new Date(message.date).toLocaleDateString()
                      : "—"}
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleOpen(message)}
                    className="w-full bg-brand-600 hover:bg-brand-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Open audio
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
