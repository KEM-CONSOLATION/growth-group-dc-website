import {
  fetchAudioMessages,
  fetchAudioCategories,
} from "@/src/lib/content";
import AudioMessagesClient from "./AudioMessagesClient";

export default async function AudioMessagesPage() {
  const [initialMessages, categories] = await Promise.all([
    fetchAudioMessages(),
    fetchAudioCategories(),
  ]);

  return (
    <AudioMessagesClient
      initialMessages={initialMessages}
      categories={categories}
    />
  );
}
