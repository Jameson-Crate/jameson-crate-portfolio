import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";

const Pyramid = ({
  color,
  position,
}: {
  color: string;
  position: [number, number, number];
}) => {
  const pyramidRef = useRef();

  // Animation loop: Rotate the pyramid
  useFrame(() => {
    if (pyramidRef.current) {
      pyramidRef.current.position.x = position[0];
      pyramidRef.current.position.y = position[1];
      pyramidRef.current.position.z = position[2];

      pyramidRef.current.rotation.x = 5;
      pyramidRef.current.rotation.x += 0.01;
      pyramidRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={pyramidRef}>
      <torusGeometry args={[2.78, 0.7, 120, 64]} />
      {/* <boxGeometry args={[4, 3, 3]} /> */}
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={2}
        factor={0.3}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
};

const ThreePyramid = () => {
  return (
    <div style={{ height: "70%", width: "100%", margin: "0 auto" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 70 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Pyramid color={0xaf0000} position={[-5, -1, 0]} />
        <Pyramid color={0x0000af} position={[5, -1, 0]} />
        <Pyramid color={0x00af00} position={[0, 1, 0]} />
      </Canvas>
    </div>
  );
};

export default ThreePyramid;
