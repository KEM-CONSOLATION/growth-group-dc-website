"use client";

import { Header } from "@/src/components/Header";
import { useMemo, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { MapPin, Clock, Users, Phone, Mail, Search } from "lucide-react";

export default function GroupsPage() {
  const states = [
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Kano",
    "Kaduna",
    "Enugu",
    "Ibadan",
    "Calabar",
  ];

  const stateToBranches: Record<string, string[]> = {
    Lagos: ["Victoria Island", "Ikeja", "Lekki"],
    Abuja: ["Central", "Garki", "Wuse"],
    "Port Harcourt": ["Old GRA", "Trans Amadi", "Rumuola"],
    Kano: ["Sabon Gari", "Nassarawa", "Tarauni"],
    Kaduna: ["Barnawa", "Kakuri"],
    Enugu: ["New Haven", "Independence Layout"],
    Ibadan: ["Bodija", "Ring Road"],
    Calabar: ["Marian", "Ikot Ishie", "University"],
  };

  const groups = [
    {
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
        "A vibrant group focused on deep Bible study and intercessory prayer. We meet weekly to grow together in faith and support one another.",
      contact: {
        phone: "+234 802 345 6789",
        email: "lagoscentral@growthgroups.com",
      },
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["Bible Study", "Prayer", "Fellowship"],
      isOpen: true,
    },
    {
      id: 2,
      name: "Abuja Government Workers Group",
      leader: "Pastor Michael Brown",
      meetingTime: "Every Wednesday at 6:30 PM",
      location: "Fellowship Hall, Central District",
      state: "Abuja",
      city: "Central District",
      branch: "Central",
      members: 18,
      maxMembers: 25,
      focus: "Professional Development & Faith",
      description:
        "Supporting government workers in their faith journey while addressing unique challenges in public service.",
      contact: {
        phone: "+234 803 456 7890",
        email: "abujagov@growthgroups.com",
      },
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      tags: ["Professional", "Government", "Faith"],
      isOpen: true,
    },
    {
      id: 3,
      name: "Port Harcourt Reconciliation Group",
      leader: "Pastor Emily Davis",
      meetingTime: "Every Saturday at 10:00 AM",
      location: "Community Center, Old GRA",
      state: "Port Harcourt",
      city: "Old GRA",
      branch: "Old GRA",
      members: 32,
      maxMembers: 35,
      focus: "Community Healing & Unity",
      description:
        "Working towards reconciliation and unity in our diverse community through faith-based initiatives and dialogue.",
      contact: {
        phone: "+234 804 567 8901",
        email: "phreconciliation@growthgroups.com",
      },
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      tags: ["Reconciliation", "Community", "Unity"],
      isOpen: true,
    },
    {
      id: 4,
      name: "Kano Cultural Bridge Group",
      leader: "Pastor David Wilson",
      meetingTime: "Every Friday at 5:00 PM",
      location: "Youth Hall, Sabon Gari",
      state: "Kano",
      city: "Sabon Gari",
      branch: "Sabon Gari",
      members: 22,
      maxMembers: 30,
      focus: "Cultural Understanding & Faith",
      description:
        "Building bridges between different cultures and faiths while sharing the love of Christ.",
      contact: {
        phone: "+234 805 678 9012",
        email: "kanocultural@growthgroups.com",
      },
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      tags: ["Cultural", "Bridge Building", "Education"],
      isOpen: true,
    },
    {
      id: 5,
      name: "Lagos West Family Group",
      leader: "Grace Okechukwu",
      meetingTime: "Every Sunday at 4:00 PM",
      location: "Fellowship Hall, Ikeja",
      state: "Lagos",
      city: "Ikeja",
      branch: "Ikeja",
      members: 28,
      maxMembers: 35,
      focus: "Family & Marriage",
      description:
        "Supporting families in their spiritual journey with practical guidance on marriage, parenting, and family relationships.",
      contact: {
        phone: "+234 806 789 0123",
        email: "lagoswestfamily@growthgroups.com",
      },
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["Family", "Marriage", "Parenting"],
      isOpen: true,
    },
    {
      id: 6,
      name: "Enugu Youth Empowerment Group",
      leader: "Daniel Adebayo",
      meetingTime: "Every Thursday at 7:00 PM",
      location: "Youth Center, New Haven",
      state: "Enugu",
      city: "New Haven",
      branch: "New Haven",
      members: 35,
      maxMembers: 40,
      focus: "Youth Development & Leadership",
      description:
        "Empowering young people to discover their purpose and develop leadership skills through faith-based mentoring.",
      contact: {
        phone: "+234 807 890 1234",
        email: "enuguyouth@growthgroups.com",
      },
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      tags: ["Youth", "Leadership", "Empowerment"],
      isOpen: true,
    },
  ];

  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedBranch, setSelectedBranch] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  const branchesForState = useMemo(() => {
    if (selectedState === "All") return [] as string[];
    return stateToBranches[selectedState] ?? [];
  }, [selectedState]);

  const filteredGroups = useMemo(() => {
    return groups.filter((g) => {
      const matchState = selectedState === "All" || g.state === selectedState;
      const matchBranch =
        selectedBranch === "All" || selectedState === "All"
          ? true
          : g.branch === selectedBranch;
      const q = query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        g.name.toLowerCase().includes(q) ||
        g.focus.toLowerCase().includes(q) ||
        g.city.toLowerCase().includes(q) ||
        g.branch.toLowerCase().includes(q);
      return matchState && matchBranch && matchQuery;
    });
  }, [groups, selectedState, selectedBranch, query]);

  const focusAreas = [
    "Bible Study",
    "Prayer",
    "Fellowship",
    "Family",
    "Youth",
    "Professional",
    "Community",
    "Reconciliation",
    "Cultural",
    "Leadership",
    "Marriage",
    "Parenting",
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
              Growth Groups Directory
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Find and join a Growth Group in your area to connect, grow, and
              serve together
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-end">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search groups by name, location, or focus area..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* State Select */}
            <div className="w-full lg:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedBranch("All");
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="All">All</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch Select */}
            <div className="w-full lg:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                disabled={selectedState === "All"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="All">All</option>
                {branchesForState.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Groups Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Growth Groups
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {filteredGroups.length} groups shown{" "}
              {selectedState !== "All" && `in ${selectedState}`}{" "}
              {selectedBranch !== "All" && `• ${selectedBranch}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        group.isOpen
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {group.isOpen ? "Open" : "Full"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {group.state} · {group.branch}
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{group.name}</CardTitle>
                  <CardDescription className="text-base">
                    Led by {group.leader}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{group.meetingTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{group.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {group.members}/{group.maxMembers} members
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <a
                        href={`tel:${group.contact.phone}`}
                        className="hover:text-blue-600"
                      >
                        {group.contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${group.contact.email}`}
                        className="hover:text-blue-600"
                      >
                        {group.contact.email}
                      </a>
                    </div>
                  </div>

                  <Button className="w-full" disabled={!group.isOpen}>
                    {group.isOpen ? "Join Group" : "Group Full"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map View */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Groups Near You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Interactive map showing all our Growth Groups across Nigeria
            </p>
          </div>

          <Card className="p-8">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interactive Map Coming Soon
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;re working on an interactive map to help you find groups
                in your area
              </p>
              <Button variant="outline">Enable Location Services</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Join a Growth Group
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to get connected with a group in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">1. Find a Group</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Browse our directory to find a group that matches your
                  interests, location, and schedule.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">2. Contact the Leader</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Reach out to the group leader via phone or email to express
                  your interest and ask questions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">3. Join & Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Attend your first meeting and begin building meaningful
                  relationships with fellow believers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">
            Can&apos;t Find the Right Group?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            We can help you start a new Growth Group or find the perfect fit for
            your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start a New Group
            </Button>
            <Button size="lg" variant="outline">
              Get Personalized Help
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
