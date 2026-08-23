import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Procedural soft cloud puff texture
function createCloudPuffTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Radial soft puff gradient
  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
  gradient.addColorStop(0.3, 'rgba(240, 250, 245, 0.50)');
  gradient.addColorStop(0.65, 'rgba(220, 240, 230, 0.20)');
  gradient.addColorStop(0.9, 'rgba(200, 230, 215, 0.05)');
  gradient.addColorStop(1, 'rgba(200, 230, 215, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

export default function HeaderClouds3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth || 1200;
    const height = container.clientHeight || 80;

    // 1. Scene & Orthographic / Low FOV Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. Ambient & Warm Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.2);
    scene.add(ambientLight);

    const disposables = [];

    // 4. Floating Procedural 3D Clouds Group
    const cloudTexture = createCloudPuffTexture();
    disposables.push(cloudTexture);

    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    const cloudParticles = [];
    const cloudCount = 16;
    const cloudGeo = new THREE.PlaneGeometry(3.6, 2.2);
    disposables.push(cloudGeo);

    for (let i = 0; i < cloudCount; i++) {
      const cloudMat = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.35 + (i % 4) * 0.08,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      disposables.push(cloudMat);

      const mesh = new THREE.Mesh(cloudGeo, cloudMat);
      // Distribute evenly across width with variable depth & height
      mesh.position.set(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 2.2,
        -1.0 + (Math.random() - 0.5) * 3.0
      );
      mesh.scale.set(
        0.8 + Math.random() * 0.8,
        0.7 + Math.random() * 0.6,
        1
      );
      mesh.rotation.z = (Math.random() - 0.5) * 0.2;
      cloudGroup.add(mesh);

      cloudParticles.push({
        mesh,
        driftSpeed: 0.003 + (i % 5) * 0.0015,
        rotSpeed: (Math.random() - 0.5) * 0.001,
        initialY: mesh.position.y,
        floatFreq: 0.8 + Math.random() * 0.6,
      });
    }

    // 5. Interactive Mouse Parallax
    let mouseX = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth || 1200;
      const newH = container.clientHeight || 80;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax Damping
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.04;
      camera.lookAt(0, 0, 0);

      // Cloud drift & gentle floating oscillation
      cloudParticles.forEach((cp, idx) => {
        cp.mesh.position.x += cp.driftSpeed;
        cp.mesh.rotation.z += cp.rotSpeed;
        cp.mesh.position.y = cp.initialY + Math.sin(elapsedTime * cp.floatFreq + idx) * 0.15;

        // Wrap around horizontally smoothly
        if (cp.mesh.position.x > 14) {
          cp.mesh.position.x = -14;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70 sm:opacity-85"
      aria-hidden="true"
    />
  );
}
