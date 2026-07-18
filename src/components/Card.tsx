type CardProps = {
  title: string;
  text: string;
  headingLevel?: "h2" | "h3";
};

export function Card({ title, text, headingLevel = "h3" }: CardProps) {
  const Heading = headingLevel;
  return (
    <li className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <Heading className="font-semibold">{title}</Heading>
      <p className="mt-1 text-sm text-zinc-600">{text}</p>
    </li>
  );
}
