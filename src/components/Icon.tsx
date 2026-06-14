import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Code2,
  Cpu,
  Terminal,
  Database,
  BarChart3,
  GitBranch,
  type LucideProps,
} from "lucide-react";

/** String → lucide component map, so the data file can stay icon-agnostic. */
const map = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  code: Code2,
  cpu: Cpu,
  terminal: Terminal,
  database: Database,
  chart: BarChart3,
  git: GitBranch,
} as const;

export type IconName = keyof typeof map;

export default function Icon({
  name,
  ...props
}: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp {...props} />;
}
