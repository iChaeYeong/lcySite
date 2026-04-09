'use client';

import PortfolioHeader from '@/components/PortfolioHeader';

export default function PortfolioPage() {
    const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div style={{ backgroundColor: '#fff', color: '#1e293b', fontFamily: 'inherit' }}>
            <PortfolioHeader />

            {/* ━━━━━━━━━━━━━━━━━━━
                HERO
            ━━━━━━━━━━━━━━━━━━━ */}
            <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9', paddingTop: '64px' }}>
                <div style={wrap}>
                    <div style={{ padding: 'clamp(72px, 10vw, 120px) 0 clamp(56px, 8vw, 96px)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                            {['Fullstack', 'Backend', 'Frontend'].map(tag => (
                                <span key={tag} style={roleTag}>{tag}</span>
                            ))}
                        </div>

                        <h1 style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 20px', color: '#0f172a' }}>
                            안녕하세요,<br />
                            개발자 <span style={{ color: '#0891b2' }}>이채영</span>입니다.
                        </h1>

                        <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: '#64748b', lineHeight: 1.8, margin: '0 0 40px', maxWidth: '560px' }}>
                            사용자 경험을 먼저 생각하는 풀스택 개발자입니다.<br />
                            Java · Spring Boot · Next.js를 주로 사용하며,<br />
                            코드로 가치를 만드는 것을 즐깁니다.
                        </p>

                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <button onClick={() => scroll('about')} style={primaryBtn}>소개 보기</button>
                            <button onClick={() => scroll('project')} style={outlineBtn}>프로젝트 보기</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━
                ABOUT
            ━━━━━━━━━━━━━━━━━━━ */}
            <section id="about" style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <div style={wrap}>
                    <div style={sectionPad}>
                        <SectionTitle label="About Me" title="이채영을 소개합니다" />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>

                            {/* 왼쪽: 프로필 + 소개 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* 프로필 카드 */}
                                <div style={card}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800, color: '#0891b2', flexShrink: 0 }}>
                                            이
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>이채영</p>
                                            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Fullstack Developer</p>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8, margin: '16px 0 0', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                                        대구대학교 컴퓨터공학과를 졸업하고, 일학습병행제와 클라우드 엔지니어링 부트캠프를 통해 실무 경험을 쌓았습니다. 사용자에게 필요한 것을 먼저 생각하고, 그것을 코드로 구현하는 개발자가 되고자 합니다.
                                    </p>
                                </div>

                                {/* 관심 분야 */}
                                <div style={card}>
                                    <p style={cardLabel}>관심 분야</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                                        {[
                                            { icon: '', title: '웹 풀스택 개발', desc: 'Spring Boot + Next.js 기반 서비스 구현' },
                                            { icon: '', title: '클라우드 인프라', desc: 'AWS, Docker를 활용한 배포 및 운영' },
                                            { icon: '', title: 'UI/UX', desc: '사용자 중심의 직관적인 인터페이스 설계' },
                                        ].map(item => (
                                            <div key={item.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                <span style={{ fontSize: '16px', marginTop: '1px' }}>{item.icon}</span>
                                                <div>
                                                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{item.title}</p>
                                                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 오른쪽: 기본 정보 + 경력 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* 기본 정보 */}
                                <div style={card}>
                                    <p style={cardLabel}>기본 정보</p>
                                    <div style={{ marginTop: '12px' }}>
                                        {[
                                            { label: '생년월일', value: '2001. 08. 13' },
                                            { label: '거주지',   value: '서울 송파구' },
                                            { label: '학력',     value: '대구대학교 컴퓨터공학과 졸업' },
                                            { label: '연락처',   value: '010-9223-0766' },
                                            { label: '이메일',   value: 'chae_young813@naver.com' },
                                        ].map((item, i, arr) => (
                                            <div key={item.label} style={{ display: 'flex', gap: '16px', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', width: '60px', flexShrink: 0, paddingTop: '1px' }}>{item.label}</span>
                                                <span style={{ fontSize: '13px', color: '#334155', fontWeight: 500, lineHeight: 1.5 }}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 경력 */}
                                <div style={card}>
                                    <p style={cardLabel}>경력 및 활동</p>
                                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {[
                                            { period: '2023. 03 — 2024. 02', title: '일학습병행제', company: '인턴', desc: '현장 실무 중심의 일·학습 병행 프로그램. 약 1년간 실무 경험.' },
                                            { period: '2024. 03 — 2024. 12', title: '클라우드 엔지니어링 부트캠프', company: '교육 수료', desc: 'AWS, Docker, Linux 등 클라우드 인프라 중심의 집중 과정.' },
                                        ].map(c => (
                                            <div key={c.title} style={{ paddingLeft: '14px', borderLeft: '2px solid #e2e8f0' }}>
                                                <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 4px' }}>{c.period}</p>
                                                <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{c.title}
                                                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748b', marginLeft: '8px' }}>{c.company}</span>
                                                </p>
                                                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>{c.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━
                SKILLS
            ━━━━━━━━━━━━━━━━━━━ */}
            <section id="skills" style={{ backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' }}>
                <div style={wrap}>
                    <div style={sectionPad}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
                            <SectionTitle label="Skills" title="기술 스택" />
                            <div style={{ display: 'flex', gap: '16px' }}>
                                {[['#0f172a', '높음'], ['#0891b2', '중간'], ['#bae6fd', '기초']].map(([color, label]) => (
                                    <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8' }}>
                                        <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: color, display: 'inline-block' }} />
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                            {[
                                {
                                    label: 'Language',
                                    skills: [
                                        { name: 'Java',       pct: 75 },
                                        { name: 'JavaScript', pct: 70 },
                                        { name: 'SQL',        pct: 65 },
                                        { name: 'TypeScript', pct: 40 },
                                        { name: 'Python',     pct: 30 },
                                    ],
                                },
                                {
                                    label: 'Frontend',
                                    skills: [
                                        { name: 'HTML / CSS',   pct: 80 },
                                        { name: 'React',        pct: 65 },
                                        { name: 'Next.js',      pct: 60 },
                                        { name: 'Tailwind CSS', pct: 50 },
                                    ],
                                },
                                {
                                    label: 'Backend',
                                    skills: [
                                        { name: 'Spring Boot',     pct: 70 },
                                        { name: 'JPA',             pct: 55 },
                                        { name: 'Spring Security', pct: 50 },
                                        { name: 'Node.js',         pct: 35 },
                                    ],
                                },
                                {
                                    label: 'Database',
                                    skills: [
                                        { name: 'MySQL',      pct: 65 },
                                        { name: 'Oracle',     pct: 50 },
                                        { name: 'PostgreSQL', pct: 40 },
                                        { name: 'Redis',      pct: 25 },
                                    ],
                                },
                                {
                                    label: 'DevOps / Cloud',
                                    skills: [
                                        { name: 'Git / GitHub', pct: 70 },
                                        { name: 'Linux',        pct: 50 },
                                        { name: 'AWS',          pct: 45 },
                                        { name: 'Docker',       pct: 40 },
                                    ],
                                },
                                {
                                    label: 'Tools',
                                    skills: [
                                        { name: 'IntelliJ IDEA', pct: 75 },
                                        { name: 'VS Code',       pct: 70 },
                                        { name: 'Postman',       pct: 60 },
                                        { name: 'Figma',         pct: 40 },
                                    ],
                                },
                            ].map(group => (
                                <div key={group.label} style={{ ...card, padding: '20px 22px' }}>
                                    <p style={{ ...cardLabel, marginBottom: '16px' }}>{group.label}</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {group.skills.map(s => (
                                            <div key={s.name}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>{s.name}</span>
                                                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>{s.pct}%</span>
                                                </div>
                                                <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${s.pct}%`,
                                                        borderRadius: '99px',
                                                        background: s.pct >= 65
                                                            ? '#0f172a'
                                                            : s.pct >= 45
                                                            ? '#0891b2'
                                                            : '#bae6fd',
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━
                PROJECT
            ━━━━━━━━━━━━━━━━━━━ */}
            {/* ━━━━━━━━━━━━━━━━━━━
                ARCHIVING
            ━━━━━━━━━━━━━━━━━━━ */}
            <section id="archiving" style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <div style={wrap}>
                    <div style={sectionPad}>
                        <SectionTitle label="Archiving" title="아카이빙" />

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px', marginTop: '36px' }}>
                            {[
                                { title: 'GitHub',      url: 'github.com/iCheaYeong', desc: '프로젝트 소스코드 및 스터디 기록을 관리하는 저장소입니다.', href: 'https://github.com/iCheaYeong', badge: 'Code' },
                                { title: '기술 블로그', url: '준비 중',                desc: '학습 내용, 트러블슈팅, 프로젝트 회고를 기록합니다.',        href: '#',                              badge: 'Blog' },
                                { title: 'Notion',      url: '준비 중',                desc: '학습 노트, 프로젝트 기획, 일정 관리 워크스페이스입니다.',    href: '#',                              badge: 'Wiki' },
                            ].map(a => (
                                <a key={a.title} href={a.href} target="_blank" rel="noreferrer"
                                    style={archiveCard}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#bae6fd'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(8,145,178,0.08)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{a.title}</span>
                                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', color: '#0891b2', backgroundColor: '#e0f9ff', letterSpacing: '0.04em' }}>{a.badge}</span>
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 10px' }}>{a.url}</p>
                                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.65 }}>{a.desc}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━━━━━━━━━━
                PROJECT
            ━━━━━━━━━━━━━━━━━━━ */}
            <section id="project" style={{ backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' }}>
                <div style={wrap}>
                    <div style={sectionPad}>
                        <SectionTitle label="Project" title="프로젝트" />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '36px' }}>
                            <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
                                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', backgroundColor: '#fafafa' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>LCY Portfolio Site</span>
                                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', color: '#0891b2', backgroundColor: '#e0f9ff' }}>진행 중</span>
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>2025</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                                    <div style={{ padding: '20px 24px', borderRight: '1px solid #f1f5f9' }}>
                                        <p style={{ ...cardLabel, marginBottom: '8px' }}>개요</p>
                                        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75, margin: '0 0 16px' }}>
                                            개인 포트폴리오 사이트를 풀스택으로 직접 구현했습니다. DB 기반의 동적 메뉴 관리, 회원 인증, 어드민 대시보드까지 실제 서비스 수준으로 제작했습니다.
                                        </p>
                                        <p style={{ ...cardLabel, marginBottom: '8px' }}>기술 스택</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                                            {['Next.js 16', 'Spring Boot 3.4', 'JPA', 'MySQL', 'Spring Security'].map(s => (
                                                <span key={s} style={{ fontSize: '12px', fontWeight: 500, color: '#475569', padding: '3px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>{s}</span>
                                            ))}
                                        </div>
                                        <a href="https://github.com/iCheaYeong" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#0891b2', textDecoration: 'none', fontWeight: 600 }}>
                                            GitHub ↗
                                        </a>
                                    </div>
                                    <div style={{ padding: '20px 24px' }}>
                                        <p style={{ ...cardLabel, marginBottom: '12px' }}>주요 기능</p>
                                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {[
                                                { title: '동적 메뉴 관리',  desc: 'DB 기반 메뉴 구조를 실시간으로 수정 및 렌더링' },
                                                { title: '회원 인증',       desc: 'Spring Security 기반 로그인 · 회원가입' },
                                                { title: '어드민 대시보드', desc: '메뉴 편집, 사용자 관리 등 관리자 기능' },
                                                { title: '반응형 UI',       desc: '모바일부터 와이드 화면까지 대응' },
                                            ].map(f => (
                                                <li key={f.title} style={{ display: 'flex', gap: '10px' }}>
                                                    <span style={{ color: '#0891b2', fontSize: '12px', marginTop: '3px', flexShrink: 0 }}>✓</span>
                                                    <div>
                                                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{f.title} </span>
                                                        <span style={{ fontSize: '12px', color: '#64748b' }}>— {f.desc}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '24px', border: '1.5px dashed #e2e8f0', borderRadius: '12px', textAlign: 'center', backgroundColor: '#fafafa' }}>
                                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>추가 프로젝트 업데이트 예정입니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ backgroundColor: '#0f172a', padding: '32px clamp(24px, 6vw, 80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>이채영</span>
                <div style={{ display: 'flex', gap: '20px' }}>
                    {[
                        { label: 'GitHub',    href: 'https://github.com/iCheaYeong' },
                        { label: 'Threads',   href: '#' },
                        { label: 'Instagram', href: '#' },
                    ].map(s => (
                        <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                            style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                            {s.label}
                        </a>
                    ))}
                </div>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>© 2025 이채영</span>
            </footer>
        </div>
    );
}

// ━━━━━━━━━━━━━━━━━━━ 공통 컴포넌트 ━━━━━━━━━━━━━━━━━━━

function SectionTitle({ label, title }: { label: string; title: string }) {
    return (
        <div style={{ borderLeft: '3px solid #0891b2', paddingLeft: '14px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#0891b2', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>{label}</p>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.03em' }}>{title}</h2>
        </div>
    );
}

// ━━━━━━━━━━━━━━━━━━━ 스타일 ━━━━━━━━━━━━━━━━━━━

const wrap: React.CSSProperties = {
    maxWidth: '1100px', margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 64px)',
};

const sectionPad: React.CSSProperties = {
    padding: 'clamp(56px, 8vw, 88px) 0',
};

const card: React.CSSProperties = {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px 22px',
};

const cardLabel: React.CSSProperties = {
    fontSize: '11px', fontWeight: 700, color: '#94a3b8',
    letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0,
};

const roleTag: React.CSSProperties = {
    fontSize: '12px', fontWeight: 600,
    padding: '4px 12px', borderRadius: '99px',
    backgroundColor: '#f0fdff', color: '#0891b2',
    border: '1px solid #bae6fd',
};

const primaryBtn: React.CSSProperties = {
    padding: '11px 24px', borderRadius: '8px', border: 'none',
    backgroundColor: '#0f172a', color: '#fff',
    fontSize: '13px', fontWeight: 700, cursor: 'pointer',
    letterSpacing: '-0.01em',
};

const outlineBtn: React.CSSProperties = {
    padding: '11px 24px', borderRadius: '8px',
    border: '1px solid #e2e8f0', backgroundColor: '#fff',
    color: '#334155', fontSize: '13px', fontWeight: 600,
    cursor: 'pointer',
};

const ghostBtn: React.CSSProperties = {
    padding: '11px 20px', borderRadius: '8px',
    border: '1px solid #f1f5f9', backgroundColor: 'transparent',
    color: '#64748b', fontSize: '13px', fontWeight: 500,
    textDecoration: 'none',
};

const archiveCard: React.CSSProperties = {
    display: 'block', padding: '20px 22px',
    borderRadius: '12px', border: '1px solid #e2e8f0',
    backgroundColor: '#fff', textDecoration: 'none',
    transition: 'all 0.2s ease',
};
