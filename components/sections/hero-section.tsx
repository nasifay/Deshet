"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-auto lg:h-[90vh] flex items-center justify-start overflow-hidden bg-neutral-900">
      {/* Background Image */}
      <Image
        src="/home-hero.png"
        alt="Serving Ethiopian Youth"
        fill
        priority
        className="object-cover brightness-[0.8] scale-105 animate-slowZoom"
      />

      {/* Content */}
      <div className="relative z-10 max-sm:py-20 px-6 md:px-16 lg:px-24 max-w-2xl text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-roboto font-black text-lg sm:text-2xl md:text-4xl  lg:text-5xl 2xl:text-7xl leading-[1.05] tracking-tight uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]"
        >
          SERVING <br />
          <span className="text-[#18c76f] text-nowrap block">
            ETHIOPIAN YOUTH
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-10"
        >
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center px-6 py-2 md:px-12 md:py-4 rounded-full bg-[#128341] hover:bg-[#0e6a32] transition-all duration-300 font-roboto font-medium text-sm md:text-lg text-white shadow-[0_6px_20px_-5px_rgba(18,131,65,0.4)] hover:shadow-[0_10px_25px_-5px_rgba(18,131,65,0.6)] backdrop-blur-sm"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
