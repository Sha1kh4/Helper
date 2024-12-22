import ApplicationForm from "@/components/ApplicationForm";

type Params = Promise<{ id: string }>;

export default async function Apply({ params }: { params: Params }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="  relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-6">Apply for Job</h1>
          <ApplicationForm jobId={id} />
        </div>
      </div>
    </div>
  );
}
