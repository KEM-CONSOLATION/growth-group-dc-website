import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Users, Star, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { sanityClient, departmentsQuery } from "@/lib/sanity-fixed";

interface Department {
  _id: string;
  name: string;
  state: string;
  branch?: string;
  description: string;
  leader: string;
  leaderDetails?: {
    name?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    bio?: string;
    image?: string;
  };
  activities: string[];
  membersCount: number;
  maxMembers?: number;
  image?: string;
  meetingTime?: string;
  meetingDay?: string;
  isOpen: boolean;
  tags?: string[];
}

interface DepartmentsPageProps {
  searchParams: { state?: string };
}

export default async function DepartmentsPage({
  searchParams,
}: DepartmentsPageProps) {
  // Fetch departments and states from Sanity
  const departments: Department[] =
    (await sanityClient.fetch(departmentsQuery)) || [];

  // Extract unique states from departments data
  const states = [...new Set(departments.map((dept) => dept.state))].sort();

  // Filter departments by state if specified
  const selectedState = searchParams.state;
  const filteredDepartments = selectedState
    ? departments.filter((dept) => dept.state === selectedState)
    : departments;

  // Group departments by state for better organization
  const departmentsByState = departments.reduce(
    (acc, dept) => {
      if (!acc[dept.state]) {
        acc[dept.state] = [];
      }
      acc[dept.state].push(dept);
      return acc;
    },
    {} as Record<string, Department[]>
  );

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
              departments across different states and branches
            </p>
          </div>
        </div>
      </section>

      {/* State Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Filter by State
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={!selectedState ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              asChild
            >
              <a href="/departments">All States</a>
            </Button>
            {states.map((state: string) => (
              <Button
                key={state}
                variant={selectedState === state ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                asChild
              >
                <a href={`/departments?state=${encodeURIComponent(state)}`}>
                  {state}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Departments by State */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedState ? (
            // Show departments for selected state
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Departments in {selectedState}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover ministry opportunities in your state
                </p>
              </div>

              {filteredDepartments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No departments found in {selectedState}.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDepartments.map((dept) => (
                    <DepartmentCard key={dept._id} department={dept} />
                  ))}
                </div>
              )}
            </>
          ) : (
            // Show departments organized by state
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Ministry Departments
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Each department plays a vital role in building up the body of
                  Christ across different locations
                </p>
              </div>

              {Object.entries(departmentsByState).map(
                ([state, stateDepartments]) => (
                  <div key={state} className="mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      {state}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {stateDepartments.map((dept) => (
                        <DepartmentCard key={dept._id} department={dept} />
                      ))}
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Ready to Serve?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join one of our ministry departments and discover the joy of serving
            God and others in your community.
          </p>
          <Button size="lg" variant="secondary">
            Browse Departments
          </Button>
        </div>
      </section>
    </div>
  );
}

// Department Card Component
function DepartmentCard({ department }: { department: Department }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48">
        {department.image ? (
          <img
            src={department.image}
            alt={department.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Users className="h-16 w-16 text-blue-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {department.name}
          </span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{department.name}</CardTitle>
        <CardDescription className="text-base">
          Led by {department.leader}
        </CardDescription>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {department.state}
          {department.branch && ` - ${department.branch}`}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          {department.description}
        </p>

        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>
              {department.membersCount}
              {department.maxMembers && `/${department.maxMembers}`} members
            </span>
          </div>
          {department.meetingTime && (
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>
                {department.meetingDay && `${department.meetingDay}s at `}
                {department.meetingTime}
              </span>
            </div>
          )}
        </div>

        {department.activities && department.activities.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Activities:</h4>
            <div className="flex flex-wrap gap-2">
              {department.activities.map((activity) => (
                <span
                  key={activity}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        )}

        {department.leaderDetails && (
          <div className="pt-3 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">Contact Leader:</h4>
            <div className="flex gap-2">
              {department.leaderDetails.phone && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`tel:${department.leaderDetails.phone}`}>
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </a>
                </Button>
              )}
              {department.leaderDetails.email && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`mailto:${department.leaderDetails.email}`}>
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </a>
                </Button>
              )}
              {department.leaderDetails.whatsapp && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={`https://wa.me/${department.leaderDetails.whatsapp}`}
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

        <Button className="w-full" disabled={!department.isOpen}>
          {department.isOpen ? "Join Department" : "Department Full"}
        </Button>
      </CardContent>
    </Card>
  );
}
