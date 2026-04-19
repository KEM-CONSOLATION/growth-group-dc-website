"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "growth-group-blog-like-session";

export function LikeButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [sent, setSent] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    try {
      let sid = localStorage.getItem(STORAGE_KEY);
      if (!sid) {
        sid = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, sid);
      }
      setSessionId(sid);
    } catch {
      setSessionId(null);
    }
  }, []);

  const like = async () => {
    if (sent) return;
    setSent(true);
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, sessionId }),
    });
    const data = await res.json().catch(() => ({}));
    if (data.sessionId && typeof data.sessionId === "string") {
      try {
        localStorage.setItem(STORAGE_KEY, data.sessionId);
      } catch {
        /* ignore */
      }
    }
    if (res.ok && !data.duplicate) {
      setCount((c) => c + 1);
    }
  };

  return (
    <button
      type="button"
      onClick={like}
      className="px-4 py-2 bg-brand-600 text-white rounded-lg"
    >
      ❤️ Like ({count})
    </button>
  );
}
