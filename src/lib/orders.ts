import { getProduct } from "@/lib/products";
import type { CartItem } from "@/lib/cart";

export type OrderForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  city: string;
  postalCode: string;
  notes: string;
};

// Must match the check constraint in db/schema.sql.
export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "dispatched",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type Order = {
  orderId: string;
  createdAt: string;
  customer: { name: string; phone: string; email: string };
  shipping: {
    address: string;
    area: string;
    city: string;
    postalCode: string;
    notes: string;
  };
  items: {
    id: string;
    name: string;
    unit: string;
    price: number;
    qty: number;
    lineTotal: number;
  }[];
  subtotal: number;
  delivery: "bykea_on_delivery";
  paymentMethod: "cod";
  status: OrderStatus;
};

export const ORDER_LIMITS: Record<keyof OrderForm, number> = {
  name: 120,
  phone: 20,
  email: 200,
  address: 300,
  area: 120,
  city: 80,
  postalCode: 10,
  notes: 500,
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// 03XXXXXXXXX, +923XXXXXXXXX or 00923XXXXXXXXX (spaces/dashes ignored)
const PK_MOBILE_RE = /^(?:\+92|0092|0)3\d{9}$/;

export type OrderErrors = Partial<Record<keyof OrderForm, string>>;

// Shared by the checkout form and /api/orders.
export function validateOrderForm(f: OrderForm): OrderErrors {
  const e: OrderErrors = {};
  if (!f.name.trim()) e.name = "Please enter your full name.";
  if (!PK_MOBILE_RE.test(f.phone.replace(/[\s-]/g, "")))
    e.phone = "Enter a Pakistani mobile number, e.g. 0300 1234567.";
  if (f.email.trim() && !EMAIL_RE.test(f.email.trim()))
    e.email = "Please enter a valid email address.";
  if (!f.address.trim()) e.address = "Please enter your street address.";
  if (!f.area.trim()) e.area = "Please enter your area or locality.";
  if (!f.city.trim()) e.city = "Please enter your city.";
  if (f.postalCode.trim() && !/^\d{5}$/.test(f.postalCode.trim()))
    e.postalCode = "Postal codes are 5 digits.";
  for (const k of Object.keys(ORDER_LIMITS) as (keyof OrderForm)[])
    if (f[k].length > ORDER_LIMITS[k]) e[k] ??= "This is too long.";
  return e;
}

// Prices always come from the catalog, never from the client.
export function buildOrder(
  orderId: string,
  form: OrderForm,
  cart: CartItem[],
): Order {
  const items = cart.flatMap(({ id, qty }) => {
    const p = getProduct(id);
    return p
      ? [
          {
            id,
            name: p.name,
            unit: p.unit,
            price: p.price,
            qty,
            lineTotal: p.price * qty,
          },
        ]
      : [];
  });

  const t = (s: string) => s.trim();
  return {
    orderId,
    createdAt: new Date().toISOString(),
    customer: {
      name: t(form.name),
      phone: t(form.phone),
      email: t(form.email),
    },
    shipping: {
      address: t(form.address),
      area: t(form.area),
      city: t(form.city),
      postalCode: t(form.postalCode),
      notes: t(form.notes),
    },
    items,
    subtotal: items.reduce((s, i) => s + i.lineTotal, 0),
    delivery: "bykea_on_delivery",
    paymentMethod: "cod",
    status: "pending",
  };
}
