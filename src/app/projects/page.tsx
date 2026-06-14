import { redirect } from "next/navigation";

// Content now lives in the single-page home (#projects section).
export default function ProjectsPage() {
  redirect("/#projects");
}
