// Placeholder Chatbot page
const Chatbot = () => (
  <div className="flex h-screen">
    {/* Sidebar */}
    {/* Main chat area */}
    <div className="flex-1 flex flex-col justify-end p-8">
      <div className="flex-1 overflow-y-auto">{/* Chat bubbles here */}</div>
      <div className="flex items-center space-x-2 mt-4">
        <input className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Ask a question..." />
        <button className="bg-blue-700 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
    {/* Optional right panel */}
  </div>
);
export default Chatbot;
