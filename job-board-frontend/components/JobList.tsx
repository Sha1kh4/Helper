"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded-md">
          <h2 className=" text-gray-900 text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-sm text-gray-500 mt-2">Location: {job.location}</p>
          <p className="text-sm text-gray-500">Salary: {job.salary}</p>
          <Link
            href={`/apply/${job.id}`}
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Apply
          </Link>
        </div>
      ))}
    </div>
  );
}
