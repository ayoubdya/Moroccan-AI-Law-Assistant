// Placeholder for Sidebar navigation
const Sidebar = () => (
  <aside className="w-64 bg-white border-r h-full p-4 hidden md:block">
    <nav className="flex flex-col space-y-4">
      <a href="/dashboard" className="hover:text-blue-700">Dashboard</a>
      <a href="/chatbot" className="hover:text-blue-700">Chatbot</a>
      <a href="/history" className="hover:text-blue-700">My History</a>
      <a href="/downloads" className="hover:text-blue-700">Downloads</a>
    </nav>
  </aside>
);

export default Sidebar;
