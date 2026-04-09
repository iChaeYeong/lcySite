export default function SkillsPage() {
    const groups = [
        {
            label: 'Language',
            items: [
                { name: 'Java',       level: 'Primary' },
                { name: 'JavaScript', level: 'Primary' },
                { name: 'TypeScript', level: 'Learning' },
                { name: 'Python',     level: 'Familiar' },
                { name: 'SQL',        level: 'Primary' },
            ],
        },
        {
            label: 'Frontend',
            items: [
                { name: 'React',        level: 'Primary' },
                { name: 'Next.js',      level: 'Primary' },
                { name: 'HTML / CSS',   level: 'Primary' },
                { name: 'Tailwind CSS', level: 'Familiar' },
            ],
        },
        {
            label: 'Backend',
            items: [
                { name: 'Spring Boot',      level: 'Primary' },
                { name: 'Spring Security',  level: 'Familiar' },
                { name: 'JPA / Hibernate',  level: 'Familiar' },
                { name: 'Node.js',          level: 'Familiar' },
            ],
        },
        {
            label: 'Database',
            items: [
                { name: 'MySQL',      level: 'Primary' },
                { name: 'Oracle',     level: 'Familiar' },
                { name: 'PostgreSQL', level: 'Familiar' },
                { name: 'Redis',      level: 'Learning' },
            ],
        },
        {
            label: 'DevOps / Cloud',
            items: [
                { name: 'AWS',    level: 'Familiar' },
                { name: 'Docker', level: 'Familiar' },
                { name: 'Linux',  level: 'Familiar' },
                { name: 'Git',    level: 'Primary' },
            ],
        },
    ];

    const levelColor: Record<string, string> = {
        Primary:  '#0a0a0a',
        Familiar: '#64748b',
        Learning: '#cbd5e1',
    };

    return (
        <div>
            <div style={pageTopStyle}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <h1 style={pageTitleStyle}>Skills</h1>
                    <p style={pageDescStyle}>사용해온 언어, 프레임워크, 도구들입니다.</p>
                </div>
            </div>

            <div style={bodyStyle}>
                {/* 범례 */}
                <div style={legendStyle}>
                    {Object.entries(levelColor).map(([k, c]) => (
                        <span key={k} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: c, flexShrink: 0 }} />
                            {k}
                        </span>
                    ))}
                </div>

                <div style={gridStyle}>
                    {groups.map(group => (
                        <div key={group.label} style={groupCardStyle}>
                            <p style={groupLabelStyle}>{group.label}</p>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {group.items.map((item, i) => (
                                    <div key={item.name} style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '11px 0',
                                        borderBottom: i < group.items.length - 1 ? '1px solid #f1f5f9' : 'none',
                                    }}>
                                        <span style={{
                                            fontSize: '14px', fontWeight: item.level === 'Primary' ? 600 : 400,
                                            color: levelColor[item.level],
                                        }}>
                                            {item.name}
                                        </span>
                                        <span style={{
                                            fontSize: '11px', color: '#94a3b8',
                                            letterSpacing: '0.04em',
                                        }}>
                                            {item.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
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
};

const legendStyle: React.CSSProperties = {
    display: 'flex', gap: '20px', marginBottom: '32px',
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1px',
    border: '1px solid #f1f5f9',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
};

const groupCardStyle: React.CSSProperties = {
    padding: '24px', backgroundColor: '#fff',
};

const groupLabelStyle: React.CSSProperties = {
    fontSize: '11px', fontWeight: 700, color: '#64748b',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    margin: '0 0 16px',
};
