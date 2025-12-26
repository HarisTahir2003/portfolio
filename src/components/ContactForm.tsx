"use client";
import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    // Logic for submission (e.g., Formspree, EmailJS, or custom API)
    // For now, we'll simulate a delay
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input 
          type="text" 
          required 
          className="w-full p-2 bg-secondary border border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input 
          type="email" 
          required 
          className="w-full p-2 bg-secondary border border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea 
          required 
          rows={5} 
          className="w-full p-2 bg-secondary border border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="How can I help you?"
        />
      </div>
      <button 
        type="submit" 
        disabled={status === 'sending'}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && <p className="text-green-500 text-sm">Message sent successfully!</p>}
    </form>
  );
}