"use client";
import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch("https://formspree.io/f/mjgvkjqy", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setStatus('success');
      (e.target as HTMLFormElement).reset(); 
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Name</label>
        <input 
          type="text" 
          name="name"
          required 
          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-white"
          placeholder="Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Email</label>
        <input 
          type="email" 
          name="email" 
          required 
          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-white"
          placeholder="Email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-300">Message</label>
        <textarea 
          name="message" 
          required 
          rows={5} 
          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-white"
          placeholder="Write your message here..."
        />
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'sending'}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-all disabled:opacity-50 active:scale-95"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="text-green-400 text-sm animate-pulse">
          ✓ Message sent! I'll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-sm">
          Oops! Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
}