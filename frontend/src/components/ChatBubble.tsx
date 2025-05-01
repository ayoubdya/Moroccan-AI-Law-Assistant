// Placeholder for ChatBubble component
const ChatBubble = ({ message, from }:{ message:string, from: 'user' | 'ai' }) => (
  <div className={`my-2 flex ${from === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`px-4 py-2 rounded-lg max-w-xs ${from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
      {message}
    </div>
  </div>
);
export default ChatBubble;
