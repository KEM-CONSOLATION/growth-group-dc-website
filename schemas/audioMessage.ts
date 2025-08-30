import { defineField, defineType } from "sanity";

export const audioMessage = defineType({
  name: "audioMessage",
  title: "Audio Message",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "speaker",
      title: "Speaker",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "googleDriveLink",
      title: "Google Drive Link",
      type: "url",
      description: "Direct download link from Google Drive",
      validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "duration",
      title: "Duration (minutes)",
      type: "number",
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Sermon", "Teaching", "Testimony", "Prayer", "Worship", "Other"],
      },
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
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "downloadCount",
      title: "Download Count",
      type: "number",
      initialValue: 0,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      speaker: "speaker",
      date: "date",
      category: "category",
    },
    prepare(selection) {
      const { title, speaker, date, category } = selection;
      return {
        title: title,
        subtitle: `${speaker} • ${category} • ${date ? new Date(date).toLocaleDateString() : "No date"}`,
      };
    },
  },
  orderings: [
    {
      title: "Date, New",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date, Old",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Title, A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
