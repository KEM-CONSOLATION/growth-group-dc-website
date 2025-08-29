"use client";

import { useState } from "react";

export function CommentForm({ postId }: { postId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, name, email, message }),
    });
    if (res.ok) setStatus("Thanks! Your comment awaits approval.");
    else setStatus("Failed to submit. Try again.");
    setMessage("");
  };

  return (
    <form onSubmit={submit} className="mt-10 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your name"
          className="px-4 py-3 border rounded-lg w-full"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          className="px-4 py-3 border rounded-lg w-full"
        />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        placeholder="Write a comment..."
        className="px-4 py-3 border rounded-lg w-full h-28"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Post Comment
      </button>
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </form>
  );
}
