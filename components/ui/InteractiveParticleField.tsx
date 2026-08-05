"use client";

import React, { useEffect, useRef, useState } from "react";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  baseHue: number;
  scale: number;
  opacity: number;
  baseScale: number;
  baseOpacity: number;
  color: RGB;
}

export interface InteractiveParticleFieldProps {
  particleSize?: { width: number; height: number };
  particleSpacing?: number;
  interactionRadius?: number;
  attractionStrength?: number;
  damping?: number;      // Spring damping (0 to 1, e.g., 0.15)
  stiffness?: number;    // Spring stiffness (0 to 1, e.g., 0.05)
  gradientColors?: string[];
  opacity?: number;
  rotation?: number;     // Particle base rotation in radians
  pattern?: "grid" | "radial";
  theme?: "light" | "dark" | "system";
}

const DEFAULT_GRADIENT = ["#0066ff", "#9933ff", "#ff0080", "#ff6600", "#ffcc00"];

// Parse hex to RGB colors normalized to [0, 1]
function parseHexColor(hex: string): RGB {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
}

// Linearly interpolate colors across normalized ratio
function getGradientColor(ratio: number, colorsRGB: RGB[]): RGB {
  const r = Math.max(0, Math.min(1, ratio));
  const segment = 1 / (colorsRGB.length - 1);
  const index = Math.floor(r / segment);
  const nextIndex = Math.min(colorsRGB.length - 1, index + 1);
  const t = (r - index * segment) / segment;

  const c1 = colorsRGB[index];
  const c2 = colorsRGB[nextIndex];

  return {
    r: c1.r + (c2.r - c1.r) * t,
    g: c1.g + (c2.g - c1.g) * t,
    b: c1.b + (c2.b - c1.b) * t,
  };
}

export default function InteractiveParticleField({
  particleSize = { width: 12, height: 4 },
  particleSpacing = 42,
  interactionRadius = 260,
  attractionStrength = 1.3,
  damping = 0.15,
  stiffness = 0.05,
  gradientColors = DEFAULT_GRADIENT,
  opacity = 0.65,
  rotation = 0,
  pattern = "grid",
  theme = "system",
}: InteractiveParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, lastActive: 0 });
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  // Parse colors on load/change
  const parsedColors = React.useMemo(() => {
    return gradientColors.map(parseHexColor);
  }, [gradientColors]);

  // Theme detection
  useEffect(() => {
    const checkTheme = () => {
      let isDark = false;
      if (theme === "dark") {
        isDark = true;
      } else if (theme === "light") {
        isDark = false;
      } else {
        // System / class toggle detection
        isDark =
          document.documentElement.classList.contains("dark") ||
          window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      setCurrentTheme(isDark ? "dark" : "light");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use WebGL2 context
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: true });
    if (!gl) {
      console.warn("WebGL2 is not supported on this browser.");
      return;
    }

    // Vertex shader source
    const vsSource = `#version 300 es
      layout(location = 0) in vec2 a_quadPos;

      layout(location = 1) in vec2 a_instancePos;
      layout(location = 2) in float a_instanceAngle;
      layout(location = 3) in float a_instanceScale;
      layout(location = 4) in vec3 a_instanceColor;
      layout(location = 5) in float a_instanceOpacity;

      uniform vec2 u_resolution;
      uniform float u_particleWidth;
      uniform float u_particleHeight;

      out vec2 v_uv;
      out vec3 v_color;
      out float v_opacity;

      void main() {
        v_uv = a_quadPos;
        v_color = a_instanceColor;
        v_opacity = a_instanceOpacity;

        // Rotate particles dynamically
        float cosA = cos(a_instanceAngle);
        float sinA = sin(a_instanceAngle);

        vec2 scaledLocal = a_quadPos * vec2(u_particleWidth * a_instanceScale, u_particleHeight * a_instanceScale);
        
        vec2 rotatedLocal = vec2(
          scaledLocal.x * cosA - scaledLocal.y * sinA,
          scaledLocal.x * sinA + scaledLocal.y * cosA
        );

        vec2 screenPos = a_instancePos + rotatedLocal;
        vec2 clipSpace = (screenPos / u_resolution) * 2.0 - 1.0;
        
        // Invert Y axis for WebGL clipspace coords
        gl_Position = vec4(clipSpace.x, -clipSpace.y, 0.0, 1.0);
      }
    `;

    // Fragment shader source (using SDF to render sharp anti-aliased capsules/pills)
    const fsSource = `#version 300 es
      precision mediump float;

      in vec2 v_uv;
      in vec3 v_color;
      in float v_opacity;

      out vec4 fragColor;

      float sdfCapsule(vec2 p, vec2 a, vec2 b, float r) {
        vec2 pa = p - a, ba = b - a;
        float h = clamp(dot(pa, ba)/dot(ba, ba), 0.0, 1.0);
        return length(pa - ba*h) - r;
      }

      void main() {
        // v_uv is in range [-0.5, 0.5]
        // Capsule length 0.5 (from -0.25 to 0.25) and radius 0.09
        float d = sdfCapsule(v_uv, vec2(-0.25, 0.0), vec2(0.25, 0.0), 0.09);
        
        // Smoothstep edge creates anti-aliased Retina-sharp borders
        float edge = 0.012;
        float alpha = smoothstep(edge, -edge, d);
        
        if (alpha < 0.01) discard;
        fragColor = vec4(v_color, alpha * v_opacity);
      }
    `;

    // Helper: compile shader
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compiler error: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Compile and link program
    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Linker error: ", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (6 points forming a rectangle using TRIANGLES)
    const quadVertices = new Float32Array([
      -0.5, -0.5,
       0.5, -0.5,
      -0.5,  0.5,
      -0.5,  0.5,
       0.5, -0.5,
       0.5,  0.5,
    ]);

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    // Quad position attribute setup
    const aQuadPos = gl.getAttribLocation(program, "a_quadPos");
    gl.enableVertexAttribArray(aQuadPos);
    gl.vertexAttribPointer(aQuadPos, 2, gl.FLOAT, false, 0, 0);

    // Instance attribute buffer allocating
    const instanceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);

    // Set up layout offsets (each instance = 8 floats = 32 bytes)
    // layout 1: a_instancePos (vec2) - offset 0
    const aInstancePos = gl.getAttribLocation(program, "a_instancePos");
    gl.enableVertexAttribArray(aInstancePos);
    gl.vertexAttribPointer(aInstancePos, 2, gl.FLOAT, false, 32, 0);
    gl.vertexAttribDivisor(aInstancePos, 1);

    // layout 2: a_instanceAngle (float) - offset 8 bytes (2 floats)
    const aInstanceAngle = gl.getAttribLocation(program, "a_instanceAngle");
    gl.enableVertexAttribArray(aInstanceAngle);
    gl.vertexAttribPointer(aInstanceAngle, 1, gl.FLOAT, false, 32, 8);
    gl.vertexAttribDivisor(aInstanceAngle, 1);

    // layout 3: a_instanceScale (float) - offset 12 bytes (3 floats)
    const aInstanceScale = gl.getAttribLocation(program, "a_instanceScale");
    gl.enableVertexAttribArray(aInstanceScale);
    gl.vertexAttribPointer(aInstanceScale, 1, gl.FLOAT, false, 32, 12);
    gl.vertexAttribDivisor(aInstanceScale, 1);

    // layout 4: a_instanceColor (vec3) - offset 16 bytes (4 floats)
    const aInstanceColor = gl.getAttribLocation(program, "a_instanceColor");
    gl.enableVertexAttribArray(aInstanceColor);
    gl.vertexAttribPointer(aInstanceColor, 3, gl.FLOAT, false, 32, 16);
    gl.vertexAttribDivisor(aInstanceColor, 1);

    // layout 5: a_instanceOpacity (float) - offset 28 bytes (7 floats)
    const aInstanceOpacity = gl.getAttribLocation(program, "a_instanceOpacity");
    gl.enableVertexAttribArray(aInstanceOpacity);
    gl.vertexAttribPointer(aInstanceOpacity, 1, gl.FLOAT, false, 32, 28);
    gl.vertexAttribDivisor(aInstanceOpacity, 1);

    // Get uniform locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uParticleWidth = gl.getUniformLocation(program, "u_particleWidth");
    const uParticleHeight = gl.getUniformLocation(program, "u_particleHeight");

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let time = 0;
    let animationFrameId: number;

    const initGrid = () => {
      devicePixelRatio = window.devicePixelRatio || 1;
      width = canvas.width = window.innerWidth * devicePixelRatio;
      height = canvas.height = window.innerHeight * devicePixelRatio;
      gl.viewport(0, 0, width, height);

      particles = [];
      const logicalW = window.innerWidth;
      const logicalH = window.innerHeight;

      if (pattern === "grid") {
        const cols = Math.ceil(logicalW / particleSpacing) + 1;
        const rows = Math.ceil(logicalH / particleSpacing) + 1;

        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            // Apply slight organic jitter to the grid positions (not random visual, keeps it clean but soft)
            const baseJitterX = (Math.sin(c * 0.5) * Math.cos(r * 0.5) * 8);
            const baseJitterY = (Math.cos(c * 0.4) * Math.sin(r * 0.4) * 8);

            const homeX = c * particleSpacing + baseJitterX;
            const homeY = r * particleSpacing + baseJitterY;

            // Normalize coordinate ratio for the gradient calculations
            const diagRatio = (homeX + (logicalH - homeY)) / (logicalW + logicalH);
            const rgbColor = getGradientColor(diagRatio, parsedColors);

            const baseOp = currentTheme === "dark"
              ? 0.05 + (1.0 - Math.min(1.0, diagRatio)) * 0.05
              : 0.22 + (1.0 - Math.min(1.0, diagRatio)) * 0.12;
            particles.push({
              homeX,
              homeY,
              x: homeX,
              y: homeY,
              vx: 0,
              vy: 0,
              angle: rotation,
              baseHue: diagRatio * 360,
              scale: 1.0,
              opacity: baseOp,
              baseScale: 1.0,
              baseOpacity: baseOp,
              color: rgbColor,
            });
          }
        }
      } else {
        // Concentric radial circles layout
        const centerX = logicalW / 2;
        const centerY = logicalH / 2;
        const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
        const ringSpacing = particleSpacing;
        const numRings = Math.ceil(maxRadius / ringSpacing);

        // Add center particle
        particles.push({
          homeX: centerX,
          homeY: centerY,
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          angle: rotation,
          baseHue: 0,
          scale: 1.0,
          opacity: 0.25,
          baseScale: 1.0,
          baseOpacity: 0.25,
          color: parsedColors[0],
        });

        for (let ring = 1; ring <= numRings; ring++) {
          const radius = ring * ringSpacing;
          // Number of particles increases proportionally to size of circumference
          const circumference = 2 * Math.PI * radius;
          const particlesOnRing = Math.max(8, Math.floor(circumference / particleSpacing));

          for (let i = 0; i < particlesOnRing; i++) {
            const radAngle = (i / particlesOnRing) * Math.PI * 2;
            const homeX = centerX + Math.cos(radAngle) * radius;
            const homeY = centerY + Math.sin(radAngle) * radius;

            const radialRatio = radius / maxRadius;
            const rgbColor = getGradientColor(radialRatio, parsedColors);

            const baseOp = currentTheme === "dark"
              ? 0.05 + (1.0 - radialRatio) * 0.06
              : 0.22 + (1.0 - radialRatio) * 0.15;
            particles.push({
              homeX,
              homeY,
              x: homeX,
              y: homeY,
              vx: 0,
              vy: 0,
              angle: radAngle + rotation, // Point outward along circles
              baseHue: radialRatio * 360,
              scale: 1.0,
              opacity: baseOp,
              baseScale: 1.0,
              baseOpacity: baseOp,
              color: rgbColor,
            });
          }
        }
      }
    };

    const handleResize = () => {
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.lastActive = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.lastActive = Date.now();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.lastActive = Date.now();
      }
    };

    const handleTouchEnd = () => {
      // Clear touch cursor
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Initialize particles grid
    initGrid();

    // Statically allocated Float32Array to write to GPU buffers
    let dataBuffer = new Float32Array(0);

    // Angle interpolation helper
    const lerpAngle = (current: number, target: number, speed: number) => {
      let diff = target - current;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      return current + diff * speed;
    };

    // Render / Physics loop
    const tick = () => {
      // Pause simulation when page tab is out of focus to save GPU/CPU energy
      if (document.visibilityState === "hidden") {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      time += 1;
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Determine logical layout coordinates
      const logicalW = window.innerWidth;
      const logicalH = window.innerHeight;

      // Adjust parameters based on responsive device size and device connection
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      
      // Halve radius and strength on mobile to keep it subtle and prevent pointer jumps
      const activeRadius = isTouch ? interactionRadius * 0.45 : interactionRadius;
      const activeAttract = isTouch ? attractionStrength * 0.4 : attractionStrength;

      let targetX = mouseRef.current.x;
      let targetY = mouseRef.current.y;
      const now = Date.now();
      const idleTime = now - mouseRef.current.lastActive;

      // Fallback virtual auto-floating coordinate if cursor is idle or touch is inactive
      if (idleTime > 3000 || (isTouch && targetX === -1000)) {
        const floatSpeed = 0.005;
        const radiusX = logicalW * 0.2;
        const radiusY = logicalH * 0.2;
        const centerX = logicalW / 2;
        const centerY = logicalH / 2;

        const virtualX = centerX + Math.sin(time * floatSpeed) * radiusX + Math.cos(time * floatSpeed * 0.6) * (radiusX * 0.25);
        const virtualY = centerY + Math.cos(time * floatSpeed * 1.1) * radiusY + Math.sin(time * floatSpeed * 0.4) * (radiusY * 0.25);

        if (targetX === -1000) {
          targetX = virtualX;
          targetY = virtualY;
        } else {
          // Smooth blend transition from real coordinates
          const blend = Math.min(1.0, (idleTime - 3000) / 2000);
          targetX = targetX + (virtualX - targetX) * blend;
          targetY = targetY + (virtualY - targetY) * blend;
        }
      }

      // Reallocate Float32Array if particle grid size changes
      const particleLen = particles.length;
      if (dataBuffer.length !== particleLen * 8) {
        dataBuffer = new Float32Array(particleLen * 8);
      }

      for (let i = 0; i < particleLen; i++) {
        const p = particles[i];

        // 1. Spring physics forces computation
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        let force = 0;
        if (dist < activeRadius) {
          // Soft cubic curve decay makes the attraction feel extremely premium (OpenAI/Linear style)
          const distRatio = dist / activeRadius;
          force = 1.0 - (3.0 * distRatio * distRatio) + (2.0 * distRatio * distRatio * distRatio);

          // Magnetic attraction: pull particles slightly toward cursor
          const attractX = (dx / dist) * force * activeAttract;
          const attractY = (dy / dist) * force * activeAttract;
          p.vx += attractX;
          p.vy += attractY;
        }

        // Elastic return spring force back to home coordinate
        const springX = (p.homeX - p.x) * stiffness;
        const springY = (p.homeY - p.y) * stiffness;
        p.vx += springX;
        p.vy += springY;

        // Apply friction/damping to velocity
        p.vx *= (1.0 - damping);
        p.vy *= (1.0 - damping);

        // Update coordinates
        p.x += p.vx;
        p.y += p.vy;

        // 2. Local particle rotation reaction
        // Slowly align angle to face cursor when close, otherwise remain at default rotation
        const defaultAngle = pattern === "radial" ? Math.atan2(p.homeY - logicalH / 2, p.homeX - logicalW / 2) + rotation : rotation;
        const targetAngle = dist < activeRadius * 1.2 ? Math.atan2(dy, dx) : defaultAngle;
        p.angle = lerpAngle(p.angle, targetAngle, 0.06);

        // 3. Subtle background wind drift (idle animation)
        const windX = Math.sin(time * 0.005 + p.homeY * 0.004) * 0.45;
        const windY = Math.cos(time * 0.006 + p.homeX * 0.004) * 0.45;
        p.x += windX;
        p.y += windY;

        // 4. Calculate responsive scale and opacity adjustments
        const targetScale = 1.0 + force * 0.8;
        p.scale = p.scale + (targetScale - p.scale) * 0.08;

        const maxOpacity = currentTheme === "dark" ? opacity * 0.35 : opacity;
        const targetOpacity = p.baseOpacity + force * (maxOpacity - p.baseOpacity);
        p.opacity = p.opacity + (targetOpacity - p.opacity) * 0.08;

        // 5. Pack variables for GPU rendering
        // Scale back coordinates to retina-pixel scale on canvas viewport
        const glX = p.x * devicePixelRatio;
        const glY = p.y * devicePixelRatio;

        const idx = i * 8;
        dataBuffer[idx]     = glX;
        dataBuffer[idx + 1] = glY;
        dataBuffer[idx + 2] = p.angle;
        dataBuffer[idx + 3] = p.scale;
        dataBuffer[idx + 4] = p.color.r;
        dataBuffer[idx + 5] = p.color.g;
        dataBuffer[idx + 6] = p.color.b;
        dataBuffer[idx + 7] = p.opacity;
      }

      // Upload dynamically updated coordinates arrays to the GPU
      gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, dataBuffer, gl.DYNAMIC_DRAW);

      // Set global shader uniforms
      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uParticleWidth, particleSize.width * devicePixelRatio);
      gl.uniform1f(uParticleHeight, particleSize.height * devicePixelRatio);

      // Trigger instanced hardware rendering (GPU instancing draws all particles in 1 call!)
      gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, particleLen);

      animationFrameId = requestAnimationFrame(tick);
    };

    // Run WebGL loop
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);

      // Clean WebGL resources
      gl.deleteBuffer(quadBuffer);
      gl.deleteBuffer(instanceBuffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [
    particleSize.width,
    particleSize.height,
    particleSpacing,
    interactionRadius,
    attractionStrength,
    damping,
    stiffness,
    rotation,
    pattern,
    parsedColors,
    opacity,
    currentTheme,
  ]);

  if (currentTheme === "dark") {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none w-full h-full block"
      style={{
        zIndex: 1,
      }}
    />
  );
}
