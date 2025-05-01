import { motion } from "framer-motion";

const Home = () => (
  <div>
    <motion.section 
      className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 text-center"
      initial={{ opacity: 0, y: 40 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.7 }}
    >
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Navigate Moroccan Law with Ease
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl text-blue-700 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        Your personal AI legal assistant, news source, and toolkit.
      </motion.p>
      <motion.div 
        className="flex justify-center space-x-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <a 
          href="/chatbot" 
          className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition-transform transform hover:scale-105 shadow-lg"
        >
          Try Now
        </a>
        <a 
          href="#demo" 
          className="border border-blue-700 text-blue-700 px-6 py-3 rounded hover:bg-blue-700 hover:text-white transition-transform transform hover:scale-105"
        >
          Book a Demo
        </a>
      </motion.div>
    </motion.section>
    <motion.section 
      className="max-w-4xl mx-auto py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Why Morocco Legal Assistant?</h2>
      <p className="mb-6 text-gray-700">A professional, AI-powered platform for lawyers, students, and legal professionals. Get answers, stay updated, and access legal tools in one place.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="bg-white rounded shadow p-6 flex flex-col items-center" whileHover={{scale:1.05}}>
          <span className="text-blue-700 text-3xl mb-2">💬</span>
          <h3 className="font-semibold text-lg mb-2">AI Legal Chatbot</h3>
          <p className="text-gray-600 text-center">Ask legal questions and get clear, source-grounded answers instantly.</p>
        </motion.div>
        <motion.div className="bg-white rounded shadow p-6 flex flex-col items-center" whileHover={{scale:1.05}}>
          <span className="text-blue-700 text-3xl mb-2">📰</span>
          <h3 className="font-semibold text-lg mb-2">Legal News Feed</h3>
          <p className="text-gray-600 text-center">Stay updated with the latest Moroccan legal changes and bulletins.</p>
        </motion.div>
        <motion.div className="bg-white rounded shadow p-6 flex flex-col items-center" whileHover={{scale:1.05}}>
          <span className="text-blue-700 text-3xl mb-2">📄</span>
          <h3 className="font-semibold text-lg mb-2">Document Center</h3>
          <p className="text-gray-600 text-center">Download templates for contracts, complaints, and more.</p>
        </motion.div>
      </div>
    </motion.section>

    {/* Mock Chat Preview Section */}
    <motion.section 
      className="max-w-3xl mx-auto py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent">See the Chatbot in Action</h2>
      <div className="relative bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-2xl px-0 sm:px-8 py-8 max-w-xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 rounded-t-2xl" />
        <div className="flex flex-col space-y-6 pt-6">
          <motion.div 
            className="flex justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 text-white px-6 py-3 rounded-2xl max-w-xs shadow-md text-right animate-pulse">
              What is the minimum age for marriage in Morocco?
            </div>
          </motion.div>
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white border border-blue-100 text-blue-900 px-6 py-3 rounded-2xl max-w-xs shadow text-left">
              According to <span className="font-semibold text-blue-700">Article 19</span> of the Moroccan Family Code, the minimum age for marriage is <span className="font-semibold text-blue-700">18 years</span> for both men and women.
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 rounded-b-2xl" />
      </div>
    </motion.section>

    {/* Latest Legal News Section */}
    <motion.section 
      className="max-w-4xl mx-auto py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Latest Legal News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold text-lg mb-2">Moroccan Parliament Approves New Family Code</h3>
          <p className="text-gray-600 mb-2">Major reforms to the Family Code were passed to strengthen children’s rights.</p>
          <span className="text-xs text-gray-500">April 2025</span>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold text-lg mb-2">Digitalization of Court Services</h3>
          <p className="text-gray-600 mb-2">The Ministry of Justice launches a new online portal for case management.</p>
          <span className="text-xs text-gray-500">March 2025</span>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold text-lg mb-2">New Anti-Corruption Law Enacted</h3>
          <p className="text-gray-600 mb-2">A comprehensive law to combat corruption in public administration is now in effect.</p>
          <span className="text-xs text-gray-500">February 2025</span>
        </div>
      </div>
    </motion.section>

    {/* Call to Action Footer Section */}
    <motion.section 
      className="bg-blue-700 py-12 text-center mt-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Ready to simplify your legal research?</h2>
      <a href="/register" className="bg-white text-blue-700 px-8 py-3 rounded shadow hover:bg-blue-50 font-semibold transition-transform transform hover:scale-105">Get Started</a>
    </motion.section>
  </div>
);

export default Home;
