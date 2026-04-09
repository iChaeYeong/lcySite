'use client';

import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
    color?: 'primary' | 'danger' | 'success' | 'gray';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const colorMap = {
    primary: { bg: '#0891b2', hover: '#0e7490', shadow: 'rgba(8,145,178,0.3)'   },
    danger:  { bg: '#ef4444', hover: '#dc2626', shadow: 'rgba(239,68,68,0.3)'   },
    success: { bg: '#10b981', hover: '#059669', shadow: 'rgba(16,185,129,0.3)'  },
    gray:    { bg: '#64748b', hover: '#475569', shadow: 'rgba(100,116,139,0.3)' },
};

const sizeMap = {
    sm: { padding: '5px 12px',  fontSize: '12px', height: '30px' },
    md: { padding: '8px 18px',  fontSize: '13px', height: '36px' },
    lg: { padding: '11px 24px', fontSize: '14px', height: '42px' },
};

export default function MyButton({
    text,
    onClick,
    type = 'button',
    color = 'primary',
    size = 'md',
    fullWidth = false,
}: ButtonProps) {
    const c = colorMap[color];
    const s = sizeMap[size];

    return (
        <button
            type={type}
            onClick={onClick}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                height: s.height,
                padding: s.padding,
                fontSize: s.fontSize,
                fontWeight: 600,
                color: '#fff',
                backgroundColor: c.bg,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: fullWidth ? '100%' : 'auto',
                letterSpacing: '0.01em',
                transition: 'background-color 0.18s, box-shadow 0.18s, transform 0.1s',
                whiteSpace: 'nowrap',
                userSelect: 'none',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = c.hover;
                e.currentTarget.style.boxShadow = `0 4px 12px ${c.shadow}`;
                e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = c.bg;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(0) scale(0.97)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
        >
            {text}
        </button>
    );
}
