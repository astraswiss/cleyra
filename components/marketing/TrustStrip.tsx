const items = [
  "Kostenlose Anfrage",
  "Regionale Vermittlung",
  "Offerte vor Auftrag",
];

export function TrustStrip() {
  return (
    <ul className="flex flex-col gap-3 border-y border-slate-200 py-6 text-sm font-medium sm:flex-row sm:justify-between">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span aria-hidden="true">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
