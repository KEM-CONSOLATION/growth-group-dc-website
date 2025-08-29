import { Header } from "@/src/components/Header";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Star, Calendar, User, BookOpen, Heart, Share2 } from "lucide-react";

export default function BookReviewsPage() {
  const currentBook = {
    id: 1,
    title: "The Purpose Driven Life",
    author: "Rick Warren",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop",
    description:
      "A 40-day spiritual journey to discover God's purpose for your life. This book guides readers through a personal spiritual journey to find the answer to life's most important question: 'What on earth am I here for?'",
    rating: 4.8,
    reviewCount: 156,
    currentReaders: 89,
    studyProgress: 65,
    startDate: "November 1, 2024",
    endDate: "December 10, 2024",
    chapters: [
      "What on Earth Am I Here For?",
      "You Are Not an Accident",
      "What Drives Your Life?",
      "Made to Last Forever",
      "Seeing Life from God's View",
    ],
    leader: "Pastor Sarah Johnson",
    meetingTime: "Every Tuesday at 7:00 PM",
    location: "Main Sanctuary",
  };

  const pastBooks = [
    {
      id: 2,
      title: "Mere Christianity",
      author: "C.S. Lewis",
      coverImage:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 203,
      completedDate: "October 2024",
      leader: "Pastor Michael Brown",
      summary:
        "A classic defense of the Christian faith that explains and defends the beliefs common to all Christians.",
    },
    {
      id: 3,
      title: "The Case for Christ",
      author: "Lee Strobel",
      coverImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 178,
      completedDate: "August 2024",
      leader: "Dr. Emily Davis",
      summary:
        "A journalist's personal investigation of the evidence for Jesus Christ, examining the historical, scientific, and philosophical evidence.",
    },
    {
      id: 4,
      title: "Boundaries in Marriage",
      author: "Henry Cloud & John Townsend",
      coverImage:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 134,
      completedDate: "June 2024",
      leader: "Pastor David Wilson",
      summary:
        "A practical guide to establishing healthy boundaries in marriage relationships.",
    },
  ];

  const memberReviews = [
    {
      id: 1,
      member: "Grace Okechukwu",
      rating: 5,
      comment:
        "This book has completely transformed my understanding of God's purpose for my life. The daily readings are perfect for reflection and prayer.",
      date: "November 15, 2024",
      helpful: 12,
    },
    {
      id: 2,
      member: "James Eze",
      rating: 4,
      comment:
        "Great insights and practical applications. The group discussions have made the concepts even more meaningful.",
      date: "November 12, 2024",
      helpful: 8,
    },
    {
      id: 3,
      member: "Blessing Nwosu",
      rating: 5,
      comment:
        "I love how each chapter builds on the previous one. It's helping me grow spiritually day by day.",
      date: "November 10, 2024",
      helpful: 15,
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
              Book Reviews
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover inspiring books and join our study groups to grow
              together in faith
            </p>
          </div>
        </div>
      </section>

      {/* Current Book Study */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Current Book Study
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us as we study this month&apos;s featured book together
            </p>
          </div>

          <Card className="max-w-6xl mx-auto overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={currentBook.coverImage}
                  alt={currentBook.title}
                  className="w-full h-96 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(currentBook.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {currentBook.rating}
                  </span>
                  <span className="text-gray-500">
                    ({currentBook.reviewCount} reviews)
                  </span>
                </div>

                <CardTitle className="text-3xl mb-2">
                  {currentBook.title}
                </CardTitle>
                <CardDescription className="text-xl text-gray-600 mb-4">
                  by {currentBook.author}
                </CardDescription>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {currentBook.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {currentBook.currentReaders}
                    </div>
                    <div className="text-sm text-gray-600">Current Readers</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {currentBook.studyProgress}%
                    </div>
                    <div className="text-sm text-gray-600">Study Progress</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Study Period: {currentBook.startDate} -{" "}
                      {currentBook.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span>Group Leader: {currentBook.leader}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      Meetings: {currentBook.meetingTime} at{" "}
                      {currentBook.location}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="lg">Join Study Group</Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Chapter Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chapter Overview
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What we&apos;ll be studying in the coming weeks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBook.chapters.map((chapter, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Chapter {index + 1}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Week {index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{chapter}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Join us for an in-depth discussion of this chapter&apos;s
                    key themes and practical applications.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Member Reviews */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Members Are Saying
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read reviews from our community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberReviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.member.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {review.member}
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    &quot;{review.comment}&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Book Studies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Past Book Studies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our library of completed book studies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastBooks.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {book.rating}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{book.title}</CardTitle>
                  <CardDescription className="text-base">
                    by {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {book.summary}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Leader: {book.leader}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Completed: {book.completedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span>{book.reviewCount} reviews</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
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
            Ready to Join a Book Study?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Connect with fellow believers and grow together through the study of
            God&apos;s Word and inspiring Christian literature.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Join Current Study
            </Button>
            <Button size="lg" variant="outline">
              Browse All Books
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
