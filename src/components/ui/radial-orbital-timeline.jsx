import { useState, useEffect, useRef } from 'react';

function getStatusLabel(status) {
  return status.replace('-', ' ');
}

export default function RadialOrbitalTimeline({ timelineData = [] }) {
  const [activeId, setActiveId] = useState(timelineData[0]?.id ?? null);
  const [hoveredId, setHoveredId] = useState(null);
  const startRef = useRef(Date.now());
  const rafRef = useRef(null);

  // Duration must match the CSS orbit duration (ms)
  const rotationDuration = 7000; // 60s

  if (!timelineData.length) {
    return null;
  }

  const activeItem = timelineData.find((item) => item.id === activeId) ?? timelineData[0];
  const orbitRadius = 204;

  useEffect(() => {
    if (!timelineData || timelineData.length === 0) return;

    // Round-robin activation: advance to the next node each slice.
    const slice = rotationDuration / timelineData.length;
    let startIdx = timelineData.findIndex((t) => t.id === activeId);
    if (startIdx < 0) startIdx = 0;
    const idxRef = { current: startIdx };

    const tick = () => {
      if (hoveredId) return; // respect user interaction
      idxRef.current = (idxRef.current + 1) % timelineData.length;
      setActiveId(timelineData[idxRef.current].id);
    };

    // Start interval; use slice duration so it cycles evenly around the ring.
    const id = setInterval(tick, slice);

    return () => clearInterval(id);
  }, [timelineData, hoveredId, activeId]);

  return (
    <section className="radial-timeline" aria-label="Radial orbital contact links">
      <div className="radial-timeline-header">
        <h2>Contact Links</h2>
       
      </div>

      <div className="radial-timeline-grid">
        <div className="radial-orbit-wrap">
          <div className="radial-orbit">
            <div className="radial-orbit-ring radial-orbit-ring-outer" />
            <div className="radial-orbit-ring radial-orbit-ring-inner" />

            

            {timelineData.map((item, index) => {
              const angle = (index / timelineData.length) * 360 - 90;
              const isActive = activeItem.id === item.id;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="radial-node-wrap"
                  style={{
                    '--base-angle': `${angle}deg`,
                    '--radius': `${orbitRadius}px`,
                    '--delay': `${-(index / timelineData.length) * 60}s`,
                  }}
                >
                  <div className="radial-node-spin" style={{ animationDelay: `var(--delay)` }}>
                    <a
                      className={`radial-node ${isActive ? 'is-active' : ''}`}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => { setActiveId(item.id); setHoveredId(item.id); }}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => { setActiveId(item.id); setHoveredId(item.id); }}
                      onBlur={() => setHoveredId(null)}
                      style={{ animationDelay: `var(--delay)` }}
                    >
                      <span className="radial-node-icon">
                        <Icon size={16} strokeWidth={2} />
                      </span>
                      <span className="radial-node-copy">
                        <strong>{item.title}</strong>
                        <span>{item.handle ?? item.date}</span>
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="radial-details">
          <div className="radial-details-topline">
            <span className="radial-category">{activeItem.category}</span>
          </div>

          <h3>{activeItem.title}</h3>
          <p className="radial-details-copy">{activeItem.content}</p>

          <div className="radial-metrics">
            <div>
              <span>Handle</span>
              <strong>{activeItem.handle}</strong>
            </div>
            <div>
              <span>Link</span>
              <strong>{activeItem.hrefLabel}</strong>
            </div>
            <div>
              <span>Priority</span>
              <strong>{activeItem.energy}%</strong>
            </div>
          </div>

          <div className="radial-progress">
            <div className="radial-progress-labels">
              <span>Reachability</span>
              <strong>{activeItem.energy}%</strong>
            </div>
            <div className="radial-progress-track" aria-hidden="true">
              <div className="radial-progress-fill" style={{ width: `${activeItem.energy}%` }} />
            </div>
          </div>

          <a className="radial-link-cta" href={activeItem.href} target="_blank" rel="noreferrer">
            Open direct link
          </a>
        </div>
      </div>
    </section>
  );
}