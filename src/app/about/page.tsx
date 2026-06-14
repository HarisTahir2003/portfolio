import { redirect } from "next/navigation";

// Content now lives in the single-page home (#about section).
export default function AboutPage() {
  redirect("/#about");
}
