import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/shop/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <main className="px-6 pb-[110px] pt-[130px] md:px-8">
        <div className="mx-auto max-w-[1160px]">
          <h1 className="mb-9 font-display text-[clamp(28px,3.6vw,44px)] font-black leading-[1.12] text-ink">
            Checkout
          </h1>
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
