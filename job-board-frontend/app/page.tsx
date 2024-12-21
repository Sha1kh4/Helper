import Link from "next/link";
import { getJobs } from "../utils/api";

export default async function Home() {
  const jobs = await getJobs();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Available Jobs</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id} className="block">
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.location}</p>
              <p className="text-green-600 font-semibold">${job.salary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
