import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Rotate3D, Layers, RefreshCw, Radio } from 'lucide-react';

export default function Terrain3DViewer({
  presetKey,
  geoData,
  bufferRadius = 10,
  activeLayers = { parks: true, aqi: true, rivers: true, settlements: true },
  hoveredBlip,
  onHoverBlip,
  conflicts = [],
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const reqIdRef = useRef(null);

  // Mesh refs for dynamic updates
  const terrainMeshRef = useRef(null);
  const bufferMeshRef = useRef(null);
  const bufferRimRef = useRef(null);
  const pulseRingRef = useRef(null);
  const pinMarkersRef = useRef([]);

  const [wireframeMode, setWireframeMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  // Generate procedural height map based on preset geography
  const getElevation = (x, z, preset) => {
    const dist = Math.sqrt(x * x + z * z);
    let h = 0;

    if (preset === 'aravalli') {
      // Rugged quartz ridge running diagonally
      const ridge = Math.sin((x + z) * 0.12) * Math.cos(x * 0.08) * 7;
      const hills = Math.sin(x * 0.2) * Math.cos(z * 0.2) * 3.5;
      h = ridge + hills;
    } else if (preset === 'western_ghats') {
      // Steep escarpment & mountain peaks with valley
      const mountain = Math.exp(-Math.pow((x - 10) * 0.06, 2)) * 14;
      const valley = Math.sin(z * 0.15) * 4;
      const crags = Math.sin(x * 0.3) * Math.cos(z * 0.25) * 2;
      h = mountain + valley + crags;
    } else if (preset === 'bhadla_solar') {
      // Flat arid desert with gentle undulating sand dunes
      h = Math.sin(x * 0.06) * 1.5 + Math.cos(z * 0.08) * 1.2;
    } else if (preset === 'yamuna_corridor') {
      // River basin depression with gentle plain
      const riverTrench = -Math.exp(-Math.pow(x * 0.1, 2)) * 4.5;
      const plain = Math.sin(z * 0.08) * 1.2;
      h = riverTrench + plain;
    } else if (preset === 'sundarbans') {
      // Coastal tidal delta with mangrove channels
      const tidal = Math.sin(x * 0.15) * Math.sin(z * 0.15) * 2;
      const depression = -Math.exp(-dist * 0.04) * 2;
      h = tidal + depression;
    } else {
      h = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 3;
    }

    return h;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#eae6dc');
    scene.fog = new THREE.FogExp2('#eae6dc', 0.012);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 38, 52);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera sinking under ground
    controls.minDistance = 15;
    controls.maxDistance = 110;
    controls.target.set(0, 0, 0);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight('#faf9f5', 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#ffffff', 1.2);
    sunLight.position.set(30, 45, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.camera.left = -35;
    sunLight.shadow.camera.right = 35;
    sunLight.shadow.camera.top = 35;
    sunLight.shadow.camera.bottom = -35;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight('#284e3a', 0.35);
    fillLight.position.set(-20, 20, -20);
    scene.add(fillLight);

    // 6. Terrain Generation
    const terrainSize = 75;
    const segments = 60;
    const geometry = new THREE.PlaneGeometry(terrainSize, terrainSize, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      const vy = getElevation(vx, vz, presetKey);
      pos.setY(i, vy);
    }
    geometry.computeVertexNormals();

    const terrainMaterial = new THREE.MeshStandardMaterial({
      color: '#d5cfc2',
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true,
      wireframe: wireframeMode,
    });

    const terrainMesh = new THREE.Mesh(geometry, terrainMaterial);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);
    terrainMeshRef.current = terrainMesh;

    // Subtle grid helper for coordinates reference
    const grid = new THREE.GridHelper(terrainSize, 15, '#284e3a', '#9c6519');
    grid.position.y = -0.05;
    grid.material.opacity = 0.22;
    grid.material.transparent = true;
    scene.add(grid);

    // 7. Center Project Site Marker
    const centerGroup = new THREE.Group();

    // Base glowing disc
    const beaconGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 32);
    const beaconMat = new THREE.MeshStandardMaterial({ color: '#284e3a', roughness: 0.3 });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = 0.2;
    centerGroup.add(beaconMesh);

    // Vertical indicator pin
    const pinStemGeo = new THREE.CylinderGeometry(0.12, 0.12, 5, 16);
    const pinStemMat = new THREE.MeshBasicMaterial({ color: '#284e3a' });
    const pinStem = new THREE.Mesh(pinStemGeo, pinStemMat);
    pinStem.position.y = 2.5;
    centerGroup.add(pinStem);

    // Pin Head Sphere
    const pinHeadGeo = new THREE.SphereGeometry(0.75, 16, 16);
    const pinHeadMat = new THREE.MeshStandardMaterial({ color: '#943b32', roughness: 0.2 });
    const pinHead = new THREE.Mesh(pinHeadGeo, pinHeadMat);
    pinHead.position.y = 5.2;
    centerGroup.add(pinHead);

    scene.add(centerGroup);

    // 8. 3D Radial Buffer Envelope
    const bufferScale = (bufferRadius / 10) * 16;
    const bufferGeo = new THREE.CylinderGeometry(bufferScale, bufferScale, 1.2, 48, 1, true);
    const bufferMat = new THREE.MeshStandardMaterial({
      color: '#284e3a',
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      roughness: 0.5,
    });
    const bufferMesh = new THREE.Mesh(bufferGeo, bufferMat);
    bufferMesh.position.y = 0.6;
    scene.add(bufferMesh);
    bufferMeshRef.current = bufferMesh;

    // Buffer Perimeter Rim Wire
    const rimGeo = new THREE.RingGeometry(bufferScale - 0.18, bufferScale + 0.18, 48);
    rimGeo.rotateX(-Math.PI / 2);
    const rimMat = new THREE.MeshBasicMaterial({
      color: '#284e3a',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.y = 1.22;
    scene.add(rimMesh);
    bufferRimRef.current = rimMesh;

    // Animated Radar Pulse Ring
    const pulseGeo = new THREE.RingGeometry(0.5, 0.8, 36);
    pulseGeo.rotateX(-Math.PI / 2);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: '#284e3a',
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    pulseMesh.position.y = 0.35;
    scene.add(pulseMesh);
    pulseRingRef.current = pulseMesh;

    // 9. Environmental Hazard Hotspots in 3D
    const pinGroup = new THREE.Group();
    pinMarkersRef.current = [];

    const blips = geoData?.blips || [];
    blips.forEach((blip, idx) => {
      // Convert polar distance & bearing to 3D world coordinates
      const angle = (idx * (Math.PI * 2)) / Math.max(blips.length, 1) + 0.5;
      const radius3D = (blip.dist / 10) * 16;
      const bx = Math.cos(angle) * radius3D;
      const bz = Math.sin(angle) * radius3D;
      const by = getElevation(bx, bz, presetKey);

      let pinColor = '#284e3a';
      if (blip.type === 'park') pinColor = '#284e3a';
      if (blip.type === 'river') pinColor = '#9c6519';
      if (blip.type === 'aqi') pinColor = '#943b32';

      const hazardGeo = new THREE.ConeGeometry(0.8, 2.2, 16);
      hazardGeo.rotateX(Math.PI);
      const hazardMat = new THREE.MeshStandardMaterial({
        color: pinColor,
        roughness: 0.3,
      });
      const hazardMesh = new THREE.Mesh(hazardGeo, hazardMat);
      hazardMesh.position.set(bx, by + 2.2, bz);
      hazardMesh.castShadow = true;
      hazardMesh.userData = blip;

      pinGroup.add(hazardMesh);
      pinMarkersRef.current.push(hazardMesh);
    });
    scene.add(pinGroup);

    // 10. Animation Loop
    let pulseProgress = 0;
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      // Radar pulse wave expansion
      pulseProgress += 0.014;
      if (pulseProgress > 1) pulseProgress = 0;
      if (pulseRingRef.current) {
        const currentScale = pulseProgress * bufferScale;
        pulseRingRef.current.scale.set(currentScale, currentScale, currentScale);
        pulseRingRef.current.material.opacity = Math.max(0, 1 - pulseProgress * 1.1) * 0.7;
      }

      // Pin floating animation
      pinMarkersRef.current.forEach((pin, i) => {
        pin.position.y += Math.sin(Date.now() * 0.003 + i) * 0.006;
      });

      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.0;
      controls.update();

      renderer.render(scene, camera);
    };
    animate();

    // 11. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      controls.dispose();
      renderer.dispose();
      geometry.dispose();
      terrainMaterial.dispose();
    };
  }, [presetKey]);

  // Update dynamic buffer radius
  useEffect(() => {
    const bufferScale = (bufferRadius / 10) * 16;
    if (bufferMeshRef.current && bufferRimRef.current) {
      bufferMeshRef.current.scale.set(bufferScale / 16, 1, bufferScale / 16);
      bufferRimRef.current.scale.set(bufferScale / 16, bufferScale / 16, bufferScale / 16);
    }
  }, [bufferRadius]);

  // Update wireframe mode
  useEffect(() => {
    if (terrainMeshRef.current) {
      terrainMeshRef.current.material.wireframe = wireframeMode;
      terrainMeshRef.current.material.needsUpdate = true;
    }
  }, [wireframeMode]);

  // Reset Camera View
  const handleResetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 38, 52);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[350px] rounded overflow-hidden border" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Control Bar Overlay */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="px-2 py-1 rounded text-xs font-mono border flex items-center gap-1 transition-all cursor-pointer shadow-xs"
          style={{
            backgroundColor: autoRotate ? 'var(--dark-surface, #1c231f)' : 'var(--bg-card, #faf9f5)',
            color: autoRotate ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
            borderColor: 'var(--border-subtle, #d5cfc2)',
          }}
          title="Toggle 360° Orbit Rotation"
        >
          <Rotate3D className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{autoRotate ? 'Rotating' : 'Orbit'}</span>
        </button>

        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className="px-2 py-1 rounded text-xs font-mono border flex items-center gap-1 transition-all cursor-pointer shadow-xs"
          style={{
            backgroundColor: wireframeMode ? 'var(--color-primary, #284e3a)' : 'var(--bg-card, #faf9f5)',
            color: wireframeMode ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
            borderColor: 'var(--border-subtle, #d5cfc2)',
          }}
          title="Toggle Mesh Wireframe & Contours"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Contours</span>
        </button>

        <button
          onClick={handleResetView}
          className="p-1 rounded text-xs font-mono border flex items-center gap-1 transition-all cursor-pointer shadow-xs hover:bg-[#eae6dc]"
          style={{
            backgroundColor: 'var(--bg-card, #faf9f5)',
            color: 'var(--text-muted, #5e625a)',
            borderColor: 'var(--border-subtle, #d5cfc2)',
          }}
          title="Reset Camera View"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3D Telemetry Navigation Tip */}
      <div
        className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded border text-[11px] font-mono pointer-events-none hidden sm:flex items-center gap-1.5 shadow-xs"
        style={{
          backgroundColor: 'rgba(250, 249, 245, 0.88)',
          borderColor: 'var(--border-subtle, #d5cfc2)',
          color: 'var(--text-muted, #5e625a)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Radio className="w-3 h-3 text-[#284e3a] animate-pulse" />
        <span>3D DEM Mesh · Radius: {bufferRadius} km</span>
      </div>

      {/* Legend Badge */}
      <div
        className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded border text-[11px] font-mono flex items-center gap-2 shadow-xs"
        style={{
          backgroundColor: 'rgba(250, 249, 245, 0.88)',
          borderColor: 'var(--border-subtle, #d5cfc2)',
          color: 'var(--text-main, #1a1d1a)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#943b32]" />
          <span>Project</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#284e3a]" />
          <span>Buffer Envelope</span>
        </div>
      </div>
    </div>
  );
}