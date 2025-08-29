import { defineField, defineType } from "sanity";

export const like = defineType({
  name: "like",
  title: "Like",
  type: "document",
  fields: [
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "blog" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sessionId",
      title: "Session ID",
      type: "string",
      description: "Anonymous session identifier to prevent duplicate likes",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
