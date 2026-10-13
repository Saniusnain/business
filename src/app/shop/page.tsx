import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import ProductCard from "@/components/shop/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { CONTACT_PHONE, CONTACT_WHATSAPP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Order CraveLab's fortified sand- and chalk-inspired edible alternatives. Cash on delivery across Pakistan via Bykea.",
  alternates: { canonical: "/shop" },
};

const INFO = [
  {
    title: "Delivered by Bykea",
    desc: "Your order is handed to a Bykea rider. The delivery fee depends on distance and is paid to the rider.",
  },
  {
    title: "Cash on Delivery",
    desc: "Pay for your items plus the Bykea fee in cash when your order arrives. No card needed.",
  },
  {
    title: "We confirm every order",
    desc: "Our team calls or WhatsApps you on the number you provide to confirm before dispatch.",
  },
];

export default function ShopPage() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <main className="px-6 pb-[110px] pt-[130px] md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <Eyebrow>Shop</Eyebrow>
          <h1 className="mb-5 font-display text-[clamp(32px,4.4vw,52px)] font-black leading-[1.08] text-ink [text-wrap:balance]">
            Safer alternatives, delivered.
          </h1>
          <p className="mb-14 max-w-[680px] text-lg leading-[1.62] text-body">
            Our first two fortified edible alternatives — made from food-grade
            ingredients and designed to feel familiar to the craving. Each is{" "}
            <strong className="text-ink">Rs 250</strong>, paid on delivery.
          </p>

          <div className="grid gap-7 md:grid-cols-2">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {INFO.map((i) => (
              <div
                key={i.title}
                className="rounded-lg border border-sand bg-white p-7 shadow-soft"
              >
                <h3 className="mb-2 font-display text-lg font-black text-ink">
                  {i.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-body">
                  {i.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-body">
            Questions before ordering?{" "}
            <a
              href={`https://wa.me/${CONTACT_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-leaf underline underline-offset-4"
            >
              WhatsApp us at {CONTACT_PHONE}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
