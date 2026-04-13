"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

// Charcoal, Slate Blue, Muted Rose, Warm Amber
const colors = ["#555555", "#6B7FD4", "#D4768A", "#D4A857"];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Config
    const maxMouseDistance = 150; // Increased mouse repel radius
    const maxLineDistance = 100; // Max distance for drawing connection lines
    const mouse = { x: -1000, y: -1000 };
    
    let isMobile = false;
    let currentParticleCount = 180;
    let currentMinSize = 2;
    let currentMaxSize = 4;
    let maxLineOpacity = 0.15;

    const checkMobile = () => {
      const wasMobile = isMobile;
      isMobile = window.innerWidth < 768;
      
      currentParticleCount = isMobile ? 45 : 180;
      currentMinSize = isMobile ? 0.5 : 2;
      currentMaxSize = isMobile ? 1.5 : 4;
      maxLineOpacity = isMobile ? 0.08 : 0.15;

      // Reinitialize if device type changed
      if (wasMobile !== isMobile) {
        initParticles();
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      checkMobile();
      // Ensure we have correct particle count on resize
      if (particles.length !== currentParticleCount) {
        initParticles();
      }
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < currentParticleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * (currentMaxSize - currentMinSize) + currentMinSize,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Mouse interaction (repel)
        if (!isMobile) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxMouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxMouseDistance - distance) / maxMouseDistance;
            
            p.x += forceDirectionX * force * 1.5;
            p.y += forceDirectionY * force * 1.5;
          }
        }

        // Draw particle
        ctx.globalAlpha = 0.6; // Opacity 0.5 - 0.7
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.closePath();

        // Draw connections
        ctx.lineWidth = 1;
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxLineDistance) {
            // Opacity fades out as distance increases, max out at maxLineOpacity
            const opacity = (1 - distance / maxLineDistance) * maxLineOpacity;
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = p.color; // Use the first particle's color
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      });

      // Reset alpha
      ctx.globalAlpha = 1;
      
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
