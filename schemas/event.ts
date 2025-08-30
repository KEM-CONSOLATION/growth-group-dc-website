import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Prayer",
          "Bible Study",
          "Fellowship",
          "Special Event",
          "Family",
          "Conference",
          "Worship",
          "Youth",
          "Children",
          "Outreach",
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "registrationLink",
      title: "Registration Link",
      type: "url",
    }),
    defineField({
      name: "maxAttendees",
      title: "Maximum Attendees",
      type: "number",
    }),
    defineField({
      name: "currentAttendees",
      title: "Current Attendees",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isRegistrationRequired",
      title: "Registration Required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "organizer",
      title: "Organizer",
      type: "string",
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        {
          name: "phone",
          title: "Phone Number",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
        },
        {
          name: "whatsapp",
          title: "WhatsApp",
          type: "string",
        },
      ],
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
      title: "title",
      subtitle: "location",
      media: "image",
      startDate: "startDate",
      category: "category",
    },
    prepare(selection) {
      const { title, subtitle, media, startDate, category } = selection;
      const date = startDate
        ? new Date(startDate).toLocaleDateString()
        : "No date";
      return {
        title: title,
        subtitle: `${category} • ${date} • ${subtitle}`,
        media: media,
      };
    },
  },
});
