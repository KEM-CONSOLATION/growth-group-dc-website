import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Heart, Share2, Cross } from "lucide-react";

export default function DevotionsPage() {
  const dailyDevotions = [
    {
      id: 1,
      date: "December 1, 2024",
      title: "Walking in Faith",
      scripture: "Hebrews 11:1",
      verse:
        "Now faith is confidence in what we hope for and assurance about what we do not see.",
      reflection:
        "Faith is not just a feeling or a wish. It's a confident trust in God's promises, even when we can't see how things will work out. Today, let's choose to walk by faith, not by sight.",
      prayer:
        "Lord, help me to trust You completely, even when I don't understand Your ways. Strengthen my faith and help me to walk confidently in Your promises.",
      author: "Pastor John Smith",
      readingTime: "3 min read",
      category: "Faith",
    },
    {
      id: 2,
      date: "November 30, 2024",
      title: "The Power of Gratitude",
      scripture: "1 Thessalonians 5:18",
      verse:
        "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
      reflection:
        "Gratitude transforms our perspective. When we choose to be thankful, even in difficult times, we open our hearts to see God's goodness and provision in every situation.",
      prayer:
        "Father, teach me to be grateful in all circumstances. Help me to see Your blessings even in the midst of challenges and to always give You thanks.",
      author: "Sarah Johnson",
      readingTime: "4 min read",
      category: "Gratitude",
    },
    {
      id: 3,
      date: "November 29, 2024",
      title: "Trusting God's Timing",
      scripture: "Ecclesiastes 3:1",
      verse:
        "There is a time for everything, and a season for every activity under the heavens.",
      reflection:
        "God's timing is perfect, even when it doesn't match our expectations. He knows the right moment for every blessing, every breakthrough, and every answer to prayer.",
      prayer:
        "Lord, help me to trust Your perfect timing. Give me patience to wait for Your plans to unfold and faith to believe that You are working all things for my good.",
      author: "Michael Brown",
      readingTime: "3 min read",
      category: "Trust",
    },
  ];

  const devotionCategories = [
    { name: "Faith", icon: <Heart className="h-5 w-5" />, count: 45 },
    { name: "Prayer", icon: <Cross className="h-5 w-5" />, count: 32 },
    { name: "Gratitude", icon: <Heart className="h-5 w-5" />, count: 28 },
    { name: "Trust", icon: <Heart className="h-5 w-5" />, count: 35 },
    { name: "Love", icon: <Heart className="h-5 w-5" />, count: 41 },
    { name: "Hope", icon: <Heart className="h-5 w-5" />, count: 29 },
  ];

  const featuredDevotions = [
    {
      id: 4,
      title: "Finding Peace in Chaos",
      scripture: "Philippians 4:7",
      excerpt:
        "Discover how to experience God's peace that transcends all understanding, even in the midst of life's storms.",
      author: "Dr. Emily Davis",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "The Joy of Serving Others",
      scripture: "Mark 10:45",
      excerpt:
        "Learn how serving others can bring unexpected joy and fulfillment to your own life.",
      author: "Pastor David Wilson",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
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
              Daily Devotions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Start each day with God&apos;s Word and find inspiration for your
              spiritual journey
            </p>
          </div>
        </div>
      </section>

      {/* Today's Devotion */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Today&apos;s Devotion
            </h2>
            <p className="text-lg text-gray-600">{dailyDevotions[0].date}</p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {dailyDevotions[0].category}
                </span>
                <span className="text-gray-500 text-sm">
                  {dailyDevotions[0].readingTime}
                </span>
              </div>
              <CardTitle className="text-3xl">
                {dailyDevotions[0].title}
              </CardTitle>
              <CardDescription className="text-lg">
                By {dailyDevotions[0].author}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Scripture</h3>
                <p className="text-lg text-gray-700 mb-2">
                  {dailyDevotions[0].scripture}
                </p>
                <p className="text-xl italic text-gray-800">
                  &quot;{dailyDevotions[0].verse}&quot;
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Reflection</h3>
                <p className="text-gray-700 leading-relaxed">
                  {dailyDevotions[0].reflection}
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Prayer</h3>
                <p className="text-gray-700 italic leading-relaxed">
                  {dailyDevotions[0].prayer}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                <Button>Read Full Devotion</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Devotion Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find devotionals that speak to your current season of life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {devotionCategories.map((category) => (
              <Card
                key={category.name}
                className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} devotionals
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Devotions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Devotions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Continue your spiritual journey with these recent devotionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dailyDevotions.slice(1).map((devotion) => (
              <Card
                key={devotion.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {devotion.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {devotion.readingTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{devotion.title}</CardTitle>
                  <CardDescription className="text-base">
                    {devotion.scripture}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {devotion.reflection.substring(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {devotion.author}
                    </span>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Devotions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Devotions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Special devotionals that have touched many hearts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredDevotions.map((devotion) => (
              <Card
                key={devotion.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={devotion.image}
                    alt={devotion.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{devotion.title}</CardTitle>
                  <CardDescription className="text-base">
                    {devotion.scripture}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{devotion.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {devotion.author}
                    </span>
                    <Button>Read Devotion</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">
            Get Daily Devotions in Your Inbox
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Never miss a daily devotion. Subscribe to receive inspiring messages
            every morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Button size="lg" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
