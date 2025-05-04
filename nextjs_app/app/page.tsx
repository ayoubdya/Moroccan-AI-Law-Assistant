import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Button from "./components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              AI-Powered Legal Advice, <span className="text-blue-600">Available 24/7</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Get accurate, instant, and confidential legal guidance from our intelligent chatbot designed specifically for Moroccan law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Button href="/auth/register" size="lg" className="px-8">
                Get Started
              </Button>
              <Button href="/auth/login" variant="outline" size="lg">
                Login
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500 rounded-full opacity-20 animate-pulse delay-700"></div>
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 ">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center space-x-4 mb-5">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Morocco Legal Assistant</h3>
                      <p className="text-sm text-gray-500">Online now</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-xs">
                      <p className="text-gray-700">Hello! How can I help with your legal questions today?</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg rounded-tr-none max-w-xs ml-auto">
                      <p className="text-gray-700">I need information about employment contracts in Morocco.</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-sm">
                      <p className="text-gray-700">Under Moroccan labor law, employment contracts can be fixed-term or indefinite. Here are the key requirements...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Get the legal guidance you need in three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 ">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign Up</h3>
            <p className="text-gray-600">
              Create your account in less than a minute. No credit card required.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 ">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ask Questions</h3>
            <p className="text-gray-600">
              Type your legal questions in plain language. Our AI understands Moroccan legal context.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 ">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Answers</h3>
            <p className="text-gray-600">
              Receive accurate, relevant legal guidance based on Moroccan law and regulations.
            </p>
          </div>
        </div>
        
        <div className="mt-12 sm:mt-16 text-center">
          <Button href="/auth/signup" size="lg" className="px-8">
            Try It Now
          </Button>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform is designed to make legal assistance accessible to everyone in Morocco
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 ">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Confidential & Secure</h3>
            <p className="text-gray-600">
              Your conversations and personal information are encrypted and never shared with third parties.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 ">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multiple Legal Topics</h3>
            <p className="text-gray-600">
              From family law to business contracts, our AI covers a wide range of Moroccan legal topics.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 ">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Accuracy</h3>
            <p className="text-gray-600">
              Our advanced AI is continuously trained on the latest Moroccan laws and regulations.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 ">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Availability</h3>
            <p className="text-gray-600">
              Get legal assistance any time of day or night, without waiting for appointments.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 ">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Affordable Access</h3>
            <p className="text-gray-600">
              Legal advice at a fraction of the cost of traditional legal consultations.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 ">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Document Assistance</h3>
            <p className="text-gray-600">
              Get help understanding legal documents and contracts specific to Moroccan law.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from people who have used our platform to solve their legal challenges
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 ">
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                A
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ahmed K.</h3>
                <p className="text-sm text-gray-600">Small Business Owner</p>
              </div>
            </div>
            <div className="mb-4 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="relative">
              <svg className="absolute top-0 left-0 w-8 h-8 text-gray-200 transform -translate-x-3 -translate-y-2 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-gray-700 pl-2">
                &ldquo;As a small business owner, I was struggling with understanding commercial contract laws in Morocco. This platform provided clear guidance that helped me negotiate better terms with suppliers.&rdquo;
              </p>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 ">
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                S
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Samira T.</h3>
                <p className="text-sm text-gray-600">Law Student</p>
              </div>
            </div>
            <div className="mb-4 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="relative">
              <svg className="absolute top-0 left-0 w-8 h-8 text-gray-200 transform -translate-x-3 -translate-y-2 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-gray-700 pl-2">
                &ldquo;This tool has been invaluable for my studies. The AI explains complex legal concepts in simple terms and provides relevant Moroccan case law examples that help me understand the practical applications.&rdquo;
              </p>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 ">
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                M
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Mohammed R.</h3>
                <p className="text-sm text-gray-600">Homeowner</p>
              </div>
            </div>
            <div className="mb-4 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="relative">
              <svg className="absolute top-0 left-0 w-8 h-8 text-gray-200 transform -translate-x-3 -translate-y-2 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-gray-700 pl-2">
                &ldquo;I had a property dispute with my neighbor and wasn&rsquo;t sure about my rights. The Morocco Legal Assistant helped me understand the relevant property laws and suggested steps to resolve the issue without expensive litigation.&rdquo;
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 sm:mt-16 text-center">
          <Button href="/auth/signup" size="lg" className="px-8">
            Join Our Community
          </Button>
        </div>
      </div>
    </section>
  );
};