import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b0f14, 6, 26);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0.8, 6);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lights
    const aLight = new THREE.AmbientLight(0x5577aa, 0.7);
    scene.add(aLight);
    const keyLight = new THREE.DirectionalLight(0xd4af37, 1.35);
    keyLight.position.set(5, 3, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x0aa4ff, 0.6);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    // Textures (from apexquant-capital.html)
    const loader = new THREE.TextureLoader();
    const tDay = loader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    const tSpec = loader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');
    const tNorm = loader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
    const tCloud = loader.load('https://threejs.org/examples/textures/planets/clouds_2048.png');
    [tDay, tSpec, tNorm, tCloud].forEach(t => {
      t.anisotropy = 8;
      t.colorSpace = THREE.SRGBColorSpace;
    });

    // Globe
    const globeGeo = new THREE.SphereGeometry(2, 96, 96);
    const globeMat = new THREE.MeshPhongMaterial({
      map: tDay,
      specularMap: tSpec,
      normalMap: tNorm,
      shininess: 18,
      specular: new THREE.Color(0x333333)
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Cloud layer
    const cloudGeo = new THREE.SphereGeometry(2.02, 96, 96);
    const cloudMat = new THREE.MeshLambertMaterial({ map: tCloud, transparent: true, opacity: 0.25, depthWrite: false });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    scene.add(clouds);

    // Wireframe
    const wf = new THREE.WireframeGeometry(new THREE.SphereGeometry(2.04, 28, 18));
    const line = new THREE.LineSegments(wf, new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.18 }));
    scene.add(line);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const S = 1500;
    const starPos = new Float32Array(S * 3);
    for (let i = 0; i < S; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.35 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Atmosphere
    const atmoGeo = new THREE.SphereGeometry(2.1, 64, 64);
    const atmoMat = new THREE.MeshBasicMaterial({ color: 0x4ecbff, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, side: THREE.BackSide });
    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmo);

    // Particles
    const pGeo = new THREE.BufferGeometry();
    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2.8 + Math.random() * 1.5;
      const a = Math.random() * Math.PI * 2;
      const b = Math.random() * Math.PI;
      positions[i * 3] = r * Math.cos(a) * Math.sin(b);
      positions[i * 3 + 1] = r * Math.cos(b);
      positions[i * 3 + 2] = r * Math.sin(a) * Math.sin(b);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xd4af37, size: 0.02, transparent: true, opacity: 0.85 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Parallax
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      targetX = x * 0.6;
      targetY = y * 0.4;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Resize listener
    const onResize = () => {
      if (!renderer) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    const clock = new THREE.Clock();
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      globe.rotation.y += 0.0009;
      clouds.rotation.y += 0.0012;
      line.rotation.y += 0.0012;
      stars.rotation.y += 0.00015;
      particles.rotation.y -= 0.0006;

      currentX += (targetX - currentX) * 0.03;
      currentY += (targetY - currentY) * 0.03;
      camera.position.x = currentX * 2;
      camera.position.y = 0.8 + currentY * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      // Dispose geometries, materials, and textures
      [globeGeo, cloudGeo, wf, starGeo, pGeo, atmoGeo].forEach(g => g.dispose());
      [globeMat, cloudMat, line.material, starMat, pMat, atmoMat].forEach(m => (m as THREE.Material).dispose());
      [tDay, tSpec, tNorm, tCloud].forEach(t => t.dispose());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="heroCanvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};
