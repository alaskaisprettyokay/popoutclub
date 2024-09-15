'use client';
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawEnneagram(); // Redraw when resized
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawEnneagram() {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4; // Adjust radius based on screen size

      // Enneagram points based on angles
      const points = [];
      const numPoints = 9;
      const offsetAngle = Math.PI / 2 - 2 * Math.PI / 9; // Rotate the shape to start at the top

      //Colors
      const colors = ['#24116A', '#734DFF', '#FF45C5', '#FAC502', '#000000'];
      const gradient = ctx.createLinearGradient(0, 0, width, height);

      

      // Calculate coordinates
      for (let i = 0; i < numPoints; i++) {
        const angle = (2 * Math.PI * i) / numPoints - offsetAngle;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push({ x, y });
      }

      // Enneagram connection pattern
      const triangleConnections = [[2, 5], [5, 8], [8, 2]];
      const hexagramConnections = [[0, 3], [3, 1], [1, 7], [7, 4], [4, 6], [6, 0]];

      //Add color stops with lerp
      colors.forEach((color, index) => {
        const stop = index / (colors.length - 1);
        gradient.addColorStop(stop, color);
      });


      // Set stroke properties
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;

      // Draw triangle (3-6-9)
      triangleConnections.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(points[connection[0]].x, points[connection[0]].y);
        ctx.lineTo(points[connection[1]].x, points[connection[1]].y);
        ctx.stroke();
      });

      // Draw hexagram
      hexagramConnections.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(points[connection[0]].x, points[connection[0]].y);
        ctx.lineTo(points[connection[1]].x, points[connection[1]].y);
        ctx.stroke();
      });
    }

    drawEnneagram();

    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawEnneagram();
      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  return (
    <>
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative z-10">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>

    </div>
    </>
  );
}
