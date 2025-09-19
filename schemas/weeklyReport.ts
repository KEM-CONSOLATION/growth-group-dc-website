import { defineField, defineType } from "sanity";

export const weeklyReport = defineType({
  name: "weeklyReport",
  title: "Weekly Report",
  type: "document",
  fields: [
    defineField({
      name: "groupName",
      title: "Group Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "groupLeader",
      title: "Group Leader",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "leaderEmail",
      title: "Leader Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "weekOf",
      title: "Week Of",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "attendance",
      title: "Attendance",
      type: "object",
      fields: [
        defineField({
          name: "totalMembers",
          title: "Total Members",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "presentThisWeek",
          title: "Present This Week",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "newVisitors",
          title: "New Visitors",
          type: "number",
          validation: (Rule) => Rule.min(0),
        }),
      ],
    }),
    defineField({
      name: "activities",
      title: "Activities Conducted",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "topicsDiscussed",
      title: "Topics Discussed",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prayerRequests",
      title: "Prayer Requests",
      type: "text",
    }),
    defineField({
      name: "testimonies",
      title: "Testimonies/Highlights",
      type: "text",
    }),
    defineField({
      name: "challenges",
      title: "Challenges Faced",
      type: "text",
    }),
    defineField({
      name: "nextWeekPlans",
      title: "Next Week Plans",
      type: "text",
    }),
    defineField({
      name: "additionalNotes",
      title: "Additional Notes",
      type: "text",
    }),
    defineField({
      name: "groupPhotos",
      title: "Group Photos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "File Name",
              type: "string",
            },
            {
              name: "type",
              title: "File Type",
              type: "string",
            },
            {
              name: "size",
              title: "File Size",
              type: "number",
            },
            {
              name: "uploadedAt",
              title: "Uploaded At",
              type: "datetime",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "activityPhotos",
      title: "Activity Photos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "File Name",
              type: "string",
            },
            {
              name: "type",
              title: "File Type",
              type: "string",
            },
            {
              name: "size",
              title: "File Size",
              type: "number",
            },
            {
              name: "uploadedAt",
              title: "Uploaded At",
              type: "datetime",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending Review", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Needs Revision", value: "revision" },
        ],
      },
      initialValue: "pending",
    }),
  ],
  preview: {
    select: {
      title: "groupName",
      subtitle: "weekOf",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      return {
        title: title || "Untitled Report",
        subtitle: `${subtitle} - ${status}`,
      };
    },
  },
});
