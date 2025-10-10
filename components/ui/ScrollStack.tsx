"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollStackItem {
  id: string | number;
  content: React.ReactNode;
}

interface ScrollStackProps {
  items: ScrollStackItem[];
  className?: string;
}

export default function ScrollStack({ items, className = "" }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {items.map((item, index) => {
        const y = useTransform(
          scrollYProgress,
          [index * (1 / items.length), (index + 1) * (1 / items.length)],
          [0, -100 * (items.length - index - 1)]
        );

        return (
          <motion.div
            key={item.id}
            className="sticky top-0 h-screen flex items-center justify-center"
            style={{ y }}
          >
            {item.content}
          </motion.div>
        );
      })}
    </div>
  );
}