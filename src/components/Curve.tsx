import Image from "next/image";

/** Brand signature chalk curve. Kit rule: at most one per screen/section. */
export default function Curve({
  tone = "green",
  className = "",
}: {
  tone?: "green" | "pink";
  className?: string;
}) {
  return (
    <Image
      src={`/curve-${tone}.png`}
      alt=""
      aria-hidden
      width={1176}
      height={341}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
