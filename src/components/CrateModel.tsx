'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

const CrateModel = () => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/plastic_crate/scene.gltf');

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive 
        object={scene} 
        scale={2}
        position={[0, -1, 0]}
        rotation={[0.2, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload('/plastic_crate/scene.gltf');

export default CrateModel; 