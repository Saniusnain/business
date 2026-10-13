"use client";

import Link from "next/link";
import { useOrder } from "@/lib/order-store";
import { formatPKR } from "@/lib/products";
import { CONTACT_PHONE, CONTACT_WHATSAPP } from "@/lib/site";
import { BykeaNote, primaryBtn, secondaryBtn } from "@/components/shop/ui";

export default function OrderConfirmation({ id }: { id: string }) {
  const order = useOrder(id);

  if (order === undefined) return <div className="min-h-[320px]" />;

  if (order === null) {
    return (
      <div className="rounded-3xl border border-sand bg-white px-6 py-16 text-center shadow-soft">
        <h1 className="mb-2.5 font-display text-[24px] font-black text-ink">
          Order not found.
        </h1>
        <p className="mx-auto mb-7 max-w-[420px] text-[15px] text-body">
          We couldn&apos;t find order <strong className="text-ink">{id}</strong>{" "}
          in this browser. If you placed it on another device, WhatsApp us at{" "}
          {CONTACT_PHONE} with your order number.
        </p>
        <Link href="/shop" className={primaryBtn}>
          Go to shop →
        </Link>
      </div>
    );
  }

  const { customer, shipping } = order;
  const whatsapp = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(
    `Hi CraveLab, I just placed order ${order.orderId} on your website.`,
  )}`;
  const placedAt = new Date(order.createdAt).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="mx-auto max-w-[760px]">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-[22px] flex h-16 w-16 items-center justify-center rounded-full bg-leaf/[0.14]">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12.5l4 4 10-10"
              stroke="#3A5615"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="mb-3 font-display text-[clamp(28px,3.6vw,40px)] font-black leading-[1.12] text-ink">
          Thank you, {customer.name.split(" ")[0]}!
        </h1>
        <p className="mx-auto max-w-[480px] text-[16px] leading-relaxed text-body">
          Your order has been placed. We&apos;ll call or WhatsApp you on{" "}
          <strong className="text-ink">{customer.phone}</strong>
          {" to confirm before it's dispatched with Bykea."}
        </p>
      </div>

      <div className="rounded-3xl border border-sand bg-white p-6 shadow-high sm:p-9">
        <div className="mb-6 flex flex-wrap justify-between gap-4 border-b border-parchment pb-6">
          <div>
            <div className="text-xs font-medium text-stone">Order number</div>
            <div className="font-display text-xl font-black tracking-wide text-ink">
              {order.orderId}
            </div>
          </div>
          <div className="sm:text-right">
            <div className="text-xs font-medium text-stone">Placed on</div>
            <div className="font-semibold text-ink">{placedAt}</div>
          </div>
        </div>

        <ul className="mb-6 grid gap-3">
          {order.items.map((i) => (
            <li key={i.id} className="flex justify-between gap-4 text-[15px]">
              <span className="text-ink">
                {i.name}{" "}
                <span className="text-body">
                  · {i.unit} · {formatPKR(i.price)} × {i.qty}
                </span>
              </span>
              <span className="whitespace-nowrap font-semibold text-ink">
                {formatPKR(i.lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mb-6 grid gap-3 border-t border-parchment pt-4 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-body">Items</dt>
            <dd className="font-semibold text-ink">
              {formatPKR(order.subtotal)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-body">Delivery (Bykea)</dt>
            <dd className="font-semibold text-ink">Paid to rider</dd>
          </div>
          <div className="flex justify-between border-t border-parchment pt-3">
            <dt className="font-semibold text-ink">Pay on delivery</dt>
            <dd className="text-right font-display text-lg font-black text-ink">
              {formatPKR(order.subtotal)}
              <span className="block font-sans text-xs font-semibold text-forest">
                + Bykea delivery fee
              </span>
            </dd>
          </div>
        </dl>

        <div className="mb-6">
          <BykeaNote />
        </div>

        <div className="grid gap-6 text-[14.5px] sm:grid-cols-2">
          <div>
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-stone">
              Delivering to
            </div>
            <address className="not-italic leading-[1.6] text-ink">
              {customer.name}
              <br />
              {shipping.address}
              <br />
              {shipping.area}, {shipping.city}
              {shipping.postalCode && ` ${shipping.postalCode}`}
              <br />
              {customer.phone}
              {customer.email && (
                <>
                  <br />
                  {customer.email}
                </>
              )}
            </address>
            {shipping.notes && (
              <p className="mt-2 text-body">Note: {shipping.notes}</p>
            )}
          </div>
          <div>
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-stone">
              Payment
            </div>
            <p className="mb-4 text-ink">Cash on Delivery</p>
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-stone">
              What happens next
            </div>
            <ol className="list-decimal pl-4 leading-[1.6] text-body">
              <li>We confirm your order by phone or WhatsApp.</li>
              <li>A Bykea rider picks it up and delivers it.</li>
              <li>You pay the rider for items + delivery.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={primaryBtn}
        >
          Message us on WhatsApp
        </a>
        <Link href="/shop" className={secondaryBtn}>
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
