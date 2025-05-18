import Link from 'next/link';
import Button from './components/ui/Button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <nav className="bg-amber-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-amber-100">Morocco Legal Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-amber-100 hover:text-white font-medium">
                Login
              </Link>
              <Link href="/register">
                <Button variant="primary" className="bg-slate-700 hover:bg-slate-600 text-white border-0 shadow-md">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-800 to-amber-700 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold text-amber-100 sm:text-5xl leading-tight">
                Your AI-Powered Legal Assistant for Moroccan Law
              </h1>
              <p className="mt-6 text-xl text-amber-50 leading-relaxed">
                Get instant answers to your legal questions, understand your rights, and access expert legal guidance tailored to Moroccan law.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link href="/register">
                  <Button variant="primary" className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white text-lg font-semibold border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="px-8 py-4 border-2 border-slate-300 text-amber-100 hover:bg-slate-700 hover:text-white text-lg font-semibold transition-all duration-300">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
              <div className="bg-amber-200 rounded-lg shadow-2xl overflow-hidden w-full max-w-md h-96 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 to-amber-300/20 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-amber-900 text-center px-6">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">Moroccan Law</h3>
                    <p className="mt-2 text-amber-800">Access the legal expertise you need, when you need it</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-amber-900">How It Works</h2>
            <p className="mt-4 text-xl text-amber-800 max-w-2xl mx-auto">
              Get the legal guidance you need in three simple steps
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-slate-600 transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-200 text-slate-700 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-center text-xl font-semibold text-amber-900 mb-4">Create an Account</h3>
              <p className="text-center text-amber-700">
                Sign up for free and create your personal account to get started with personalized legal assistance.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-slate-600 transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-200 text-slate-700 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-center text-xl font-semibold text-amber-900 mb-4">Ask Your Question</h3>
              <p className="text-center text-amber-700">
                Type your legal question in natural language and get instant answers based on Moroccan law.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-slate-600 transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-200 text-slate-700 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-center text-xl font-semibold text-amber-900 mb-4">Receive Expert Guidance</h3>
              <p className="text-center text-amber-700">
                Get accurate information based on Moroccan law with practical recommendations for your specific situation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-amber-900">Why Choose Morocco Legal Assistant</h2>
            <p className="mt-4 text-xl text-amber-800 max-w-3xl mx-auto">
              Our AI-powered platform offers unique advantages for all your legal needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-slate-600">
              <div className="text-slate-700 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Instant Answers</h3>
              <p className="text-amber-700">Get immediate responses to your legal questions without waiting for appointments.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-slate-600">
              <div className="text-slate-700 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Accurate & Up-to-date</h3>
              <p className="text-amber-700">Our system is constantly updated with the latest Moroccan legal codes and regulations.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-slate-600">
              <div className="text-slate-700 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Affordable Access</h3>
              <p className="text-amber-700">Get professional legal guidance at a fraction of the cost of traditional legal services.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <span className="text-xl font-bold text-amber-100">Morocco Legal Assistant</span>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center md:text-right text-amber-200">
                &copy; {new Date().getFullYear()} Morocco Legal Assistant. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
