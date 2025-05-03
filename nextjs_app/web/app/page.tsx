import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#F5EFD9] opacity-20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#F5EFD9] opacity-20 rounded-tr-full"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
            {/* Left Column - Text Content */}
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Moroccan Law <span className="text-[#C7A962]">Simplified</span> Through AI
              </h1>
              
              <div className="w-20 h-1.5 bg-[#C7A962] mx-auto lg:mx-0 rounded-full"></div>
              
              <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                Get instant, accurate legal guidance tailored to Moroccan law. Our AI assistant helps you navigate complex legal questions 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-8 justify-center lg:justify-start">
                <Link 
                  href="/auth/register" 
                  className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-[#C7A962] hover:bg-[#B09344] transition-colors duration-300 shadow-lg hover:shadow-xl md:text-lg"
                >
                  Start Free Consultation
                </Link>
                <Link 
                  href="/auth/login" 
                  className="inline-flex justify-center items-center px-8 py-4 border border-[#C7A962] text-base font-medium rounded-lg text-[#C7A962] bg-white hover:bg-[#FAF7EC] transition-colors duration-300 md:text-lg"
                >
                  Sign In
                </Link>
              </div>
            </div>
            
            {/* Right Column - Chat Demo */}
            <div className="lg:w-1/2 relative mt-16 lg:mt-0">
              {/* Decorative Blobs */}
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#D9C48E] rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-green-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
              
              {/* Chat Interface */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500">
                {/* Chat Header */}
                <div className="bg-[#C7A962] text-white p-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    <div className="ml-2 text-sm font-medium">AI Legal Assistant</div>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="p-6 bg-gray-50">
                  <div className="flex flex-col space-y-4">
                    {/* Assistant Message */}
                    <div className="bg-white rounded-lg p-4 max-w-[80%] self-start shadow-sm border border-gray-100">
                      <p className="text-gray-700">Hello! I'm your Moroccan legal assistant. How can I help you today?</p>
                    </div>
                    
                    {/* User Message */}
                    <div className="bg-[#F5EFD9] rounded-lg p-4 max-w-[80%] self-end shadow-sm">
                      <p className="text-gray-700">I need information about starting a business in Morocco.</p>
                    </div>
                    
                    {/* Assistant Response */}
                    <div className="bg-white rounded-lg p-4 max-w-[80%] self-start shadow-sm border border-gray-100">
                      <p className="text-gray-700">To start a business in Morocco, you'll need to follow these steps:</p>
                      <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-700">
                        <li>Choose a legal form (SARL, SA, etc.)</li>
                        <li>Prepare articles of association</li>
                        <li>Deposit capital with a bank</li>
                        <li>Register with the Commercial Registry</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                {/* Chat Input */}
                <div className="border-t border-gray-200 p-4 flex items-center">
                  <input 
                    type="text" 
                    placeholder="Type your legal question here..." 
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C7A962] focus:border-transparent"
                    disabled
                  />
                  <button className="ml-2 bg-[#C7A962] text-white p-2 rounded-lg" title="Send message" aria-label="Send message">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Legal AI Assistant?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with comprehensive Moroccan legal knowledge
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-[#F5EFD9] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C7A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Availability</h3>
              <p className="text-gray-600">
                Get legal assistance whenever you need it, day or night, without waiting for appointments.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-[#F5EFD9] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C7A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accurate & Up-to-Date</h3>
              <p className="text-gray-600">
                Our AI is trained on the latest Moroccan legal codes and regulations to provide reliable information.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-[#F5EFD9] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C7A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Consultation History</h3>
              <p className="text-gray-600">
                Access your previous legal consultations at any time, with secure storage of all your interactions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting legal help has never been easier
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C7A962] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Create an Account</h3>
              <p className="text-gray-600">
                Sign up in less than a minute to get started with your legal consultations.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C7A962] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ask Your Question</h3>
              <p className="text-gray-600">
                Type your legal question in natural language, just as you would ask a human lawyer.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C7A962] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Instant Answers</h3>
              <p className="text-gray-600">
                Receive accurate, detailed responses based on Moroccan law within seconds.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C7A962] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">4</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Follow-up Questions</h3>
              <p className="text-gray-600">
                Ask follow-up questions to get more detailed information about your specific case.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-[#C7A962] text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Join thousands of Moroccans who are already using our AI legal assistant to navigate the complexities of Moroccan law.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/register" 
              className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-[#C7A962] bg-white hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl md:text-lg"
            >
              Create Free Account
            </Link>
            <Link 
              href="/auth/login" 
              className="inline-flex justify-center items-center px-8 py-4 border border-white text-base font-medium rounded-lg text-white hover:bg-[#B09344] transition-colors duration-300 md:text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
