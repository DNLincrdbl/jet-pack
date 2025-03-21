'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Scene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;

    // Get container dimensions
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Determine if mobile based on screen width
    const isMobile = window.innerWidth < 768;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 60 : 45, // Wider FOV on mobile
      width / height,
      0.1,
      1000
    );
    // Adjust camera position based on device
    camera.position.set(0, isMobile ? 0.3 : 0.5, isMobile ? 3 : 3.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable antialiasing on mobile for better performance
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)); // Lower pixel ratio on mobile
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = isMobile ? 512 : 1024; // Lower shadow resolution on mobile
    directionalLight.shadow.mapSize.height = isMobile ? 512 : 1024;
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0x00a8ff, 0.5);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = isMobile ? 1.5 : 2; // Slower rotation on mobile
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minPolarAngle = Math.PI / 3;
    controls.enablePan = false; // Disable panning for both touch and mouse

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      '/plastic_crate/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        // Adjust model scale based on device
        const scale = isMobile ? 1.8 : 2;
        model.scale.set(scale, scale, scale);
        model.position.set(0, isMobile ? -0.5 : -0.6, 0);
        model.rotation.set(0.1, 0, 0);

        // Add shadows to all meshes
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Improve material quality
            if (child.material) {
              child.material.roughness = 0.7;
              child.material.metalness = 0.3;
              
              // Optimize materials for mobile
              if (isMobile) {
                child.material.precision = 'lowp'; // Use low precision on mobile
              }
            }
          }
        });

        scene.add(model);
      },
      undefined,
      (error: unknown) => {
        console.error('Error loading model:', error);
      }
    );

    // Animation loop with performance optimization
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle container resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      // Update camera
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(newWidth, newHeight);
    };

    // Add resize listener
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frameId);
      renderer.dispose();
      scene.clear();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default Scene; 