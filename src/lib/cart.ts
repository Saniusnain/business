import { useSyncExternalStore } from "react";
import { MAX_QTY, getProduct, type ProductId } from "@/lib/products";

export type CartItem = { id: ProductId; qty: number };

const KEY = "cravelab:cart";
const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();

const clamp = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.floor(n) || 1));

let cachedRaw: string | null = null;
let cached: CartItem[] = EMPTY;

function read(): CartItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const parsed = JSON.parse(raw ?? "[]");
    cached = Array.isArray(parsed)
      ? parsed
          .filter((i) => getProduct(i?.id) && Number.isFinite(i?.qty))
          .map((i) => ({ id: i.id, qty: clamp(i.qty) }))
      : EMPTY;
  } catch {
    cached = EMPTY;
  }
  return cached;
}

function write(items: CartItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => e.key === KEY && listener();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const noop = () => () => {};

export function useCart() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  // false during SSR/hydration, so pages can avoid flashing an empty cart
  const ready = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + (getProduct(i.id)?.price ?? 0) * i.qty,
    0,
  );

  const add = (id: ProductId, qty = 1) => {
    const cur = read();
    const existing = cur.find((i) => i.id === id);
    write(
      existing
        ? cur.map((i) => (i.id === id ? { ...i, qty: clamp(i.qty + qty) } : i))
        : [...cur, { id, qty: clamp(qty) }],
    );
  };
  const setQty = (id: ProductId, qty: number) =>
    write(read().map((i) => (i.id === id ? { ...i, qty: clamp(qty) } : i)));
  const remove = (id: ProductId) => write(read().filter((i) => i.id !== id));
  const clear = () => write([]);

  return { items, count, subtotal, ready, add, setQty, remove, clear };
}
