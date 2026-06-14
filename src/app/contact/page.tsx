import { redirect } from "next/navigation";

// Content now lives in the single-page home (#contact section).
export default function ContactPage() {
  redirect("/#contact");
}
