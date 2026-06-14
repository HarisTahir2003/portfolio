import { redirect } from "next/navigation";

// Content now lives in the single-page home (#experience section).
export default function ExperiencePage() {
  redirect("/#experience");
}
