import type {
  DashboardData,
  DashboardGrowthGroup,
  DashboardLeader,
} from "@/src/data/dashboard-data";

export function createDashboardHelpers(data: DashboardData) {
  return {
    getGroupById: (id: string): DashboardGrowthGroup | undefined =>
      data.growthGroups.find((g) => g.id === id),
    getLeaderById: (id: string) => data.leaders.find((l) => l.id === id),
    getAssistantById: (id: string) => data.assistants.find((a) => a.id === id),
    getMemberById: (id: string) => data.members.find((m) => m.id === id),
    getGroupLabel: (groupId: string): string => {
      const g = data.growthGroups.find((x) => x.id === groupId);
      return g ? g.name : "—";
    },
  };
}

export type DashboardHelpers = ReturnType<typeof createDashboardHelpers>;
