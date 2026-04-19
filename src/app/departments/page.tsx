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
import { fetchDepartments, type DepartmentRow } from "@/src/lib/content";

interface DepartmentsPageProps {
  searchParams: Promise<{ state?: string }>;
}

export default async function DepartmentsPage({
  searchParams,
}: DepartmentsPageProps) {
  const sp = await searchParams;
  const departments: DepartmentRow[] = await fetchDepartments();

  // Extract unique states from departments data, filtering out null/undefined values
  const states = [...new Set(departments.map((dept) => dept.state))]
    .filter((state) => state && state.trim() !== "")
    .sort();

  // Filter departments by state if specified
  const selectedState = sp.state;
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
    {} as Record<string, DepartmentRow[]>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Church Departments
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
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
            {states.length > 0 ? (
              states.map((state: string) => (
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
              ))
            ) : (
              <div className="text-gray-500 text-sm">
                No states available. Please add departments with state
                information.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Departments by State */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {departments.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Departments Found
              </h2>
              <p className="text-gray-600 mb-4">
                There are currently no departments in the system.
              </p>
              <p className="text-sm text-gray-500">
                Add departments from the admin dashboard.
              </p>
            </div>
          ) : selectedState ? (
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
                    <DepartmentCard key={dept.id} department={dept} />
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
                        <DepartmentCard key={dept.id} department={dept} />
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
      <section className="py-16 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Ready to Serve?</h3>
          <p className="text-xl text-white/90 mb-8">
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
function DepartmentCard({ department }: { department: DepartmentRow }) {
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
          <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-100 flex items-center justify-center">
            <Users className="h-16 w-16 text-brand-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm font-medium">
            {department.name}
          </span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{department.name}</CardTitle>
        <CardDescription className="text-base">
          Led by {department.leader || "TBA"}
        </CardDescription>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {department.state}
          {department.branch && ` - ${department.branch}`}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          {department.description || ""}
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
