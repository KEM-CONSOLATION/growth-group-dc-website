import { defineField, defineType } from "sanity";

export const group = defineType({
  name: "group",
  title: "Growth Group",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "branch", title: "Branch", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "focus", title: "Focus", type: "string" }),
    defineField({ name: "leader", title: "Leader", type: "string" }),
    defineField({ name: "meetingTime", title: "Meeting Time", type: "string" }),
    defineField({ name: "contact", title: "Contact", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "branch", media: "image" },
  },
});
