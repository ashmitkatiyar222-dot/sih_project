import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Create a soft volumetric smoke particle texture programmatically
function createSmokeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(235, 245, 240, 0.45)');
  gradient.addColorStop(0.35, 'rgba(220, 238, 228, 0.25)');
  gradient.addColorStop(0.7, 'rgba(205, 228, 215, 0.08)');
  gradient.addColorStop(1, 'rgba(205, 228, 215, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  return new THREE.CanvasTexture(canvas);
}

export default function ManualAudit3DCanvas({ activeIndex = 0 }) {
  const mountRef = useRef(null);
  const targetCameraYRef = useRef(0);
  const targetRotYRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#edf5f0', 0.032);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. Cinematic Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight('#faf8f2', 1.0);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#ffffff', 0.9);
    sunLight.position.set(6, 12, 8);
    scene.add(sunLight);

    const valleyFill = new THREE.DirectionalLight('#284e3a', 0.35);
    valleyFill.position.set(-8, 4, 4);
    scene.add(valleyFill);

    const focusSpot = new THREE.SpotLight('#a54d42', 2.0, 30, Math.PI / 5, 0.4);
    focusSpot.position.set(0, 6, 9);
    scene.add(focusSpot);

    const warmLight = new THREE.PointLight('#b77927', 1.2, 20);
    warmLight.position.set(-6, -2, 6);
    scene.add(warmLight);

    const disposables = [];

    // =========================================================================
    // 4. MAJESTIC NATURAL SCULPTED MOUNTAIN RIDGELINES (Smooth Wave Mesh)
    // =========================================================================
    const terrainGroup = new THREE.Group();
    scene.add(terrainGroup);

    // Primary Distant Mountain Ridge
    const ridgeGeo = new THREE.PlaneGeometry(42, 20, 56, 32);
    disposables.push(ridgeGeo);

    const pos = ridgeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);

      // Multi-frequency natural mountain peak sculpting
      let z = Math.sin(u * 0.28) * 2.8 + Math.cos(v * 0.35) * 1.8;
      z += Math.sin(u * 0.65 + v * 0.4) * 1.2;
      z += Math.cos(u * 1.2) * 0.45;

      // Soft taper at base and edges
      const edgeFade = Math.cos((u / 21) * Math.PI * 0.5);
      z *= Math.max(0, edgeFade);

      pos.setZ(i, z);
    }
    ridgeGeo.computeVertexNormals();

    const ridgeMat = new THREE.MeshStandardMaterial({
      color: '#1b3a29',
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    disposables.push(ridgeMat);

    const ridgeMesh = new THREE.Mesh(ridgeGeo, ridgeMat);
    ridgeMesh.rotation.x = -Math.PI * 0.38;
    ridgeMesh.position.set(0, -3.2, -6.5);
    terrainGroup.add(ridgeMesh);

    // Secondary Mid-Ground Mountain Foothills
    const foothillGeo = new THREE.PlaneGeometry(36, 14, 44, 24);
    disposables.push(foothillGeo);

    const posF = foothillGeo.attributes.position;
    for (let i = 0; i < posF.count; i++) {
      const u = posF.getX(i);
      const v = posF.getY(i);
      let z = Math.sin(u * 0.4 + 1.2) * 1.6 + Math.cos(v * 0.5) * 0.9;
      z += Math.sin(u * 0.9) * 0.5;
      const edgeFade = Math.cos((u / 18) * Math.PI * 0.5);
      posF.setZ(i, z * Math.max(0, edgeFade));
    }
    foothillGeo.computeVertexNormals();

    const foothillMat = new THREE.MeshStandardMaterial({
      color: '#264f38',
      roughness: 0.8,
      metalness: 0.05,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    disposables.push(foothillMat);

    const foothillMesh = new THREE.Mesh(foothillGeo, foothillMat);
    foothillMesh.rotation.x = -Math.PI * 0.36;
    foothillMesh.position.set(0, -3.8, -3.5);
    terrainGroup.add(foothillMesh);

    // =========================================================================
    // 5. PROCEDURAL PINE FOREST CLUSTERS (Along Foothills & Ridges)
    // =========================================================================
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);
    const treeMeshes = [];

    const treePositions = [
      { x: -6.5, y: -2.0, z: -2.2, s: 0.75 },
      { x: -5.2, y: -2.4, z: -1.8, s: 0.9 },
      { x: -7.2, y: -2.6, z: -2.0, s: 0.7 },
      { x: -3.8, y: -2.7, z: -2.4, s: 0.8 },
      { x: 4.8, y: -2.2, z: -2.0, s: 0.85 },
      { x: 6.0, y: -2.5, z: -1.8, s: 0.95 },
      { x: 7.2, y: -2.7, z: -1.6, s: 0.75 },
      { x: 3.5, y: -2.8, z: -2.2, s: 0.8 },
    ];

    const trunkMat = new THREE.MeshStandardMaterial({ color: '#3d2b1f', roughness: 0.9 });
    const foliageMat1 = new THREE.MeshStandardMaterial({ color: '#163524', flatShading: true, roughness: 0.8 });
    const foliageMat2 = new THREE.MeshStandardMaterial({ color: '#204631', flatShading: true, roughness: 0.8 });
    disposables.push(trunkMat, foliageMat1, foliageMat2);

    treePositions.forEach((pos, idx) => {
      const singleTree = new THREE.Group();

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.06 * pos.s, 0.1 * pos.s, 0.7 * pos.s, 5);
      disposables.push(trunkGeo);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.35 * pos.s;
      singleTree.add(trunk);

      // 3-tier foliage cones
      for (let t = 0; t < 3; t++) {
        const coneR = (0.5 - t * 0.1) * pos.s;
        const coneH = 0.7 * pos.s;
        const coneGeo = new THREE.ConeGeometry(coneR, coneH, 6);
        disposables.push(coneGeo);

        const foliage = new THREE.Mesh(coneGeo, t % 2 === 0 ? foliageMat1 : foliageMat2);
        foliage.position.y = (0.6 + t * 0.4) * pos.s;
        singleTree.add(foliage);
      }

      singleTree.position.set(pos.x, pos.y, pos.z);
      treeGroup.add(singleTree);
      treeMeshes.push(singleTree);
    });

    // =========================================================================
    // 6. VOLUMETRIC DRIFTING SMOKE & MOUNTAIN VALLEY MIST
    // =========================================================================
    const smokeTexture = createSmokeTexture();
    disposables.push(smokeTexture);

    const smokeGroup = new THREE.Group();
    scene.add(smokeGroup);
    const smokeParticles = [];

    const smokeCount = 12;
    const smokeGeo = new THREE.PlaneGeometry(6.5, 6.5);
    disposables.push(smokeGeo);

    for (let i = 0; i < smokeCount; i++) {
      const smokeMat = new THREE.MeshBasicMaterial({
        map: smokeTexture,
        transparent: true,
        opacity: 0.18 + (i % 3) * 0.05,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      disposables.push(smokeMat);

      const smokeMesh = new THREE.Mesh(smokeGeo, smokeMat);
      smokeMesh.position.set(
        (Math.random() - 0.5) * 20,
        -2.8 + Math.random() * 3.5,
        -1.5 + (Math.random() - 0.5) * 5.0
      );
      smokeMesh.rotation.z = Math.random() * Math.PI * 2;
      smokeGroup.add(smokeMesh);

      smokeParticles.push({
        mesh: smokeMesh,
        rotSpeed: (Math.random() - 0.5) * 0.002,
        driftX: 0.003 + Math.random() * 0.004,
      });
    }

    // =========================================================================
    // 7. FLOATING 3D PAPER SHEETS / BUREAUCRATIC AUDIT RECORDS
    // =========================================================================
    const documentGroup = new THREE.Group();
    scene.add(documentGroup);

    const docMeshes = [];
    const sheetData = [
      { x: -5.0, y: 1.6, z: -0.8, rotZ: 0.10 },
      { x: 5.2, y: 1.4, z: -1.2, rotZ: -0.12 },
      { x: -4.8, y: -1.6, z: -0.6, rotZ: 0.06 },
      { x: 5.0, y: -1.4, z: -1.0, rotZ: -0.08 },
    ];

    sheetData.forEach((data, i) => {
      const geo = new THREE.PlaneGeometry(2.0, 2.8, 8, 8);
      disposables.push(geo);

      // Add gentle curve to paper geometry
      const posAttr = geo.attributes.position;
      for (let j = 0; j < posAttr.count; j++) {
        const u = posAttr.getX(j);
        const v = posAttr.getY(j);
        posAttr.setZ(j, Math.sin(u * 1.5) * 0.1 + Math.cos(v * 1.2) * 0.06);
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: i === 0 ? '#faebe9' : '#fcfaf6',
        roughness: 0.6,
        metalness: 0.05,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      disposables.push(mat);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(data.x, data.y, data.z);
      mesh.rotation.set(0.08, -0.08, data.rotZ);
      documentGroup.add(mesh);
      docMeshes.push(mesh);

      // Add Red Stamp Seal
      const stampGeo = new THREE.RingGeometry(0.24, 0.38, 24);
      disposables.push(stampGeo);
      const stampMat = new THREE.MeshBasicMaterial({
        color: '#a54d42',
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      disposables.push(stampMat);
      const stampMesh = new THREE.Mesh(stampGeo, stampMat);
      stampMesh.position.set(0.35, 0.5, 0.04);
      mesh.add(stampMesh);
    });

    // =========================================================================
    // 8. INTERACTIVE MOUSE TRACKING & RESIZE
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 800;
      const newH = container.clientHeight || 550;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 9. ANIMATION LOOP
    // =========================================================================
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera orbit based on mouse & row focus state
      const targetCamX = mouseX * 1.2;
      const targetCamY = -mouseY * 0.7 + targetCameraYRef.current;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Smooth document group floating oscillation
      documentGroup.rotation.y += (targetRotYRef.current + mouseX * 0.1 - documentGroup.rotation.y) * 0.05;
      documentGroup.position.y = Math.sin(elapsedTime * 0.7) * 0.12;

      // Individual mesh gentle floating
      docMeshes.forEach((mesh, idx) => {
        mesh.position.y += Math.sin(elapsedTime * 1.1 + idx) * 0.002;
        mesh.rotation.z += Math.cos(elapsedTime * 0.8 + idx) * 0.001;
      });

      // Trees gentle wind sway
      treeMeshes.forEach((t, i) => {
        t.rotation.z = Math.sin(elapsedTime * 1.3 + i) * 0.015;
      });

      // Drifting smoke & volumetric cloud rotation
      smokeParticles.forEach((sp) => {
        sp.mesh.rotation.z += sp.rotSpeed;
        sp.mesh.position.x += sp.driftX;

        // Wrap around horizontally
        if (sp.mesh.position.x > 12) {
          sp.mesh.position.x = -12;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  // Update 3D target coordinates dynamically when activeIndex changes
  useEffect(() => {
    const cameraTargets = [0.3, 0.1, -0.15, -0.4];
    const rotTargets = [-0.12, -0.04, 0.04, 0.12];

    targetCameraYRef.current = cameraTargets[activeIndex] || 0;
    targetRotYRef.current = rotTargets[activeIndex] || 0;
  }, [activeIndex]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-45 sm:opacity-60"
      aria-hidden="true"
    />
  );
}
