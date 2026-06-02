import { useEffect, useRef, useState } from 'react';
import avatar from '../../public/assets/lanyard/vavatrer.jpeg';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function Lanyard() {
  const panelRef = useRef(null);
  const cardRef = useRef(null);
  const animationFrameRef = useRef(0);
  const isDraggingRef = useRef(true);
  const targetRef = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 });
  const currentRef = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return undefined;
    }

    const applyTransform = () => {
      const current = currentRef.current;

      card.style.transform = [
        `translate3d(${current.x}px, ${current.y}px, 0)`,
        `rotateX(${current.rotateX}deg)`,
        `rotateY(${current.rotateY}deg)`,
        `rotateZ(${current.rotateZ}deg)`,
        `scale(${current.scale})`,
      ].join(' ');
    };

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      current.rotateX += (target.rotateX - current.rotateX) * 0.12;
      current.rotateY += (target.rotateY - current.rotateY) * 0.12;
      current.rotateZ += (target.rotateZ - current.rotateZ) * 0.12;
      current.scale += (target.scale - current.scale) * 0.12;

      if (!isDraggingRef.current) {
        const snapBack = 0.002;

        if (Math.abs(current.x) < snapBack) current.x = 0;
        if (Math.abs(current.y) < snapBack) current.y = 0;
        if (Math.abs(current.rotateX) < snapBack) current.rotateX = 0;
        if (Math.abs(current.rotateY) < snapBack) current.rotateY = 0;
        if (Math.abs(current.rotateZ) < snapBack) current.rotateZ = 0;
        if (Math.abs(current.scale - 1) < snapBack) current.scale = 1;
      }

      applyTransform();
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const updateTargetFromPointer = (event, dragging = false) => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const rect = panel.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const relativeY = (event.clientY - rect.top - rect.height / 2) / rect.height;
    const intensity = dragging ? 1.4 : 1;

    targetRef.current = {
      x: clamp(relativeX * 64 * intensity, -48, 48),
      y: clamp(relativeY * 46 * intensity + (dragging ? 14 : 0), -18, 88),
      rotateX: clamp(-relativeY * 14 * intensity, -18, 18),
      rotateY: clamp(relativeX * 18 * intensity, -20, 20),
      rotateZ: clamp(relativeX * 10 * intensity, -14, 14),
      scale: dragging ? 1.03 : 1,
    };
  };

  const handlePointerMove = (event) => {
    if (isDraggingRef.current) {
      updateTargetFromPointer(event, true);
      return;
    }

    updateTargetFromPointer(event, false);
  };

  const handlePointerLeave = () => {
    if (isDraggingRef.current) {
      return;
    }

    targetRef.current = { x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 };
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateTargetFromPointer(event, true);
  };

  const endDrag = () => {
    if (!isDraggingRef.current) {
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    targetRef.current = { x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 };
  };

  return (
    <section
      ref={panelRef}
      className="lanyard-panel"
      aria-label="Lanyard showcase"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="lanyard-thread" />
      <div
        ref={cardRef}
        className="lanyard-card"
        data-dragging={isDragging ? 'true' : 'false'}
        onPointerDown={handlePointerDown}
      >
        <div className="lanyard-ring" />
        <div className="lanyard-badge">
          <div className="lanyard-avatar">
            <img
              src={avatar}
              alt="avatar"
              className="lanyard-avatar-image"
              onError={(e) => {
                // fallback to inline svg if the public asset is missing
                const img = e.currentTarget;
                img.onerror = null;
                img.src = `data:image/svg+xml;utf8,${encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><rect width='100%' height='100%' rx='18' fill='%234f7cff'/><text x='50%' y='55%' font-size='48' font-family='Inter, system-ui, sans-serif' fill='white' text-anchor='middle' dominant-baseline='middle'>P</text></svg>`
                )}`;
              }}
            />
          </div>
          <div>
            <p className="lanyard-title">Prakhar</p>
            <p className="lanyard-subtitle">Designing polished web experiences</p>
          </div>
        </div>
        <div className="lanyard-stats">
          <span>Spring AI</span>
          <span>Team Lead</span>
          <span>Microservices</span>
        </div>
      </div>
    </section>
  );
}
