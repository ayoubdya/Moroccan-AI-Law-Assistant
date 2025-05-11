"use client";

import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-amber-200 p-4 bg-white shadow-sm">
      <div className="flex items-end space-x-3">
        <div className="flex-grow">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your legal question here..."
            className="w-full border border-amber-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 resize-none placeholder-amber-400 text-amber-900"
            rows={3}
            disabled={disabled}
          />
          <p className="text-xs text-amber-700 mt-1">
            Press Enter to send, Shift+Enter for a new line
          </p>
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`px-6 py-3 rounded-md transition-colors ${!message.trim() || disabled 
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
            : 'bg-slate-700 text-white hover:bg-slate-600'}`}
        >
          Send
        </button>
      </div>
    </form>
  );
}
