"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import WhyCraveLab from "@/components/WhyCraveLab";
import Solution from "@/components/Solution";
import Innovations from "@/components/Innovations";
import Process from "@/components/Process";
import Recognition from "@/components/Recognition";
import Vision from "@/components/Vision";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <WhyCraveLab />
        <Solution />
        <Innovations />
        <Process />
        <Recognition />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
