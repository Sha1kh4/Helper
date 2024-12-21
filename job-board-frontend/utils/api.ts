const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function getJobs() {
  const response = await fetch(`${API_URL}/jobs`);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export async function getJobById(id: string) {
  const response = await fetch(`${API_URL}/jobs/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch job");
  }
  return response.json();
}

export async function submitApplication(
  jobId: number,
  candidateName: string,
  contact: string
) {
  const response = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job_id: jobId,
      candidate_name: candidateName,
      contact,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to submit application");
  }
  return response.json();
}

export async function chatWithAI(query: string) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error("Failed to chat with AI");
  }
  return response.json();
}
