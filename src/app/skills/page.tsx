import { redirect } from "next/navigation";

// Content now lives in the single-page home (#skills section).
export default function SkillsPage() {
  redirect("/#skills");
}
