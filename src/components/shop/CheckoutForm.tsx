"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import {
  ORDER_LIMITS,
  validateOrderForm,
  type OrderErrors,
  type OrderForm,
} from "@/lib/orders";
import { placeOrder } from "@/lib/order-store";
import { formatPKR, getProduct } from "@/lib/products";
import { FieldError, inputClasses, labelClasses } from "@/components/form";
import { CONTACT_WHATSAPP } from "@/lib/site";
import { BykeaNote, ProductTile, primaryBtn } from "@/components/shop/ui";

const CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Hyderabad",
];

export default function CheckoutForm() {
  const router = useRouter();
  const { items, count, subtotal, ready, clear } = useCart();
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [failed, setFailed] = useState(false);
  const [form, setForm] = useState<OrderForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    area: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  if (!ready) return <div className="min-h-[320px]" />;

  if (!items.length && !placing) {
    return (
      <div className="rounded-3xl border border-sand bg-white px-6 py-16 text-center shadow-soft">
        <h2 className="mb-2.5 font-display text-[22px] font-black text-ink">
          Your cart is empty.
        </h2>
        <p className="mx-auto mb-7 max-w-[360px] text-[15px] text-body">
          Add a product before checking out.
        </p>
        <Link href="/shop" className={primaryBtn}>
          Go to shop →
        </Link>
      </div>
    );
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validateOrderForm(form);
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`co-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setPlacing(true);
    setFailed(false);
    try {
      const order = await placeOrder(form, items);
      router.push(`/order/${order.orderId}`);
      clear();
    } catch {
      setPlacing(false);
      setFailed(true);
    }
  };

  const field = (
    key: keyof OrderForm,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> & {
      optional?: boolean;
    } = {},
  ) => {
    const { optional, ...rest } = props;
    return (
      <div>
        <label htmlFor={`co-${key}`} className={labelClasses}>
          {label}
          {optional && (
            <span className="font-normal text-stone"> (optional)</span>
          )}
        </label>
        <input
          id={`co-${key}`}
          value={form[key]}
          maxLength={ORDER_LIMITS[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          aria-invalid={!!errors[key] || undefined}
          aria-describedby={errors[key] ? `co-${key}-err` : undefined}
          className={inputClasses}
          {...rest}
        />
        {errors[key] && (
          <div id={`co-${key}-err`}>
            <FieldError>{errors[key]}</FieldError>
          </div>
        )}
      </div>
    );
  };

  const section =
    "rounded-3xl border border-sand bg-white p-6 shadow-soft sm:p-8";
  const heading =
    "mb-5 flex items-center gap-3 font-display text-lg font-black text-ink";
  const step =
    "flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[13px] text-white";

  return (
    <form
      onSubmit={submit}
      noValidate
      className="grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]"
    >
      <div className="flex flex-col gap-6">
        <section className={section}>
          <h2 className={heading}>
            <span className={step}>1</span> Contact details
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              {field("name", "Full name", {
                autoComplete: "name",
                placeholder: "Your full name",
              })}
            </div>
            {field("phone", "Mobile number", {
              type: "tel",
              autoComplete: "tel",
              inputMode: "tel",
              placeholder: "0300 1234567",
            })}
            {field("email", "Email", {
              type: "email",
              autoComplete: "email",
              placeholder: "you@example.com",
              optional: true,
            })}
          </div>
          <p className="mt-4 text-[13px] text-stone">
            We&apos;ll call or WhatsApp this number to confirm your order, and
            the Bykea rider will use it on delivery.
          </p>
        </section>

        <section className={section}>
          <h2 className={heading}>
            <span className={step}>2</span> Delivery address
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              {field("address", "Street address", {
                autoComplete: "address-line1",
                placeholder: "House / flat no., street, building",
              })}
            </div>
            <div className="sm:col-span-2">
              {field("area", "Area / locality", {
                autoComplete: "address-line2",
                placeholder: "e.g. DHA Phase 5, Gulshan-e-Iqbal",
              })}
            </div>
            {field("city", "City", {
              autoComplete: "address-level2",
              placeholder: "City",
              list: "co-cities",
            })}
            <datalist id="co-cities">
              {CITIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {field("postalCode", "Postal code", {
              autoComplete: "postal-code",
              inputMode: "numeric",
              placeholder: "75500",
              optional: true,
            })}
            <div className="sm:col-span-2">
              <label htmlFor="co-notes" className={labelClasses}>
                Delivery notes{" "}
                <span className="font-normal text-stone">(optional)</span>
              </label>
              <textarea
                id="co-notes"
                rows={3}
                maxLength={ORDER_LIMITS.notes}
                placeholder="Landmark, preferred delivery time, gate instructions…"
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                className={`${inputClasses} resize-y`}
              />
            </div>
          </div>
        </section>

        <section className={section}>
          <h2 className={heading}>
            <span className={step}>3</span> Payment
          </h2>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-leaf bg-cream p-4">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked
              readOnly
              className="mt-1 h-4 w-4 accent-[#3a5615]"
            />
            <span>
              <span className="block font-semibold text-ink">
                Cash on Delivery
              </span>
              <span className="text-[13.5px] text-body">
                Pay {formatPKR(subtotal)} for your items plus the Bykea delivery
                fee in cash when your order arrives.
              </span>
            </span>
          </label>
        </section>
      </div>

      <aside className="rounded-3xl border border-sand bg-white p-6 shadow-high sm:p-8 lg:sticky lg:top-[100px]">
        <h2 className="mb-5 font-display text-xl font-black text-ink">
          Order summary
        </h2>
        <ul className="mb-5 grid gap-4">
          {items.map(({ id, qty }) => {
            const p = getProduct(id)!;
            return (
              <li key={id} className="flex items-center gap-3.5">
                <div className="relative">
                  <ProductTile product={p} />
                  <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-ink px-1.5 text-xs font-semibold text-white">
                    {qty}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold leading-tight text-ink">
                    {p.name}
                  </div>
                  <div className="text-[13px] text-body">
                    {p.unit} · {formatPKR(p.price)} × {qty}
                  </div>
                </div>
                <div className="font-semibold text-ink">
                  {formatPKR(p.price * qty)}
                </div>
              </li>
            );
          })}
        </ul>
        <dl className="mb-5 grid gap-3 border-t border-parchment pt-4 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-body">Items ({count})</dt>
            <dd className="font-semibold text-ink">{formatPKR(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-body">Delivery (Bykea)</dt>
            <dd className="font-semibold text-ink">Paid to rider</dd>
          </div>
          <div className="flex justify-between border-t border-parchment pt-3">
            <dt className="font-semibold text-ink">Total</dt>
            <dd className="text-right font-display text-lg font-black text-ink">
              {formatPKR(subtotal)}
              <span className="block font-sans text-xs font-semibold text-forest">
                + Bykea delivery fee
              </span>
            </dd>
          </div>
        </dl>
        <div className="mb-6">
          <BykeaNote />
        </div>
        <button
          type="submit"
          disabled={placing}
          className={`${primaryBtn} w-full`}
        >
          {placing
            ? "Placing order…"
            : `Place order · ${formatPKR(subtotal)} + delivery`}
        </button>
        {failed && (
          <FieldError>
            We couldn&apos;t place your order. Please try again, or{" "}
            <a
              href={`https://wa.me/${CONTACT_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              WhatsApp us
            </a>
            .
          </FieldError>
        )}
        <p className="mt-4 text-center text-xs text-stone">
          By placing this order you agree to pay on delivery.{" "}
          <Link href="/cart" className="underline underline-offset-2">
            Edit cart
          </Link>
        </p>
      </aside>
    </form>
  );
}
