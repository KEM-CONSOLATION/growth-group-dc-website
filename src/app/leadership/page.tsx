import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Mail, Phone, MapPin, Award } from "lucide-react";

export default function LeadershipPage() {
  const seniorLeadership = [
    {
      name: "Pastor John Smith",
      role: "Senior Pastor & General Overseer",
      bio: "Leading our church with over 25 years of ministry experience, Pastor John has a heart for community transformation and spiritual growth. He holds a Master's degree in Theology and has served in various leadership roles across Nigeria.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      email: "pastor.john@dcgrowthgroups.com",
      phone: "+234 801 234 5678",
      location: "Lagos, Nigeria",
      specialties: [
        "Preaching",
        "Leadership Development",
        "Community Outreach",
      ],
      yearsOfService: 25,
    },
    {
      name: "Pastor Sarah Johnson",
      role: "Associate Pastor & Growth Groups Director",
      bio: "Sarah is passionate about building authentic relationships and helping people find their place in our community. She oversees all Growth Groups and coordinates our discipleship programs.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      email: "sarah.johnson@dcgrowthgroups.com",
      phone: "+234 802 345 6789",
      location: "Lagos, Nigeria",
      specialties: ["Growth Groups", "Discipleship", "Women's Ministry"],
      yearsOfService: 15,
    },
  ];

  const statePastors = [
    {
      name: "Pastor Michael Brown",
      role: "State Pastor - Abuja",
      bio: "Leading our ministry in the Federal Capital Territory, Pastor Michael focuses on government relations and community development programs.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      email: "michael.brown@dcgrowthgroups.com",
      phone: "+234 803 456 7890",
      location: "Abuja, Nigeria",
      specialties: [
        "Government Relations",
        "Community Development",
        "Youth Ministry",
      ],
      yearsOfService: 12,
    },
    {
      name: "Pastor Emily Davis",
      role: "State Pastor - Port Harcourt",
      bio: "Serving in the heart of the Niger Delta, Pastor Emily leads our ministry in Port Harcourt with a focus on reconciliation and community healing.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      email: "emily.davis@dcgrowthgroups.com",
      phone: "+234 804 567 8901",
      location: "Port Harcourt, Nigeria",
      specialties: [
        "Reconciliation",
        "Community Healing",
        "Interfaith Dialogue",
      ],
      yearsOfService: 18,
    },
    {
      name: "Pastor David Wilson",
      role: "State Pastor - Kano",
      bio: "Leading our northern ministry, Pastor David works to bridge cultural divides and promote unity among diverse communities.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      email: "david.wilson@dcgrowthgroups.com",
      phone: "+234 805 678 9012",
      location: "Kano, Nigeria",
      specialties: ["Cultural Bridge Building", "Unity Promotion", "Education"],
      yearsOfService: 20,
    },
  ];

  const ministryLeaders = [
    {
      name: "Grace Okechukwu",
      role: "Youth Ministry Director",
      bio: "Passionate about guiding young people in their faith journey and helping them discover their purpose in Christ.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      email: "grace.okechukwu@dcgrowthgroups.com",
      phone: "+234 806 789 0123",
      location: "Lagos, Nigeria",
      specialties: ["Youth Ministry", "Mentoring", "Creative Arts"],
      yearsOfService: 8,
    },
    {
      name: "Daniel Adebayo",
      role: "Music & Worship Director",
      bio: "Leading our worship ministry with a heart for excellence and a passion for creating an atmosphere where people can encounter God.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      email: "daniel.adebayo@dcgrowthgroups.com",
      phone: "+234 807 890 1234",
      location: "Lagos, Nigeria",
      specialties: ["Worship Leadership", "Music Production", "Team Building"],
      yearsOfService: 10,
    },
    {
      name: "Ruth Okonkwo",
      role: "Children's Ministry Director",
      bio: "Dedicated to nurturing the faith of our youngest members and creating a safe, fun environment for children to learn about God.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      email: "ruth.okonkwo@dcgrowthgroups.com",
      phone: "+234 808 901 2345",
      location: "Lagos, Nigeria",
      specialties: [
        "Children's Ministry",
        "Curriculum Development",
        "Safety & Security",
      ],
      yearsOfService: 6,
    },
  ];

  const growthGroupLeaders = [
    {
      name: "James Eze",
      role: "Growth Group Coordinator - Lagos Central",
      bio: "Coordinating over 20 Growth Groups in central Lagos, James ensures smooth operations and provides support to group leaders.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      email: "james.eze@dcgrowthgroups.com",
      phone: "+234 809 012 3456",
      location: "Lagos Central, Nigeria",
      specialties: [
        "Group Coordination",
        "Leadership Training",
        "Conflict Resolution",
      ],
      yearsOfService: 5,
    },
    {
      name: "Blessing Nwosu",
      role: "Growth Group Coordinator - Lagos West",
      bio: "Leading our western region Growth Groups with a focus on community engagement and outreach programs.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      email: "blessing.nwosu@dcgrowthgroups.com",
      phone: "+234 810 123 4567",
      location: "Lagos West, Nigeria",
      specialties: [
        "Community Engagement",
        "Outreach Programs",
        "Event Planning",
      ],
      yearsOfService: 7,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Leadership
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Meet the dedicated leaders who guide our church and Growth Groups
              ministry
            </p>
          </div>
        </div>
      </section>

      {/* Senior Leadership */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Senior Leadership
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our senior pastors who provide vision and direction for the entire
              ministry
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {seniorLeadership.map((leader, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl">{leader.name}</CardTitle>
                      <CardDescription className="text-lg font-medium text-brand-600">
                        {leader.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        {leader.bio}
                      </p>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="h-4 w-4" />
                        <span className="text-sm">
                          {leader.yearsOfService} years of service
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {leader.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="bg-brand-100 text-brand-800 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <a
                            href={`mailto:${leader.email}`}
                            className="hover:text-brand-600"
                          >
                            {leader.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <a
                            href={`tel:${leader.phone}`}
                            className="hover:text-brand-600"
                          >
                            {leader.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {leader.location}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* State Pastors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              State Pastors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our regional leaders who oversee ministry across different states
              in Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {statePastors.map((pastor, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={pastor.image}
                    alt={pastor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{pastor.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-brand-600">
                    {pastor.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{pastor.bio}</p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {pastor.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-brand-100 text-brand-800 px-2 py-1 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${pastor.email}`}
                        className="hover:text-brand-600"
                      >
                        {pastor.email}
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {pastor.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ministry Leaders */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ministry Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized leaders who oversee specific areas of ministry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryLeaders.map((leader, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{leader.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-brand-600">
                    {leader.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{leader.bio}</p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {leader.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-brand-100 text-brand-800 px-2 py-1 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${leader.email}`}
                        className="hover:text-brand-600"
                      >
                        {leader.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Group Leaders */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Growth Group Coordinators
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Regional coordinators who support and oversee our Growth Groups
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {growthGroupLeaders.map((coordinator, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl">
                        {coordinator.name}
                      </CardTitle>
                      <CardDescription className="text-base font-medium text-brand-600">
                        {coordinator.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        {coordinator.bio}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {coordinator.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <a
                            href={`mailto:${coordinator.email}`}
                            className="hover:text-brand-600"
                          >
                            {coordinator.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {coordinator.location}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Join Our Leadership Team</h3>
          <p className="text-xl text-white/90 mb-8">
            Feel called to leadership? We&apos;re always looking for passionate
            individuals to serve in various ministry roles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="mailto:leadership@dcgrowthgroups.com">
                Contact Leadership
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/volunteer">Volunteer Opportunities</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
