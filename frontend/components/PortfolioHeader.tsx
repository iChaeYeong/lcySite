'use client';

import { useState, useEffect } from 'react';

const NAV = [
    { label: 'About',     id: 'about'     },
    { label: 'Skills',    id: 'skills'    },
    { label: 'Archiving', id: 'archiving' },
    { label: 'Project',   id: 'project'   },
];

export default function PortfolioHeader() {
    const [scrolled,   setScrolled]   = useState(false);
    const [active,     setActive]     = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });

        const observers: IntersectionObserver[] = [];
        const sectionMap = new Map<string, number>();

        NAV.forEach(n => {
            const el = document.getElementById(n.id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    sectionMap.set(n.id, entry.isIntersecting ? entry.intersectionRatio : 0);
                    let best = '';
                    let bestRatio = 0;
                    for (const [id, ratio] of sectionMap) {
                        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
                    }
                    if (bestRatio > 0) setActive(best);
                },
                { threshold: [0, 0.1, 0.25, 0.5], rootMargin: '-64px 0px -20% 0px' }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => {
            window.removeEventListener('scroll', onScroll);
            observers.forEach(o => o.disconnect());
        };
    }, []);

    const scrollTo = (id: string) => {
        setMobileOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                height: '64px',
                backgroundColor: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
                transition: 'border-color 0.2s',
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', padding: 0 }}>
                        이채영
                    </button>

                    <nav className="header-desktop" style={{ alignItems: 'center', gap: '2px' }}>
                        {NAV.map(n => {
                            const isAct = active === n.id;
                            return (
                                <button key={n.id} onClick={() => scrollTo(n.id)} style={{
                                    padding: '6px 14px', borderRadius: '6px', border: 'none',
                                    backgroundColor: 'transparent',
                                    color: isAct ? '#0f172a' : '#64748b',
                                    fontSize: '13px', fontWeight: isAct ? 700 : 400,
                                    cursor: 'pointer', transition: 'color 0.2s, font-weight 0.2s',
                                    borderBottom: isAct ? '2px solid #0891b2' : '2px solid transparent',
                                    borderTop: '2px solid transparent',
                                }}
                                    onMouseEnter={e => { if (!isAct) { e.currentTarget.style.color = '#0f172a'; }}}
                                    onMouseLeave={e => { if (!isAct) { e.currentTarget.style.color = '#64748b'; }}}
                                >
                                    {n.label}
                                </button>
                            );
                        })}
                    </nav>

                </div>
            </header>
        </>
    );
}
