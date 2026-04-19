import { redirect } from "next/navigation";

/** Default entry: admin login (see PRD / demo phase). Public marketing site lives at `/home`. */
export default function RootPage() {
  redirect("/admin/login");
}
