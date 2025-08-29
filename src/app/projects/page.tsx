import { Button } from "@/src/components/ui/button";

import { Target, Users, MapPin } from "lucide-react";
import { Header } from "../../components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Community Health Clinic",
      description:
        "Building a medical clinic to provide free healthcare services to underserved communities.",
      category: "Healthcare",
      location: "Kano State",
      targetAmount: 50000000,
      raisedAmount: 35000000,
      progress: 70,
      donors: 1250,
      status: "active",
    },
    {
      id: 2,
      name: "Youth Skills Training Center",
      description:
        "Establishing a vocational training center to equip young people with practical skills.",
      category: "Education",
      location: "Lagos State",
      targetAmount: 25000000,
      raisedAmount: 18000000,
      progress: 72,
      donors: 890,
      status: "active",
    },
    {
      id: 3,
      name: "Clean Water Initiative",
      description:
        "Providing clean drinking water to 10 villages through borehole construction.",
      category: "Infrastructure",
      location: "Enugu State",
      targetAmount: 15000000,
      raisedAmount: 12000000,
      progress: 80,
      donors: 650,
      status: "active",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
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
              Projects & Donations
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Join us in making a difference through impactful community
              projects
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Current Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Support these initiatives and be part of positive change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Target className="h-16 w-16 mx-auto mb-2" />
                      <span className="text-lg font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{project.donors.toLocaleString()} donors</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Funding Info */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(project.raisedAmount)}
                      </div>
                      <div className="text-sm text-gray-600">Raised</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(project.targetAmount)}
                      </div>
                      <div className="text-sm text-gray-600">Target</div>
                    </div>
                  </div>

                  <Button className="w-full">Donate Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Every donation helps us create positive change in our communities.
          </p>
          <Button size="lg" variant="secondary">
            View All Projects
          </Button>
        </div>
      </section>
    </div>
  );
}
