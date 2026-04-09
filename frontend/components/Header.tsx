'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Menu {
    menuId: string;
    menuNm: string;
    menuPath: string;
    uppMenuId: string;
    lvl: number;
}

export default function Header() {
    const pathname = usePathname();
    const [menus, setMenus] = useState<Menu[]>([]);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoverMenuId, setHoverMenuId] = useState<string | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/menu/active')
            .then(res => res.json())
            .then(data => setMenus(data))
            .catch(() => {});
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('UserInfo');
        if (saved) setUserInfo(JSON.parse(saved));
    }, []);

    useEffect(() => { setMobileOpen(false); }, [pathname]);

    const handleLogout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('UserInfo');
            window.location.href = '/main';
        }
    };

    const openMenu  = (id: string) => { clearTimeout(closeTimer.current); setHoverMenuId(id); };
    const closeMenu = () => { closeTimer.current = setTimeout(() => setHoverMenuId(null), 120); };

    const mainMenus = menus.filter(m => m.lvl === 1);

    return (
        <>
            <header style={headerStyle}>
                <div style={innerStyle}>
                    {/* 로고 */}
                    <Link href="/main" style={logoStyle}>
                        <span style={{ color: '#0891b2' }}>◆</span>
                        <span>LCY</span>
                    </Link>

                    {/* ── 데스크탑 네비 ── */}
                    <nav className="header-desktop" style={{ alignItems: 'center', gap: '4px', flex: 1 }}>
                        {mainMenus.map(main => {
                            const subs = menus.filter(m => m.uppMenuId === main.menuId);
                            const isActive = pathname.startsWith(main.menuPath || '___');
                            const isOpen = hoverMenuId === main.menuId;

                            return (
                                <div
                                    key={main.menuId}
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => subs.length > 0 ? openMenu(main.menuId) : undefined}
                                    onMouseLeave={subs.length > 0 ? closeMenu : undefined}
                                >
                                    <Link
                                        href={main.menuPath || '#'}
                                        style={{
                                            ...navLinkStyle,
                                            color: isActive ? '#0891b2' : '#334155',
                                            backgroundColor: isActive ? '#ecfeff' : 'transparent',
                                        }}
                                    >
                                        {main.menuNm}
                                        {subs.length > 0 && (
                                            <span style={{
                                                marginLeft: '4px', fontSize: '10px', opacity: 0.6,
                                                display: 'inline-block',
                                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s ease',
                                            }}>▾</span>
                                        )}
                                    </Link>

                                    {/* 개별 드롭다운 */}
                                    {subs.length > 0 && (
                                        <div
                                            style={{
                                                ...dropdownWrapStyle,
                                                opacity: isOpen ? 1 : 0,
                                                transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                                                pointerEvents: isOpen ? 'auto' : 'none',
                                            }}
                                            onMouseEnter={() => openMenu(main.menuId)}
                                            onMouseLeave={closeMenu}
                                        >
                                            <div style={dropdownInnerStyle}>
                                                {subs.map(sub => {
                                                    const subActive = pathname === sub.menuPath;
                                                    return (
                                                        <Link
                                                            key={sub.menuId}
                                                            href={sub.menuPath || '#'}
                                                            style={{
                                                                ...dropdownItemStyle,
                                                                color: subActive ? '#0891b2' : '#475569',
                                                                fontWeight: subActive ? 600 : 400,
                                                                backgroundColor: 'transparent',
                                                            }}
                                                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f0fdff')}
                                                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                                                        >
                                                            {sub.menuNm}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* ── 데스크탑 유저 ── */}
                    <div className="header-desktop" style={{ alignItems: 'center', gap: '10px', marginLeft: 'auto', flexShrink: 0 }}>
                        {userInfo ? (
                            <>
                                <span style={userNameStyle}>
                                    <span style={avatarStyle}>{userInfo.userNm?.[0] ?? 'U'}</span>
                                    {userInfo.userNm}
                                </span>
                                <button onClick={handleLogout} style={logoutBtnStyle}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <Link href="/login" style={loginBtnStyle}>로그인</Link>
                        )}
                    </div>

                    {/* ── 모바일 햄버거 ── */}
                    <button
                        className="header-mobile-btn"
                        style={hamburgerStyle}
                        onClick={() => setMobileOpen(v => !v)}
                        aria-label="메뉴 열기"
                    >
                        {mobileOpen ? '✕' : '☰'}
                    </button>
                </div>
            </header>

            {/* ── 모바일 드로어 ── */}
            <div style={{
                ...mobileDrawerStyle,
                maxHeight: mobileOpen ? '700px' : '0',
                opacity:   mobileOpen ? 1 : 0,
                overflow:  'hidden',
                transition: 'max-height 0.35s ease, opacity 0.25s ease',
            }}>
                <div style={{ padding: '16px 16px 20px' }}>

                    {/* 메뉴 — 루트끼리 가로(균등분할), 자식은 세로 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${Math.max(mainMenus.length, 1)}, 1fr)`,
                        gap: '8px',
                    }}>
                        {mainMenus.map(main => {
                            const subs = menus.filter(m => m.uppMenuId === main.menuId);
                            const isActive = pathname.startsWith(main.menuPath || '___');
                            return (
                                <div key={main.menuId} style={{
                                    display: 'flex', flexDirection: 'column', gap: '2px',
                                    backgroundColor: isActive ? '#e0f2fe' : '#f8fafc',
                                    borderRadius: '12px', padding: '10px 8px',
                                }}>
                                    <Link href={main.menuPath || '#'} style={{
                                        display: 'block', padding: '8px 10px', borderRadius: '8px',
                                        textDecoration: 'none', fontSize: '13px', fontWeight: 800,
                                        letterSpacing: '-0.01em',
                                        color: isActive ? '#0369a1' : '#0f172a',
                                        backgroundColor: 'transparent',
                                        marginBottom: subs.length > 0 ? '4px' : '0',
                                    }}>
                                        {main.menuNm}
                                    </Link>
                                    {subs.map(sub => {
                                        const subActive = pathname === sub.menuPath;
                                        return (
                                            <Link key={sub.menuId} href={sub.menuPath || '#'} style={{
                                                display: 'block', padding: '8px 10px', borderRadius: '8px',
                                                textDecoration: 'none', fontSize: '13px',
                                                color: isActive ? (subActive ? '#0369a1' : '#0891b2') : '#64748b',
                                                fontWeight: subActive ? 600 : 400,
                                                backgroundColor: subActive ? '#bae6fd' : 'transparent',
                                            }}>
                                                {sub.menuNm}
                                            </Link>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

// ── 스타일 ──────────────────────────────────────────────

const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #e2e8f0',
    height: '60px',
};

const innerStyle: React.CSSProperties = {
    maxWidth: '1680px',
    margin: '0 auto',
    padding: '0 clamp(16px, 3vw, 48px)',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
};

const logoStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '7px',
    textDecoration: 'none', fontSize: '17px', fontWeight: 800,
    color: '#0f172a', letterSpacing: '-0.02em', flexShrink: 0,
};

const navLinkStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center',
    padding: '6px 14px', borderRadius: '8px',
    textDecoration: 'none', fontSize: '14px', fontWeight: 500,
    transition: 'background 0.15s, color 0.15s', whiteSpace: 'nowrap',
};

/* 드롭다운 — paddingTop 으로 gap 없애 hover 끊김 방지 */
const dropdownWrapStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    paddingTop: '8px',
    zIndex: 999,
    transition: 'opacity 0.2s ease, transform 0.2s ease',
};

const dropdownInnerStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
    padding: '6px',
    minWidth: '160px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
};

const dropdownItemStyle: React.CSSProperties = {
    display: 'block',
    padding: '9px 14px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '13px',
    transition: 'background 0.12s',
    whiteSpace: 'nowrap',
};

const avatarStyle: React.CSSProperties = {
    width: '26px', height: '26px', borderRadius: '99px',
    backgroundColor: '#ecfeff', color: '#0891b2',
    fontSize: '12px', fontWeight: 700,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};

const userNameStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '8px',
    fontSize: '13px', fontWeight: 500, color: '#334155',
};

const logoutBtnStyle: React.CSSProperties = {
    padding: '6px 14px', borderRadius: '8px',
    border: '1px solid #fecaca', backgroundColor: 'transparent',
    color: '#ef4444', fontSize: '13px', fontWeight: 500,
    cursor: 'pointer', transition: 'background 0.15s',
};

const loginBtnStyle: React.CSSProperties = {
    padding: '7px 18px', borderRadius: '8px',
    backgroundColor: '#0891b2', color: '#fff',
    fontSize: '13px', fontWeight: 600, textDecoration: 'none',
};

const hamburgerStyle: React.CSSProperties = {
    marginLeft: 'auto', width: '36px', height: '36px',
    borderRadius: '8px', border: '1px solid #e2e8f0',
    backgroundColor: 'transparent', cursor: 'pointer',
    fontSize: '16px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: '#334155', flexShrink: 0,
};

const mobileDrawerStyle: React.CSSProperties = {
    position: 'sticky',
    top: '60px',
    zIndex: 999,
    backgroundColor: '#fff',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
};
