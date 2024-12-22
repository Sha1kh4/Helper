import ChatInterface from "@/components/ChatInterface";

export default function Chat() {
  return (
    <div className="min-h-screen bg-gray-100  flex-col justify-center sm:py-12">
      <div className=" sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl text-gray-900 font-semibold mb-6">
            Chat with AI Assistant
          </h1>
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
