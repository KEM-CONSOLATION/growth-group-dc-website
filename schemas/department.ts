import { defineField, defineType } from "sanity";

export const department = defineType({
  name: "department",
  title: "Department",
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
    defineField({
      name: "branch",
      title: "Branch",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "leader",
      title: "Leader Name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "activities",
      title: "Activities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "membersCount",
      title: "Members Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "maxMembers",
      title: "Maximum Members",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "meetingTime",
      title: "Meeting Time",
      type: "string",
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
      name: "isOpen",
      title: "Department Open for New Members",
      type: "boolean",
      initialValue: true,
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
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "leader",
      media: "image",
      state: "state",
      branch: "branch",
    },
    prepare(selection) {
      const { title, subtitle, media, state, branch } = selection;
      const location = branch ? `${state} - ${branch}` : state;
      return {
        title: title,
        subtitle: `Led by ${subtitle} • ${location}`,
        media: media,
      };
    },
  },
});
