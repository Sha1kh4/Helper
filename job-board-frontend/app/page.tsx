import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Welcome to Helper4U Jobs
                </h2>
                <p>
                  Find your dream job or chat with our AI assistant for
                  personalized recommendations.
                </p>
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <Link
                    href="/jobs"
                    className="text-cyan-600 hover:text-cyan-700"
                  >
                    View Job Listings &rarr;
                  </Link>
                </div>
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <Link
                    href="/chat"
                    className="text-cyan-600 hover:text-cyan-700"
                  >
                    Chat with AI Assistant &rarr;
                  </Link>
                </div>
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <Link
                    href="/login"
                    className="text-cyan-600 hover:text-cyan-700"
                  >
                    Admin Login &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
