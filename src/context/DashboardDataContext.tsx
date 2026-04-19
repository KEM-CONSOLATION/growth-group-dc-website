"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  DashboardAssistant,
  DashboardData,
  DashboardLeader,
  DashboardMember,
  MeetingReport,
} from "@/src/data/dashboard-data";
import { getDashboardSeed } from "@/src/data/dashboard-data";
import {
  createDashboardHelpers,
  type DashboardHelpers,
} from "@/src/lib/dashboard-helpers";

const STORAGE_KEY = "growth-group-dashboard-data-v1";

function newId(prefix: string): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Date.now()}`;
}

type DashboardContextValue = DashboardHelpers & {
  data: DashboardData;
  hydrated: boolean;
  addMember: (input: {
    name: string;
    email: string;
    phone: string;
    groupId: string;
    status: DashboardMember["status"];
  }) => void;
  assignMemberToGroup: (memberId: string, groupId: string) => void;
  setGroupLeader: (
    groupId: string,
    input:
      | { memberId: string }
      | { name: string; email: string; phone: string; bio?: string }
  ) => void;
  addAssistantToGroup: (
    groupId: string,
    input:
      | { memberId: string; roleNote?: string }
      | { name: string; email: string; phone: string; roleNote?: string }
  ) => void;
  addMeetingReport: (input: {
    groupId: string;
    meetingDate: string;
    attendance: number;
    topic?: string;
    notes?: string;
  }) => void;
  resetToSampleData: () => void;
};

const Ctx = createContext<DashboardContextValue | null>(null);

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DashboardData>(() => getDashboardSeed());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DashboardData;
        if (parsed?.growthGroups?.length) {
          if (!parsed.meetingReports) parsed.meetingReports = [];
          setData(parsed);
        }
      }
    } catch {
      /* keep seed */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* quota */
    }
  }, [data, hydrated]);

  const helpers = useMemo(() => createDashboardHelpers(data), [data]);

  const addMember = useCallback(
    (input: {
      name: string;
      email: string;
      phone: string;
      groupId: string;
      status: DashboardMember["status"];
    }) => {
      setData((prev) => {
        const id = newId("mem");
        const joinedAt = new Date().toISOString().slice(0, 10);
        const member: DashboardMember = {
          id,
          name: input.name.trim(),
          email: input.email.trim(),
          phone: input.phone.trim(),
          groupId: input.groupId,
          joinedAt,
          status: input.status,
        };
        const growthGroups = prev.growthGroups.map((g) =>
          g.id === input.groupId
            ? { ...g, memberIds: [...g.memberIds, id] }
            : g
        );
        return {
          ...prev,
          members: [...prev.members, member],
          growthGroups,
        };
      });
    },
    []
  );

  const assignMemberToGroup = useCallback((memberId: string, groupId: string) => {
    setData((prev) => {
      const m = prev.members.find((x) => x.id === memberId);
      if (!m) return prev;
      const oldGid = m.groupId;
      const growthGroups = prev.growthGroups.map((g) => {
        if (g.id === oldGid) {
          return { ...g, memberIds: g.memberIds.filter((id) => id !== memberId) };
        }
        if (g.id === groupId) {
          const ids = g.memberIds.filter((id) => id !== memberId);
          return { ...g, memberIds: [...ids, memberId] };
        }
        return g;
      });
      const members = prev.members.map((x) =>
        x.id === memberId ? { ...x, groupId } : x
      );
      return { ...prev, growthGroups, members };
    });
  }, []);

  const setGroupLeader = useCallback(
    (
      groupId: string,
      input:
        | { memberId: string }
        | { name: string; email: string; phone: string; bio?: string }
    ) => {
      setData((prev) => {
        const g = prev.growthGroups.find((x) => x.id === groupId);
        if (!g) return prev;
        const appointedAt = new Date().toISOString().slice(0, 10);
        let leader: DashboardLeader;

        if ("memberId" in input) {
          const m = prev.members.find((x) => x.id === input.memberId);
          if (!m) return prev;
          leader = {
            id: newId("ldr"),
            name: m.name,
            email: m.email,
            phone: m.phone,
            groupId,
            appointedAt,
          };
        } else {
          leader = {
            id: newId("ldr"),
            name: input.name.trim(),
            email: input.email.trim(),
            phone: input.phone.trim(),
            groupId,
            appointedAt,
            bio: input.bio?.trim() || undefined,
          };
        }

        const memberIds =
          "memberId" in input
            ? g.memberIds.filter((id) => id !== input.memberId)
            : g.memberIds;

        const growthGroups = prev.growthGroups.map((x) =>
          x.id === groupId
            ? { ...x, leaderId: leader.id, memberIds }
            : x
        );
        const leaders = [
          ...prev.leaders.filter((l) => l.groupId !== groupId),
          leader,
        ];
        return { ...prev, growthGroups, leaders };
      });
    },
    []
  );

  const addAssistantToGroup = useCallback(
    (
      groupId: string,
      input:
        | { memberId: string; roleNote?: string }
        | { name: string; email: string; phone: string; roleNote?: string }
    ) => {
      setData((prev) => {
        const g = prev.growthGroups.find((x) => x.id === groupId);
        if (!g) return prev;
        let ast: DashboardAssistant;

        if ("memberId" in input) {
          const m = prev.members.find((x) => x.id === input.memberId);
          if (!m) return prev;
          ast = {
            id: newId("ast"),
            name: m.name,
            email: m.email,
            phone: m.phone,
            groupId,
            roleNote: input.roleNote?.trim() || undefined,
          };
        } else {
          ast = {
            id: newId("ast"),
            name: input.name.trim(),
            email: input.email.trim(),
            phone: input.phone.trim(),
            groupId,
            roleNote: input.roleNote?.trim() || undefined,
          };
        }

        const memberIds =
          "memberId" in input
            ? g.memberIds.filter((id) => id !== input.memberId)
            : g.memberIds;

        const growthGroups = prev.growthGroups.map((x) =>
          x.id === groupId
            ? {
                ...x,
                assistantIds: [...x.assistantIds, ast.id],
                memberIds,
              }
            : x
        );
        return {
          ...prev,
          growthGroups,
          assistants: [...prev.assistants, ast],
        };
      });
    },
    []
  );

  const addMeetingReport = useCallback(
    (input: {
      groupId: string;
      meetingDate: string;
      attendance: number;
      topic?: string;
      notes?: string;
    }) => {
      setData((prev) => {
        const report: MeetingReport = {
          id: newId("mr"),
          groupId: input.groupId,
          meetingDate: input.meetingDate,
          attendance: input.attendance,
          topic: input.topic?.trim() || undefined,
          notes: input.notes?.trim() || undefined,
          createdAt: new Date().toISOString(),
        };
        return {
          ...prev,
          meetingReports: [report, ...prev.meetingReports],
        };
      });
    },
    []
  );

  const resetToSampleData = useCallback(() => {
    const seed = getDashboardSeed();
    setData(seed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }, []);

  const value = useMemo(
    () => ({
      ...helpers,
      data,
      hydrated,
      addMember,
      assignMemberToGroup,
      setGroupLeader,
      addAssistantToGroup,
      addMeetingReport,
      resetToSampleData,
    }),
    [
      helpers,
      data,
      hydrated,
      addMember,
      assignMemberToGroup,
      setGroupLeader,
      addAssistantToGroup,
      addMeetingReport,
      resetToSampleData,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDashboard(): DashboardContextValue {
  const v = useContext(Ctx);
  if (!v) {
    throw new Error("useDashboard must be used inside DashboardDataProvider");
  }
  return v;
}
