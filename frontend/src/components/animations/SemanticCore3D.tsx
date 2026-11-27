import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, ShieldCheck, Activity, Cpu, RotateCw, Eye } from 'lucide-react';

interface SemanticCore3DProps {
  className?: string;
}

export const SemanticCore3D: React.FC<SemanticCore3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<string>('Formal Semantics Core');
  const [nodeMetrics, setNodeMetrics] = useState({
    invariants: '12 Formal Rules Verified',
    entropy: '0.0001 (Deterministic)',
    throughput: '4,200 AST/sec',
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x2563eb, 3, 50);
    blueLight.position.set(5, 5, 8);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 50);
    cyanLight.position.set(-5, -5, 8);
    scene.add(cyanLight);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Crystalline Core (Icosahedron + Wireframe)
    const crystalGeo = new THREE.IcosahedronGeometry(2.4, 0);
    const crystalMat = new THREE.MeshPhongMaterial({
      color: 0x1d4ed8,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.6,
      shininess: 90,
      transparent: true,
      opacity: 0.85,
      flatShading: true,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    coreGroup.add(crystal);

    // Outer wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(2.7, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Inner glowing core sphere
    const innerGeo = new THREE.OctahedronGeometry(1.2, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Orbiting Data Nodes
    const nodeData = [
      { name: 'AST Parser', radius: 4.8, speed: 0.015, angle: 0, yOffset: 1.2, color: 0x3b82f6 },
      { name: 'Semantic Invariants', radius: 5.6, speed: -0.012, angle: 1.5, yOffset: -1.0, color: 0x2563eb },
      { name: 'Metric Schema Repository', radius: 6.4, speed: 0.018, angle: 3.1, yOffset: 0.8, color: 0x60a5fa },
      { name: 'ZK Proof Engine', radius: 5.2, speed: -0.014, angle: 4.5, yOffset: -1.4, color: 0x1d4ed8 },
      { name: 'Ledger Stream', radius: 6.8, speed: 0.009, angle: 5.5, yOffset: 0.2, color: 0x93c5fd },
    ];

    const nodeMeshes: { mesh: THREE.Mesh; data: typeof nodeData[0]; ring: THREE.Line }[] = [];

    nodeData.forEach((item) => {
      // Small data node sphere
      const nodeGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      scene.add(nodeMesh);

      // Orbit track ring
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(theta) * item.radius,
            Math.sin(theta) * 0.4 + item.yOffset * 0.2,
            Math.sin(theta) * item.radius
          )
        );
      }
      ringGeo.setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.18,
      });
      const ring = new THREE.Line(ringGeo, ringMat);
      scene.add(ring);

      nodeMeshes.push({ mesh: nodeMesh, data: item, ring });
    });

    // Connecting laser line between core and active node
    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    });
    const laserLine = new THREE.Line(lineGeo, lineMat);
    scene.add(laserLine);

    // Floating background particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 25;
      particlePos[i + 1] = (Math.random() - 0.5) * 18;
      particlePos[i + 2] = (Math.random() - 0.5) * 15;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);

      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.35;
    };

    mount.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth core rotation & mouse damping
      coreGroup.rotation.y += 0.006;
      coreGroup.rotation.x += 0.003;
      wireMesh.rotation.y -= 0.008;
      innerCore.rotation.x += 0.012;

      camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Orbiting nodes position update
      let primaryNodePos = new THREE.Vector3();
      nodeMeshes.forEach((item, idx) => {
        item.data.angle += item.data.speed;
        const x = Math.cos(item.data.angle) * item.data.radius;
        const z = Math.sin(item.data.angle) * item.data.radius;
        const y = Math.sin(elapsedTime * 1.5 + idx) * 0.4 + item.data.yOffset;

        item.mesh.position.set(x, y, z);

        if (idx === 0) {
          primaryNodePos.copy(item.mesh.position);
        }
      });

      // Update laser line between core and lead node
      lineGeo.setFromPoints([new THREE.Vector3(0, 0, 0), primaryNodePos]);

      // Slowly rotate background particle field
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousemove', handleMouseMove);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`w-full relative rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.04)] overflow-hidden ${className}`}>
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-[420px] sm:h-[480px] cursor-grab active:cursor-grabbing relative"
      />

      {/* Glassmorphic Telemetry HUD Overlay (Top-Left) */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 sm:p-4 shadow-sm max-w-xs text-xs">
        <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
          <Cpu className="w-4 h-4" />
          <span>Semantic Core 3D Telemetry</span>
        </div>
        <p className="text-[11px] text-slate-500 mb-2.5">
          Real-time AST geometry & formal invariant matrix
        </p>
        <div className="space-y-1.5 font-mono text-[10px] sm:text-[11px] text-slate-700">
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-400">Rules:</span>
            <span className="font-semibold text-blue-700">{nodeMetrics.invariants}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-400">Entropy:</span>
            <span className="font-semibold text-emerald-600">{nodeMetrics.entropy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Throughput:</span>
            <span className="font-semibold text-slate-900">{nodeMetrics.throughput}</span>
          </div>
        </div>
      </div>

      {/* Glassmorphic Interaction Helper (Bottom-Right) */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-xl px-4 py-2.5 shadow-sm text-xs flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-blue-600 font-medium text-[11px]">
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive 3D Viewport</span>
        </div>
        <span className="text-slate-300">|</span>
        <span className="text-[10px] text-slate-400 font-mono">Move mouse to tilt perspective</span>
      </div>
    </div>
  );
};
