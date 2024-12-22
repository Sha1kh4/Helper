"use client";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, DollarSign, Briefcase } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    contact_email: "",
  });

  const fetchJobs = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      }
    };

    checkAuth();
    fetchJobs();
  }, [router, fetchJobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      const data = await response.json();
      if (data.success) {
        alert("Job listing added successfully!");
        setNewJob({
          title: "",
          description: "",
          location: "",
          salary: "",
          contact_email: "",
        });
        fetchJobs(); // Now using the memoized function
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Error adding job.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add a New Job Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="title"
                      value={newJob.title}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      placeholder="Senior Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleChange}
                    required
                    placeholder="Enter job description..."
                    className="h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="location"
                      value={newJob.location}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="salary"
                      value={newJob.salary}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      placeholder="$100,000 - $150,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="email"
                      name="contact_email"
                      value={newJob.contact_email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      placeholder="hiring@company.com"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Add Job
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">All Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {jobs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No job listings available.
                </p>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-gray-600">{job.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-5 w-5" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <DollarSign className="h-5 w-5" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="h-5 w-5" />
                        <span>{job.contact_email}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
