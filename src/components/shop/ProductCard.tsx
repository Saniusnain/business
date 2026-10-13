"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPKR, type Product } from "@/lib/products";
import { ProductTile, QtyStepper, primaryBtn } from "@/components/shop/ui";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 2500);
    return () => window.clearTimeout(t);
  }, [added]);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-sand bg-white shadow-soft transition-shadow duration-300 hover:shadow-high">
      <div className="relative p-5 pb-0">
        <ProductTile product={product} size="lg" />
        <span className="absolute left-9 top-9 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-leaf shadow-soft">
          {product.unit}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-display text-[24px] font-black leading-tight text-ink">
            {product.name}
          </h2>
          <div className="font-display text-[24px] font-black text-leaf">
            {formatPKR(product.price)}
          </div>
        </div>
        <p className="mb-4 text-[15px] font-semibold text-forest">
          {product.tagline}
        </p>
        <p className="mb-6 text-[15px] leading-[1.65] text-body">
          {product.description}
        </p>

        <ul className="mb-6 grid gap-2.5">
          {product.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2.5 text-[14.5px] text-ink"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="mt-[3px] shrink-0"
              >
                <path
                  d="M5 12.5l4 4 10-10"
                  stroke="#3A5615"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {h}
            </li>
          ))}
        </ul>

        <dl className="mb-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-parchment bg-parchment text-[13.5px]">
          {[
            ["Pack size", product.unit],
            ["In the box", product.inTheBox],
            [
              "Price",
              `${formatPKR(product.price)} / ${product.unit.toLowerCase()}`,
            ],
            ["Ingredients", product.ingredients ?? "Full label on pack"],
          ].map(([k, v]) => (
            <div key={k} className="bg-cream px-4 py-3">
              <dt className="text-xs font-medium text-stone">{k}</dt>
              <dd className="font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          <QtyStepper
            value={qty}
            onChange={setQty}
            label={`Quantity for ${product.name}`}
          />
          <button
            type="button"
            onClick={() => {
              add(product.id, qty);
              setAdded(true);
              setQty(1);
            }}
            className={`${primaryBtn} flex-1`}
          >
            {added
              ? "Added to cart ✓"
              : `Add to cart · ${formatPKR(product.price * qty)}`}
          </button>
        </div>
        <div aria-live="polite" className="mt-3 min-h-[22px] text-sm">
          {added && (
            <Link
              href="/cart"
              className="font-semibold text-leaf underline underline-offset-4"
            >
              View cart & checkout →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
