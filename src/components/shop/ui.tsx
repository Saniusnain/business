import { MAX_QTY, type Product } from "@/lib/products";

// ponytail: letter tile stands in for product photos; swap for <Image> from
// /public/products/ once shots are ready.
export function ProductTile({
  product,
  size = "sm",
}: {
  product: Product;
  size?: "sm" | "lg";
}) {
  const dims =
    size === "lg"
      ? "aspect-[4/3] w-full rounded-lg text-[96px]"
      : "h-[72px] w-[72px] rounded-2xl text-2xl";
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center border font-display font-bold text-ink ${product.tile} ${dims}`}
    >
      {product.letter}
    </div>
  );
}

export function QtyStepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  const btn =
    "flex h-10 w-10 cursor-pointer items-center justify-center text-lg font-semibold text-ink transition-colors hover:bg-moss disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center overflow-hidden rounded-xl border border-parchment bg-cream"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className={btn}
      >
        −
      </button>
      <span
        aria-live="polite"
        className="w-9 text-center text-[15px] font-semibold text-ink"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= MAX_QTY}
        onClick={() => onChange(value + 1)}
        className={btn}
      >
        +
      </button>
    </div>
  );
}

export const primaryBtn =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-med disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0";

export const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-parchment bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-moss";

export function BykeaNote() {
  return (
    <div className="flex gap-3 rounded-xl border border-sage bg-moss p-4 text-[13.5px] leading-[1.55] text-ink">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="mt-0.5 shrink-0"
      >
        <circle cx="6" cy="17" r="3" stroke="#3A5615" strokeWidth="1.8" />
        <circle cx="18" cy="17" r="3" stroke="#3A5615" strokeWidth="1.8" />
        <path
          d="M6 17l4-8h5l3 8M10 9H7M15 9l1-3h2"
          stroke="#3A5615"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        <strong className="font-semibold">+ Bykea delivery fee.</strong> The fee
        is calculated by distance and paid in cash to the Bykea rider when your
        order arrives.
      </span>
    </div>
  );
}
