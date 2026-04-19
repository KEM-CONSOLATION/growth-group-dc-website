"use client";

import { useState } from "react";
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
  FileText,
  Users,
  Calendar,
  Activity,
  BookOpen,
  Heart,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Camera,
  X,
  Upload,
} from "lucide-react";

export default function WeeklyReportsPage() {
  const [formData, setFormData] = useState({
    groupName: "",
    groupLeader: "",
    leaderEmail: "",
    state: "",
    city: "",
    weekOf: "",
    attendance: {
      totalMembers: 0,
      presentThisWeek: 0,
      newVisitors: 0,
    },
    activities: [""],
    topicsDiscussed: "",
    prayerRequests: "",
    testimonies: "",
    challenges: "",
    nextWeekPlans: "",
    additionalNotes: "",
    groupPhotos: [] as File[],
    activityPhotos: [] as File[],
  });

  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
    "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna",
    "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
    "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
    "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith("attendance.")) {
      const attendanceField = field.split(".")[1];
      setFormData(prev => ({
        ...prev,
        attendance: {
          ...prev.attendance,
          [attendanceField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleActivityChange = (index: number, value: string) => {
    const newActivities = [...formData.activities];
    newActivities[index] = value;
    setFormData(prev => ({
      ...prev,
      activities: newActivities,
    }));
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, ""],
    }));
  };

  const removeActivity = (index: number) => {
    if (formData.activities.length > 1) {
      const newActivities = formData.activities.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        activities: newActivities,
      }));
    }
  };

  const handleImageUpload = (type: 'groupPhotos' | 'activityPhotos', files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...newFiles],
    }));
  };

  const removeImage = (type: 'groupPhotos' | 'activityPhotos', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Convert images to base64 for submission
      const groupPhotosBase64 = await Promise.all(
        formData.groupPhotos.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await convertFileToBase64(file),
        }))
      );

      const activityPhotosBase64 = await Promise.all(
        formData.activityPhotos.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await convertFileToBase64(file),
        }))
      );

      const submissionData = {
        ...formData,
        groupPhotos: groupPhotosBase64,
        activityPhotos: activityPhotosBase64,
      };

      const response = await fetch("/api/weekly-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setStatus("success");
        // Reset form
        setFormData({
          groupName: "",
          groupLeader: "",
          leaderEmail: "",
          state: "",
          city: "",
          weekOf: "",
          attendance: {
            totalMembers: 0,
            presentThisWeek: 0,
            newVisitors: 0,
          },
          activities: [""],
          topicsDiscussed: "",
          prayerRequests: "",
          testimonies: "",
          challenges: "",
          nextWeekPlans: "",
          additionalNotes: "",
          groupPhotos: [],
          activityPhotos: [],
        });
      } else {
        const error = await response.json();
        setStatus(`error: ${error.error}`);
      }
    } catch {
      setStatus("error: Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-brand-100 rounded-full">
              <FileText className="h-8 w-8 text-brand-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Weekly Group Reports
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Submit your weekly Growth Group report to help us track progress, 
            share testimonies, and coordinate activities across all groups.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Group Report Form
            </CardTitle>
            <CardDescription>
              Please fill out all required fields to submit your weekly report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Group Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Group Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group Name *
                    </label>
                    <input
                      type="text"
                      value={formData.groupName}
                      onChange={(e) => handleInputChange("groupName", e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      placeholder="Enter your group name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group Leader *
                    </label>
                    <input
                      type="text"
                      value={formData.groupLeader}
                      onChange={(e) => handleInputChange("groupLeader", e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      placeholder="Leader's full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leader Email *
                  </label>
                  <input
                    type="email"
                    value={formData.leaderEmail}
                    onChange={(e) => handleInputChange("leaderEmail", e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    placeholder="leader@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {nigerianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Week Of *
                    </label>
                    <input
                      type="date"
                      value={formData.weekOf}
                      onChange={(e) => handleInputChange("weekOf", e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Attendance */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Attendance
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Members *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.attendance.totalMembers}
                      onChange={(e) => handleInputChange("attendance.totalMembers", parseInt(e.target.value) || 0)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Present This Week *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.attendance.presentThisWeek}
                      onChange={(e) => handleInputChange("attendance.presentThisWeek", parseInt(e.target.value) || 0)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Visitors
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.attendance.newVisitors}
                      onChange={(e) => handleInputChange("attendance.newVisitors", parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activities Conducted *
                </h3>
                
                {formData.activities.map((activity, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => handleActivityChange(index, e.target.value)}
                      required
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      placeholder="Describe an activity conducted this week"
                    />
                    {formData.activities.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeActivity(index)}
                        className="px-3"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addActivity}
                  className="w-full"
                >
                  Add Another Activity
                </Button>
              </div>

              {/* Group Photos */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Group Photos
                </h3>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload('groupPhotos', e.target.files)}
                      className="hidden"
                      id="group-photos-upload"
                    />
                    <label
                      htmlFor="group-photos-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload group photos
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, JPEG up to 10MB each
                      </span>
                    </label>
                  </div>
                  
                  {formData.groupPhotos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.groupPhotos.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Group photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage('groupPhotos', index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Activity Photos */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Activity Photos
                </h3>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload('activityPhotos', e.target.files)}
                      className="hidden"
                      id="activity-photos-upload"
                    />
                    <label
                      htmlFor="activity-photos-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload activity photos
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, JPEG up to 10MB each
                      </span>
                    </label>
                  </div>
                  
                  {formData.activityPhotos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.activityPhotos.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Activity photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage('activityPhotos', index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>


              {/* Topics Discussed */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Topics Discussed *
                </h3>
                
                <textarea
                  value={formData.topicsDiscussed}
                  onChange={(e) => handleInputChange("topicsDiscussed", e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="What topics, scriptures, or themes were discussed this week?"
                />
              </div>

              {/* Prayer Requests */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Prayer Requests
                </h3>
                
                <textarea
                  value={formData.prayerRequests}
                  onChange={(e) => handleInputChange("prayerRequests", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="Any prayer requests from group members?"
                />
              </div>

              {/* Testimonies */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Testimonies & Highlights
                </h3>
                
                <textarea
                  value={formData.testimonies}
                  onChange={(e) => handleInputChange("testimonies", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="Share any testimonies or highlights from this week"
                />
              </div>

              {/* Challenges */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Challenges Faced
                </h3>
                
                <textarea
                  value={formData.challenges}
                  onChange={(e) => handleInputChange("challenges", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="Any challenges or difficulties the group faced this week?"
                />
              </div>

              {/* Next Week Plans */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Next Week Plans
                </h3>
                
                <textarea
                  value={formData.nextWeekPlans}
                  onChange={(e) => handleInputChange("nextWeekPlans", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="What are your plans for next week?"
                />
              </div>

              {/* Additional Notes */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Additional Notes
                </h3>
                
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="Any other information you'd like to share?"
                />
              </div>

              {/* Status Message */}
              {status && (
                <div className={`p-4 rounded-lg ${
                  status === "success" 
                    ? "bg-green-50 border border-green-200 text-green-800" 
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}>
                  <div className="flex items-center gap-2">
                    {status === "success" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span>
                      {status === "success" 
                        ? "Report submitted successfully! Thank you for your submission." 
                        : status.replace("error: ", "")
                      }
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 text-lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit Weekly Report"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8 bg-brand-50 border-brand-200">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-brand-900 mb-4">
              Submission Guidelines
            </h3>
            <ul className="space-y-2 text-brand-800">
              <li>• Reports should be submitted weekly, preferably by Sunday evening</li>
              <li>• All fields marked with * are required</li>
              <li>• Be as detailed as possible in your descriptions</li>
              <li>• Include specific numbers for attendance and activities</li>
              <li>• Contact your state pastor if you need assistance</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
