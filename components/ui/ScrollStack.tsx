"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollStackItem {
  id: string | number;
  content: React.ReactNode;
}

interface ScrollStackProps {
  items: ScrollStackItem[];
  className?: string;
  /**
   * Distance in pixels that cards move up when stacking
   * @default 100
   */
  stackDistance?: number;
  /**
   * Whether to apply scale animation to cards
   * @default true
   */
  scaleAnimation?: boolean;
  /**
   * Whether to apply opacity animation to cards
   * @default true
   */
  opacityAnimation?: boolean;
}

function ScrollStackCard({
  item,
  index,
  itemsLength,
  scrollYProgress,
  stackDistance = 100,
  scaleAnimation = true,
  opacityAnimation = true,
}: {
  item: ScrollStackItem;
  index: number;
  itemsLength: number;
  scrollYProgress: MotionValue<number>;
  stackDistance?: number;
  scaleAnimation?: boolean;
  opacityAnimation?: boolean;
}) {
  // Calculate the scroll range for this card
  const cardScrollStart = index / itemsLength;
  const cardScrollEnd = (index + 1) / itemsLength;

  // Y-axis translation - cards move up as you scroll
  const y = useTransform(
    scrollYProgress,
    [cardScrollStart, cardScrollEnd],
    [0, -stackDistance]
  );

  // Scale animation - cards slightly shrink as they stack
  const scaleValue = useTransform(
    scrollYProgress,
    [cardScrollStart, cardScrollEnd],
    [1, 0.95]
  );
  const scale = scaleAnimation ? scaleValue : 1;

  // Opacity animation - cards fade slightly as they stack
  const opacityValue = useTransform(
    scrollYProgress,
    [cardScrollStart, cardScrollEnd],
    [1, 0.8]
  );
  const opacity = opacityAnimation ? opacityValue : 1;

  // Z-index to ensure proper stacking order - later cards appear on top
  const zIndex = index + 1;

  return (
    <motion.div
      className="sticky top-0 h-auto sm:h-screen flex items-center justify-center will-change-transform py-4 sm:py-0"
      style={{
        y,
        scale,
        opacity,
        zIndex,
      }}
    >
      {item.content}
    </motion.div>
  );
}

export default function ScrollStack({
  items,
  className = "",
  stackDistance = 40,
  scaleAnimation = true,
  opacityAnimation = true,
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate dynamic height: each item needs 100vh, with some buffer
  const dynamicHeight = `${items.length - 1 * 100}vh`;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: dynamicHeight }}
    >
      {items.map((item, index) => (
        <ScrollStackCard
          key={item.id}
          item={item}
          index={index}
          itemsLength={items.length}
          scrollYProgress={scrollYProgress}
          stackDistance={stackDistance}
          scaleAnimation={scaleAnimation}
          opacityAnimation={opacityAnimation}
        />
      ))}
    </div>
  );
}
