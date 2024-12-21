"use client";

import { useState } from "react";
import { submitApplication } from "../utils/api";

export default function ApplicationForm({ jobId }: { jobId: number }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitApplication(jobId, name, contact);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  if (submitted) {
    return (
      <div className="text-green-600 font-semibold">
        Application submitted successfully!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <h3 className="text-2xl font-bold mb-4">Apply for this job</h3>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contact" className="block mb-2">
          Contact Information
        </label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Application
      </button>
    </form>
  );
}
