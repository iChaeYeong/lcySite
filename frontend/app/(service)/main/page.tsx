'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MainPage() {
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem('UserInfo');
        if (saved) setUserInfo(JSON.parse(saved));
    }, []);

    const cards = [
        { label: '회원 관리',  desc: '가입 회원 조회 및 권한 설정', href: '#',              color: '#0891b2', icon: '👤' },
        { label: '메뉴 관리',  desc: '시스템 메뉴 구조 편집',        href: '/admin/menuDev', color: '#0d9488', icon: '☰'  },
        { label: '게시판',     desc: '공지사항 및 자료 관리',         href: '#',              color: '#7c3aed', icon: '📋' },
        { label: '통계',       desc: '방문자 및 사용 현황',           href: '#',              color: '#10b981', icon: '📊' },
        { label: '설정',       desc: '시스템 환경 설정',              href: '#',              color: '#f59e0b', icon: '⚙️' },
        { label: '로그',       desc: '접속 및 작업 이력 조회',        href: '#',              color: '#ef4444', icon: '🗂️' },
    ];

    const stats = [
        { label: '전체 회원',  value: '–', unit: '명' },
        { label: '오늘 방문',  value: '–', unit: '건' },
        { label: '등록 메뉴',  value: '–', unit: '개' },
        { label: '미처리 항목', value: '–', unit: '건' },
    ];

    return (
        <div className="page-container">

            {/* 웰컴 배너 */}
            <div style={bannerStyle}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={bannerSub}>대시보드</p>
                    <h2 style={bannerTitle}>
                        {userInfo ? `${userInfo.userNm}님, 안녕하세요 👋` : '안녕하세요 👋'}
                    </h2>
                    <p style={bannerDesc}>오늘도 좋은 하루 되세요.</p>
                </div>
                <div style={bannerCircle1} />
                <div style={bannerCircle2} />
            </div>

            {/* 스탯 — stat-grid 클래스로 반응형 */}
            <div className="stat-grid" style={{ marginBottom: '32px' }}>
                {stats.map(s => (
                    <div key={s.label} style={statCardStyle}>
                        <span style={statLabelStyle}>{s.label}</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={statValueStyle}>{s.value}</span>
                            <span style={statUnitStyle}>{s.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 바로가기 */}
            <h3 style={sectionTitle}>바로가기</h3>
            <div className="card-grid">
                {cards.map(c => (
                    <Link key={c.label} href={c.href} className="quick-card" style={cardStyle}>
                        <div style={{ ...cardIconStyle, backgroundColor: c.color + '18', color: c.color }}>
                            {c.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={cardLabel}>{c.label}</div>
                            <div style={cardDesc}>{c.desc}</div>
                        </div>
                        <span style={{ color: c.color, fontSize: '16px', flexShrink: 0 }}>→</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

const bannerStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '20px',
    position: 'relative',
    overflow: 'hidden',
};

const bannerSub: React.CSSProperties = {
    fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '0 0 6px',
    fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em',
};
const bannerTitle: React.CSSProperties = {
    fontSize: 'clamp(18px, 2.5vw, 32px)', fontWeight: 800, color: '#fff',
    margin: '0 0 6px', letterSpacing: '-0.02em',
};
const bannerDesc: React.CSSProperties = {
    fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0,
};
const bannerCircle1: React.CSSProperties = {
    position: 'absolute', bottom: '-60px', right: '-60px',
    width: '200px', height: '200px', borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
};
const bannerCircle2: React.CSSProperties = {
    position: 'absolute', top: '-40px', right: '120px',
    width: '120px', height: '120px', borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none',
};

const statCardStyle: React.CSSProperties = {
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
};
const statLabelStyle: React.CSSProperties = {
    fontSize: '11px', color: '#94a3b8', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.06em',
    display: 'block', marginBottom: '8px',
};
const statValueStyle: React.CSSProperties = {
    fontSize: 'clamp(22px, 2vw, 32px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em',
};
const statUnitStyle: React.CSSProperties = { fontSize: '13px', color: '#94a3b8' };

const sectionTitle: React.CSSProperties = {
    fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 14px',
};

const cardStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '14px',
    backgroundColor: '#fff', borderRadius: '12px',
    padding: '18px 20px', border: '1px solid #f1f5f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    textDecoration: 'none',
};
const cardIconStyle: React.CSSProperties = {
    width: '42px', height: '42px', borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '18px', flexShrink: 0,
};
const cardLabel: React.CSSProperties = {
    fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '2px',
};
const cardDesc: React.CSSProperties = {
    fontSize: '12px', color: '#94a3b8',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
};
