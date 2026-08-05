"use client";

import { useEffect } from "react";

export default function AmbientMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reduceMotion.matches || !finePointer.matches) return;

    const header = document.querySelector<HTMLElement>(
      "main.lg\\:pl-\\[216px\\] > section > div > header",
    );

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main.lg\\:pl-\\[216px\\] article",
      ),
    );

    cards.forEach((card) => card.classList.add("pa-hover-card"));

    if (!header) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;

      header.style.setProperty("--portrait-x", `${currentX * 9}px`);
      header.style.setProperty("--portrait-y", `${currentY * 6}px`);
      header.style.setProperty("--spot-x", `${50 + currentX * 18}%`);
      header.style.setProperty("--spot-y", `${46 + currentY * 14}%`);

      frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = header.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    header.classList.add("pa-ambient-hero");
    header.addEventListener("pointermove", onPointerMove);
    header.addEventListener("pointerleave", onPointerLeave);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      header.removeEventListener("pointermove", onPointerMove);
      header.removeEventListener("pointerleave", onPointerLeave);
      header.classList.remove("pa-ambient-hero");
      cards.forEach((card) => card.classList.remove("pa-hover-card"));
    };
  }, []);

  return null;
}
