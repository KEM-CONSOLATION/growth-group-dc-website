import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Users, Heart, BookOpen, Globe, Target, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Love & Compassion",
      description: "We believe in showing God's love through acts of kindness and compassion to all people.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Building strong, supportive communities where everyone feels valued and included.",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Biblical Teaching",
      description: "Grounding all our activities and relationships in the truth of God's Word.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Impact",
      description: "Reaching beyond our local communities to make a difference worldwide.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Purpose-Driven",
      description: "Helping people discover and fulfill their God-given purpose in life.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Striving for excellence in everything we do, honoring God with our best efforts.",
    },
  ];

  const stats = [
    { number: "50+", label: "Growth Groups" },
    { number: "1,200+", label: "Active Members" },
    { number: "15", label: "States Covered" },
    { number: "25+", label: "Years of Ministry" },
  ];

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
              About Growth Groups
            </h1>
            <p 
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Building stronger communities through faith, fellowship, and spiritual growth
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                To create vibrant, inclusive communities where people can grow in their faith, 
                build meaningful relationships, and discover their God-given purpose through 
                small group experiences.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that spiritual growth happens best in community, where we can 
                encourage one another, share our struggles and victories, and pray together 
                as we journey through life.
              </p>
            </div>
            <div data-aos="fade-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                To see every person connected to a Growth Group where they can experience 
                authentic community, spiritual transformation, and meaningful service.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a network of thriving groups across Nigeria and beyond, 
                making a positive impact in communities and transforming lives through 
                the power of faith and fellowship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Our Impact
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Numbers that tell the story of our growth and reach
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Our Core Values
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="text-center hover:shadow-lg transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">1999 - The Beginning</h3>
                  <p className="text-gray-600">
                    Growth Groups started as a small Bible study in Lagos with just 12 people 
                    who wanted to grow deeper in their faith together.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2005 - Expansion</h3>
                  <p className="text-gray-600">
                    We expanded to multiple locations across Lagos and began developing 
                    our group leadership training program.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2015 - National Reach</h3>
                  <p className="text-gray-600">
                    Growth Groups reached 10 states across Nigeria, establishing our 
                    presence in major cities and communities.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2024 - Today</h3>
                  <p className="text-gray-600">
                    We now have over 50 active groups across 15 states, impacting 
                    thousands of lives and communities.
                  </p>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Join Our Journey
                </h3>
                <p className="text-gray-600 mb-6">
                  Be part of our story as we continue to grow and impact more lives 
                  across Nigeria and beyond.
                </p>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href="/groups">Find a Group</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/leadership">Meet Our Team</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl font-bold mb-6"
            data-aos="fade-up"
          >
            Ready to Be Part of Our Story?
          </h2>
          <p 
            className="text-xl text-blue-100 mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Join a Growth Group today and experience the power of community, 
            faith, and spiritual growth
          </p>
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Button size="lg" variant="secondary" asChild>
              <Link href="/groups">Find a Group</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
