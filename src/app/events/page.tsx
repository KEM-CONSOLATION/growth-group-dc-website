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
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  sanityClient,
  upcomingEventsQuery,
  pastEventsQuery,
} from "@/lib/sanity-fixed";
import { urlFor } from "@/lib/sanity-fixed";

interface Event {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  category: string;
  image?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  isRegistrationRequired?: boolean;
  registrationLink?: string;
  organizer?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  tags?: string[];
}

interface EventsPageProps {
  searchParams: { category?: string };
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  // Fetch events from Sanity
  const [upcomingEventsData, pastEventsData] = await Promise.all([
    sanityClient.fetch(upcomingEventsQuery),
    sanityClient.fetch(pastEventsQuery),
  ]);

  const upcomingEvents: Event[] = upcomingEventsData || [];
  const pastEvents: Event[] = pastEventsData || [];

  // Extract unique categories from events data
  const allEvents = [...upcomingEvents, ...pastEvents];
  const categories = [
    ...new Set(allEvents.map((event) => event.category)),
  ].sort();

  // Filter events by category if specified
  const selectedCategory = searchParams.category;
  const filteredUpcomingEvents =
    selectedCategory && selectedCategory !== "All"
      ? upcomingEvents.filter((event) => event.category === selectedCategory)
      : upcomingEvents;

  const filteredPastEvents =
    selectedCategory && selectedCategory !== "All"
      ? pastEvents.filter((event) => event.category === selectedCategory)
      : pastEvents;

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Date not available";
    }
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return "Time not available";
    }
  };

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
            <Button
              variant={
                !selectedCategory || selectedCategory === "All"
                  ? "default"
                  : "outline"
              }
              size="sm"
              className="rounded-full"
              asChild
            >
              <a href="/events">All</a>
            </Button>
            {categories.map((category: string) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                asChild
              >
                <a href={`/events?category=${encodeURIComponent(category)}`}>
                  {category}
                </a>
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

          {filteredUpcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {selectedCategory
                  ? `No upcoming ${selectedCategory.toLowerCase()} events at the moment.`
                  : "No upcoming events at the moment."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUpcomingEvents.map((event) => (
                <Card
                  key={event._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-blue-400" />
                      </div>
                    )}
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
                      {formatDate(event.startDate)}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatTime(event.startDate)}
                      {event.endDate && ` - ${formatTime(event.endDate)}`}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    {event.organizer && (
                      <div className="text-sm text-gray-600">
                        Organized by: {event.organizer}
                      </div>
                    )}
                    {(event.maxAttendees || event.currentAttendees) && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {event.currentAttendees || 0}
                          {event.maxAttendees && `/${event.maxAttendees}`}{" "}
                          attending
                        </div>
                        {event.isRegistrationRequired &&
                          event.registrationLink && (
                            <Button size="sm" asChild>
                              <a
                                href={event.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Register
                              </a>
                            </Button>
                          )}
                      </div>
                    )}
                    {event.contactInfo && (
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex gap-2">
                          {event.contactInfo.phone && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={`tel:${event.contactInfo.phone}`}>
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                              </a>
                            </Button>
                          )}
                          {event.contactInfo.email && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={`mailto:${event.contactInfo.email}`}>
                                <Mail className="h-3 w-3 mr-1" />
                                Email
                              </a>
                            </Button>
                          )}
                          {event.contactInfo.whatsapp && (
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={`https://wa.me/${event.contactInfo.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MessageCircle className="h-3 w-3 mr-1" />
                                WhatsApp
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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

          {filteredPastEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {selectedCategory
                  ? `No past ${selectedCategory.toLowerCase()} events to display.`
                  : "No past events to display."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPastEvents.map((event) => (
                <Card key={event._id} className="overflow-hidden">
                  <div className="relative h-48">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
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
                      {formatDate(event.startDate)}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    {event.currentAttendees && (
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {event.currentAttendees} attended
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Want to Host an Event?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Have an idea for an event? We&apos;d love to hear from you and help
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
