import JobList from "@/components/JobList"

export default function Jobs() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl text-black font-semibold mb-6">
            Job Listings
          </h1>
          <JobList />
        </div>
      </div>
    </div>
  )
}
