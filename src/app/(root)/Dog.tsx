"use client";
import * as THREE from "three";
import { useAnimations, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/libs/gsap";

export default function Dog() {
  return (
    <Canvas
      id="canvas-elem"
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
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

  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    if (!actions) return;
    actions["Take 001"].play();
  }, [actions]);

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

  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpeg",
    "branches_normals.jpeg",
  ]).map(texture => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap,
    matcap: sampleMatCap,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  });

  model.scene.traverse(child => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  const DogModel = useRef(model);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        markers: true,
        scrub: true,
      },
    });

    tl.to(
      DogModel.current.scene.position,
      {
        z: "-=0.75",
        y: "+=0.1",
      },
      "first"
    )
      .to(
        DogModel.current.scene.rotation,
        {
          x: `+=${Math.PI / 15}`,
        },
        "first"
      )
      .to(
        DogModel.current.scene.rotation,
        {
          y: `-=${Math.PI}`,
        },
        "third"
      )
      .to(
        DogModel.current.scene.position,
        {
          x: "-=0.4",
          z: "+=0.5",
          y: "-=0.05",
        },
        "third"
      );
  });

  return (
    <>
      <primitive object={model.scene} position={[0.2, -0.6, 0.1]} rotation={[0, Math.PI / 5, -0]} />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
    </>
  );
};
