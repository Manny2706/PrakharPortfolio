import { useEffect, useState } from 'react';
import AnimatedShaderBackground from './components/ui/animated-shader-background';
import CubeLoader from './components/ui/cube-loader';
import Lanyard from './components/lanyard/Lanyard';
import RadialOrbitalTimeline from './components/ui/radial-orbital-timeline';
import QuickInfo from './components/ui/quick-info';
import { Mail, Phone } from 'lucide-react';
  
function InstagramGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.2" cy="7.8" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedinGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="3.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.2 10.1V16M8.2 7.9v.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11.2 16v-3.2c0-1.2.8-2.1 1.9-2.1 1 0 1.6.6 1.6 1.7V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 4.5a7.2 7.2 0 0 0-2.28 14.03c.36.07.49-.16.49-.36 0-.18-.01-.79-.01-1.43-2.01.37-2.53-.49-2.68-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.59 1.23.84.72 1.2 1.87.86 2.33.66.07-.52.28-.86.51-1.06-1.78-.2-3.64-.9-3.64-4 0-.88.31-1.6.82-2.17-.08-.2-.36-1.03.08-2.13 0 0 .67-.21 2.2.83a7.5 7.5 0 0 1 4 0c1.53-1.04 2.2-.83 2.2-.83.44 1.1.16 1.93.08 2.13.51.57.82 1.29.82 2.17 0 3.11-1.87 3.8-3.65 4 .29.25.55.74.55 1.5 0 1.08-.01 1.95-.01 2.22 0 .2.13.44.5.36A7.2 7.2 0 0 0 12 4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

const contactOrbitData = [
  {
    id: 1,
    title: 'Instagram',
    handle: '@prakhar.driven/',
    href: 'https://www.instagram.com/prakhar.driven/',
    hrefLabel: 'instagram.com/prakhar.driven/',
    content: 'Photo updates, reels, and quick visual posts.',
    category: 'Social',
    icon: InstagramGlyph,
    relatedIds: [2, 3],
    status: 'completed',
    energy: 92,
  },
  {
    id: 2,
    title: 'LinkedIn',
    handle: '/in/prakhargupta-sse',
    href: 'https://www.linkedin.com/in/prakhargupta-sse/',
    hrefLabel: 'linkedin.com/in/prakhargupta-sse',
    content: 'Professional profile, experience, and career updates.',
    category: 'Professional',
    icon: LinkedinGlyph,
    relatedIds: [1, 3],
    status: 'completed',
    energy: 96,
  },
  {
    id: 3,
    title: 'GitHub',
    handle: 'github.com/your-handle',
    href: 'https://github.com/your-handle',
    hrefLabel: 'github.com/your-handle',
    content: 'Repositories, projects, and code samples.',
    category: 'Code',
    icon: GithubGlyph,
    relatedIds: [2, 4],
    status: 'in-progress',
    energy: 88,
  },
  {
    id: 4,
    title: 'Mobile',
    handle: '+91 7376745234',
    href: 'tel:+917376745234',
    hrefLabel: '+91 7376745234 ',
    content: 'Quick calls and direct conversations.',
    category: 'Direct',
    icon: Phone,
    relatedIds: [3, 5],
    status: 'pending',
    energy: 80,
  },
  {
    id: 5,
    title: 'Email',
    handle: 'prkhargupta18092000@gmail.com',
    href: 'mailto:prkhargupta18092000@gmail.com',
    hrefLabel: 'prkhargupta18092000@gmail.com',
    content: 'Best for briefs, proposals, and follow-ups.',
    category: 'Mail',
    icon: Mail,
    relatedIds: [4],
    status: 'pending',
    energy: 100,
  },
];

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const minimumDurationMs = 2000;
    let minimumElapsed = false;
    let pageLoaded = document.readyState === 'complete';
    let loaderFinished = false;

    const tryFinish = () => {
      if (!loaderFinished && minimumElapsed && pageLoaded) {
        loaderFinished = true;
        setIsReady(true);
      }
    };

    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true;
      tryFinish();
    }, minimumDurationMs);

    const handleLoad = () => {
      pageLoaded = true;
      tryFinish();
    };

    if (!pageLoaded) {
      window.addEventListener('load', handleLoad);
    } else {
      tryFinish();
    }

    return () => {
      window.clearTimeout(minimumTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isReady) {
    return (
      <main className="app-shell app-shell-loading">
        <CubeLoader />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero-card hero-section">
        <AnimatedShaderBackground />
        <div className="hero-content">
        <h1>Prakhar Gupta</h1>
        </div>
      </section>
      <section className="lanyard-section">
        <Lanyard />
      </section>
      <section className="timeline-section" aria-label="Contact orbit section">
        <RadialOrbitalTimeline timelineData={contactOrbitData} />
      </section>
      <QuickInfo />
    </main>
  );
}
