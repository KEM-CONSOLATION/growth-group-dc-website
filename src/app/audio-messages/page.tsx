"use client";

import { useState, useEffect } from "react";
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
import { sanityClient } from "@/lib/sanity-fixed";
import {
  audioMessagesQuery,
  audioMessageCategoriesQuery,
} from "@/lib/sanity-fixed";

interface AudioMessage {
  _id: string;
  title: string;
  speaker: string;
  date: string;
  description: string;
  googleDriveLink: string;
  duration: number;
  category: string;
  tags: string[];
  downloadCount: number;
}

export default function AudioMessagesPage() {
  const [audioMessages, setAudioMessages] = useState<AudioMessage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAudioMessages();
    fetchCategories();
  }, []);

  const fetchAudioMessages = async () => {
    try {
      const data = await sanityClient.fetch(audioMessagesQuery);
      setAudioMessages(data);
    } catch (error) {
      console.error("Error fetching audio messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await sanityClient.fetch(audioMessageCategoriesQuery);
      if (data?.categories) {
        setCategories(
          data.categories.map((cat: { category: string }) => cat.category)
        );
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDownload = (audioMessage: AudioMessage) => {
    // Open Google Drive link in new tab
    window.open(audioMessage.googleDriveLink, "_blank");

    // In a real app, you might want to track downloads
    // This would require a backend API to update the download count
  };

  const filteredMessages = audioMessages.filter((message) => {
    const matchesCategory =
      selectedCategory === "all" || message.category === selectedCategory;
    const matchesSearch =
      message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading audio messages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Audio Messages
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Listen to inspiring sermons, teachings, and testimonies from our
            church community. Download and listen at your convenience.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search audio messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredMessages.length} audio message
            {filteredMessages.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Audio Messages Grid */}
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
                key={message._id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {message.category}
                    </Badge>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDuration(message.duration)}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {message.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {message.speaker}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {message.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(message.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {message.downloadCount} downloads
                    </div>
                  </div>

                  {message.tags && message.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {message.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Button
                    onClick={() => handleDownload(message)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Audio
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
