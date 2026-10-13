"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPKR, getProduct } from "@/lib/products";
import {
  BykeaNote,
  ProductTile,
  QtyStepper,
  primaryBtn,
  secondaryBtn,
} from "@/components/shop/ui";

export default function CartView() {
  const { items, count, subtotal, ready, setQty, remove } = useCart();

  if (!ready) return <div className="min-h-[320px]" />;

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-sand bg-white px-6 py-16 text-center shadow-soft">
        <h2 className="mb-2.5 font-display text-[22px] font-black text-ink">
          Your cart is empty.
        </h2>
        <p className="mx-auto mb-7 max-w-[360px] text-[15px] text-body">
          Browse our fortified alternatives and add something to get started.
        </p>
        <Link href="/shop" className={primaryBtn}>
          Go to shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
      <ul className="divide-y divide-parchment rounded-3xl border border-sand bg-white px-5 shadow-soft sm:px-7">
        {items.map(({ id, qty }) => {
          const p = getProduct(id)!;
          return (
            <li key={id} className="flex items-center gap-4 py-6 sm:gap-5">
              <ProductTile product={p} />
              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[17px] font-black text-ink">
                    {p.name}
                  </div>
                  <div className="text-[13.5px] text-body">
                    {p.unit} · {formatPKR(p.price)} each
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(id)}
                    className="mt-1 cursor-pointer text-[13px] font-semibold text-clay hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <QtyStepper
                    value={qty}
                    onChange={(n) => setQty(id, n)}
                    label={`Quantity for ${p.name}`}
                  />
                  <div className="w-[90px] text-right font-display text-[17px] font-black text-ink">
                    {formatPKR(p.price * qty)}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="rounded-3xl border border-sand bg-white p-6 shadow-high sm:p-8 lg:sticky lg:top-[100px]">
        <h2 className="mb-5 font-display text-xl font-black text-ink">
          Order summary
        </h2>
        <dl className="mb-5 grid gap-3 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-body">Items ({count})</dt>
            <dd className="font-semibold text-ink">{formatPKR(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-body">Delivery</dt>
            <dd className="font-semibold text-ink">Bykea fee</dd>
          </div>
          <div className="flex justify-between border-t border-parchment pt-3">
            <dt className="font-semibold text-ink">Total</dt>
            <dd className="text-right font-display text-lg font-black text-ink">
              {formatPKR(subtotal)}
              <span className="block text-xs font-sans font-semibold text-forest">
                + Bykea delivery fee
              </span>
            </dd>
          </div>
        </dl>
        <div className="mb-6">
          <BykeaNote />
        </div>
        <Link href="/checkout" className={`${primaryBtn} w-full`}>
          Proceed to checkout →
        </Link>
        <Link href="/shop" className={`${secondaryBtn} mt-3 w-full`}>
          Continue shopping
        </Link>
        <p className="mt-4 text-center text-xs text-stone">
          Cash on Delivery · Pay when your order arrives
        </p>
      </aside>
    </div>
  );
}
