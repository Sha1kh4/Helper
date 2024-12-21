import { getJobById } from "../../../utils/api";
import ApplicationForm from "../../../components/ApplicationForm";

export default async function JobDetails({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobById(params.id);

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{job.title}</h2>
      <div className="mb-6">
        <p className="text-gray-600 mb-2">{job.location}</p>
        <p className="text-green-600 font-semibold mb-2">${job.salary}</p>
        <p className="text-gray-700">{job.description}</p>
      </div>
      <ApplicationForm jobId={job.id} />
    </div>
  );
}
