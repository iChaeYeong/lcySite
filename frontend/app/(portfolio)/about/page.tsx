'use client';

export default function AboutPage() {
    const info = [
        { label: '이름',     value: '이채영' },
        { label: '생년월일', value: '2001. 08. 13' },
        { label: '지역',     value: '서울 송파 (거주)  /  대구 (본가)' },
        { label: '학력',     value: '대구대학교 컴퓨터공학과 졸업' },
        { label: '연락처',   value: '010-9223-0766' },
        { label: '이메일',   value: 'chae_young813@naver.com' },
    ];

    const career = [
        {
            period: '2023. 03 — 2024. 02',
            title: '일학습병행제 (인턴)',
            desc: '현장 실무 중심의 일·학습 병행 프로그램. 약 1년간 실무 경험.',
        },
        {
            period: '2024. 03 — 2024. 12',
            title: '클라우드 엔지니어링 부트캠프',
            desc: 'AWS, Docker, Linux 등 클라우드 인프라 중심의 집중 과정.',
        },
    ];

    const social = [
        { label: 'GitHub',    href: 'https://github.com/iCheaYeong' },
        { label: 'Threads',   href: '#' },
        { label: 'Instagram', href: '#' },
    ];

    return (
        <div>
            {/* 페이지 상단 */}
            <div style={pageTopStyle}>
                <div style={pageTopInnerStyle}>
                    <div style={pageTopLeftStyle}>
                        <h1 style={pageTitleStyle}>About Me</h1>
                        <p style={pageDescStyle}>
                            안녕하세요. 별 개발을 사랑하는 개발자 이채영입니다.<br />
                            사용자 경험을 중시하며, 프론트엔드부터 백엔드까지<br />
                            전반적인 개발을 즐깁니다.
                        </p>
                    </div>
                    <div style={socialInlineStyle}>
                        {social.map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                                style={socialLinkStyle}
                                onMouseEnter={e => { e.currentTarget.style.color = '#0a0a0a'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; }}
                            >
                                {s.label} ↗
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* 본문 */}
            <div style={bodyStyle}>
                <div style={twoColStyle}>

                    {/* 왼쪽 — 기본 정보 */}
                    <div>
                        <SectionLabel>Information</SectionLabel>
                        <div style={infoTableStyle}>
                            {info.map(item => (
                                <div key={item.label} style={infoRowStyle}>
                                    <span style={infoKeyStyle}>{item.label}</span>
                                    <span style={infoValStyle}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 오른쪽 — 경력 */}
                    <div>
                        <SectionLabel>Experience</SectionLabel>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {career.map(c => (
                                <div key={c.title} style={careerItemStyle}>
                                    <div style={careerDotStyle} />
                                    <div>
                                        <p style={careerPeriodStyle}>{c.period}</p>
                                        <p style={careerTitleStyle}>{c.title}</p>
                                        <p style={careerDescStyle}>{c.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p style={{
            fontSize: '11px', fontWeight: 700, color: '#64748b',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            margin: '0 0 20px',
        }}>
            {children}
        </p>
    );
}

const pageTopStyle: React.CSSProperties = {
    borderBottom: '1px solid #f1f5f9',
    padding: 'clamp(48px, 7vw, 80px) clamp(24px, 6vw, 80px) clamp(32px, 5vw, 56px)',
};

const pageTopInnerStyle: React.CSSProperties = {
    maxWidth: '1100px', margin: '0 auto',
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-end', gap: '32px', flexWrap: 'wrap',
};

const pageTopLeftStyle: React.CSSProperties = {
    maxWidth: '520px',
};

const pageTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
    letterSpacing: '-0.03em', color: '#0a0a0a', margin: '0 0 16px',
};

const pageDescStyle: React.CSSProperties = {
    fontSize: '15px', color: '#64748b', margin: 0,
    lineHeight: 1.8, fontWeight: 400,
};

const socialInlineStyle: React.CSSProperties = {
    display: 'flex', gap: '20px', flexShrink: 0,
};

const socialLinkStyle: React.CSSProperties = {
    fontSize: '13px', color: '#94a3b8', textDecoration: 'none',
    fontWeight: 500, transition: 'color 0.15s', letterSpacing: '-0.01em',
};

const bodyStyle: React.CSSProperties = {
    maxWidth: '1100px', margin: '0 auto',
    padding: 'clamp(48px, 6vw, 72px) clamp(24px, 6vw, 80px)',
};

const twoColStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '64px',
};

const infoTableStyle: React.CSSProperties = {
    display: 'flex', flexDirection: 'column',
};

const infoRowStyle: React.CSSProperties = {
    display: 'flex', gap: '20px',
    padding: '14px 0', borderBottom: '1px solid #f1f5f9',
    alignItems: 'baseline',
};

const infoKeyStyle: React.CSSProperties = {
    fontSize: '12px', fontWeight: 600, color: '#94a3b8',
    width: '68px', flexShrink: 0,
};

const infoValStyle: React.CSSProperties = {
    fontSize: '14px', color: '#334155', fontWeight: 500, lineHeight: 1.6,
};

const careerItemStyle: React.CSSProperties = {
    display: 'flex', gap: '16px',
};

const careerDotStyle: React.CSSProperties = {
    width: '6px', height: '6px', borderRadius: '50%',
    backgroundColor: '#0a0a0a', flexShrink: 0, marginTop: '7px',
};

const careerPeriodStyle: React.CSSProperties = {
    fontSize: '12px', color: '#64748b', margin: '0 0 4px', letterSpacing: '0.01em',
};

const careerTitleStyle: React.CSSProperties = {
    fontSize: '15px', fontWeight: 700, color: '#0a0a0a',
    margin: '0 0 6px', letterSpacing: '-0.01em',
};

const careerDescStyle: React.CSSProperties = {
    fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.7,
};
