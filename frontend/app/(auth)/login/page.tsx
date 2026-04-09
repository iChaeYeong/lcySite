'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type LoginForm = { loginId: string; pwd: string };

export default function LoginPage() {
    const [form, setForm] = useState<LoginForm>({ loginId: '', pwd: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.loginId) return setError('아이디를 입력해주세요.');
        if (!form.pwd)     return setError('비밀번호를 입력해주세요.');

        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('UserInfo', JSON.stringify(data));
                router.push('/main');
            } else {
                setError(await res.text());
            }
        } catch {
            setError('서버에 연결할 수 없습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>

            {/* 브랜드 패널 — 태블릿 이상에서만 표시 */}
            <div className="auth-brand" style={brandStyle}>
                <div style={{ padding: '48px', position: 'relative', zIndex: 1 }}>
                    <div style={brandLogo}>◆ LCY</div>
                    <h1 style={brandTitle}>환영합니다</h1>
                    <p style={brandDesc}>업무를 더 스마트하게.<br />지금 로그인하고 시작하세요.</p>
                </div>
                <div style={brandCircle1} />
                <div style={brandCircle2} />
            </div>

            {/* 폼 영역 */}
            <div style={formSide}>
                <div style={formCard}>

                    {/* 모바일에서만 보이는 로고 */}
                    <div className="auth-brand" style={{ display: 'none' }} />
                    <div style={{ marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', color: '#0891b2', fontWeight: 700, letterSpacing: '-0.01em' }}>◆ LCY</span>
                    </div>

                    <h2 style={formTitle}>로그인</h2>
                    <p style={formSubtitle}>계정 정보를 입력하세요</p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Field label="아이디">
                            <input type="text" name="loginId" value={form.loginId}
                                onChange={handleChange} placeholder="아이디를 입력하세요"
                                style={inputStyle} autoFocus />
                        </Field>
                        <Field label="비밀번호">
                            <input type="password" name="pwd" value={form.pwd}
                                onChange={handleChange} placeholder="비밀번호를 입력하세요"
                                style={inputStyle} />
                        </Field>

                        {error && <div style={errorStyle}>{error}</div>}

                        <button type="submit" disabled={loading}
                            style={submitBtn(loading, '#0891b2', '#67e8f9')}>
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '28px' }}>
                        <span style={{ fontSize: '13px', color: '#94a3b8' }}>계정이 없으신가요? </span>
                        <Link href="/signup" style={altLinkStyle}>회원가입</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>{label}</label>
            {children}
        </div>
    );
}

const brandStyle: React.CSSProperties = {
    flex: '0 0 420px',
    background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
};

const brandLogo: React.CSSProperties = {
    fontSize: '20px', fontWeight: 800, color: 'rgba(255,255,255,0.95)',
    marginBottom: '48px', letterSpacing: '-0.02em',
};

const brandTitle: React.CSSProperties = {
    fontSize: '34px', fontWeight: 800, color: '#fff',
    lineHeight: 1.2, margin: '0 0 14px', letterSpacing: '-0.02em',
};

const brandDesc: React.CSSProperties = {
    fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: 0,
};

const brandCircle1: React.CSSProperties = {
    position: 'absolute', bottom: '-80px', right: '-80px',
    width: '300px', height: '300px', borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.06)',
};

const brandCircle2: React.CSSProperties = {
    position: 'absolute', top: '-60px', left: '-60px',
    width: '200px', height: '200px', borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.04)',
};

const formSide: React.CSSProperties = {
    flex: 1, display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '32px 24px',
};

const formCard: React.CSSProperties = {
    width: '100%', maxWidth: '400px',
};

const formTitle: React.CSSProperties = {
    fontSize: '26px', fontWeight: 800, color: '#0f172a',
    margin: '0 0 4px', letterSpacing: '-0.02em',
};

const formSubtitle: React.CSSProperties = {
    fontSize: '14px', color: '#94a3b8', margin: '0 0 28px',
};

const inputStyle: React.CSSProperties = {
    padding: '11px 14px', borderRadius: '10px',
    border: '1.5px solid #e2e8f0', fontSize: '14px',
    color: '#0f172a', backgroundColor: '#fff',
    transition: 'border-color 0.15s, box-shadow 0.15s', width: '100%',
};

const errorStyle: React.CSSProperties = {
    padding: '10px 14px', borderRadius: '8px',
    backgroundColor: '#fef2f2', border: '1px solid #fecaca',
    color: '#ef4444', fontSize: '13px',
};

const submitBtn = (loading: boolean, normal: string, disabled: string): React.CSSProperties => ({
    padding: '13px', borderRadius: '10px', border: 'none',
    backgroundColor: loading ? disabled : normal, color: '#fff',
    fontSize: '14px', fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    marginTop: '4px', width: '100%',
    transition: 'background 0.15s',
});

const altLinkStyle: React.CSSProperties = {
    fontSize: '13px', color: '#0891b2', fontWeight: 600, textDecoration: 'none',
};
