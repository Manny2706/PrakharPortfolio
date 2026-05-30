import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedShaderBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 4; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / iResolution.xy;
          vec2 centered = uv - 0.5;
          centered.x *= iResolution.x / iResolution.y;

          float base = fbm(centered * 2.4 + vec2(0.0, iTime * 0.08));
          float waves = sin(centered.x * 4.5 + iTime * 0.8) * 0.08;
          float glow = smoothstep(0.8, -0.2, length(centered + vec2(waves, 0.0)));

          vec3 colorA = vec3(0.05, 0.18, 0.42);
          vec3 colorB = vec3(0.24, 0.48, 0.95);
          vec3 colorC = vec3(0.55, 0.80, 1.00);

          vec3 color = mix(colorA, colorB, base);
          color = mix(color, colorC, glow * 0.6);
          color += 0.08 * sin(vec3(0.0, 1.0, 2.0) + iTime + centered.xyx * 3.0);

          gl_FragColor = vec4(color, 0.9);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId = 0;

    const render = () => {
      material.uniforms.iTime.value -= 0.056;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="shader-background" aria-hidden="true" />;
}
