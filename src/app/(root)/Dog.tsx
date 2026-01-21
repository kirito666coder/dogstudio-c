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
      gl={{
        antialias: true,
        toneMapping: THREE.NoToneMapping,
        toneMappingExposure: 1.0,
      }}
    >
      <DogMesh />
    </Canvas>
  );
}

const DogMesh = () => {
  const model = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, gl }) => {
    camera.position.z = 0.55;
    gl.toneMapping = THREE.NoToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions["Take 001"]?.play();
  }, [actions]);

  const [normalMap] = useTexture(["/dog_normals.jpg"]).map(texture => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    return texture;
  });

  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpeg",
    "/branches_normals.jpeg",
  ]).map(texture => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    return texture;
  });

  const matcapTextures = useTexture([
    "/matcap/mat-1.png",
    "/matcap/mat-2.png",
    "/matcap/mat-3.png",
    "/matcap/mat-4.png",
    "/matcap/mat-5.png",
    "/matcap/mat-6.png",
    "/matcap/mat-7.png",
    "/matcap/mat-8.png",
    "/matcap/mat-9.png",
    "/matcap/mat-10.png",
    "/matcap/mat-11.png",
    "/matcap/mat-12.png",
    "/matcap/mat-13.png",
    "/matcap/mat-14.png",
    "/matcap/mat-15.png",
    "/matcap/mat-16.png",
    "/matcap/mat-17.png",
    "/matcap/mat-18.png",
    "/matcap/mat-19.png",
    "/matcap/mat-20.png",
  ]).map(texture => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    return texture;
  });

  const mat2 = matcapTextures[1];
  const mat8 = matcapTextures[7];
  const mat9 = matcapTextures[8];
  const mat10 = matcapTextures[9];
  const mat12 = matcapTextures[11];
  const mat13 = matcapTextures[12];
  const mat19 = matcapTextures[18];

  const material = useRef({
    uMatcap1: { value: mat19 },
    uMatcap2: { value: mat2 },
    uProgress: { value: 1.0 },
  });

  const shaderUniforms = useRef<{ [uniform: string]: THREE.IUniform<any> } | null>(null);

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap,
    matcap: mat2,
    normalScale: new THREE.Vector2(2.5, 2.5), // Increased normal map intensity for more detail
    flatShading: false,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
    normalScale: new THREE.Vector2(1.5, 1.5),
  });

  const onBeforeCompile: THREE.MeshMatcapMaterial["onBeforeCompile"] = shader => {
    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
    shader.uniforms.uProgress = material.current.uProgress;

    shaderUniforms.current = shader.uniforms;

    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
          vec4 matcapColor1 = texture2D(uMatcapTexture1, uv);
          vec4 matcapColor2 = texture2D(uMatcapTexture2, uv);
          float transitionFactor = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor, uProgress, (vViewPosition.x + vViewPosition.y) * 0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress);
        `
    );
  };

  dogMaterial.onBeforeCompile = onBeforeCompile;
  dogMaterial.needsUpdate = true;

  model.scene.traverse(child => {
    if (child instanceof THREE.Mesh) {
      if (child.name.includes("DOG")) {
        child.material = dogMaterial;
        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      } else {
        child.material = branchMaterial;
        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    }
  });

  const dogModel = useRef(model);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(dogModel.current.scene.position, {
      z: "-=0.75",
      y: "+=0.1",
    })
      .to(dogModel.current.scene.rotation, {
        x: `+=${Math.PI / 15}`,
      })
      .to(
        dogModel.current.scene.rotation,
        {
          y: `-=${Math.PI}`,
        },
        "third"
      )
      .to(
        dogModel.current.scene.position,
        {
          x: "-=0.5",
          z: "+=0.6",
          y: "-=0.05",
        },
        "third"
      );
  }, []);

  useEffect(() => {
    const changeMatcap = (newMatcap: THREE.Texture) => {
      material.current.uMatcap1.value = newMatcap;
      gsap.to(material.current.uProgress, {
        value: 0.0,
        duration: 0.3,
        onComplete: () => {
          material.current.uMatcap2.value = material.current.uMatcap1.value;
          material.current.uProgress.value = 1.0;
        },
      });
    };

    document
      .querySelector(`.title[img-title="tomorrowland"]`)
      ?.addEventListener("mouseenter", () => changeMatcap(mat19));

    document
      .querySelector(`.title[img-title="navy-pier"]`)
      ?.addEventListener("mouseenter", () => changeMatcap(mat8));

    document
      .querySelector(`.title[img-title="msi-chicago"]`)
      ?.addEventListener("mouseenter", () => changeMatcap(mat9));

    document
      .querySelector(`.title[img-title="phone"]`)
      ?.addEventListener("mouseenter", () => changeMatcap(mat12));

    document
      .querySelector(`.title[img-title="kikk"]`)
      ?.addEventListener("mouseenter", () => changeMatcap(mat10));

    document
      .querySelector(`.title[img-title="kennedy"]`)
      ?.addEventListener("mouseenter", () => changeMatcap(mat8));

    document
      .querySelector(`.title[img-title="opera"]`)
      ?.addEventListener("mouseenter", () => changeMatcap(mat13));

    document.querySelector(`.titles`)?.addEventListener("mouseleave", () => changeMatcap(mat2));
  }, [mat2, mat8, mat9, mat10, mat12, mat13, mat19]);

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 3.9, 0]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={8} castShadow />
      <directionalLight position={[-3, 2, -3]} color={0xffffff} intensity={2} />
    </>
  );
};
