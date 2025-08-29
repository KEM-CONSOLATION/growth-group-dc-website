import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
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
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "General Pastor", value: "general-pastor" },
          { title: "State Pastor", value: "state-pastor" },
          { title: "Growth Group Leader", value: "group-leader" },
          { title: "Church Member", value: "member" },
          { title: "Guest Speaker", value: "guest" },
        ],
      },
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      description: "If applicable, which state this pastor/leader serves",
    }),
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        {
          name: "email",
          title: "Email",
          type: "string",
        },
        {
          name: "phone",
          title: "Phone",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      role: "role",
    },
    prepare(selection) {
      const { role } = selection;
      return { ...selection, subtitle: role && `${role}` };
    },
  },
});
