import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * IntroScene.jsx — Lazy-loaded Three.js / R3F scene for the "MONA AI launch" intro.
 *
 * Slow, deliberate cinematic choreography (~12s) — every action eases in/out and is
 * followed by a natural pause:
 *   1. 0.0–1.9s   Environment init — particles + holo rings + lab fade in, a glowing
 *                 energy core forms and the robot MATERIALIZES out of it.
 *   2. 1.7–3.3s   Activation — eyes illuminate, head turns slowly, HOLDS eye contact.
 *   3. 3.3–5.9s   Greeting — slow raise, gentle wave, HELD at the top, slow lower, pause.
 *   4. 6.2–8.8s   Presentation — arm extends with the open palm angled to the VISITOR,
 *                 pose held ~1.5s while the welcome text overlays.
 *   5. 8.5–10.4s  Turn + walk — head leads, body turns fully, 3 articulated steps
 *                 (hip + KNEE joints, counter arm swing, bob, lean — no sliding).
 *   6. 10.4–12s   Console — pause, hand raises, presses the glow button → button flare,
 *                 triple energy rings, particle burst, floor circuits light up, panels
 *                 surge → screen flash hands off into the portfolio.
 *
 * The robot is a semi-realistic rounded humanoid (glossy clearcoat white shell, dark
 * joints, blue visor eyes, violet glow seams) built from primitives — no external
 * model download. All animation runs in useFrame off a shared clock; every frame body
 * is guarded so a runtime hiccup can never throw into RAF. The parent (Intro.jsx) owns
 * timing, the welcome text, skip button, and the hard fallback that guarantees the
 * hero always loads.
 */

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Piecewise-eased keyframe track. keys: [[time, value], ...] ascending. */
function track(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  const last = keys[keys.length - 1];
  if (t >= last[0]) return last[1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i];
    const [t1, v1] = keys[i + 1];
    if (t >= t0 && t <= t1) {
      const p = (t - t0) / (t1 - t0 || 1);
      return v0 + (v1 - v0) * easeInOut(p);
    }
  }
  return last[1];
}

const WHITE = '#f2f4ff';
const DARK = '#12101c';
const BLUE = '#5aa7ff';
const VIOLET = '#a78bfa';
const CYAN = '#22d3ee';

/* Body materials start at opacity 0 — the robot materializes by fading every
   material up to its userData.base value while the energy core dissolves. */
const ShellMat = ({ color = WHITE, rough = 0.28 }) => (
  <meshPhysicalMaterial
    color={color} metalness={0.25} roughness={rough}
    clearcoat={1} clearcoatRoughness={0.12}
    transparent opacity={0} userData={{ base: 1 }}
  />
);
const JointMat = () => (
  <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.3} transparent opacity={0} userData={{ base: 1 }} />
);
const GlowMat = ({ color, intensity = 2, base = 1 }) => (
  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} toneMapped={false} transparent opacity={0} userData={{ base }} />
);
/* Thin glowing seam ring around a limb (axis = local Y). */
const Seam = ({ y, r, color = BLUE }) => (
  <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[r, 0.004, 6, 24]} />
    <GlowMat color={color} intensity={1.6} base={0.9} />
  </mesh>
);

function Robot({ startRef }) {
  const root = useRef();
  const head = useRef();
  const eyeL = useRef();
  const eyeR = useRef();
  const mouth = useRef();
  const rArm = useRef();     // right arm (viewer-left) — waves + rests
  const rFore = useRef();
  const lArm = useRef();     // left arm (viewer-right) — presents + presses
  const lFore = useRef();
  const legL = useRef();
  const legR = useRef();
  const shinL = useRef();    // knee joints for an articulated walk
  const shinR = useRef();
  const baseRing = useRef();
  const fadeRef = useRef(-1);

  useFrame(() => {
    try {
      if (startRef.current == null) startRef.current = performance.now();
      const t = (performance.now() - startRef.current) / 1000;

      // ---- Scene 1: materialize out of the energy core (no robot before ~0.85s) ----
      const fade = track(t, [[0.85, 0], [1.9, 1]]);
      if (root.current && fadeRef.current !== fade) {
        root.current.traverse((o) => {
          const m = o.material;
          if (m && m.userData) m.opacity = (m.userData.base ?? 1) * fade;
        });
        fadeRef.current = fade;
      }

      // ---- Scene 2: eyes illuminate slowly with a power-on flicker ----
      const eyeI = track(t, [[1.7, 0], [2.05, 0.4], [2.3, 2.8], [2.6, 1.7], [12, 1.9]]);
      if (eyeL.current) eyeL.current.material.emissiveIntensity = eyeI;
      if (eyeR.current) eyeR.current.material.emissiveIntensity = eyeI;

      // ---- Subtle visor smile through the greeting + presentation ----
      if (mouth.current) mouth.current.material.opacity = track(t, [[3.2, 0], [3.7, 0.85], [8.4, 0.85], [8.9, 0]]);

      // ---- Walk cycle (9.15–10.35s): one shared phase drives hips, KNEES, arms,
      //      bob & lean. walkAmp eases the cycle in/out; stride frequency is matched
      //      to travel distance so feet plant instead of sliding. ----
      const walkAmp = track(t, [[9.1, 0], [9.35, 1], [10.1, 1], [10.4, 0]]);
      const phase = (t - 9.15) * 7.9; // ≈3 steps across the 1.2s walk
      const strideL = Math.sin(phase) * 0.5 * walkAmp;
      const kneeL = Math.max(0, Math.sin(phase + 0.9)) * 0.55 * walkAmp;
      const kneeR = Math.max(0, Math.sin(phase + Math.PI + 0.9)) * 0.55 * walkAmp;

      // ---- Body: settle from light → face visitor (long hold) → slight angle for
      //      presentation → full natural turn → walk → settle facing the console ----
      const bodyRotY = track(t, [[0, -0.35], [2.1, -0.35], [2.8, 0], [6.0, 0], [6.5, -0.06], [8.5, -0.06], [9.15, 1.35], [10.35, 1.35], [10.75, 0.62], [12, 0.62]]);
      const walkX = track(t, [[9.15, 0], [10.35, 1.05]]);
      if (root.current) {
        root.current.scale.setScalar(0.7 + 0.3 * fade);
        root.current.rotation.y = bodyRotY;
        root.current.rotation.x = 0.05 * walkAmp; // slight forward lean while walking
        root.current.position.x = walkX;
        root.current.position.y =
          (1 - fade) * 0.12 +
          Math.sin(t * 1.2) * 0.01 * fade * (1 - walkAmp) + // gentle idle breathing bob
          Math.abs(Math.sin(phase)) * 0.04 * walkAmp;       // step bounce while walking
      }

      // ---- Head: slow turn to camera, held eye contact, leads the turn to the
      //      console, then glances down at the button ----
      if (head.current) {
        head.current.rotation.y =
          track(t, [[0, 0.45], [2.0, 0.45], [2.8, 0], [8.3, 0], [8.8, 0.35], [9.25, 0.1], [10.35, 0.1], [10.7, 0.25], [12, 0.22]]) +
          Math.sin(t * 0.8) * 0.012 * fade * (1 - walkAmp);
        head.current.rotation.x = track(t, [[0, 0.1], [2.8, -0.02], [3.4, -0.06], [4.0, 0], [10.7, 0], [11.0, 0.12], [11.5, 0.06], [12, 0.06]]);
      }

      // ---- Scene 3: right arm — slow raise, gentle wave, HELD at top, slow lower ----
      if (rArm.current) {
        rArm.current.rotation.z = track(t, [[0, 0.06], [3.3, 0.06], [3.95, -2.35], [5.3, -2.35], [5.95, 0.06], [12, 0.06]]);
        rArm.current.rotation.x = Math.sin(phase) * 0.25 * walkAmp; // counter arm swing
      }
      if (rFore.current) {
        const waveEnv = track(t, [[3.95, 0], [4.25, 1], [4.65, 1], [4.95, 0]]);
        rFore.current.rotation.z =
          track(t, [[0, 0.04], [3.3, 0.04], [3.95, -0.35], [5.3, -0.35], [5.95, 0.04], [12, 0.04]]) +
          Math.sin(t * 5) * 0.32 * waveEnv;
      }

      // ---- Scene 4→6: left arm — presentation with the open palm angled toward the
      //      VISITOR (held ~1.5s under the welcome text), lower, walk swing, then
      //      raise and press the console button ----
      if (lArm.current) {
        lArm.current.rotation.z = track(t, [[0, -0.06], [6.2, -0.06], [6.85, 1.25], [8.3, 1.25], [8.85, -0.06], [10.55, -0.06], [10.85, 0.85], [11.05, 0.75], [12, 0.75]]);
        lArm.current.rotation.x =
          track(t, [[0, 0], [6.2, 0], [6.85, -0.5], [8.3, -0.5], [8.85, 0], [10.55, 0], [10.85, -0.55], [11.0, -0.72], [11.15, -0.6], [12, -0.6]]) -
          Math.sin(phase) * 0.25 * walkAmp;
      }
      if (lFore.current) {
        lFore.current.rotation.z = track(t, [[0, -0.04], [6.2, -0.04], [6.85, -0.18], [8.3, -0.18], [8.85, -0.04], [10.55, -0.04], [10.85, 0.1], [12, 0.1]]);
        // Wrist turn so the glowing palm faces the camera during the presentation
        lFore.current.rotation.y = track(t, [[0, 0], [6.2, 0], [6.85, -0.35], [8.3, -0.35], [8.85, 0], [12, 0]]);
      }

      // ---- Legs: alternating hip stride + knee flexion during the swing phase ----
      if (legL.current) legL.current.rotation.x = strideL;
      if (legR.current) legR.current.rotation.x = -strideL;
      if (shinL.current) shinL.current.rotation.x = -kneeL;
      if (shinR.current) shinR.current.rotation.x = -kneeR;

      // ---- Base glow ring slowly spins under the robot ----
      if (baseRing.current) {
        baseRing.current.rotation.z = t * 0.25;
        baseRing.current.material.opacity = fade * 0.35;
      }
    } catch (_) { /* never throw into RAF */ }
  });

  return (
    <group ref={root} position={[0, 0, 0]}>
      {/* ===== Torso — layered rounded armor ===== */}
      <mesh position={[0, 1.08, 0]} scale={[1, 1.06, 0.82]} castShadow>
        <sphereGeometry args={[0.3, 28, 22]} />
        <ShellMat />
      </mesh>
      {/* front chest plate (second armor layer) */}
      <mesh position={[0, 1.02, 0.09]} scale={[1, 0.9, 0.6]}>
        <sphereGeometry args={[0.27, 24, 18]} />
        <ShellMat rough={0.22} />
      </mesh>
      {/* back shell */}
      <mesh position={[0, 1.08, -0.2]} scale={[0.9, 1, 0.55]}>
        <sphereGeometry args={[0.18, 20, 16]} />
        <ShellMat />
      </mesh>
      {/* chest core: glowing disc + rim */}
      <mesh position={[0, 1.12, 0.235]}>
        <circleGeometry args={[0.06, 24]} />
        <GlowMat color={VIOLET} intensity={2.2} />
      </mesh>
      <mesh position={[0, 1.12, 0.238]}>
        <torusGeometry args={[0.075, 0.008, 8, 32]} />
        <GlowMat color={BLUE} intensity={1.6} base={0.9} />
      </mesh>
      {/* collar */}
      <mesh position={[0, 1.33, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.015, 8, 28]} />
        <JointMat />
      </mesh>
      {/* waist + glowing waist seam */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.13, 0.15, 0.16, 18]} />
        <JointMat />
      </mesh>
      <Seam y={0.78} r={0.15} color={VIOLET} />
      {/* pelvis */}
      <mesh position={[0, 0.66, 0]} scale={[1, 0.72, 0.85]}>
        <sphereGeometry args={[0.2, 24, 18]} />
        <ShellMat />
      </mesh>

      {/* Shoulder pads + glow dots */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.37, 1.28, 0]}>
            <sphereGeometry args={[0.105, 18, 14]} />
            <ShellMat />
          </mesh>
          <mesh position={[s * 0.45, 1.3, 0]}>
            <sphereGeometry args={[0.015, 10, 8]} />
            <GlowMat color={VIOLET} intensity={2} />
          </mesh>
        </group>
      ))}

      {/* Neck */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.055, 0.07, 0.1, 14]} />
        <JointMat />
      </mesh>

      {/* ===== Head — smooth glossy egg, dark visor, glowing oval eyes ===== */}
      <group ref={head} position={[0, 1.58, 0]}>
        <mesh scale={[0.95, 1.16, 0.98]} castShadow>
          <sphereGeometry args={[0.21, 32, 26]} />
          <ShellMat rough={0.16} />
        </mesh>
        {/* face visor */}
        <mesh position={[0, 0.005, 0.1]} scale={[0.8, 0.92, 0.55]}>
          <sphereGeometry args={[0.185, 26, 20]} />
          <meshPhysicalMaterial color={'#08080f'} metalness={0.5} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} transparent opacity={0} userData={{ base: 1 }} />
        </mesh>
        {/* eyes — tall glowing ovals */}
        <mesh ref={eyeL} position={[-0.072, 0.025, 0.185]} scale={[1, 1.35, 0.45]}>
          <sphereGeometry args={[0.042, 18, 14]} />
          <GlowMat color={BLUE} intensity={0} />
        </mesh>
        <mesh ref={eyeR} position={[0.072, 0.025, 0.185]} scale={[1, 1.35, 0.45]}>
          <sphereGeometry args={[0.042, 18, 14]} />
          <GlowMat color={BLUE} intensity={0} />
        </mesh>
        {/* subtle smile (fades in during the wave) */}
        <mesh ref={mouth} position={[0, -0.052, 0.183]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.045, 0.007, 8, 20, Math.PI]} />
          <GlowMat color={BLUE} intensity={1.4} base={0} />
        </mesh>
        {/* ear discs + glow dots */}
        {[-1, 1].map((s) => (
          <group key={s}>
            <mesh position={[s * 0.195, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
              <JointMat />
            </mesh>
            <mesh position={[s * 0.208, 0, 0]}>
              <sphereGeometry args={[0.012, 10, 8]} />
              <GlowMat color={CYAN} intensity={1.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ===== RIGHT arm (viewer-left): shoulder pivot ===== */}
      <group ref={rArm} position={[-0.36, 1.24, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <capsuleGeometry args={[0.055, 0.24, 6, 14]} />
          <ShellMat />
        </mesh>
        <Seam y={-0.24} r={0.058} />
        <mesh position={[0, -0.33, 0]}><sphereGeometry args={[0.06, 14, 12]} /><JointMat /></mesh>
        <group ref={rFore} position={[0, -0.36, 0]}>
          <mesh position={[0, -0.14, 0]}>
            <capsuleGeometry args={[0.05, 0.2, 6, 14]} />
            <ShellMat />
          </mesh>
          <Seam y={-0.26} r={0.052} color={VIOLET} />
          <mesh position={[0, -0.31, 0]} scale={[0.85, 1.15, 0.95]}>
            <sphereGeometry args={[0.07, 16, 14]} />
            <ShellMat />
          </mesh>
        </group>
      </group>

      {/* ===== LEFT arm (viewer-right): shoulder pivot ===== */}
      <group ref={lArm} position={[0.36, 1.24, 0]}>
        <mesh position={[0, -0.16, 0]}>
          <capsuleGeometry args={[0.055, 0.24, 6, 14]} />
          <ShellMat />
        </mesh>
        <Seam y={-0.24} r={0.058} />
        <mesh position={[0, -0.33, 0]}><sphereGeometry args={[0.06, 14, 12]} /><JointMat /></mesh>
        <group ref={lFore} position={[0, -0.36, 0]}>
          <mesh position={[0, -0.14, 0]}>
            <capsuleGeometry args={[0.05, 0.2, 6, 14]} />
            <ShellMat />
          </mesh>
          <Seam y={-0.26} r={0.052} color={VIOLET} />
          <mesh position={[0, -0.31, 0]} scale={[0.85, 1.15, 0.95]}>
            <sphereGeometry args={[0.07, 16, 14]} />
            <ShellMat />
          </mesh>
          {/* open-palm glow (presentation gesture) */}
          <mesh position={[0, -0.31, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.045, 0.02, 16]} />
            <GlowMat color={VIOLET} intensity={1.1} />
          </mesh>
        </group>
      </group>

      {/* ===== Legs — hip pivot + articulated knee (shin group) ===== */}
      {[[-0.14, legL, shinL], [0.14, legR, shinR]].map(([x, hipRef, shinRef]) => (
        <group key={x} ref={hipRef} position={[x, 0.62, 0]}>
          <mesh position={[0, -0.13, 0]}>
            <capsuleGeometry args={[0.075, 0.18, 6, 14]} />
            <ShellMat />
          </mesh>
          <Seam y={-0.2} r={0.077} />
          <mesh position={[0, -0.28, 0]}><sphereGeometry args={[0.068, 14, 12]} /><JointMat /></mesh>
          <group ref={shinRef} position={[0, -0.3, 0]}>
            <mesh position={[0, -0.12, 0]}>
              <capsuleGeometry args={[0.06, 0.16, 6, 14]} />
              <ShellMat />
            </mesh>
            <mesh position={[0, -0.24, 0]}><sphereGeometry args={[0.05, 12, 10]} /><JointMat /></mesh>
            {/* chunky boot */}
            <mesh position={[0, -0.28, 0.05]}>
              <boxGeometry args={[0.15, 0.07, 0.26]} />
              <ShellMat rough={0.3} />
            </mesh>
            <mesh position={[0, -0.285, 0.16]}><sphereGeometry args={[0.055, 12, 10]} /><JointMat /></mesh>
            {/* glowing sole strip */}
            <mesh position={[0, -0.317, 0.05]}>
              <boxGeometry args={[0.13, 0.008, 0.22]} />
              <GlowMat color={BLUE} intensity={1.2} base={0.6} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Base glow ring */}
      <mesh ref={baseRing} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.34, 0.5, 40]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Environment: energy core, holo rings, grid floor, lab (ground + premium console),
 * and the cinematic launch FX (energy rings, particle burst, floor circuits, flare).
 */
function Environment({ startRef, onButton }) {
  const core = useRef();
  const coreLight = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const lab = useRef();
  const btn = useRef();
  const pMain = useRef();
  const holoRing = useRef();
  const orbit = useRef();
  const flare = useRef();
  const burst = useRef();
  const circuits = useRef();
  const energyRings = useRef([]);
  const envFadeRef = useRef(-1);
  const firedRef = useRef(false);

  const grid = useMemo(() => {
    const g = new THREE.GridHelper(30, 60, new THREE.Color('#4c3a8f'), new THREE.Color('#1a1630'));
    g.material.transparent = true;
    g.material.opacity = 0;
    g.material.depthWrite = false;
    return g;
  }, []);

  // Particle burst directions (unit sphere), scaled outward on button press
  const burstPositions = useMemo(() => {
    const n = 90;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = Math.sin(ph) * Math.cos(th) * 0.06;
      arr[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * 0.06;
      arr[i * 3 + 2] = Math.cos(ph) * 0.06;
    }
    return arr;
  }, []);

  useFrame(() => {
    try {
      if (startRef.current == null) return;
      const t = (performance.now() - startRef.current) / 1000;

      // Lab environment (ground + console) gradually fades in
      const env = track(t, [[0.45, 0], [1.85, 1]]);
      if (lab.current && env !== envFadeRef.current && t < 2.8) {
        lab.current.traverse((o) => {
          const m = o.material;
          if (m && m.userData) m.opacity = (m.userData.base ?? 1) * env;
        });
        envFadeRef.current = env;
      }
      grid.material.opacity = track(t, [[0.5, 0], [1.85, 0.16], [12.4, 0.12], [12.9, 0.32], [13.9, 0.28]]);

      // Glowing energy core the robot materializes from
      const glow = track(t, [[0.35, 0], [1.2, 1], [1.75, 0.55], [2.3, 0]]);
      if (core.current) {
        core.current.material.opacity = glow * 0.9;
        core.current.scale.setScalar(0.25 + glow * 1.15);
      }
      if (coreLight.current) coreLight.current.intensity = glow * 70;

      // Slowly-precessing holographic rings
      const ringA = track(t, [[0.4, 0], [1.4, 0.55], [2.8, 0.3], [3.8, 0.16], [12, 0.14]]);
      [ring1, ring2, ring3].forEach((r, i) => {
        if (!r.current) return;
        r.current.rotation.y = t * (0.45 - i * 0.12) * (i % 2 ? -1 : 1);
        r.current.material.opacity = ringA * (1 - i * 0.22);
      });

      // Console idle life: holo ring spin, orbiting motes, gentle panel flicker
      if (holoRing.current) holoRing.current.rotation.z = t * 0.7;
      if (orbit.current) {
        orbit.current.children.forEach((d, i) => {
          const a = t * 1.1 + i * 2.094;
          d.position.set(Math.cos(a) * 0.55, 0.05 + Math.sin(t * 1.7 + i) * 0.08, Math.sin(a) * 0.35);
        });
      }
      if (pMain.current && t > 2.8) {
        pMain.current.material.opacity = 0.14 * (1 + Math.sin(t * 13) * 0.08);
        pMain.current.material.emissiveIntensity = 0.5 + track(t, [[12.4, 0], [12.65, 2.5], [13.9, 1.4]]);
      }

      // ---- Button PRESS lands at ~11.1s (physical press + a confirming button glow),
      //      then a deliberate ~1.3s hold before the launch FX fire at ~12.4s. ----
      if (btn.current) {
        const press = track(t, [[10.9, 0], [11.12, 1], [11.35, 0.3], [13.9, 0.3]]);
        btn.current.position.z = 0.07 - press * 0.05;
        // small confirm-glow on press, held, then the big flare when the launch begins
        btn.current.material.emissiveIntensity = 0.8 + track(t, [[10.9, 0], [11.15, 2], [12.4, 1.8], [12.62, 5], [13.9, 3.2]]);
      }
      // ---- Launch FX (flare, energy rings, burst, circuits) — deferred to ~12.4s ----
      if (flare.current) flare.current.intensity = track(t, [[12.4, 0], [12.62, 90], [13.9, 25]]);
      energyRings.current.forEach((r, i) => {
        if (!r) return;
        const e = track(t, [[12.4 + i * 0.12, 0], [13.25 + i * 0.12, 1]]);
        r.scale.setScalar(0.2 + e * 12);
        r.material.opacity = (1 - e) * 0.55;
      });
      if (burst.current) {
        const e = track(t, [[12.4, 0], [13.2, 1]]);
        burst.current.scale.setScalar(0.5 + e * 8);
        burst.current.material.opacity = e > 0 ? (1 - e) * 0.9 : 0;
      }
      if (circuits.current) {
        const cOp = track(t, [[12.45, 0], [12.85, 0.55], [13.9, 0.35]]);
        circuits.current.children.forEach((c, i) => { c.material.opacity = cOp * (1 - i * 0.06); });
      }
      if (t > 11.12 && !firedRef.current && onButton) { firedRef.current = true; onButton(); }
    } catch (_) { /* never throw into RAF */ }
  });

  return (
    <group>
      {/* Materialization core */}
      <mesh ref={core} position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.3, 24, 20]} />
        <meshBasicMaterial color={'#cdb9ff'} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight ref={coreLight} position={[0, 1.1, 0.6]} intensity={0} distance={8} color={VIOLET} />

      {/* Holographic rings behind the materialization point */}
      <mesh ref={ring1} position={[0, 1.05, -0.35]} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[0.55, 0.006, 8, 64]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring2} position={[0, 1.05, -0.4]} rotation={[-0.35, 0, 0]}>
        <torusGeometry args={[0.8, 0.005, 8, 72]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring3} position={[0, 1.05, -0.45]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[1.08, 0.004, 8, 80]} />
        <meshBasicMaterial color={'#818cf8'} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Grid floor */}
      <primitive object={grid} position={[0, 0.002, 0]} />

      {/* Launch flare light at the console */}
      <pointLight ref={flare} position={[1.55, 1.1, 0.5]} intensity={0} distance={14} color={'#9db4ff'} />

      {/* Lab: ground + premium holographic console (fades in during scene 1) */}
      <group ref={lab}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color={'#0a0812'} metalness={0.6} roughness={0.5} transparent opacity={0} userData={{ base: 1 }} />
        </mesh>

        {/* Floor circuits radiating from the console (light up on launch) */}
        <group ref={circuits} position={[1.55, 0.012, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i * Math.PI) / 3 + 0.26;
            return (
              <mesh key={i} position={[Math.cos(a) * 0.85, Math.sin(a) * 0.85, 0]} rotation={[0, 0, a]}>
                <planeGeometry args={[1.55, 0.02]} />
                <meshBasicMaterial color={i % 2 ? BLUE : VIOLET} transparent opacity={0} userData={{ base: 0 }} blending={THREE.AdditiveBlending} depthWrite={false} />
              </mesh>
            );
          })}
        </group>

        {/* ===== Premium holographic AI console ===== */}
        <group position={[1.55, 0.95, 0.1]} rotation={[0, -0.5, 0]}>
          {/* pedestal + glowing core column + floor ring */}
          <mesh position={[0, -0.62, 0]}>
            <cylinderGeometry args={[0.1, 0.14, 0.55, 18]} />
            <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.35} transparent opacity={0} userData={{ base: 1 }} />
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.5, 10]} />
            <GlowMat color={BLUE} intensity={1.4} base={0.8} />
          </mesh>
          <mesh position={[0, -0.935, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.2, 0.01, 8, 36]} />
            <GlowMat color={VIOLET} intensity={1.4} base={0.45} />
          </mesh>

          {/* main holo panel */}
          <mesh ref={pMain}>
            <planeGeometry args={[0.95, 0.55]} />
            <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.5} transparent opacity={0} userData={{ base: 0.14 }} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
          {/* glowing frame edges */}
          {[[0, 0.285, 0.97, 0.015], [0, -0.285, 0.97, 0.015], [-0.485, 0, 0.015, 0.585], [0.485, 0, 0.015, 0.585]].map(([x, y, w, h], i) => (
            <mesh key={i} position={[x, y, 0.005]}>
              <planeGeometry args={[w, h]} />
              <meshBasicMaterial color={VIOLET} transparent opacity={0} userData={{ base: 0.7 }} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          ))}

          {/* holographic UI: chart bars */}
          {[[-0.33, 0.08], [-0.26, 0.15], [-0.19, 0.1], [-0.12, 0.19]].map(([x, h], i) => (
            <mesh key={i} position={[x, -0.18 + h / 2, 0.01]}>
              <planeGeometry args={[0.05, h]} />
              <meshBasicMaterial color={i % 2 ? CYAN : VIOLET} transparent opacity={0} userData={{ base: 0.85 }} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          ))}
          {/* holographic UI: data lines */}
          {[[0.16, 0.14, 0.3], [0.13, 0.07, 0.24]].map(([x, y, w], i) => (
            <mesh key={i} position={[x, y, 0.01]}>
              <planeGeometry args={[w, 0.014]} />
              <meshBasicMaterial color={BLUE} transparent opacity={0} userData={{ base: 0.7 }} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          ))}
          {/* holographic UI: radar circle + dot */}
          <mesh position={[0.33, 0.16, 0.01]}>
            <torusGeometry args={[0.07, 0.005, 6, 24]} />
            <meshBasicMaterial color={BLUE} transparent opacity={0} userData={{ base: 0.8 }} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh position={[0.36, 0.19, 0.012]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <GlowMat color={VIOLET} intensity={1.8} base={0.9} />
          </mesh>

          {/* side sub-panels, tilted toward center */}
          <mesh position={[-0.66, 0.04, 0.06]} rotation={[0, 0.38, 0]}>
            <planeGeometry args={[0.3, 0.4]} />
            <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.4} transparent opacity={0} userData={{ base: 0.1 }} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>
          <mesh position={[0.66, 0.07, 0.06]} rotation={[0, -0.38, 0]}>
            <planeGeometry args={[0.3, 0.4]} />
            <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.4} transparent opacity={0} userData={{ base: 0.1 }} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>

          {/* floating holo ring above the console */}
          <mesh ref={holoRing} position={[0, 0.5, 0]} rotation={[Math.PI / 2.1, 0, 0]}>
            <torusGeometry args={[0.26, 0.006, 8, 48]} />
            <meshBasicMaterial color={BLUE} transparent opacity={0} userData={{ base: 0.5 }} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>

          {/* orbiting holo motes */}
          <group ref={orbit}>
            {[0, 1, 2].map((i) => (
              <mesh key={i}>
                <sphereGeometry args={[0.014, 8, 8]} />
                <GlowMat color={i % 2 ? CYAN : VIOLET} intensity={1.8} base={0.9} />
              </mesh>
            ))}
          </group>

          {/* the glow button (faces the robot) + rim */}
          <mesh ref={btn} position={[0, -0.16, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.035, 24]} />
            <meshStandardMaterial color={'#c7d2fe'} emissive={VIOLET} emissiveIntensity={0.8} transparent opacity={0} userData={{ base: 1 }} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.16, 0.06]}>
            <torusGeometry args={[0.1, 0.008, 8, 28]} />
            <GlowMat color={VIOLET} intensity={1.6} base={0.9} />
          </mesh>

          {/* triple expanding energy rings on press */}
          {[0, 1, 2].map((i) => (
            <mesh key={i} ref={(el) => { energyRings.current[i] = el; }} position={[0, -0.16, 0.05]}>
              <ringGeometry args={[0.09, 0.115, 40]} />
              <meshBasicMaterial color={i === 1 ? VIOLET : BLUE} transparent opacity={0} userData={{ base: 0 }} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          ))}

          {/* particle burst from the button */}
          <points ref={burst} position={[0, -0.16, 0.1]}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={90} array={burstPositions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.035} color={'#bcd0ff'} transparent opacity={0} userData={{ base: 0 }} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
          </points>
        </group>
      </group>
    </group>
  );
}

function Particles({ count = 150, startRef }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = Math.random() * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    try {
      const g = ref.current;
      if (!g) return;
      if (startRef.current != null) {
        const t = (performance.now() - startRef.current) / 1000;
        // Slowly appear during scene 1; brighten during the launch
        g.material.opacity = track(t, [[0.25, 0], [1.5, 0.7], [10.9, 0.7], [11.4, 1]]);
      }
      g.rotation.y = state.clock.elapsedTime * 0.04;
      const pos = g.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        let y = pos.array[i * 3 + 1] + 0.0035;
        if (y > 4) y = 0;
        pos.array[i * 3 + 1] = y;
      }
      pos.needsUpdate = true;
    } catch (_) { /* ignore */ }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={VIOLET} transparent opacity={0} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Rig({ startRef }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    try {
      if (startRef.current == null) return;
      const t = (performance.now() - startRef.current) / 1000;
      // Follow to the console (~10.4s), HOLD steady on the button through the press
      // and the deliberate pause (11.3–12.4s), then push in as the launch FX fire.
      const cx = track(t, [[0, 0.1], [2.8, 0], [8.9, 0.05], [10.4, 0.85], [11.3, 1.3], [12.4, 1.33], [13.9, 1.55]]);
      const cy = track(t, [[0, 1.45], [2.8, 1.2], [11.3, 1.1], [12.4, 1.08], [13.9, 1.02]]);
      const cz = track(t, [[0, 5.3], [2.8, 4.25], [8.9, 4.1], [10.4, 3.55], [11.3, 3.2], [12.4, 3.15], [13.9, 2.5]]);
      camera.position.lerp(target.set(cx, cy, cz), 0.06);
      const lx = track(t, [[0, 0], [8.9, 0.15], [10.4, 0.9], [11.3, 1.3], [13.9, 1.5]]);
      camera.lookAt(lx, 1.05, 0);
    } catch (_) { /* ignore */ }
  });
  return null;
}

export default function IntroScene({ onButton }) {
  const startRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 680;

  return (
    <Canvas
      dpr={[1, isMobile ? 1.2 : 1.6]}
      gl={{ antialias: !isMobile, powerPreference: 'high-performance', alpha: false }}
      camera={{ position: [0.1, 1.45, 5.3], fov: 42, near: 0.1, far: 100 }}
      style={{ position: 'absolute', inset: 0 }}
      onCreated={({ scene }) => { scene.background = new THREE.Color('#05040a'); scene.fog = new THREE.Fog('#05040a', 4, 10); }}
    >
      {/* Cinematic lighting (blue key, violet rim) */}
      <ambientLight intensity={0.32} color={'#8ea2ff'} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color={'#bcd0ff'} />
      <pointLight position={[-3, 2, 2]} intensity={45} distance={12} color={VIOLET} />
      <pointLight position={[3, 1.5, 3]} intensity={32} distance={12} color={BLUE} />
      <spotLight position={[0, 5, 2]} angle={0.6} penumbra={0.8} intensity={30} color={'#a5b4fc'} />

      <Rig startRef={startRef} />
      <Environment startRef={startRef} onButton={onButton} />
      <Robot startRef={startRef} />
      <Particles count={isMobile ? 70 : 150} startRef={startRef} />

      {!isMobile && (
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.9} intensity={0.9} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
