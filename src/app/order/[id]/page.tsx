import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderConfirmation from "@/components/shop/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <main className="px-6 pb-[110px] pt-[130px] md:px-8">
        <OrderConfirmation id={id} />
      </main>
      <Footer />
    </div>
  );
}
