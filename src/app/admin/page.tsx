import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import { ORDER_STATUSES, type Order, type OrderStatus } from "@/lib/orders";
import { formatPKR } from "@/lib/products";
import { logout, updateStatus } from "@/app/admin/actions";
import { inputClasses } from "@/components/form";

type Row = {
  id: string;
  created_at: Date;
  status: OrderStatus;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  area: string;
  city: string;
  postal_code: string | null;
  notes: string | null;
  items: Order["items"];
  subtotal: number;
};

const BADGE: Record<OrderStatus, string> = {
  pending: "bg-[#fff4d6] text-[#8a6100]",
  confirmed: "bg-[#e3eefc] text-[#1f4f8f]",
  dispatched: "bg-[#efe6fb] text-[#5b3696]",
  delivered: "bg-leaf/[0.12] text-leaf",
  cancelled: "bg-moss text-clay",
};

const label = (s: string) => s[0].toUpperCase() + s.slice(1);

// 0300 1234567 / +92 300 1234567 → 923001234567 for wa.me links
const waNumber = (phone: string) =>
  phone.replace(/\D/g, "").replace(/^0092/, "92").replace(/^0/, "92");

const dateFmt = new Intl.DateTimeFormat("en-PK", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Karachi",
});

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();

  const sp = await searchParams;
  const status = ORDER_STATUSES.includes(sp.status as OrderStatus)
    ? (sp.status as OrderStatus)
    : null;
  const q = typeof sp.q === "string" && sp.q.trim() ? sp.q.trim() : null;
  const like = q && `%${q}%`;

  const sql = getSql();
  // ponytail: capped at 200 rows, add pagination when order volume needs it.
  const [rows, counts] = (await Promise.all([
    sql`
      select * from orders
      where (${status}::text is null or status = ${status})
        and (${like}::text is null
          or id ilike ${like} or customer_name ilike ${like}
          or phone ilike ${like} or city ilike ${like})
      order by created_at desc
      limit 200`,
    sql`
      select status, count(*)::int as n, coalesce(sum(subtotal), 0)::int as total
      from orders group by status`,
  ])) as [Row[], { status: OrderStatus; n: number; total: number }[]];

  const countOf = (s: OrderStatus) =>
    counts.find((c) => c.status === s)?.n ?? 0;
  const allCount = counts.reduce((n, c) => n + c.n, 0);
  const deliveredTotal =
    counts.find((c) => c.status === "delivered")?.total ?? 0;
  const openTotal = counts
    .filter((c) => c.status !== "delivered" && c.status !== "cancelled")
    .reduce((n, c) => n + c.total, 0);

  const href = (s: OrderStatus | null) => {
    const p = new URLSearchParams();
    if (s) p.set("status", s);
    if (q) p.set("q", q);
    const qs = p.toString();
    return qs ? `/admin?${qs}` : "/admin";
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-parchment bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-6 py-3.5">
          <Link href="/" className="flex items-center gap-[11px]">
            <Image
              src="/logo.png"
              alt="CraveLab"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-script text-[22px] leading-none text-ink">
              CraveLab
            </span>
          </Link>
          <span className="rounded-full bg-moss px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink">
            Admin
          </span>
          <form action={logout} className="ml-auto">
            <button
              type="submit"
              className="cursor-pointer rounded-full border border-parchment px-4 py-2 text-sm font-semibold text-ink hover:bg-moss"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <h1 className="mb-6 font-display text-[32px] font-black text-ink">
          Orders
        </h1>

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            ["Total orders", String(allCount)],
            ["Awaiting confirmation", String(countOf("pending"))],
            ["Open order value", formatPKR(openTotal)],
            ["Delivered sales", formatPKR(deliveredTotal)],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-lg border border-sand bg-white p-5 shadow-soft"
            >
              <div className="text-xs font-medium text-stone">{k}</div>
              <div className="font-display text-[24px] font-black text-ink">
                {v}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
            {[null, ...ORDER_STATUSES].map((s) => (
              <Link
                key={s ?? "all"}
                href={href(s)}
                aria-current={s === status ? "page" : undefined}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  s === status
                    ? "border-ink bg-ink text-white"
                    : "border-parchment bg-white text-ink hover:bg-moss"
                }`}
              >
                {s ? label(s) : "All"}{" "}
                <span className="opacity-60">{s ? countOf(s) : allCount}</span>
              </Link>
            ))}
          </nav>
          <form action="/admin" className="ml-auto flex w-full gap-2 sm:w-auto">
            {status && <input type="hidden" name="status" value={status} />}
            <input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search order, name, phone, city"
              aria-label="Search orders"
              className={`${inputClasses} py-2.5 sm:w-[300px]`}
            />
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-ink px-5 text-sm font-semibold text-white"
            >
              Search
            </button>
          </form>
        </div>

        {rows.length === 0 ? (
          <div className="rounded-3xl border border-sand bg-white px-6 py-16 text-center text-body shadow-soft">
            No orders {status || q ? "match these filters" : "yet"}.
          </div>
        ) : (
          <ul className="grid gap-5">
            {rows.map((o) => (
              <li
                key={o.id}
                className="rounded-3xl border border-sand bg-white p-6 shadow-soft"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3 border-b border-parchment pb-4">
                  <span className="font-display text-lg font-black tracking-wide text-ink">
                    {o.id}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${BADGE[o.status]}`}
                  >
                    {o.status}
                  </span>
                  <span className="text-sm text-stone">
                    {dateFmt.format(new Date(o.created_at))}
                  </span>
                  <span className="ml-auto font-display text-lg font-black text-ink">
                    {formatPKR(o.subtotal)}
                    <span className="ml-1 font-sans text-xs font-semibold text-forest">
                      + Bykea
                    </span>
                  </span>
                </div>

                <div className="grid gap-6 text-[14.5px] md:grid-cols-3">
                  <div>
                    <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-stone">
                      Customer
                    </div>
                    <div className="font-semibold text-ink">
                      {o.customer_name}
                    </div>
                    <a href={`tel:${o.phone}`} className="block text-leaf">
                      {o.phone}
                    </a>
                    {o.email && (
                      <a href={`mailto:${o.email}`} className="block text-leaf">
                        {o.email}
                      </a>
                    )}
                    <a
                      href={`https://wa.me/${waNumber(o.phone)}?text=${encodeURIComponent(
                        `Hi ${o.customer_name}, this is CraveLab about your order ${o.id}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block rounded-full bg-leaf/[0.12] px-3 py-1 text-xs font-semibold text-leaf"
                    >
                      WhatsApp customer
                    </a>
                  </div>
                  <div>
                    <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-stone">
                      Deliver to
                    </div>
                    <address className="not-italic leading-[1.55] text-ink">
                      {o.address}
                      <br />
                      {o.area}, {o.city}
                      {o.postal_code && ` ${o.postal_code}`}
                    </address>
                    {o.notes && (
                      <p className="mt-2 rounded-lg bg-moss px-3 py-2 text-[13.5px] text-ink">
                        {o.notes}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-stone">
                      Items · Cash on Delivery
                    </div>
                    <ul className="grid gap-1">
                      {o.items.map((i) => (
                        <li key={i.id} className="flex justify-between gap-3">
                          <span className="text-ink">
                            {i.name}{" "}
                            <span className="text-body">
                              ({i.unit}) × {i.qty}
                            </span>
                          </span>
                          <span className="whitespace-nowrap font-semibold text-ink">
                            {formatPKR(i.lineTotal)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <form
                  key={o.status}
                  action={updateStatus}
                  className="mt-5 flex flex-wrap items-center gap-3 border-t border-parchment pt-4"
                >
                  <input type="hidden" name="id" value={o.id} />
                  <label
                    htmlFor={`status-${o.id}`}
                    className="text-sm font-semibold text-ink"
                  >
                    Status
                  </label>
                  <select
                    id={`status-${o.id}`}
                    name="status"
                    defaultValue={o.status}
                    className="cursor-pointer rounded-xl border border-parchment bg-cream px-3 py-2 text-sm text-ink"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {label(s)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white"
                  >
                    Update
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
