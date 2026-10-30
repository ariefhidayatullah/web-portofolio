"use client";

// Rope + physics adapted from React Bits "Lanyard" (MIT). The card is a plain
// box with a canvas-drawn texture instead of card.glb, so its design lives in code.
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, type ThreeElement } from "@react-three/fiber";
import { useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import QRCode from "qrcode";

extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Partial<ThreeElement<typeof MeshLineGeometry>>;
    meshLineMaterial: Partial<ThreeElement<typeof MeshLineMaterial>>;
  }
}

const CARD_W = 1.6;
const CARD_H = 2.25;

const LINKEDIN_URL = "https://www.linkedin.com/in/mohammadariefhidayatullah";
const STACK = ["PHP", "Laravel", "Node.js", "Express.js", "React", "Next.js", "MySQL", "MongoDB", "Docker", "Git"];

export default function Lanyard() {
  return (
    <Canvas camera={{ position: [0, 0, 30], fov: 10 }} gl={{ alpha: true }} dpr={[1, 2]}>
      <ambientLight intensity={Math.PI} />
      <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}

type Joint = RapierRigidBody & { lerped?: THREE.Vector3 };

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef<THREE.Mesh<MeshLineGeometry>>(null);
  const fixed = useRef<Joint>(null!);
  const j1 = useRef<Joint>(null!);
  const j2 = useRef<Joint>(null!);
  const j3 = useRef<Joint>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: RigidBodyProps = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  const avatar = useTexture("/lanyard-photo.png");
  const { front, back, strap } = useMemo(() => drawTextures(avatar.image as HTMLImageElement), [avatar]);

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], false, "chordal")
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, CARD_H / 2 + 0.32, 0]]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (!fixed.current || !band.current) return;

    // Smooth the two middle joints so the strap doesn't jitter.
    [j1, j2].forEach((ref) => {
      const t = ref.current.translation();
      ref.current.lerped ??= new THREE.Vector3().copy(t);
      const dist = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(t)));
      ref.current.lerped.lerp(t, delta * (minSpeed + dist * (maxSpeed - minSpeed)));
    });
    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped!);
    curve.points[2].copy(j1.current.lerped!);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));

    // Pull the card back to face the camera.
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
  });

  const cardMat = { clearcoat: 1, clearcoatRoughness: 0.15, roughness: 0.6, metalness: 0.3 };

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh>
              <boxGeometry args={[CARD_W, CARD_H, 0.02]} />
              {/* box faces: +x, -x, +y, -y, +z (front), -z (back) */}
              <meshPhysicalMaterial attach="material-0" color="#0c1423" />
              <meshPhysicalMaterial attach="material-1" color="#0c1423" />
              <meshPhysicalMaterial attach="material-2" color="#0c1423" />
              <meshPhysicalMaterial attach="material-3" color="#0c1423" />
              <meshPhysicalMaterial attach="material-4" map={front} {...cardMat} />
              <meshPhysicalMaterial attach="material-5" map={back} {...cardMat} />
            </mesh>
            {/* metal clip */}
            <mesh position={[0, CARD_H / 2 + 0.08, 0]}>
              <boxGeometry args={[0.32, 0.16, 0.06]} />
              <meshStandardMaterial color="#c0c6d0" metalness={1} roughness={0.3} />
            </mesh>
            <mesh position={[0, CARD_H / 2 + 0.24, 0]}>
              <torusGeometry args={[0.08, 0.02, 12, 24]} />
              <meshStandardMaterial color="#c0c6d0" metalness={1} roughness={0.3} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={new THREE.Vector2(1000, 1000)} useMap={1} map={strap} repeat={new THREE.Vector2(-4, 1)} lineWidth={1} />
      </mesh>
    </>
  );
}

function drawTextures(photo: HTMLImageElement) {
  const W = 640;
  const H = 900;

  const canvas = (w: number, h: number) => {
    const c = document.createElement("canvas");
    // Drawn at 2x so text stays sharp when the card fills more of the screen.
    c.width = w * 2;
    c.height = h * 2;
    const ctx = c.getContext("2d")!;
    ctx.scale(2, 2);
    return [c, ctx] as const;
  };
  const bg = (ctx: CanvasRenderingContext2D) => {
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#121b2c");
    g.addColorStop(1, "#050510");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    const accent = ctx.createLinearGradient(0, 0, W, 0);
    accent.addColorStop(0, "#2c67ed");
    accent.addColorStop(0.55, "#38bdf8");
    accent.addColorStop(1, "#818cf8");
    return accent;
  };

  // Front: "dev pass" — photo, name, access chip, QR to LinkedIn.
  const [fc, f] = canvas(W, H);
  const accent = bg(f);
  f.fillStyle = accent;
  f.fillRect(0, 0, W, 14);
  f.fillRect(0, H - 14, W, 14);

  f.fillStyle = "#f0f0ff";
  f.font = "800 30px sans-serif";
  f.fillText("DEV PASS", 40, 66);
  f.fillStyle = "#60a5fa";
  f.font = "600 26px monospace";
  f.textAlign = "right";
  f.fillText("2026", W - 40, 66);
  f.textAlign = "left";

  // Photo panel: cut-out photo from head to waist over a blue glow.
  const panel = { x: 40, y: 92, w: W - 80, h: 420 };
  f.save();
  f.beginPath();
  f.roundRect(panel.x, panel.y, panel.w, panel.h, 24);
  f.clip();
  const glow = f.createRadialGradient(W / 2, panel.y + panel.h * 0.45, 20, W / 2, panel.y + panel.h * 0.45, panel.w * 0.6);
  glow.addColorStop(0, "#1d4ed8");
  glow.addColorStop(1, "#0c1423");
  f.fillStyle = glow;
  f.fillRect(panel.x, panel.y, panel.w, panel.h);
  const srcH = photo.height * 0.6;
  const drawH = 450;
  const drawW = (photo.width / srcH) * drawH;
  f.drawImage(photo, 0, 0, photo.width, srcH, (W - drawW) / 2, panel.y + 18, drawW, drawH);
  f.restore();
  f.strokeStyle = "rgba(148, 163, 184, 0.25)";
  f.lineWidth = 2;
  f.beginPath();
  f.roundRect(panel.x, panel.y, panel.w, panel.h, 24);
  f.stroke();

  f.fillStyle = "#f0f0ff";
  f.font = "800 44px sans-serif";
  f.fillText("MOHAMMAD ARIEF", 40, 570);
  f.fillText("HIDAYATULLAH", 40, 618);
  f.fillStyle = "#60a5fa";
  f.font = "500 24px monospace";
  f.fillText("Full-Stack Developer", 40, 656);

  f.fillStyle = "#94a3b8";
  f.font = "600 18px sans-serif";
  f.fillText("ACCESS", 40, 712);
  f.fillStyle = accent;
  f.beginPath();
  f.roundRect(40, 726, 230, 46, 23);
  f.fill();
  f.fillStyle = "#ffffff";
  f.font = "800 22px sans-serif";
  f.textAlign = "center";
  f.fillText("FULL-STACK", 155, 757);
  f.textAlign = "left";
  f.fillStyle = "#94a3b8";
  f.font = "600 18px sans-serif";
  f.fillText("SCAN TO CONNECT →", 40, 818);
  f.fillStyle = "#cbd5e1";
  f.font = "500 17px monospace";
  f.fillText("in/mohammadariefhidayatullah", 40, 846);

  // QR: dark modules on white so phone cameras can read it off the screen.
  const qr = QRCode.create(LINKEDIN_URL, { errorCorrectionLevel: "L" }).modules;
  const q = { x: W - 40 - 180, y: 690, size: 180, pad: 12 };
  f.fillStyle = "#ffffff";
  f.beginPath();
  f.roundRect(q.x, q.y, q.size, q.size, 14);
  f.fill();
  const cell = (q.size - q.pad * 2) / qr.size;
  f.fillStyle = "#050510";
  for (let r = 0; r < qr.size; r++) {
    for (let c = 0; c < qr.size; c++) {
      if (qr.get(r, c)) f.fillRect(q.x + q.pad + c * cell, q.y + q.pad + r * cell, cell + 0.5, cell + 0.5);
    }
  }

  // Back: monogram + tech stack chips.
  const [bc, b] = canvas(W, H);
  const backAccent = bg(b);
  b.fillStyle = backAccent;
  b.fillRect(0, 0, W, 14);
  b.fillRect(0, H - 14, W, 14);
  b.textAlign = "center";
  b.font = "800 120px sans-serif";
  b.fillText("MAH", W / 2, 220);
  b.fillStyle = "#94a3b8";
  b.font = "600 20px sans-serif";
  b.fillText("TECH STACK", W / 2, 330);

  b.font = "600 24px sans-serif";
  const chipH = 48;
  const gap = 12;
  const rows: string[][] = [[]];
  let rowW = 0;
  for (const name of STACK) {
    const w = b.measureText(name).width + 40;
    if (rowW + w > W - 80 && rows[rows.length - 1].length) {
      rows.push([]);
      rowW = 0;
    }
    rows[rows.length - 1].push(name);
    rowW += w + gap;
  }
  rows.forEach((row, i) => {
    const widths = row.map((n) => b.measureText(n).width + 40);
    let x = (W - (widths.reduce((a, w) => a + w, 0) + gap * (row.length - 1))) / 2;
    const y = 370 + i * (chipH + gap);
    row.forEach((name, j) => {
      b.fillStyle = "rgba(44, 103, 237, 0.18)";
      b.strokeStyle = "rgba(96, 165, 250, 0.45)";
      b.lineWidth = 2;
      b.beginPath();
      b.roundRect(x, y, widths[j], chipH, chipH / 2);
      b.fill();
      b.stroke();
      b.fillStyle = "#dbeafe";
      b.fillText(name, x + widths[j] / 2, y + 32);
      x += widths[j] + gap;
    });
  });

  b.fillStyle = "#94a3b8";
  b.font = "500 24px sans-serif";
  b.fillText("mohammadariefhidayatullah@gmail.com", W / 2, H - 70);

  // Strap: repeating label along the band.
  const [sc, st] = canvas(512, 64);
  st.fillStyle = "#0b0f1a";
  st.fillRect(0, 0, 512, 64);
  st.fillStyle = "#60a5fa";
  st.font = "700 30px sans-serif";
  st.textAlign = "center";
  st.textBaseline = "middle";
  st.fillText("ARIEF  ✦  DEV", 256, 34);

  const tex = (c: HTMLCanvasElement) => {
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 16;
    return t;
  };
  const strap = tex(sc);
  strap.wrapS = strap.wrapT = THREE.RepeatWrapping;
  return { front: tex(fc), back: tex(bc), strap };
}
