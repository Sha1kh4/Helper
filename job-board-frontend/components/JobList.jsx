"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Use the base API URL from the environment variable and append the endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (apiUrl) {
      fetch(`${apiUrl}/api/jobs`) // Append /api/jobs to the base URL
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched jobs:", data); // Log the response for debugging

          // Check if the fetched data is an array, and update the state accordingly
          if (Array.isArray(data)) {
            setJobs(data);
          } else {
            console.error("API response is not an array:", data);
          }
        })
        .catch((error) => console.error("Error fetching jobs:", error));
    } else {
      console.error("API URL is not defined in environment variables.");
    }
  }, []);

  // Filter jobs based on search query (title, description, location)
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search jobs by title, description, or location..."
          className="w-full p-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Job Listings */}
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-md">
            <h2 className="text-gray-900 text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Location: {job.location}
            </p>
            <p className="text-sm text-gray-500">Salary: {job.salary}</p>
            <div className="mt-2 flex justify-end">
              <Link
                href={`/apply/${job.id}`}
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No jobs found matching your search.</p>
      )}
    </div>
  );
}
