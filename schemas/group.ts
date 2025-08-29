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
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "branch",
      title: "Branch",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "focus",
      title: "Focus",
      type: "string",
    }),
    defineField({
      name: "leader",
      title: "Leader Name",
      type: "string",
    }),
    defineField({
      name: "leaderDetails",
      title: "Leader Details",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Full Name",
          type: "string",
        },
        {
          name: "phone",
          title: "Phone Number",
          type: "string",
        },
        {
          name: "whatsapp",
          title: "WhatsApp Number",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
        },
        {
          name: "bio",
          title: "Bio",
          type: "text",
          rows: 3,
        },
        {
          name: "image",
          title: "Profile Image",
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "meetingTime",
      title: "Meeting Time",
      type: "string",
    }),
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        {
          name: "phone",
          title: "Phone Number",
          type: "string",
        },
        {
          name: "whatsapp",
          title: "WhatsApp Number",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Group Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "members",
      title: "Current Members",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "maxMembers",
      title: "Maximum Members",
      type: "number",
      initialValue: 30,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "isOpen",
      title: "Group Open for New Members",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "meetingDay",
      title: "Meeting Day",
      type: "string",
      options: {
        list: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
    }),
    defineField({
      name: "meetingTime",
      title: "Meeting Time",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Meeting Duration",
      type: "string",
      description: "e.g., 2 hours, 1.5 hours",
    }),
    defineField({
      name: "ageGroup",
      title: "Target Age Group",
      type: "string",
      options: {
        list: [
          "All Ages",
          "Youth (18-25)",
          "Young Adults (26-35)",
          "Adults (36-50)",
          "Seniors (50+)",
          "Families",
        ],
      },
    }),
    defineField({
      name: "language",
      title: "Primary Language",
      type: "string",
      initialValue: "English",
    }),
    defineField({
      name: "isOnline",
      title: "Online Meetings Available",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "onlinePlatform",
      title: "Online Platform",
      type: "string",
      description: "e.g., Zoom, Google Meet, WhatsApp",
      hidden: ({ document }) => !document?.isOnline,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "branch",
      media: "image",
      leader: "leader",
    },
    prepare(selection) {
      const { title, subtitle, media, leader } = selection;
      return {
        title: title,
        subtitle: `${subtitle} • Led by ${leader}`,
        media: media,
      };
    },
  },
});
