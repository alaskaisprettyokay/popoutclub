'use client';
import { useEffect, useRef, useState } from "react";
import { Bayon, Azeret_Mono } from 'next/font/google';
import Marquee from 'react-fast-marquee'
import { useRouter } from 'next/navigation';

const bayon = Bayon({
  weight: '400',
  subsets: ['latin'],
});

const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-azeret-mono',
})

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [password, setPassword] = useState('');
  const router = useRouter();

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
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4; // Adjust radius based on screen size

      // Enneagram points based on angles
      const points: { x: number; y: number }[] = [];
      const numPoints = 9;
      const offsetAngle = Math.PI / 2 - 2 * Math.PI / 9; // Rotate the shape to start at the top

      //Colors
      const colors = ['#24116A', '#734DFF', '#FF45C5', '#FAC502', '#000000'];
      if (!ctx) return;
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
      ctx.lineWidth = 1;

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
      if (ctx && canvas) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawEnneagram();
      }
      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'popout') {
      sessionStorage.setItem('isPasswordValid', 'true'); // Store validation state
      router.push('/2025');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <>
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative z-10">
      <main className="flex flex-col gap-8 row-start-2 items-center max-w-[70%] mx-auto">
        <Marquee gradient={false} speed={30} direction="right">
          <p className="inline-block text-sm font-[family-name:var(--font-geist-mono)] marquee-text">
            awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • 
          </p>
        </Marquee>
        <h1 className={`${bayon.className} text-[7.7rem] text-center mx-auto`}>POP OUT CLUB</h1>
        <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="px-4 py-2 border border-gray-300 rounded bg-transparent text-[var(--foreground)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
        <div className="overflow-hidden w-full">
          <Marquee gradient={false} speed={30}>
            <p className="inline-block text-sm font-[family-name:var(--font-geist-mono)] marquee-text">
              awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • awesome people doing cool things • 
            </p>
          </Marquee>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="https://agartha1.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${azeretMono.className} text-sm text-[#FF4C96] px-6 py-3 hover:text-[#FAC502] transition-colors duration-300 underline`}
          >
            subscribe
          </a>

          <a
            href="https://x.com/popoutclub"
            target="_blank"
            rel="noopener noreferrer"
            className={`${azeretMono.className} text-sm text-[#FF4C96] px-6 py-3 hover:text-[#FAC502] transition-colors duration-300 underline`}
          >
            follow X
          </a>
        </div>
        
      </main>

    </div>
    </>
  );
}

export default function App() {
  return (
    <Home />
  );
}
