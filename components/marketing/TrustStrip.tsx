import { Icon, type IconName } from "@/components/ui/Icon";

const items: { label: string; icon: IconName }[] = [
  { label: "Kostenlose Anfrage", icon: "check" },
  { label: "Regionale Vermittlung", icon: "mapPin" },
  { label: "Offerte vor Auftrag", icon: "document" },
];

export function TrustStrip() {
  return (
    <ul className="relative flex flex-col gap-6 border-y border-ink-100 py-7 sm:flex-row sm:justify-between">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Icon name={item.icon} className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-ink-800">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
