import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
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
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Hex color code for category display",
      initialValue: "#3B82F6",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon name or emoji for the category",
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
  },
});
