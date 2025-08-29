import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Heart, Users, Globe, BookOpen } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Love",
      description:
        "We believe in showing God's love to everyone we meet, creating a welcoming and inclusive community.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description:
        "Building strong relationships and supporting one another in our faith journey and daily lives.",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Growth",
      description:
        "Encouraging continuous spiritual development through Bible study, prayer, and practical application.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Service",
      description:
        "Reaching out to our local community and beyond with acts of kindness and practical help.",
    },
  ];

  const milestones = [
    {
      year: "2010",
      title: "Church Founded",
      description:
        "Dominion City Church was established with a vision to transform lives through the Gospel.",
    },
    {
      year: "2015",
      title: "Growth Groups Launched",
      description:
        "Started our first Growth Groups to foster deeper community and spiritual growth.",
    },
    {
      year: "2018",
      title: "Multi-State Expansion",
      description: "Extended our ministry to multiple states across Nigeria.",
    },
    {
      year: "2024",
      title: "Digital Ministry",
      description:
        "Launched online platforms to reach more people and provide digital resources.",
    },
  ];

  const team = [
    {
      name: "Pastor John Smith",
      role: "Senior Pastor",
      bio: "Leading our church with over 20 years of ministry experience and a heart for community transformation.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Sarah Johnson",
      role: "Growth Groups Director",
      bio: "Passionate about building authentic relationships and helping people find their place in our community.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Michael Brown",
      role: "Youth Minister",
      bio: "Dedicated to guiding young people in their faith journey and helping them discover their purpose.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover the story, mission, and values that drive our church
              community
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To transform lives through the Gospel of Jesus Christ, building
                a community of believers who love God, love people, and make
                disciples. We are committed to spreading God&apos;s love and
                transforming our world one life at a time.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through our Growth Groups, we create spaces where people can
                connect deeply, grow spiritually, and serve others with their
                unique gifts and talents.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To be a beacon of hope and transformation in our communities,
                raising up leaders who will impact their families, workplaces,
                and neighborhoods with the love and truth of Jesus Christ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do as a church community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mb-4">
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

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to a growing ministry that impacts
              thousands of lives
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div
                  className={`flex-shrink-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold ${index % 2 === 0 ? "md:order-1" : "md:order-3"}`}
                >
                  {milestone.year}
                </div>
                <div
                  className={`flex-1 text-center md:text-left ${index % 2 === 0 ? "md:order-2" : "md:order-2"}`}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated leaders who guide our church and Growth Groups
              ministry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-blue-600">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Believe
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The foundational truths that shape our faith and ministry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">The Bible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We believe the Bible is the inspired, infallible Word of God
                  and our final authority for faith and practice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Salvation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We believe salvation comes through faith in Jesus Christ
                  alone, who died for our sins and rose again.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">The Church</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We believe the Church is the body of Christ, called to
                  worship, grow, and serve together.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Eternal Life</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We believe in the resurrection of the dead and eternal life
                  for those who believe in Christ.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
          <p className="text-xl text-blue-100 mb-8">
            Ready to be part of something bigger? Join our Growth Groups and
            experience authentic community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/groups">Find a Group</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
