export const inputClasses =
  "w-full rounded-xl border border-parchment bg-cream px-[15px] py-[13px] text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-stone focus:border-leaf focus:shadow-[0_0_0_3px_rgba(6,72,29,0.12)]";

export const labelClasses = "mb-[7px] block text-[13px] font-semibold text-ink";

export function FieldError({ children }: { children: React.ReactNode }) {
  return <div className="mt-1.5 text-[12.5px] text-clay">{children}</div>;
}
