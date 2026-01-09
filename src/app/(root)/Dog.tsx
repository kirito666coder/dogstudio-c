"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

export default function Dog() {
  return (
    <Canvas>
      <DogMesh />
    </Canvas>
  );
}

const DogMesh = () => {
  useThree(({ camera, scene, gl }) => {
    console.log(camera);
  });
  return (
    <>
      <mesh>
        <meshBasicMaterial color={0x00ff00} />
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <OrbitControls />
    </>
  );
};
