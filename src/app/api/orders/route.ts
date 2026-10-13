import { getSql } from "@/lib/db";
import type { CartItem } from "@/lib/cart";
import {
  ORDER_LIMITS,
  buildOrder,
  validateOrderForm,
  type OrderForm,
} from "@/lib/orders";
import { MAX_QTY, PRODUCTS, getProduct } from "@/lib/products";

function parseForm(raw: unknown): OrderForm | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const form = {} as OrderForm;
  for (const key of Object.keys(ORDER_LIMITS) as (keyof OrderForm)[]) {
    const v = r[key] ?? "";
    if (typeof v !== "string") return null;
    form[key] = v;
  }
  return form;
}

function parseItems(raw: unknown): CartItem[] | null {
  if (!Array.isArray(raw) || !raw.length || raw.length > PRODUCTS.length)
    return null;
  const items: CartItem[] = [];
  for (const i of raw) {
    const qty = i?.qty;
    if (
      !getProduct(i?.id) ||
      !Number.isInteger(qty) ||
      qty < 1 ||
      qty > MAX_QTY ||
      items.some((x) => x.id === i.id)
    )
      return null;
    items.push({ id: i.id, qty });
  }
  return items;
}

export async function POST(request: Request) {
  let body: { form?: unknown; items?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const form = parseForm(body?.form);
  const items = parseItems(body?.items);
  if (!form || !items) {
    return Response.json({ error: "invalid_order" }, { status: 400 });
  }
  const errors = validateOrderForm(form);
  if (Object.keys(errors).length) {
    return Response.json({ error: "invalid_fields", errors }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    console.error("Order not saved: DATABASE_URL is not set");
    return Response.json({ error: "db_not_configured" }, { status: 503 });
  }

  const orderId = `CL-${Date.now().toString(36)}${crypto
    .randomUUID()
    .slice(0, 4)}`.toUpperCase();
  const order = buildOrder(orderId, form, items);
  const { customer: c, shipping: s } = order;

  try {
    await getSql()`
      insert into orders (
        id, created_at, status, customer_name, phone, email,
        address, area, city, postal_code, notes,
        items, subtotal, payment_method, delivery
      ) values (
        ${order.orderId}, ${order.createdAt}, ${order.status},
        ${c.name}, ${c.phone}, ${c.email || null},
        ${s.address}, ${s.area}, ${s.city}, ${s.postalCode || null},
        ${s.notes || null}, ${JSON.stringify(order.items)}, ${order.subtotal},
        ${order.paymentMethod}, ${order.delivery}
      )`;
  } catch (err) {
    console.error("Order insert failed:", err);
    return Response.json({ error: "save_failed" }, { status: 502 });
  }

  return Response.json(order, { status: 201 });
}
