'use client';

export default function ArchivingPage() {
    const items = [
        {
            title: 'GitHub',
            desc: '개인 프로젝트 및 스터디 코드를 관리하는 저장소입니다.',
            href: 'https://github.com/iCheaYeong',
            meta: 'github.com/iCheaYeong',
        },
        {
            title: '기술 블로그',
            desc: '공부한 내용과 프로젝트 회고를 기록합니다.',
            href: '#',
            meta: '준비 중',
        },
        {
            title: 'Notion',
            desc: '학습 노트, 프로젝트 기획, 일정 관리를 위한 워크스페이스입니다.',
            href: '#',
            meta: '준비 중',
        },
    ];

    return (
        <div>
            <div style={pageTopStyle}>
                <div style={{ maxWidth: '640px' }}>
                    <h1 style={pageTitleStyle}>Archiving</h1>
                    <p style={pageDescStyle}>공부한 내용과 작업물을 기록하는 공간입니다.</p>
                </div>
            </div>

            <div style={bodyStyle}>
                {items.map((item, i) => (
                    <div key={item.title}>
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            style={rowStyle}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.6'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                        >
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '6px' }}>
                                    <h2 style={itemTitleStyle}>{item.title}</h2>
                                    <span style={metaStyle}>{item.meta}</span>
                                </div>
                                <p style={itemDescStyle}>{item.desc}</p>
                            </div>
                            <span style={{ color: '#cbd5e1', fontSize: '16px', flexShrink: 0 }}>↗</span>
                        </a>
                        {i < items.length - 1 && <div style={dividerStyle} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

const pageTopStyle: React.CSSProperties = {
    borderBottom: '1px solid #f1f5f9',
    padding: 'clamp(48px, 7vw, 80px) clamp(24px, 8vw, 120px) clamp(32px, 5vw, 56px)',
};

const pageTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
    letterSpacing: '-0.03em', color: '#0a0a0a', margin: '0 0 12px',
};

const pageDescStyle: React.CSSProperties = {
    fontSize: '15px', color: '#94a3b8', margin: 0,
};

const bodyStyle: React.CSSProperties = {
    maxWidth: '680px',
    padding: 'clamp(40px, 6vw, 64px) clamp(24px, 8vw, 120px)',
};

const rowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'flex-start', gap: '20px',
    textDecoration: 'none', transition: 'opacity 0.2s',
    cursor: 'pointer',
};

const itemTitleStyle: React.CSSProperties = {
    fontSize: '16px', fontWeight: 700, color: '#0a0a0a',
    margin: 0, letterSpacing: '-0.02em',
};

const metaStyle: React.CSSProperties = {
    fontSize: '12px', color: '#94a3b8', fontWeight: 400,
};

const itemDescStyle: React.CSSProperties = {
    fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: 1.7,
};

const dividerStyle: React.CSSProperties = {
    height: '1px', backgroundColor: '#f1f5f9', margin: '28px 0',
};
