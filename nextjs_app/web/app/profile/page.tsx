'use client';

import UserProfile from '../../components/UserProfile';
import ProtectedRoute from '../components/ProtectedRoute';

// Metadata can't be used with 'use client' directive
// Define a title component instead
const title = 'User Profile | Morocco Legal Assistant';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <UserProfile />
      </div>
    </ProtectedRoute>
  );
}
