import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Rotate3D, Layers, Radio, Sparkles } from 'lucide-react';

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

  // Mesh & Object refs
  const terrainMeshRef = useRef(null);
  const waterMeshRef = useRef(null);
  const bufferMeshRef = useRef(null);
  const bufferRimRef = useRef(null);
  const pulseRingRef = useRef(null);
  const pinMarkersRef = useRef([]);

  const [wireframeMode, setWireframeMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [colorScheme, setColorScheme] = useState('hypsometric'); // 'hypsometric' | 'lidar' | 'archival'

  // Multi-octave procedural height map for realistic geology
  const getElevation = (x, z, preset) => {
    const dist = Math.sqrt(x * x + z * z);
    let h = 0;

    if (preset === 'aravalli') {
      // Rugged quartzite ridge with sharp rocky crags and foothill valleys
      const primaryRidge = Math.sin((x * 0.85 + z * 0.55) * 0.12) * Math.cos(x * 0.08) * 8.5;
      const crags = Math.sin(x * 0.28) * Math.cos(z * 0.32) * 2.8;
      const microDetail = Math.sin(x * 0.6 + z * 0.4) * 0.8;
      h = primaryRidge + crags + microDetail;
    } else if (preset === 'western_ghats') {
      // High montane escarpment with steep rain-shadow slopes and deep river gorges
      const escarpment = Math.exp(-Math.pow((x - 8) * 0.055, 2)) * 15.5;
      const gorge = -Math.exp(-Math.pow((z + 4) * 0.12, 2)) * 4.0;
      const ridgeLines = Math.sin(x * 0.22) * Math.cos(z * 0.18) * 3.2;
      const terracing = Math.sin(x * 0.5) * 0.6;
      h = escarpment + gorge + ridgeLines + terracing;
    } else if (preset === 'bhadla_solar') {
      // Arid desert plain with sweeping longitudinal sand dune ridges
      const dunes = Math.sin(x * 0.09 + z * 0.04) * 2.6;
      const ripples = Math.sin(x * 0.35 - z * 0.25) * 0.7;
      const plateau = Math.cos(z * 0.08) * 1.2;
      h = dunes + ripples + plateau;
    } else if (preset === 'yamuna_corridor') {
      // Alluvial river floodplain with natural meander canyon trench
      const meanderCurve = Math.sin(z * 0.08) * 12;
      const riverTrench = -Math.exp(-Math.pow((x - meanderCurve) * 0.12, 2)) * 5.2;
      const floodPlain = Math.sin(z * 0.06) * 1.4 + Math.sin(x * 0.15) * 0.8;
      h = riverTrench + floodPlain;
    } else if (preset === 'sundarbans') {
      // Coastal mangrove delta with branching tidal channel network
      const channel1 = -Math.exp(-Math.pow((x + 6) * 0.14, 2)) * 3.2;
      const channel2 = -Math.exp(-Math.pow((z - 8) * 0.16, 2)) * 2.8;
      const tidalMudflats = Math.sin(x * 0.18) * Math.sin(z * 0.18) * 1.8;
      h = channel1 + channel2 + tidalMudflats - 0.6;
    } else {
      h = Math.sin(x * 0.12) * Math.cos(z * 0.12) * 3.5;
    }

    return h;
  };

  // Hypsometric tinting: Assign vertex colors based on altitude & scheme
  const getVertexColor = (y, minY, maxY, scheme) => {
    const t = THREE.MathUtils.clamp((y - minY) / Math.max(maxY - minY, 0.01), 0, 1);
    const color = new THREE.Color();

    if (scheme === 'hypsometric') {
      // Realistic GIS: Valley Forest -> Grassland -> Foothill Ochre -> Granite Peaks -> Quartz Crest
      if (t < 0.25) {
        color.lerpColors(new THREE.Color('#244d34'), new THREE.Color('#386d4b'), t / 0.25);
      } else if (t < 0.55) {
        color.lerpColors(new THREE.Color('#386d4b'), new THREE.Color('#829659'), (t - 0.25) / 0.3);
      } else if (t < 0.8) {
        color.lerpColors(new THREE.Color('#829659'), new THREE.Color('#a89a74'), (t - 0.55) / 0.25);
      } else {
        color.lerpColors(new THREE.Color('#a89a74'), new THREE.Color('#e0ddd5'), (t - 0.8) / 0.2);
      }
    } else if (scheme === 'lidar') {
      // LiDAR Spectral Heatmap: Deep Blue -> Cyan -> Emerald -> Gold -> Coral Red
      if (t < 0.25) {
        color.lerpColors(new THREE.Color('#10385c'), new THREE.Color('#1b7a82'), t / 0.25);
      } else if (t < 0.5) {
        color.lerpColors(new THREE.Color('#1b7a82'), new THREE.Color('#2ea366'), (t - 0.25) / 0.25);
      } else if (t < 0.75) {
        color.lerpColors(new THREE.Color('#2ea366'), new THREE.Color('#d4a024'), (t - 0.5) / 0.25);
      } else {
        color.lerpColors(new THREE.Color('#d4a024'), new THREE.Color('#b83a2a'), (t - 0.75) / 0.25);
      }
    } else {
      // Archival Clay / Survey Paper
      color.lerpColors(new THREE.Color('#c2bcae'), new THREE.Color('#ede8dc'), t);
    }

    return color;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#e8e4da');
    scene.fog = new THREE.FogExp2('#e8e4da', 0.009);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 36, 54);

    // 3. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', alpha: true });
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
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.minDistance = 14;
    controls.maxDistance = 120;
    controls.target.set(0, 1.5, 0);

    // 5. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.75);
    scene.add(ambientLight);

    // Primary Sun Light with crisp shadows
    const sunLight = new THREE.DirectionalLight('#fffcf0', 1.35);
    sunLight.position.set(35, 55, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 140;
    sunLight.shadow.camera.left = -40;
    sunLight.shadow.camera.right = 40;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -40;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Subtle Forest Green Bounce Fill Light
    const fillLight = new THREE.DirectionalLight('#426b52', 0.45);
    fillLight.position.set(-30, 25, -25);
    scene.add(fillLight);

    // Sky Hemisphere Light
    const hemiLight = new THREE.HemisphereLight('#f5f9f6', '#324a3a', 0.4);
    scene.add(hemiLight);

    // 6. High-Density Terrain Mesh Generation
    const terrainSize = 78;
    const segments = 96; // Higher polygon fidelity
    const geometry = new THREE.PlaneGeometry(terrainSize, terrainSize, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const pos = geometry.attributes.position;
    let minY = Infinity;
    let maxY = -Infinity;

    // Step 1: Calculate altitudes
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      const vy = getElevation(vx, vz, presetKey);
      pos.setY(i, vy);
      if (vy < minY) minY = vy;
      if (vy > maxY) maxY = vy;
    }
    geometry.computeVertexNormals();

    // Step 2: Generate vertex colors for hypsometric shading
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const vy = pos.getY(i);
      const c = getVertexColor(vy, minY, maxY, colorScheme);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const terrainMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.76,
      metalness: 0.12,
      flatShading: true,
      wireframe: wireframeMode,
    });

    const terrainMesh = new THREE.Mesh(geometry, terrainMaterial);
    terrainMesh.receiveShadow = true;
    terrainMesh.castShadow = true;
    scene.add(terrainMesh);
    terrainMeshRef.current = terrainMesh;

    // 7. Reflective Water Plane for River & Delta Presets
    if (presetKey === 'yamuna_corridor' || presetKey === 'sundarbans' || presetKey === 'western_ghats') {
      const waterLevel = presetKey === 'yamuna_corridor' ? -1.8 : presetKey === 'sundarbans' ? -0.4 : -1.2;
      const waterGeo = new THREE.PlaneGeometry(terrainSize, terrainSize, 16, 16);
      waterGeo.rotateX(-Math.PI / 2);
      const waterMat = new THREE.MeshStandardMaterial({
        color: '#1a565c',
        roughness: 0.08,
        metalness: 0.85,
        transparent: true,
        opacity: 0.72,
      });
      const waterMesh = new THREE.Mesh(waterGeo, waterMat);
      waterMesh.position.y = waterLevel;
      scene.add(waterMesh);
      waterMeshRef.current = waterMesh;
    }

    // 8. Topographic Grid & Coordinate Baseline
    const grid = new THREE.GridHelper(terrainSize, 16, '#284e3a', '#9c6519');
    grid.position.y = minY - 0.2;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    scene.add(grid);

    // 9. Center Project Site Marker & Beacon Pin
    const centerGroup = new THREE.Group();

    // Base glowing pedestal
    const beaconGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.45, 32);
    const beaconMat = new THREE.MeshStandardMaterial({ color: '#284e3a', roughness: 0.25, metalness: 0.3 });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.y = getElevation(0, 0, presetKey) + 0.22;
    centerGroup.add(beaconMesh);

    // Vertical indicator pin stem
    const pinStemGeo = new THREE.CylinderGeometry(0.12, 0.12, 6, 16);
    const pinStemMat = new THREE.MeshBasicMaterial({ color: '#163223' });
    const pinStem = new THREE.Mesh(pinStemGeo, pinStemMat);
    pinStem.position.y = getElevation(0, 0, presetKey) + 3.2;
    centerGroup.add(pinStem);

    // Glowing Pin Head Sphere
    const pinHeadGeo = new THREE.SphereGeometry(0.85, 24, 24);
    const pinHeadMat = new THREE.MeshStandardMaterial({
      color: '#943b32',
      roughness: 0.15,
      metalness: 0.2,
      emissive: '#4d120d',
      emissiveIntensity: 0.4,
    });
    const pinHead = new THREE.Mesh(pinHeadGeo, pinHeadMat);
    pinHead.position.y = getElevation(0, 0, presetKey) + 6.2;
    centerGroup.add(pinHead);

    scene.add(centerGroup);

    // 10. 3D Radial Regulatory Buffer Envelope
    const bufferScale = (bufferRadius / 10) * 16;
    const bufferGeo = new THREE.CylinderGeometry(bufferScale, bufferScale, 1.8, 64, 1, true);
    const bufferMat = new THREE.MeshStandardMaterial({
      color: '#284e3a',
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      roughness: 0.4,
    });
    const bufferMesh = new THREE.Mesh(bufferGeo, bufferMat);
    bufferMesh.position.y = 0.9;
    scene.add(bufferMesh);
    bufferMeshRef.current = bufferMesh;

    // Buffer Perimeter Rim Wire
    const rimGeo = new THREE.RingGeometry(bufferScale - 0.2, bufferScale + 0.2, 64);
    rimGeo.rotateX(-Math.PI / 2);
    const rimMat = new THREE.MeshBasicMaterial({
      color: '#284e3a',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.y = 1.82;
    scene.add(rimMesh);
    bufferRimRef.current = rimMesh;

    // Animated Radar Pulse Ring
    const pulseGeo = new THREE.RingGeometry(0.5, 0.9, 48);
    pulseGeo.rotateX(-Math.PI / 2);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: '#284e3a',
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    pulseMesh.position.y = 0.4;
    scene.add(pulseMesh);
    pulseRingRef.current = pulseMesh;

    // 11. Environmental Hazard Hotspots in 3D
    const pinGroup = new THREE.Group();
    pinMarkersRef.current = [];

    const blips = geoData?.blips || [];
    blips.forEach((blip, idx) => {
      const angle = (idx * (Math.PI * 2)) / Math.max(blips.length, 1) + 0.65;
      const radius3D = (blip.dist / 10) * 16;
      const bx = Math.cos(angle) * radius3D;
      const bz = Math.sin(angle) * radius3D;
      const by = getElevation(bx, bz, presetKey);

      let pinColor = '#284e3a';
      if (blip.type === 'park') pinColor = '#284e3a';
      if (blip.type === 'river') pinColor = '#1a565c';
      if (blip.type === 'aqi') pinColor = '#943b32';

      const hazardSubGroup = new THREE.Group();
      hazardSubGroup.position.set(bx, by, bz);

      // Drop guide line to ground
      const dropLineGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.5, 8);
      const dropLineMat = new THREE.MeshBasicMaterial({ color: pinColor, transparent: true, opacity: 0.75 });
      const dropLine = new THREE.Mesh(dropLineGeo, dropLineMat);
      dropLine.position.y = 1.75;
      hazardSubGroup.add(dropLine);

      // Diamond / Octahedron Marker
      const hazardGeo = new THREE.OctahedronGeometry(0.85, 0);
      const hazardMat = new THREE.MeshStandardMaterial({
        color: pinColor,
        roughness: 0.2,
        metalness: 0.3,
        emissive: pinColor,
        emissiveIntensity: 0.35,
      });
      const hazardMesh = new THREE.Mesh(hazardGeo, hazardMat);
      hazardMesh.position.y = 3.8;
      hazardMesh.castShadow = true;
      hazardSubGroup.add(hazardMesh);

      hazardSubGroup.userData = blip;
      pinGroup.add(hazardSubGroup);
      pinMarkersRef.current.push(hazardSubGroup);
    });
    scene.add(pinGroup);

    // 12. Animation Loop
    let pulseProgress = 0;

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      // Radar pulse wave expansion
      pulseProgress += 0.012;
      if (pulseProgress > 1) pulseProgress = 0;
      if (pulseRingRef.current) {
        const currentScale = pulseProgress * bufferScale;
        pulseRingRef.current.scale.set(currentScale, currentScale, currentScale);
        pulseRingRef.current.material.opacity = Math.max(0, 1 - pulseProgress * 1.08) * 0.8;
      }

      // Pin floating & rotating animation
      pinMarkersRef.current.forEach((pin, i) => {
        pin.position.y += Math.sin(Date.now() * 0.003 + i) * 0.005;
        if (pin.children[1]) {
          pin.children[1].rotation.y += 0.015;
        }
      });

      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.2;
      controls.update();

      renderer.render(scene, camera);
    };
    animate();

    // 13. Resize Observer
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
  }, [presetKey, colorScheme]);

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

  // Camera Preset View Angles
  const setCameraView = (viewType) => {
    if (!cameraRef.current || !controlsRef.current) return;
    if (viewType === 'perspective') {
      cameraRef.current.position.set(0, 36, 54);
    } else if (viewType === 'topdown') {
      cameraRef.current.position.set(0, 72, 0.1);
    } else if (viewType === 'elevation') {
      cameraRef.current.position.set(56, 16, 0);
    }
    controlsRef.current.target.set(0, 1.5, 0);
    controlsRef.current.update();
  };

  return (
    <div className="relative w-full h-[340px] sm:h-[380px] rounded-lg overflow-hidden border shadow-inner" style={{ borderColor: 'var(--border-subtle, #d5cfc2)' }}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Control Toolbar */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 flex-wrap">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="px-2.5 py-1 rounded text-xs font-mono border flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          style={{
            backgroundColor: autoRotate ? 'var(--dark-surface, #1c231f)' : 'rgba(250, 249, 245, 0.92)',
            color: autoRotate ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
            borderColor: 'var(--border-subtle, #d5cfc2)',
            backdropFilter: 'blur(6px)',
          }}
          title="Toggle 360° Orbit Rotation"
        >
          <Rotate3D className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{autoRotate ? 'Rotating' : 'Orbit'}</span>
        </button>

        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className="px-2.5 py-1 rounded text-xs font-mono border flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          style={{
            backgroundColor: wireframeMode ? 'var(--color-primary, #284e3a)' : 'rgba(250, 249, 245, 0.92)',
            color: wireframeMode ? '#FFFFFF' : 'var(--text-main, #1a1d1a)',
            borderColor: 'var(--border-subtle, #d5cfc2)',
            backdropFilter: 'blur(6px)',
          }}
          title="Toggle Wireframe Mesh Grid"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Wireframe</span>
        </button>

        {/* Color Palette Switcher */}
        <button
          onClick={() => setColorScheme(colorScheme === 'hypsometric' ? 'lidar' : colorScheme === 'lidar' ? 'archival' : 'hypsometric')}
          className="px-2.5 py-1 rounded text-xs font-mono border flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          style={{
            backgroundColor: 'rgba(250, 249, 245, 0.92)',
            color: 'var(--text-main, #1a1d1a)',
            borderColor: 'var(--border-subtle, #d5cfc2)',
            backdropFilter: 'blur(6px)',
          }}
          title="Cycle Terrain Hypsometric Shading"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span className="capitalize">{colorScheme}</span>
        </button>

        {/* Camera Angles */}
        <div className="flex items-center gap-0.5 border rounded p-0.5" style={{ backgroundColor: 'rgba(250, 249, 245, 0.92)', borderColor: 'var(--border-subtle, #d5cfc2)' }}>
          <button
            onClick={() => setCameraView('perspective')}
            className="px-1.5 py-0.5 text-[11px] font-mono rounded hover:bg-stone-200 cursor-pointer"
            title="3D Perspective"
          >
            3D
          </button>
          <button
            onClick={() => setCameraView('topdown')}
            className="px-1.5 py-0.5 text-[11px] font-mono rounded hover:bg-stone-200 cursor-pointer"
            title="Top-Down Nadir DEM View"
          >
            2D
          </button>
          <button
            onClick={() => setCameraView('elevation')}
            className="px-1.5 py-0.5 text-[11px] font-mono rounded hover:bg-stone-200 cursor-pointer"
            title="Elevation Profile"
          >
            Profile
          </button>
        </div>
      </div>

      {/* Bottom Left: 3D Telemetry Radar Status */}
      <div
        className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md border text-[11px] font-mono pointer-events-none hidden sm:flex items-center gap-2 shadow-xs"
        style={{
          backgroundColor: 'rgba(250, 249, 245, 0.92)',
          borderColor: 'var(--border-subtle, #d5cfc2)',
          color: 'var(--text-main, #1a1d1a)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <Radio className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
        <span>3D DEM Mesh · Radius: <strong>{bufferRadius} km</strong></span>
      </div>

      {/* Bottom Right: GIS Layer Legend */}
      <div
        className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md border text-[11px] font-mono flex items-center gap-3 shadow-xs"
        style={{
          backgroundColor: 'rgba(250, 249, 245, 0.92)',
          borderColor: 'var(--border-subtle, #d5cfc2)',
          color: 'var(--text-main, #1a1d1a)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#943b32] ring-2 ring-red-200" />
          <span>Project Site</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#284e3a] ring-2 ring-emerald-200" />
          <span>Buffer Zone</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1a565c] ring-2 ring-teal-200" />
          <span>Waterways</span>
        </div>
      </div>
    </div>
  );
}