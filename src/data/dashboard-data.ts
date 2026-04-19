/**
 * Static sample data for the Growth Group dashboard (replace with API + Supabase later).
 * Edit this file or swap the export for fetched JSON when the backend is ready.
 */

export type DashboardLeader = {
  id: string;
  name: string;
  email: string;
  phone: string;
  groupId: string;
  appointedAt: string;
  bio?: string;
};

export type DashboardAssistant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  groupId: string;
  roleNote?: string;
};

export type DashboardMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  groupId: string;
  joinedAt: string;
  status: "active" | "visitor" | "inactive";
};

export type DashboardGrowthGroup = {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  venue: string;
  meetingDay: string;
  meetingTime: string;
  leaderId: string;
  assistantIds: string[];
  memberIds: string[];
  notes?: string;
  /** 0–100 sample engagement / attendance health for dashboard visuals */
  healthScore?: number;
};

export type MeetingReport = {
  id: string;
  groupId: string;
  meetingDate: string;
  attendance: number;
  topic?: string;
  notes?: string;
  createdAt: string;
};

export type DashboardData = {
  meta: {
    organizationName: string;
    dashboardTitle: string;
    dataAsOf: string;
  };
  growthGroups: DashboardGrowthGroup[];
  leaders: DashboardLeader[];
  assistants: DashboardAssistant[];
  members: DashboardMember[];
  meetingReports: MeetingReport[];
};

export const dashboardData: DashboardData = {
  meta: {
    organizationName: "Dominion City Church",
    dashboardTitle: "Growth Groups — Leadership",
    dataAsOf: "2026-04-01",
  },
  growthGroups: [
    {
      id: "gg-001",
      name: "Ikeja Central Cell",
      slug: "ikeja-central",
      city: "Ikeja",
      state: "Lagos",
      venue: "Church Annex Hall A",
      meetingDay: "Thursday",
      meetingTime: "7:00 PM",
      leaderId: "ldr-001",
      assistantIds: ["ast-001", "ast-002"],
      memberIds: ["mem-001", "mem-002", "mem-003", "mem-004"],
      notes: "Strong attendance; new visitors each month.",
      healthScore: 88,
    },
    {
      id: "gg-002",
      name: "Lekki Phase 1 Cell",
      slug: "lekki-phase-1",
      city: "Lekki",
      state: "Lagos",
      venue: "Host home — contact leader",
      meetingDay: "Tuesday",
      meetingTime: "6:30 PM",
      leaderId: "ldr-002",
      assistantIds: ["ast-003"],
      memberIds: ["mem-005", "mem-006", "mem-007"],
      healthScore: 76,
    },
    {
      id: "gg-003",
      name: "Abuja Gwarinpa Cell",
      slug: "abuja-gwarinpa",
      city: "Gwarinpa",
      state: "FCT",
      venue: "Community centre — Block C",
      meetingDay: "Wednesday",
      meetingTime: "7:30 PM",
      leaderId: "ldr-003",
      assistantIds: ["ast-004", "ast-005"],
      memberIds: ["mem-008", "mem-009", "mem-010", "mem-011", "mem-012"],
      healthScore: 92,
    },
  ],
  leaders: [
    {
      id: "ldr-001",
      name: "Pastor Daniel Okonkwo",
      email: "d.okonkwo@example.com",
      phone: "+234 801 000 1001",
      groupId: "gg-001",
      appointedAt: "2024-01-15",
      bio: "Oversees Ikeja zone cells.",
    },
    {
      id: "ldr-002",
      name: "Sister Grace Emeka",
      email: "g.emeka@example.com",
      phone: "+234 802 000 2002",
      groupId: "gg-002",
      appointedAt: "2024-06-01",
    },
    {
      id: "ldr-003",
      name: "Brother Chidi Musa",
      email: "c.musa@example.com",
      phone: "+234 803 000 3003",
      groupId: "gg-003",
      appointedAt: "2023-11-20",
    },
  ],
  assistants: [
    {
      id: "ast-001",
      name: "Brother Tunde Ade",
      email: "t.ade@example.com",
      phone: "+234 804 000 4004",
      groupId: "gg-001",
      roleNote: "Worship coordination",
    },
    {
      id: "ast-002",
      name: "Sister Kemi Balogun",
      email: "k.balogun@example.com",
      phone: "+234 805 000 5005",
      groupId: "gg-001",
      roleNote: "Follow-up & hospitality",
    },
    {
      id: "ast-003",
      name: "Brother Femi Ojo",
      email: "f.ojo@example.com",
      phone: "+234 806 000 6006",
      groupId: "gg-002",
    },
    {
      id: "ast-004",
      name: "Sister Amina Yusuf",
      email: "a.yusuf@example.com",
      phone: "+234 807 000 7007",
      groupId: "gg-003",
      roleNote: "Prayer captain",
    },
    {
      id: "ast-005",
      name: "Brother Jude Eze",
      email: "j.eze@example.com",
      phone: "+234 808 000 8008",
      groupId: "gg-003",
    },
  ],
  members: [
    {
      id: "mem-001",
      name: "Olumide Fashola",
      email: "o.fashola@example.com",
      phone: "+234 810 010 0001",
      groupId: "gg-001",
      joinedAt: "2025-02-10",
      status: "active",
    },
    {
      id: "mem-002",
      name: "Ngozi Ibe",
      email: "n.ibe@example.com",
      phone: "+234 810 010 0002",
      groupId: "gg-001",
      joinedAt: "2025-03-05",
      status: "active",
    },
    {
      id: "mem-003",
      name: "Emmanuel Hart",
      email: "e.hart@example.com",
      phone: "+234 810 010 0003",
      groupId: "gg-001",
      joinedAt: "2025-01-22",
      status: "visitor",
    },
    {
      id: "mem-004",
      name: "Chioma Nwosu",
      email: "c.nwosu@example.com",
      phone: "+234 810 010 0004",
      groupId: "gg-001",
      joinedAt: "2024-11-01",
      status: "active",
    },
    {
      id: "mem-005",
      name: "Richard Cole",
      email: "r.cole@example.com",
      phone: "+234 810 020 0001",
      groupId: "gg-002",
      joinedAt: "2025-04-01",
      status: "active",
    },
    {
      id: "mem-006",
      name: "Bisi Alade",
      email: "b.alade@example.com",
      phone: "+234 810 020 0002",
      groupId: "gg-002",
      joinedAt: "2024-09-15",
      status: "inactive",
    },
    {
      id: "mem-007",
      name: "David Park",
      email: "d.park@example.com",
      phone: "+234 810 020 0003",
      groupId: "gg-002",
      joinedAt: "2025-02-28",
      status: "visitor",
    },
    {
      id: "mem-008",
      name: "Halima Garba",
      email: "h.garba@example.com",
      phone: "+234 810 030 0001",
      groupId: "gg-003",
      joinedAt: "2024-12-01",
      status: "active",
    },
    {
      id: "mem-009",
      name: "Peter Udo",
      email: "p.udo@example.com",
      phone: "+234 810 030 0002",
      groupId: "gg-003",
      joinedAt: "2025-01-10",
      status: "active",
    },
    {
      id: "mem-010",
      name: "Sarah Jonah",
      email: "s.jonah@example.com",
      phone: "+234 810 030 0003",
      groupId: "gg-003",
      joinedAt: "2025-03-20",
      status: "active",
    },
    {
      id: "mem-011",
      name: "Victor Lam",
      email: "v.lam@example.com",
      phone: "+234 810 030 0004",
      groupId: "gg-003",
      joinedAt: "2024-08-05",
      status: "visitor",
    },
    {
      id: "mem-012",
      name: "Ifeanyi Okafor",
      email: "i.okafor@example.com",
      phone: "+234 810 030 0005",
      groupId: "gg-003",
      joinedAt: "2025-04-12",
      status: "active",
    },
  ],
  meetingReports: [
    {
      id: "mr-001",
      groupId: "gg-001",
      meetingDate: "2026-04-10",
      attendance: 18,
      topic: "Faith & consistency",
      notes: "Great participation; two first-time visitors.",
      createdAt: "2026-04-10T20:00:00.000Z",
    },
    {
      id: "mr-002",
      groupId: "gg-003",
      meetingDate: "2026-04-09",
      attendance: 22,
      topic: "Prayer & outreach planning",
      createdAt: "2026-04-09T21:30:00.000Z",
    },
  ],
};

/** Seed for local persistence — use `useDashboard()` in the admin app. */
export function getDashboardSeed(): DashboardData {
  return JSON.parse(JSON.stringify(dashboardData)) as DashboardData;
}
