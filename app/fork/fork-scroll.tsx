"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  useScroll,
  Environment,
  Float,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import Link from "next/link";

function Logo3D() {
  const groupRef = useRef<THREE.Group>(null);
  const mainGroupRef = useRef<THREE.Group>(null);

  // Generate a mathematically accurate 3D voxel monogram (5x5x5 grid)
  const voxels = useMemo(() => {
    const cubes = [];
    const size = 5;
    const offset = (size - 1) / 2; // 2

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          let remove = false;

          // 'B' cutouts on the front and right faces (layers y=1 and y=3)
          if (y === 1 || y === 3) {
            // Front 'B' holes
            if (x === 1 || x === 2) remove = true;
            // Right 'B' holes
            if (z === 2 || z === 3) remove = true;
          }

          // Top star cutout on the top face (y=4)
          if (y === 4) {
            if (
              (x === 2 && z === 2) || // center
              (x === 2 && z === 1) || // up
              (x === 2 && z === 3) || // down
              (x === 1 && z === 2) || // left
              (x === 3 && z === 2) // right
            ) {
              remove = true;
            }
          }

          if (!remove) {
            cubes.push(new THREE.Vector3(x - offset, y - offset, z - offset));
          }
        }
      }
    }
    return cubes;
  }, []);

  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current || !mainGroupRef.current) return;

    const o = scroll.offset;

    // Animation Logic
    let explodeProgress = 0;
    if (o > 0.2 && o <= 0.4) {
      explodeProgress = (o - 0.2) / 0.2;
    } else if (o > 0.4 && o <= 0.7) {
      explodeProgress = 1;
    } else if (o > 0.7 && o <= 0.9) {
      explodeProgress = 1 - (o - 0.7) / 0.2;
    } else if (o > 0.9) {
      explodeProgress = 0;
    }

    // Easing for explosion
    const easeProgress = Math.sin((explodeProgress * Math.PI) / 2);

    // Explode pieces
    groupRef.current.children.forEach((mesh, i) => {
      const originalPos = voxels[i];
      const dir = originalPos.clone().normalize();

      // Center block fallback
      if (dir.lengthSq() === 0) {
        dir.set(0, 1, 0);
      }

      const dist = easeProgress * 15; // Explode distance

      mesh.position.x = originalPos.x + dir.x * dist;
      mesh.position.y = originalPos.y + dir.y * dist;
      mesh.position.z = originalPos.z + dir.z * dist;

      // Rotate individual pieces dynamically
      mesh.rotation.x = dir.x * easeProgress * Math.PI * 2;
      mesh.rotation.y = dir.y * easeProgress * Math.PI * 2;
      mesh.rotation.z = dir.z * easeProgress * Math.PI * 2;
    });

    // Rotate entire group over scroll
    mainGroupRef.current.rotation.y = o * Math.PI * 4 + Math.PI / 4; // Start at isometric angle
    mainGroupRef.current.rotation.x =
      Math.sin(o * Math.PI * 2) * 0.2 + Math.PI / 8;
    mainGroupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 2; // Floating effect
  });

  return (
    <group ref={mainGroupRef} scale={[6, 6, 6]}>
      <group ref={groupRef}>
        {voxels.map((pos, i) => (
          <RoundedBox
            key={i}
            position={[pos.x, pos.y, pos.z]}
            args={[0.96, 0.96, 0.96]}
            radius={0.08}
            smoothness={4}
          >
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.15}
              metalness={0.85}
            />
          </RoundedBox>
        ))}
      </group>
    </group>
  );
}

export function ForkScroll({ applyUrl }: { applyUrl: string }) {
  return (
    <main className="relative h-[100svh] w-full bg-[#050505] text-white overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 150], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[20, 20, 50]} intensity={2} />
        <directionalLight
          position={[-20, -20, -50]}
          intensity={1}
          color="#FC920D"
        />

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer
              form="rect"
              intensity={4}
              color="white"
              scale={[10, 5]}
              position={[0, 5, -9]}
            />
            <Lightformer
              form="rect"
              intensity={2}
              color="white"
              scale={[10, 5]}
              position={[0, -5, -9]}
            />
            <Lightformer
              form="rect"
              intensity={2}
              color="#FC920D"
              scale={[10, 5]}
              position={[10, 0, -9]}
            />
            <Lightformer
              form="rect"
              intensity={2}
              color="white"
              scale={[10, 5]}
              position={[-10, 0, -9]}
            />
          </group>
        </Environment>

        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.15}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Logo3D />
            </Float>

            <Scroll html className="w-full">
              {/* Page 1: 0 - 100vh */}
              <div className="flex h-screen w-full flex-col items-start justify-center p-8 md:p-24 lg:p-32">
                <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white">
                  Fork
                  <br />
                  The System.
                </h1>
                <p className="mt-6 max-w-xl font-serif-brand text-lg text-white/60 md:text-2xl">
                  No student tech scene in your city? Build one.
                </p>
              </div>

              {/* Page 2: 100vh - 200vh */}
              <div className="flex h-screen w-full flex-col items-end justify-center p-8 text-right md:p-24 lg:p-32">
                <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white">
                  Break It
                  <br />
                  Down.
                </h1>
                <p className="mt-6 max-w-xl font-serif-brand text-lg text-white/60 md:text-2xl">
                  Everything you need to launch. Nothing you don't.
                </p>
              </div>

              {/* Page 3-4: Sticky section 200vh - 400vh */}
              <div className="h-[200vh] w-full">
                <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center p-8 text-center md:p-24">
                  <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white">
                    Zero
                    <br />
                    Hand-Holding.
                  </h1>
                  <p className="mt-6 max-w-2xl font-serif-brand text-lg text-white/60 md:text-2xl">
                    We give you the playbook and the brand. You bring the
                    ambition. Everything ships publicly.
                  </p>
                </div>
              </div>

              {/* Page 5: 400vh - 500vh */}
              <div className="flex h-screen w-full flex-col items-start justify-center p-8 md:p-24 lg:p-32">
                <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white">
                  Reassemble.
                </h1>
                <p className="mt-6 max-w-xl font-serif-brand text-lg text-white/60 md:text-2xl">
                  Your city. Your flag. Same mission, different build.
                </p>
              </div>

              {/* Page 6: 500vh - 600vh */}
              <div className="flex h-screen w-full flex-col items-center justify-center p-8 text-center md:p-24">
                <h1 className="font-display text-[clamp(4rem,12vw,9rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-white">
                  Lead
                  <br />
                  Your Fork.
                </h1>
                <Link
                  href={applyUrl}
                  className="mt-10 rounded-full bg-white px-10 py-5 font-display text-lg font-black uppercase tracking-[0.15em] text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 active:scale-95"
                >
                  Apply Now
                </Link>
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}
