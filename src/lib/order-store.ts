import { useMemo, useSyncExternalStore } from "react";
import type { CartItem } from "@/lib/cart";
import type { Order, OrderForm } from "@/lib/orders";

const KEY = "cravelab:orders";

function parse(raw: string | null): Order[] {
  try {
    const parsed = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Saves to the database via /api/orders, then keeps a copy in this browser so
// the confirmation page can show it without exposing orders by id.
export async function placeOrder(
  form: OrderForm,
  cart: CartItem[],
): Promise<Order> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form, items: cart }),
  });
  if (!res.ok) throw new Error(`order_failed_${res.status}`);
  const order: Order = await res.json();
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify([...parse(localStorage.getItem(KEY)), order]),
    );
  } catch {}
  return order;
}

const noop = () => () => {};
const readRaw = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

/** undefined while hydrating, null when this browser has no such order. */
export function useOrder(id: string): Order | null | undefined {
  const raw = useSyncExternalStore(noop, readRaw, () => undefined);
  return useMemo(
    () =>
      raw === undefined
        ? undefined
        : (parse(raw).find((o) => o.orderId === id) ?? null),
    [raw, id],
  );
}
