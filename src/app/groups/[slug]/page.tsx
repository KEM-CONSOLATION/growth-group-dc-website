"use client";

import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  MapPin,
  Clock,
  Users,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Globe,
  User,
  Tag,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data - in real app this would come from Sanity
const groupData = {
  id: 1,
  name: "Lagos Central Growth Group",
  leader: "Pastor Sarah Johnson",
  meetingTime: "Every Tuesday at 7:00 PM",
  location: "Main Sanctuary, Victoria Island",
  state: "Lagos",
  city: "Victoria Island",
  branch: "Victoria Island",
  members: 25,
  maxMembers: 30,
  focus: "Bible Study & Prayer",
  description:
    "A vibrant group focused on deep Bible study and intercessory prayer. We meet weekly to grow together in faith and support one another. Our group is committed to studying God's Word systematically, sharing testimonies, and lifting each other up in prayer. We believe in the power of community and the importance of spiritual accountability.",
  longDescription: `Our Lagos Central Growth Group is more than just a weekly meeting - it's a family of believers committed to growing together in Christ. We believe that spiritual growth happens best in community, where we can encourage one another, share our struggles and victories, and pray together.

  Each week, we dive deep into God's Word through guided Bible studies, engage in meaningful discussions about how to apply biblical principles to our daily lives, and spend dedicated time in prayer for our group members, church, and community needs.
  
  We also organize regular outreach activities, social events, and service projects to put our faith into action. Whether you're a new believer or have been walking with Christ for years, you'll find a warm welcome and a place to grow in our group.`,
  contact: {
    phone: "+234 802 345 6789",
    whatsapp: "+234 802 345 6789",
    email: "lagoscentral@growthgroups.com",
  },
  leaderDetails: {
    name: "Pastor Sarah Johnson",
    phone: "+234 802 345 6789",
    whatsapp: "+234 802 345 6789",
    email: "sarah.johnson@growthgroups.com",
    bio: "Pastor Sarah has been leading growth groups for over 8 years and has a passion for helping people grow in their faith. She holds a Master's degree in Theology and has extensive experience in pastoral care and discipleship. Sarah believes in creating an environment where everyone feels valued and can grow spiritually.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
  },
  image:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
  tags: [
    "Bible Study",
    "Prayer",
    "Fellowship",
    "Community",
    "Spiritual Growth",
  ],
  isOpen: true,
  meetingDay: "Tuesday",
  duration: "2 hours",
  ageGroup: "All Ages",
  language: "English",
  isOnline: true,
  onlinePlatform: "Zoom",
  schedule: [
    {
      time: "7:00 PM",
      activity: "Welcome & Opening Prayer",
      duration: "10 min",
    },
    {
      time: "7:10 PM",
      activity: "Worship & Praise",
      duration: "15 min",
    },
    {
      time: "7:25 PM",
      activity: "Bible Study Discussion",
      duration: "45 min",
    },
    {
      time: "8:10 PM",
      activity: "Prayer Requests & Intercession",
      duration: "30 min",
    },
    {
      time: "8:40 PM",
      activity: "Announcements & Closing",
      duration: "10 min",
    },
  ],
};

export default function GroupDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in joining the ${groupData.name}. Can you tell me more about the group?`;
    const whatsappUrl = `https://wa.me/${groupData.leaderDetails.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePhoneContact = () => {
    window.open(`tel:${groupData.leaderDetails.phone}`, "_blank");
  };

  const handleEmailContact = () => {
    window.open(`mailto:${groupData.leaderDetails.email}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              data-aos="fade-up"
            >
              {groupData.name}
            </h1>
            <p
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Led by {groupData.leaderDetails.name} • {groupData.focus}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Group Image */}
              <div
                className="relative h-64 md:h-80 rounded-lg overflow-hidden"
                data-aos="fade-up"
              >
                <Image
                  src={groupData.image}
                  alt={groupData.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      groupData.isOpen
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {groupData.isOpen ? "Open for New Members" : "Group Full"}
                  </span>
                </div>
              </div>

              {/* Group Description */}
              <Card data-aos="fade-up" data-aos-delay="100">
                <CardHeader>
                  <CardTitle className="text-2xl">About This Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {groupData.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {groupData.longDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Meeting Schedule */}
              <Card data-aos="fade-up" data-aos-delay="200">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    Meeting Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {groupData.meetingDay}s
                        </p>
                        <p className="text-gray-600">{groupData.meetingTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{groupData.duration}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {groupData.schedule.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-blue-600 w-16">
                              {item.time}
                            </span>
                            <span className="text-gray-700">
                              {item.activity}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {item.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Group Details */}
              <Card data-aos="fade-up" data-aos-delay="300">
                <CardHeader>
                  <CardTitle className="text-2xl">Group Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Members</p>
                          <p className="font-medium">
                            {groupData.members}/{groupData.maxMembers}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Tag className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">Focus Area</p>
                          <p className="font-medium">{groupData.focus}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-500">Age Group</p>
                          <p className="font-medium">{groupData.ageGroup}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="text-sm text-gray-500">Language</p>
                          <p className="font-medium">{groupData.language}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Online Available
                          </p>
                          <p className="font-medium">
                            {groupData.isOnline ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                      {groupData.isOnline && (
                        <div className="flex items-center gap-3">
                          <MessageCircle className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Platform</p>
                            <p className="font-medium">
                              {groupData.onlinePlatform}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="sticky top-6" data-aos="fade-left">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Contact Group Leader
                  </CardTitle>
                  <CardDescription>
                    Get in touch to join this group or ask questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Leader Info */}
                  <div className="text-center pb-4 border-b">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <Image
                        src={groupData.leaderDetails.image}
                        alt={groupData.leaderDetails.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {groupData.leaderDetails.name}
                    </h3>
                    <p className="text-sm text-gray-600">Group Leader</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {groupData.leaderDetails.bio}
                    </p>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleWhatsAppContact}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact on WhatsApp
                    </Button>

                    <Button
                      onClick={handlePhoneContact}
                      variant="outline"
                      className="w-full"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Leader
                    </Button>

                    <Button
                      onClick={handleEmailContact}
                      variant="outline"
                      className="w-full"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>

                  {/* Quick Info */}
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {groupData.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {groupData.meetingTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {groupData.members}/{groupData.maxMembers} members
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card data-aos="fade-left" data-aos-delay="100">
                <CardHeader>
                  <CardTitle className="text-lg">Group Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {groupData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Back to Groups */}
              <Card data-aos="fade-left" data-aos-delay="200">
                <CardContent className="pt-6">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/groups">← Back to All Groups</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4" data-aos="fade-up">
            Ready to Join This Group?
          </h3>
          <p
            className="text-xl text-blue-100 mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Contact the group leader to get started on your spiritual growth
            journey
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Button
              size="lg"
              variant="secondary"
              onClick={handleWhatsAppContact}
              className="bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact on WhatsApp
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
