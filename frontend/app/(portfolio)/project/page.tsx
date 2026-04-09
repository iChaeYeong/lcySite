export default function ProjectPage() {
    const projects = [
        {
            year: '2025',
            title: 'LCY Portfolio Site',
            desc: '개인 포트폴리오 사이트. Next.js + Spring Boot 풀스택으로 구현했습니다. 동적 메뉴 관리 시스템, 회원 인증, 어드민 대시보드를 포함합니다.',
            stack: ['Next.js 16', 'Spring Boot 3.4', 'JPA', 'MySQL', 'Spring Security'],
            href: 'https://github.com/iCheaYeong',
            status: 'In Progress',
            points: [
                '메뉴 구조 DB 관리 및 동적 렌더링',
                'Spring Security 기반 로그인/회원가입',
                '어드민 대시보드 구현',
                '반응형 UI 디자인',
            ],
        },
    ];

    return (
        <div>
            <div style={pageTopStyle}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h1 style={pageTitleStyle}>Project</h1>
                        <p style={pageDescStyle}>직접 만들고 경험한 프로젝트들입니다.</p>
                    </div>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>{projects.length} projects</span>
                </div>
            </div>

            <div style={bodyStyle}>
                {projects.map(p => (
                    <div key={p.title} style={projectCardStyle}>
                        {/* 헤더 */}
                        <div style={cardTopStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <h2 style={projectTitleStyle}>{p.title}</h2>
                                <span style={{
                                    fontSize: '11px', fontWeight: 600, padding: '3px 8px',
                                    borderRadius: '4px',
                                    color: '#0891b2', backgroundColor: '#ecfeff',
                                }}>
                                    {p.status}
                                </span>
                            </div>
                            <span style={{ fontSize: '13px', color: '#94a3b8' }}>{p.year}</span>
                        </div>

                        {/* 본문 */}
                        <div style={cardBodyStyle}>
                            <div style={cardLeftStyle}>
                                <p style={projectDescStyle}>{p.desc}</p>
                                <div style={{ marginTop: '20px' }}>
                                    <p style={subLabelStyle}>Tech Stack</p>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        {p.stack.map(s => (
                                            <span key={s} style={tagStyle}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <a href={p.href} target="_blank" rel="noreferrer" style={linkStyle}>
                                    GitHub에서 보기 ↗
                                </a>
                            </div>
                            <div style={cardRightStyle}>
                                <p style={subLabelStyle}>Key Features</p>
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {p.points.map(pt => (
                                        <li key={pt} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#0891b2', fontSize: '12px', marginTop: '3px', flexShrink: 0 }}>—</span>
                                            <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}

                {/* 준비 중 카드 */}
                <div style={comingSoonStyle}>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>더 많은 프로젝트가 추가될 예정입니다.</p>
                </div>
            </div>
        </div>
    );
}

const pageTopStyle: React.CSSProperties = {
    borderBottom: '1px solid #f1f5f9',
    padding: 'clamp(48px, 7vw, 80px) clamp(24px, 6vw, 80px) clamp(32px, 5vw, 56px)',
};

const pageTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
    letterSpacing: '-0.03em', color: '#0a0a0a', margin: '0 0 12px',
};

const pageDescStyle: React.CSSProperties = {
    fontSize: '15px', color: '#94a3b8', margin: 0,
};

const bodyStyle: React.CSSProperties = {
    maxWidth: '1100px', margin: '0 auto',
    padding: 'clamp(40px, 6vw, 64px) clamp(24px, 6vw, 80px)',
    display: 'flex', flexDirection: 'column', gap: '20px',
};

const projectCardStyle: React.CSSProperties = {
    border: '1px solid #f1f5f9', borderRadius: '16px',
    overflow: 'hidden',
};

const cardTopStyle: React.CSSProperties = {
    padding: '24px 28px',
    borderBottom: '1px solid #f8fafc',
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', flexWrap: 'wrap', gap: '12px',
    backgroundColor: '#fafafa',
};

const projectTitleStyle: React.CSSProperties = {
    fontSize: '18px', fontWeight: 800,
    color: '#0a0a0a', margin: 0, letterSpacing: '-0.02em',
};

const cardBodyStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '0',
};

const cardLeftStyle: React.CSSProperties = {
    padding: '28px',
    borderRight: '1px solid #f8fafc',
};

const cardRightStyle: React.CSSProperties = {
    padding: '28px',
};

const projectDescStyle: React.CSSProperties = {
    fontSize: '14px', color: '#475569', lineHeight: 1.75, margin: 0,
};

const subLabelStyle: React.CSSProperties = {
    fontSize: '11px', fontWeight: 700, color: '#64748b',
    letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px',
};

const tagStyle: React.CSSProperties = {
    padding: '4px 10px', borderRadius: '4px',
    border: '1px solid #e2e8f0',
    fontSize: '12px', color: '#64748b', fontWeight: 500,
};

const linkStyle: React.CSSProperties = {
    display: 'inline-block', marginTop: '20px',
    fontSize: '13px', color: '#0891b2',
    textDecoration: 'none', fontWeight: 600,
};

const comingSoonStyle: React.CSSProperties = {
    padding: '32px 28px',
    border: '1px dashed #e2e8f0', borderRadius: '16px',
    backgroundColor: '#fafafa', textAlign: 'center',
};
