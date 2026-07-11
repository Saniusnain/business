"use client";

const ITEMS = [
  "Harm reduction",
  "Food science",
  "Nutrition",
  "Safe alternatives",
  "Research-led",
  "Edible innovation",
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center" aria-hidden={ariaHidden || undefined}>
      {ITEMS.map((item, i) => (
        <span key={item} className="flex items-center">
          <span
            className={`px-[26px] font-display text-[15px] font-semibold ${
              i % 2 === 0 ? "text-celadon" : "text-fern"
            }`}
          >
            {item}
          </span>
          <span className="text-leaf">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden bg-ink py-4">
      <div className="flex w-max whitespace-nowrap [animation:marquee_30s_linear_infinite]">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
