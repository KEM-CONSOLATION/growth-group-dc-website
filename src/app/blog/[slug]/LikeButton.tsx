"use client";

import { useState } from "react";

export function LikeButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [sent, setSent] = useState(false);

  const like = async () => {
    if (sent) return;
    setSent(true);
    await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });
    setCount((c) => c + 1);
  };

  return (
    <button
      onClick={like}
      className="px-4 py-2 bg-pink-600 text-white rounded-lg"
    >
      ❤️ Like ({count})
    </button>
  );
}
