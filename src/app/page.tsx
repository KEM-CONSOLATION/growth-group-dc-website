"use client";

import Image from "next/image";
import Link from "next/link";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import {
  Calendar,
  Users,
  BookOpen,
  Heart,
  MapPin,
  Clock,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import { config } from "@/src/lib/config";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      id: 1,
      title: "Welcome to Growth Groups",
      subtitle: "Building Stronger Communities Through Faith",
      description:
        "Join our vibrant community of believers, grow in faith, and build meaningful relationships through our church's Growth Groups across Nigeria.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
      cta: "Find a Group",
      ctaLink: "/groups",
    },
    {
      id: 2,
      title: "Daily Devotions",
      subtitle: "Start Your Day with God's Word",
      description:
        "Get inspired with daily scripture readings, reflections, and prayers to strengthen your spiritual journey.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
      cta: "Read Devotions",
      ctaLink: "/devotions",
    },
    {
      id: 3,
      title: "Upcoming Events",
      subtitle: "Connect and Grow Together",
      description:
        "Discover exciting events, retreats, and gatherings that will help you connect with fellow believers.",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop",
      cta: "View Events",
      ctaLink: "/events",
    },
  ];

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Bible Study",
      description:
        "Deep dive into God's Word with guided studies and discussions",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Build lasting friendships and support networks",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Prayer",
      description: "Join prayer circles and intercessory prayer groups",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Local Groups",
      description: "Find groups meeting in your neighborhood",
      color: "from-green-500 to-green-600",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Monthly Prayer Meeting",
      date: "Every First Sunday",
      time: "6:00 PM",
      location: "Main Sanctuary",
      attendees: 45,
    },
    {
      id: 2,
      title: "Youth Bible Study",
      date: "Every Wednesday",
      time: "7:00 PM",
      location: "Youth Hall",
      attendees: 28,
    },
    {
      id: 3,
      title: "Women's Fellowship",
      date: "Every Saturday",
      time: "10:00 AM",
      location: "Fellowship Hall",
      attendees: 35,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={item.id}>
                <div className="relative h-[600px] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white max-w-4xl mx-auto px-4">
                      <h1
                        className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        {item.title}
                      </h1>
                      <p
                        className="text-2xl md:text-3xl text-blue-100 mb-6"
                        data-aos="fade-up"
                        data-aos-delay="400"
                      >
                        {item.subtitle}
                      </p>
                      <p
                        className="text-lg md:text-xl text-blue-50 mb-8 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="600"
                      >
                        {item.description}
                      </p>
                      <Button
                        size="lg"
                        asChild
                        data-aos="fade-up"
                        data-aos-delay="800"
                      >
                        <Link href={item.ctaLink}>{item.cta}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              What We Offer
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Discover the various ways you can grow spiritually and connect
              with our church community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardHeader>
                  <div
                    className={`mx-auto w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center text-white mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Livestream Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">
              🎥 Live Now
            </h2>
            <p
              className="text-xl text-red-100 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Join us live for our Sunday service, Bible studies, and special
              events
            </p>
          </div>

          <div
            className="max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={config.youtube.liveStreamUrl}
                title="Live Stream"
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-red-100 mb-4">
                📅 Sundays at {config.serviceTimes.sunday.join(" & ")} •
                Wednesdays at {config.serviceTimes.wednesday}
              </p>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600"
                asChild
              >
                <a
                  href={config.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Subscribe to Our Channel
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Messages Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              🎵 Audio Messages
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Download and listen to inspiring sermons, teachings, and
              testimonies at your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Sample Audio Message Cards */}
            <Card
              className="hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Sermon</Badge>
                  <div className="text-sm text-gray-500">45m</div>
                </div>
                <CardTitle className="text-lg">Walking in Faith</CardTitle>
                <CardDescription>Pastor John Smith</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  A powerful message about trusting God in difficult times and
                  walking by faith, not by sight.
                </p>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Audio
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Teaching</Badge>
                  <div className="text-sm text-gray-500">32m</div>
                </div>
                <CardTitle className="text-lg">Prayer Principles</CardTitle>
                <CardDescription>Dr. Sarah Johnson</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Learn the fundamental principles of effective prayer and how
                  to develop a consistent prayer life.
                </p>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Audio
                </Button>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Testimony</Badge>
                  <div className="text-sm text-gray-500">18m</div>
                </div>
                <CardTitle className="text-lg">
                  God&apos;s Faithfulness
                </CardTitle>
                <CardDescription>Brother Michael</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  A personal testimony of how God&apos;s faithfulness was
                  demonstrated through challenging circumstances.
                </p>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Audio
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild data-aos="fade-up" data-aos-delay="400">
              <Link href="/audio-messages">View All Audio Messages</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Upcoming Events
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Join us for these exciting events and grow together in faith
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild data-aos="fade-up" data-aos-delay="400">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">
            Ready to Grow Together?
          </h2>
          <p
            className="text-xl text-blue-100 mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Join our Growth Groups and experience the power of community, faith,
            and spiritual growth
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Button size="lg" variant="secondary" asChild>
              <Link href="/join">Join a Group</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div data-aos="fade-up">
              <h3 className="text-xl font-bold mb-4">Growth Groups</h3>
              <p className="text-gray-400">
                Building stronger communities through faith, fellowship, and
                spiritual growth.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="hover:text-white transition-colors"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/devotions"
                    className="hover:text-white transition-colors"
                  >
                    Devotions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/devotions"
                    className="hover:text-white transition-colors"
                  >
                    Daily Devotions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sermons"
                    className="hover:text-white transition-colors"
                  >
                    Sermons
                  </Link>
                </li>
                <li>
                  <Link
                    href="/audio-messages"
                    className="hover:text-white transition-colors"
                  >
                    Audio Messages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/prayer"
                    className="hover:text-white transition-colors"
                  >
                    Prayer Requests
                  </Link>
                </li>
                <li>
                  <Link
                    href="/giving"
                    className="hover:text-white transition-colors"
                  >
                    Online Giving
                  </Link>
                </li>
              </ul>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/newsletter"
                    className="hover:text-white transition-colors"
                  >
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/social"
                    className="hover:text-white transition-colors"
                  >
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link
                    href="/volunteer"
                    className="hover:text-white transition-colors"
                  >
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Dominion City Church Growth Groups. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
