import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const OPTIONS = [
  {
    id: 'intro',
    label: 'Intro',
    content:
      "Hi — I'm Prakhar. Senior Software Engineer / Team Lead with 4.5 years of experience progressing from Application Engineer to Team Lead on enterprise banking platforms. Strong expertise in Java (8, 17), Spring Boot, REST APIs, WebSockets, and database-driven systems. Proven ability to lead small teams, mentor engineers, own end-to-end delivery, and implement scalable solutions for multi-bank SRM implementations. Experienced in collaborating with cross-functional stakeholders and driving digital transformation initiatives in regulated environments..",
  },
  {
    id: 'experience',
    label: 'Experience',
    content:
      '4.5+ years of experience progressing from Application Engineer to Team Lead on enterprise banking platforms',
  },
  {
    id: 'skills',
    label: 'Skills',
    sections: [
      {
        title: 'Platform and domain',
        items: [
          'Spring AI',
          'Java Spring Boot',
          'NewgenONE Platform',
          'NewgenONE Low Code Application Development',
          'NewgenONE Intelligent Process Automation',
          'NewgenONE Contextual Content Services',
          'NewgenONE Artificial Intelligence and Data Science',
        ],
      },
      {
        title: 'Backend and data',
        items: [
          'Java',
          'Core Java',
          'Spring Boot',
          'Spring Framework',
          'Spring MVC',
          'Hibernate',
          'Jakarta Persistence',
          'Apache Kafka',
          'PostgreSQL',
          'MySQL',
          'Oracle Database',
          'Microsoft SQL Server',
          'SQL',
          'JSON',
          'Application Support',
        ],
      },
      {
        title: 'Frontend and UI',
        items: [
          'Front-End Development',
          'JavaScript',
          'HTML',
          'Cascading Style Sheets (CSS)',
          'JavaServer Pages (JSP)',
          'Model-View-Controller (MVC)',
        ],
      },
      {
        title: 'Tools and collaboration',
        items: [
          'Microsoft Azure',
          'Microsoft Office',
          'Project Management',
          'Software Quality',
          'Teamwork',
          'Problem Solving',
          'Quick Grasping',
          'Python (Programming Language)',
          'C (Programming Language)',
          'C language',
          'AutoCAD',
        ],
      },
    ],
  },
];

export default function QuickInfo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  function handleOption(opt) {
    setSelected(opt);
  }

  const node = (
    <div className="quick-info" aria-live="polite">
      <button
        className="quick-info-button"
        aria-expanded={open}
        aria-controls="quick-info-panel"
        onClick={() => setOpen((v) => !v)}
        title="Quick Info"
      >
        Quick
      </button>

      <div
        id="quick-info-panel"
        className={`quick-info-panel ${open ? 'open' : ''}`}
        role="dialog"
        aria-hidden={!open}
      >
        <div className="quick-info-header">
          <strong>Quick Info</strong>
          <button
            className="quick-info-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="quick-info-body">
          <div className="quick-info-display">
            {selected ? (
              selected.sections ? (
                <div className="quick-info-skill-groups">
                  {selected.sections.map((section) => (
                    <section key={section.title} className="quick-info-skill-group">
                      <h4>{section.title}</h4>
                      <div className="quick-info-skill-list">
                        {section.items.map((item) => (
                          <span key={item} className="quick-info-skill-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                selected.content
              )
            ) : (
              'Choose a quick message below.'
            )}
          </div>

          <div className="quick-info-actions">
            {OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`quick-info-action ${selected?.id === opt.id ? 'active' : ''}`}
                onClick={() => handleOption(opt)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(node, document.body);
}
