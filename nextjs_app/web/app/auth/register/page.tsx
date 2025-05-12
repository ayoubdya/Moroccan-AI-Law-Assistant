import { Metadata } from 'next';
import RegisterForm from '../../../components/RegisterForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register | Morocco Legal Assistant',
  description: 'Create a new account for Morocco Legal Assistant',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#F5EFD9] opacity-20 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#F5EFD9] opacity-20 rounded-tr-full"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Morocco Legal Assistant</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>
          
          <RegisterForm />
          
          <div className="mt-8 text-center">
            <Link href="/" className="text-[#C7A962] hover:text-[#B09344] transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}