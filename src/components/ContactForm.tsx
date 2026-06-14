"use client";

import React, { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-3 text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-[var(--accent-ring)]";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mjgvkjqy", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-ink-muted"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-ink-muted"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-ink-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Write your message here…"
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-full rounded-lg bg-accent px-4 py-3 font-semibold text-white transition-all hover:bg-accent-bright active:scale-[0.99] disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-sm text-emerald-400">
          ✓ Message sent — I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
}
