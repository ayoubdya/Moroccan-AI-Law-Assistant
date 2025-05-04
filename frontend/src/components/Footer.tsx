// Simple footer for Morocco Legal Assistant
const Footer = () => (
  <footer className="w-full bg-gray-100 text-center py-6 text-sm mt-10 border-t">
    <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
      <span>© {new Date().getFullYear()} Morocco Legal Assistant</span>
      <a href="#privacy" className="hover:underline">Privacy</a>
      <a href="#terms" className="hover:underline">Terms</a>
      <a href="#contact" className="hover:underline">Contact</a>
    </div>
  </footer>
);

export default Footer;
