import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  type: 'block' | 'tx' | 'wallet';
}

interface EdgePulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export const BlockchainCanvasNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let scrollY = window.scrollY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize network nodes
    const isMobile = width < 768;
    const nodeCount = isMobile ? 35 : 75;
    const particles: Particle[] = [];

    const colors = [
      'rgba(99, 102, 241, ', // Indigo
      'rgba(59, 130, 246, ', // Blue
      'rgba(139, 92, 246, ', // Purple
      'rgba(56, 189, 248, ', // Sky
      'rgba(255, 255, 255, '  // Crisp white
    ];

    for (let i = 0; i < nodeCount; i++) {
      const type = i % 8 === 0 ? 'block' : i % 3 === 0 ? 'wallet' : 'tx';
      const baseRadius = type === 'block' ? 3.5 : type === 'wallet' ? 2.5 : 1.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: baseRadius,
        baseRadius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
        type
      });
    }

    const pulses: EdgePulse[] = [];

    const draw = () => {
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      const scrollOffset = (scrollY * 0.2) % gridSize;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -scrollOffset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw connections
      const maxDistance = isMobile ? 110 : 160;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Random chance to spawn data pulse
            if (Math.random() < 0.0012 && pulses.length < 15) {
              pulses.push({
                fromIndex: i,
                toIndex: j,
                progress: 0,
                speed: Math.random() * 0.012 + 0.006
              });
            }
          }
        }
      }

      // Draw data pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const p1 = particles[pulse.fromIndex];
        const p2 = particles[pulse.toIndex];
        if (!p1 || !p2) continue;

        const currentX = p1.x + (p2.x - p1.x) * pulse.progress;
        const currentY = p1.y + (p2.y - p1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update and draw nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Subtle scroll influence
        p.y -= scrollY * 0.00015;

        // Bounce at boundaries
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = height; }
        if (p.y > height) { p.y = 0; }

        // Interaction with mouse cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (1 - dist / 140) * 0.8;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Draw node
        ctx.beginPath();
        if (p.type === 'block') {
          // Diamond / Square node for blocks
          const sz = p.radius * 1.6;
          ctx.rect(p.x - sz / 2, p.y - sz / 2, sz, sz);
        } else {
          // Circular node for tx and wallets
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.color === 'rgba(255, 255, 255, ' ? 'rgba(99, 102, 241, 0.5)' : p.color + '0.6)';
        ctx.shadowBlur = p.type === 'block' ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
