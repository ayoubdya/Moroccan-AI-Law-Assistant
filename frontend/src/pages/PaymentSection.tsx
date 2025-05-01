import { motion } from "framer-motion";

const PaymentSection = ({ userType, onComplete }: { userType: string, onComplete: () => void }) => {
  // Placeholder for payment integration (Stripe, PayPal, etc.)
  return (
    <motion.div
      className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-blue-100 text-center mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Complete Your Payment</h2>
      <div className="text-blue-700 mb-6">
        {userType === 'Lawyer' || userType === 'Judge' || userType === 'Business' ? (
          <>
            To unlock all premium features for the <span className="font-bold">{userType}</span> profile, please proceed with your subscription payment.<br/>
            <span className="text-blue-900 font-semibold">(Demo: Payment integration coming soon)</span>
          </>
        ) : (
          <>
            The <span className="font-bold">{userType}</span> profile is free! No payment required.
          </>
        )}
      </div>
      {(userType === 'Lawyer' || userType === 'Judge' || userType === 'Business') ? (
        <button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow transition-all text-lg mb-2"
          onClick={onComplete}
        >
          Simulate Payment & Continue
        </button>
      ) : (
        <button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow transition-all text-lg mb-2"
          onClick={onComplete}
        >
          Continue
        </button>
      )}
    </motion.div>
  );
};

export default PaymentSection;
