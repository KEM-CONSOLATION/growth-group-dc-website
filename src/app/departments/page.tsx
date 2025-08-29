import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Users, Star } from "lucide-react";

export default function DepartmentsPage() {
  const departments = [
    {
      id: 1,
      name: "Children's Ministry",
      leader: "Sarah Adebayo",
      description:
        "Nurturing the faith of children with age-appropriate activities and Bible stories.",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
      ageRange: "0-12 years",
      meetingTime: "Sundays during service",
      activities: [
        "Sunday School",
        "Vacation Bible School",
        "Children's Choir",
      ],
      contact: {
        phone: "+234 802 111 1111",
        email: "children@dcgrowthgroups.com",
      },
      stats: {
        members: 45,
        volunteers: 12,
        events: 8,
      },
      color: "blue",
    },
    {
      id: 2,
      name: "Youth Ministry",
      leader: "David Okechukwu",
      description:
        "Empowering teenagers and young adults to grow in their faith.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      ageRange: "13-25 years",
      meetingTime: "Fridays at 6:00 PM",
      activities: [
        "Youth Bible Study",
        "Worship Nights",
        "Leadership Training",
      ],
      contact: {
        phone: "+234 802 222 2222",
        email: "youth@dcgrowthgroups.com",
      },
      stats: {
        members: 38,
        volunteers: 8,
        events: 12,
      },
      color: "purple",
    },
    {
      id: 3,
      name: "Music & Worship",
      leader: "Grace Johnson",
      description: "Leading the congregation in worship through music.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      ageRange: "All ages",
      meetingTime: "Wednesdays at 7:00 PM",
      activities: ["Choir Practice", "Instrumental Training", "Worship Team"],
      contact: {
        phone: "+234 802 333 3333",
        email: "worship@dcgrowthgroups.com",
      },
      stats: {
        members: 25,
        volunteers: 15,
        events: 6,
      },
      color: "green",
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Church Departments
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover how you can serve and grow through our various ministry
              departments
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Ministry Departments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each department plays a vital role in building up the body of
              Christ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <Card
                key={dept.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {dept.name}
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{dept.name}</CardTitle>
                  <CardDescription className="text-base">
                    Led by {dept.leader}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Age: {dept.ageRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      <span>{dept.meetingTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Activities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dept.activities.map((activity) => (
                        <span
                          key={activity}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {dept.stats.members}
                      </div>
                      <div className="text-gray-600">Members</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {dept.stats.volunteers}
                      </div>
                      <div className="text-gray-600">Volunteers</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {dept.stats.events}
                      </div>
                      <div className="text-gray-600">Events</div>
                    </div>
                  </div>

                  <Button className="w-full">Join Department</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Ready to Serve?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join one of our ministry departments and discover the joy of serving
            God and others.
          </p>
          <Button size="lg" variant="secondary">
            Browse Departments
          </Button>
        </div>
      </section>
    </div>
  );
}
