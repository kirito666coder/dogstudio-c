"use client";
import * as THREE from "three";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

export default function Dog() {
  return (
    <Canvas>
      <DogMesh />
    </Canvas>
  );
}

const DogMesh = () => {
  const model = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.55;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  // const texTure = useTexture({
  //   normalMap: "/dog_normals.jpg",
  //   sampleMatCap: "/matcap/mat-2.png",
  // });

  const [normalMap, sampleMatCap] = useTexture(["/dog_normals.jpg", "/matcap/mat-2.png"]).map(
    texture => {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }
  );

  model.scene.traverse(child => {
    if (child.name.includes("DOG")) {
      child.material = new THREE.MeshMatcapMaterial({
        normalMap,
        matcap: sampleMatCap,
      });
    }
  });

  return (
    <>
      <primitive object={model.scene} position={[0.25, -0.5, 0]} rotation={[0, Math.PI / 3.9, 0]} />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      <OrbitControls />
    </>
  );
};
