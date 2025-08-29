import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Monthly Prayer Meeting",
      date: "December 1, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Main Sanctuary",
      description:
        "Join us for our monthly prayer meeting where we lift up our church, community, and world in prayer.",
      category: "Prayer",
      attendees: 45,
      maxAttendees: 100,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Youth Bible Study",
      date: "December 4, 2024",
      time: "7:00 PM - 8:30 PM",
      location: "Youth Hall",
      description:
        "Weekly Bible study for young adults focusing on practical application of God's Word in daily life.",
      category: "Bible Study",
      attendees: 28,
      maxAttendees: 50,
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Women's Fellowship",
      date: "December 7, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Fellowship Hall",
      description:
        "Monthly gathering for women to connect, share testimonies, and grow together in faith.",
      category: "Fellowship",
      attendees: 35,
      maxAttendees: 60,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Christmas Carol Service",
      date: "December 24, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Main Sanctuary",
      description:
        "Celebrate the birth of our Savior with traditional carols, scripture readings, and special performances.",
      category: "Special Event",
      attendees: 120,
      maxAttendees: 200,
      image:
        "https://images.unsplash.com/photo-1543589923-d58f523daec0?w=600&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Men's Breakfast",
      date: "December 14, 2024",
      time: "8:00 AM - 10:00 AM",
      location: "Fellowship Hall",
      description:
        "Monthly breakfast gathering for men to discuss faith, share challenges, and encourage one another.",
      category: "Fellowship",
      attendees: 22,
      maxAttendees: 40,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    },
    {
      id: 6,
      title: "Family Game Night",
      date: "December 21, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Youth Hall",
      description:
        "Fun evening of board games, snacks, and fellowship for families of all ages.",
      category: "Family",
      attendees: 45,
      maxAttendees: 80,
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    },
  ];

  const pastEvents = [
    {
      id: 7,
      title: "Thanksgiving Service",
      date: "November 28, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Main Sanctuary",
      description:
        "Special service of thanksgiving and praise for God's blessings throughout the year.",
      category: "Special Event",
      attendees: 150,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
    {
      id: 8,
      title: "Bible Conference",
      date: "November 15-17, 2024",
      time: "Various Times",
      location: "Main Sanctuary",
      description:
        "Three-day conference featuring guest speakers, workshops, and deep Bible study sessions.",
      category: "Conference",
      attendees: 200,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    },
  ];

  const categories = [
    "All",
    "Prayer",
    "Bible Study",
    "Fellowship",
    "Special Event",
    "Family",
    "Conference",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Church Events
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Join us for inspiring events, meaningful fellowship, and spiritual
              growth opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mark your calendar and join us for these exciting events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-base">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees}/{event.maxAttendees} attending
                    </div>
                    <Button size="sm">Register</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Past Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Relive the memories and impact of our recent gatherings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-base">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} attended
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Want to Host an Event?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Have an idea for an event? We&quot;d love to hear from you and help
            make it happen!
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="mailto:events@dcgrowthgroups.com">Contact Us</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
