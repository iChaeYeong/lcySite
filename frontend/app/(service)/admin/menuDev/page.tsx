'use client';

import { useState, useEffect, useRef } from 'react';
import MyButton from '@/components/MyButton';

type Menu = {
    menuId: string;
    menuNm: string;
    menuPath: string;
    uppMenuId: string;
    pgmId: string;
    lvl: number;
    sortNo: number;
    useYn: string;
    isNew?: boolean;
};

// Next.js 앱에 실제 존재하는 경로 목록
const APP_ROUTES = [
    { path: '/main',             label: '메인' },
    { path: '/login',            label: '로그인' },
    { path: '/signup',           label: '회원가입' },
    { path: '/admin/menuMng',    label: '메뉴 관리' },
    { path: '/admin/menuDev',    label: '메뉴 관리 (Dev)' },
    { path: '/admin/test',       label: '테스트' },
];

export default function MenuDevPage() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [searchType, setSearchType] = useState('all');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [checkedSet, setCheckedSet] = useState<Set<number>>(new Set());
    const allCheckRef = useRef<HTMLInputElement>(null);

    // 경로 선택 팝업
    const [pathModal, setPathModal] = useState<{ open: boolean; targetIdx: number | null }>({ open: false, targetIdx: null });
    const [pathSearch, setPathSearch] = useState('');
    const pathSearchRef = useRef<HTMLInputElement>(null);

    // 전체선택 체크박스 indeterminate 동기화
    useEffect(() => {
        if (!allCheckRef.current) return;
        const total = menus.length;
        const checked = checkedSet.size;
        allCheckRef.current.indeterminate = checked > 0 && checked < total;
        allCheckRef.current.checked = total > 0 && checked === total;
    }, [checkedSet, menus.length]);

    // 모달 열릴 때 검색창 포커스
    useEffect(() => {
        if (pathModal.open) {
            setPathSearch('');
            setTimeout(() => pathSearchRef.current?.focus(), 50);
        }
    }, [pathModal.open]);

    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setPathModal({ open: false, targetIdx: null });
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const fetchMenus = async () => {
        const res = await fetch(
            `http://localhost:8080/api/admin/menu/getList?type=${searchType}&keyword=${encodeURIComponent(searchKeyword)}`
        );
        const data = await res.json();
        setMenus(data);
        setCheckedSet(new Set());
        setSelectedIdx(null);
    };

    useEffect(() => { fetchMenus(); }, []);

    // 경로 팝업에서 보여줄 목록: APP_ROUTES + DB에 이미 등록된 경로 (중복 제거)
    const registeredPaths = menus
        .filter(m => m.menuPath && m.menuPath.trim() !== '')
        .map(m => ({ path: m.menuPath, label: m.menuNm }));

    const allPaths = [
        ...APP_ROUTES,
        ...registeredPaths.filter(r => !APP_ROUTES.some(a => a.path === r.path)),
    ];

    const filteredPaths = allPaths.filter(
        p => p.path.toLowerCase().includes(pathSearch.toLowerCase()) ||
             p.label.toLowerCase().includes(pathSearch.toLowerCase())
    );

    const openPathModal = (idx: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setPathModal({ open: true, targetIdx: idx });
    };

    const selectPath = (path: string) => {
        if (pathModal.targetIdx !== null) {
            handleInputChange(pathModal.targetIdx, 'menuPath', path);
        }
        setPathModal({ open: false, targetIdx: null });
    };

    // 행 체크 토글
    const toggleCheck = (idx: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCheckedSet(prev => {
            const next = new Set(prev);
            next.has(idx) ? next.delete(idx) : next.add(idx);
            return next;
        });
    };

    const toggleAllCheck = () => {
        if (checkedSet.size === menus.length) {
            setCheckedSet(new Set());
        } else {
            setCheckedSet(new Set(menus.map((_, i) => i)));
        }
    };

    const handleAddRow = () => {
        if (selectedIdx === null) {
            alert('행을 추가할 위치(부모)를 선택해주세요.');
            return;
        }
        const parentRow = menus[selectedIdx];
        const parentLvl = Number(parentRow.lvl);
        const parentId = parentRow.menuId;

        if (!parentId) {
            alert('부모 행의 메뉴ID가 입력되어야 자식을 만들 수 있습니다.');
            return;
        }

        let insertIdx = selectedIdx + 1;
        for (let i = selectedIdx + 1; i < menus.length; i++) {
            if (Number(menus[i].lvl) > parentLvl) insertIdx = i + 1;
            else break;
        }

        const siblingCount = menus.filter(m => m.uppMenuId === parentId).length;
        const nextNum = String(siblingCount + 1).padStart(2, '0');
        const newMenuId = `${parentId}_${nextNum}`;

        const newRow: Menu = {
            menuId: newMenuId,
            menuNm: '',
            menuPath: '',
            uppMenuId: parentId,
            pgmId: '',
            lvl: parentLvl + 1,
            sortNo: insertIdx + 1,
            useYn: 'Y',
            isNew: true,
        };

        const newMenus = [...menus];
        newMenus.splice(insertIdx, 0, newRow);
        setMenus(newMenus);
        setSelectedIdx(insertIdx);
        setCheckedSet(new Set());
    };

    const handleDeleteRow = async (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('해당 행을 삭제하시겠습니까?')) return;

        const row = menus[index];
        if (!row.isNew && row.menuId) {
            try {
                await fetch(`http://localhost:8080/api/admin/menu/delete/${row.menuId}`, { method: 'DELETE' });
            } catch {
                alert('삭제 중 오류가 발생했습니다.');
                return;
            }
        }

        const newMenus = [...menus];
        newMenus.splice(index, 1);
        setMenus(newMenus);
        if (selectedIdx === index) setSelectedIdx(null);
        setCheckedSet(new Set());
    };

    const handleDeleteChecked = async () => {
        if (checkedSet.size === 0) {
            alert('삭제할 행을 선택해주세요.');
            return;
        }
        if (!confirm(`선택한 ${checkedSet.size}개 행을 삭제하시겠습니까?`)) return;

        const indicesToDelete = Array.from(checkedSet).sort((a, b) => b - a);

        for (const idx of indicesToDelete) {
            const row = menus[idx];
            if (!row.isNew && row.menuId) {
                try {
                    await fetch(`http://localhost:8080/api/admin/menu/delete/${row.menuId}`, { method: 'DELETE' });
                } catch {
                    alert(`${row.menuId} 삭제 중 오류가 발생했습니다.`);
                    return;
                }
            }
        }

        setMenus(menus.filter((_, i) => !checkedSet.has(i)));
        setCheckedSet(new Set());
        setSelectedIdx(null);
    };

    const handleInputChange = (index: number, field: keyof Menu, value: string | number) => {
        const updated = [...menus];
        updated[index] = { ...updated[index], [field]: value };
        setMenus(updated);
    };

    const handleSaveAll = async () => {
        const invalid = menus.find(m => !m.menuId || !m.menuNm);
        if (invalid) {
            alert('메뉴ID와 메뉴명은 필수 입력 항목입니다.');
            return;
        }
        if (!confirm('변경된 모든 내용을 저장하시겠습니까?')) return;

        try {
            const response = await fetch('http://localhost:8080/api/admin/menu/saveAll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menus),
            });
            if (response.ok) {
                alert('저장되었습니다.');
                fetchMenus();
            } else {
                alert('저장 실패: 서버 오류가 발생했습니다.');
            }
        } catch {
            alert('서버에 연결할 수 없습니다.');
        }
    };

    return (
        <div className="page-container" style={{ backgroundColor: '#f0f2f5', minHeight: '100%' }}>

            {/* ── 경로 선택 팝업 ── */}
            {pathModal.open && (
                <div style={overlayStyle} onClick={() => setPathModal({ open: false, targetIdx: null })}>
                    <div style={modalStyle} onClick={e => e.stopPropagation()}>

                        {/* 모달 헤더 */}
                        <div style={modalHeaderStyle}>
                            <span style={modalTitleStyle}>🔍 경로 선택</span>
                            <button
                                style={modalCloseBtn}
                                onClick={() => setPathModal({ open: false, targetIdx: null })}
                            >✕</button>
                        </div>

                        {/* 검색 */}
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                            <input
                                ref={pathSearchRef}
                                type="text"
                                placeholder="경로명 또는 메뉴명으로 검색..."
                                value={pathSearch}
                                onChange={e => setPathSearch(e.target.value)}
                                style={modalSearchInputStyle}
                            />
                        </div>

                        {/* 경로 목록 */}
                        <div style={modalListStyle}>
                            {filteredPaths.length === 0 ? (
                                <div style={{ padding: '32px', textAlign: 'center', color: '#bbb', fontSize: '13px' }}>
                                    검색 결과가 없습니다.
                                </div>
                            ) : (
                                filteredPaths.map((item, i) => (
                                    <div
                                        key={i}
                                        style={modalItemStyle}
                                        onClick={() => selectPath(item.path)}
                                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e0f9ff')}
                                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        <span style={modalItemLabelStyle}>{item.label}</span>
                                        <span style={modalItemPathStyle}>{item.path}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 모달 푸터 */}
                        <div style={modalFooterStyle}>
                            <span style={{ fontSize: '12px', color: '#aaa' }}>총 {filteredPaths.length}개 경로</span>
                            <button
                                style={modalCancelBtnStyle}
                                onClick={() => setPathModal({ open: false, targetIdx: null })}
                            >닫기</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── 페이지 헤더 ── */}
            <div className="page-header">
                <div>
                    <h2 style={pageTitleStyle}>메뉴 관리</h2>
                    <p style={pageSubtitleStyle}>시스템 메뉴 구조를 조회하고 편집합니다.</p>
                </div>
                <div className="toolbar">
                    <MyButton text="행 추가" color="success" size="sm" onClick={handleAddRow} />
                    <MyButton text={`선택 삭제${checkedSet.size > 0 ? ` (${checkedSet.size})` : ''}`} color="danger" size="sm" onClick={handleDeleteChecked} />
                    <MyButton text="전체 저장" color="primary" size="sm" onClick={handleSaveAll} />
                </div>
            </div>

            {/* ── 검색 카드 ── */}
            <div style={cardStyle}>
                <div className="search-bar">
                    <span style={searchLabelStyle}>검색 조건</span>
                    <select value={searchType} onChange={e => setSearchType(e.target.value)} style={selectStyle}>
                        <option value="all">전체</option>
                        <option value="menuId">메뉴ID</option>
                        <option value="menuNm">메뉴명</option>
                        <option value="pgmId">프로그램ID</option>
                    </select>
                    <input
                        type="text"
                        placeholder="키워드를 입력하세요"
                        value={searchKeyword}
                        onChange={e => setSearchKeyword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && fetchMenus()}
                        style={searchInputStyle}
                    />
                    <MyButton text="조회" color="primary" size="sm" onClick={fetchMenus} />
                </div>
            </div>

            {/* ── 테이블 카드 ── */}
            <div style={cardStyle}>
                <div style={tableInfoRowStyle}>
                    <span style={totalCountStyle}>
                        총 <strong>{menus.length}</strong>건
                        {checkedSet.size > 0 && (
                            <span style={checkedCountStyle}> · {checkedSet.size}개 선택됨</span>
                        )}
                    </span>
                    <span style={hintTextStyle}>행을 클릭하면 선택됩니다. 선택 후 [행 추가]를 누르면 자식 행이 추가됩니다.</span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={{ ...thStyle, width: '40px' }}>
                                    <input type="checkbox" ref={allCheckRef} onChange={toggleAllCheck} style={checkboxStyle} />
                                </th>
                                <th style={{ ...thStyle, width: '40px' }}>No</th>
                                <th style={{ ...thStyle, width: '110px' }}>메뉴ID</th>
                                <th style={{ ...thStyle, minWidth: '160px' }}>메뉴명</th>
                                <th style={{ ...thStyle, minWidth: '160px' }}>경로</th>
                                <th style={{ ...thStyle, width: '110px' }}>부모ID</th>
                                <th style={{ ...thStyle, width: '110px' }}>프로그램ID</th>
                                <th style={{ ...thStyle, width: '60px' }}>LVL</th>
                                <th style={{ ...thStyle, width: '60px' }}>순서</th>
                                <th style={{ ...thStyle, width: '90px' }}>사용여부</th>
                                <th style={{ ...thStyle, width: '70px' }}>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.length === 0 ? (
                                <tr>
                                    <td colSpan={11} style={emptyRowStyle}>데이터가 없습니다.</td>
                                </tr>
                            ) : (
                                menus.map((menu, idx) => {
                                    const isSelected = selectedIdx === idx;
                                    const isChecked = checkedSet.has(idx);
                                    const isNew = !!menu.isNew;
                                    const rowBg = isChecked
                                        ? '#fff7e6'
                                        : isSelected
                                        ? '#ecfeff'
                                        : isNew
                                        ? '#fffbe6'
                                        : idx % 2 === 0 ? '#ffffff' : '#fafafa';

                                    return (
                                        <tr
                                            key={idx}
                                            onClick={() => setSelectedIdx(idx)}
                                            style={{
                                                ...trStyle,
                                                backgroundColor: rowBg,
                                                outline: isSelected ? '2px solid #0891b2' : 'none',
                                                outlineOffset: '-2px',
                                            }}
                                        >
                                            <td style={{ ...tdStyle, textAlign: 'center', width: '40px' }}>
                                                <input type="checkbox" checked={isChecked}
                                                    onClick={e => toggleCheck(idx, e)} onChange={() => {}} style={checkboxStyle} />
                                            </td>

                                            <td style={{ ...tdStyle, textAlign: 'center', color: '#999', width: '40px' }}>{idx + 1}</td>

                                            {/* 메뉴ID */}
                                            <td style={{ ...tdStyle, width: '110px' }}>
                                                <input style={cellInputStyle} value={menu.menuId} placeholder="메뉴ID"
                                                    onChange={e => handleInputChange(idx, 'menuId', e.target.value)} />
                                            </td>

                                            {/* 메뉴명 */}
                                            <td style={{ ...tdStyle, minWidth: '160px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: `${(menu.lvl - 1) * 14}px` }}>
                                                    {menu.lvl > 1 && <span style={treeIconStyle}>└</span>}
                                                    <input style={{ ...cellInputStyle, flex: 1 }} value={menu.menuNm} placeholder="메뉴명"
                                                        onChange={e => handleInputChange(idx, 'menuNm', e.target.value)} />
                                                </div>
                                            </td>

                                            {/* 경로 (돋보기 버튼 포함) */}
                                            <td style={{ ...tdStyle, minWidth: '160px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <input
                                                        style={{ ...cellInputStyle, flex: 1 }}
                                                        value={menu.menuPath || ''}
                                                        placeholder="/path"
                                                        onChange={e => handleInputChange(idx, 'menuPath', e.target.value)}
                                                    />
                                                    <button
                                                        style={searchBtnStyle}
                                                        onClick={e => openPathModal(idx, e)}
                                                        title="경로 선택"
                                                    >
                                                        🔍
                                                    </button>
                                                </div>
                                            </td>

                                            {/* 부모ID */}
                                            <td style={{ ...tdStyle, width: '110px' }}>
                                                <input style={cellInputStyle} value={menu.uppMenuId || ''} placeholder="부모ID"
                                                    onChange={e => handleInputChange(idx, 'uppMenuId', e.target.value)} />
                                            </td>

                                            {/* 프로그램ID */}
                                            <td style={{ ...tdStyle, width: '110px' }}>
                                                <input style={cellInputStyle} value={menu.pgmId || ''} placeholder="프로그램ID"
                                                    onChange={e => handleInputChange(idx, 'pgmId', e.target.value)} />
                                            </td>

                                            {/* LVL */}
                                            <td style={{ ...tdStyle, width: '60px' }}>
                                                <input type="number" style={{ ...cellInputStyle, textAlign: 'center' }} value={menu.lvl}
                                                    onChange={e => handleInputChange(idx, 'lvl', Number(e.target.value))} />
                                            </td>

                                            {/* 순서 */}
                                            <td style={{ ...tdStyle, width: '60px' }}>
                                                <input type="number" style={{ ...cellInputStyle, textAlign: 'center' }} value={menu.sortNo}
                                                    onChange={e => handleInputChange(idx, 'sortNo', Number(e.target.value))} />
                                            </td>

                                            {/* 사용여부 */}
                                            <td style={{ ...tdStyle, width: '90px', textAlign: 'center' }}>
                                                <select style={badgeSelectStyle(menu.useYn)} value={menu.useYn}
                                                    onChange={e => handleInputChange(idx, 'useYn', e.target.value)}>
                                                    <option value="Y">사용</option>
                                                    <option value="N">미사용</option>
                                                </select>
                                            </td>

                                            {/* 행 삭제 */}
                                            <td style={{ ...tdStyle, width: '70px', textAlign: 'center' }}>
                                                <button style={deleteRowBtnStyle} onClick={e => handleDeleteRow(idx, e)} title="행 삭제">
                                                    ✕
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// ── 스타일 ──────────────────────────────────────────────

const pageTitleStyle: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 700,
    color: '#1a1a2e',
    margin: 0,
};

const pageSubtitleStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#8c8c8c',
    margin: '4px 0 0',
};

const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    padding: '20px 24px',
    marginBottom: '16px',
};

const searchLabelStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#555',
    fontWeight: 600,
    whiteSpace: 'nowrap',
};

const selectStyle: React.CSSProperties = {
    padding: '7px 10px',
    borderRadius: '6px',
    border: '1px solid #d9d9d9',
    fontSize: '13px',
    color: '#333',
    backgroundColor: '#fff',
    cursor: 'pointer',
};

const searchInputStyle: React.CSSProperties = {
    padding: '7px 12px',
    borderRadius: '6px',
    border: '1px solid #d9d9d9',
    fontSize: '13px',
    color: '#333',
    width: '260px',
    outline: 'none',
};

const tableInfoRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
};

const totalCountStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#555',
};

const checkedCountStyle: React.CSSProperties = {
    color: '#fa8c16',
    fontWeight: 600,
};

const hintTextStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#aaa',
};

const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
};

const thStyle: React.CSSProperties = {
    backgroundColor: '#f5f7fa',
    color: '#555',
    fontWeight: 600,
    padding: '10px 12px',
    textAlign: 'center',
    borderBottom: '2px solid #e8e8e8',
    borderRight: '1px solid #e8e8e8',
    whiteSpace: 'nowrap',
};

const trStyle: React.CSSProperties = {
    cursor: 'pointer',
    transition: 'background-color 0.15s',
};

const tdStyle: React.CSSProperties = {
    padding: '6px 8px',
    borderBottom: '1px solid #f0f0f0',
    borderRight: '1px solid #f0f0f0',
    verticalAlign: 'middle',
    color: '#333',
};

const cellInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '5px 8px',
    border: '1px solid transparent',
    borderRadius: '4px',
    fontSize: '13px',
    color: '#333',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    outline: 'none',
};

const checkboxStyle: React.CSSProperties = {
    width: '15px',
    height: '15px',
    cursor: 'pointer',
    accentColor: '#0891b2',
};

const treeIconStyle: React.CSSProperties = {
    color: '#bbb',
    marginRight: '5px',
    userSelect: 'none',
    fontFamily: 'monospace',
};

const emptyRowStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '48px',
    color: '#bbb',
    fontSize: '14px',
};

const deleteRowBtnStyle: React.CSSProperties = {
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    border: '1px solid #ffccc7',
    backgroundColor: '#fff1f0',
    color: '#ff4d4f',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const searchBtnStyle: React.CSSProperties = {
    flexShrink: 0,
    width: '26px',
    height: '26px',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    backgroundColor: '#fafafa',
    cursor: 'pointer',
    fontSize: '13px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
};

const badgeSelectStyle = (useYn: string): React.CSSProperties => ({
    padding: '3px 8px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: useYn === 'Y' ? '#f6ffed' : '#fff1f0',
    color: useYn === 'Y' ? '#52c41a' : '#ff4d4f',
    outline: '1px solid',
    outlineColor: useYn === 'Y' ? '#b7eb8f' : '#ffa39e',
});

// ── 팝업 스타일 ──────────────────────────────────────────

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
};

const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    width: '480px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    overflow: 'hidden',
};

const modalHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #f0f0f0',
};

const modalTitleStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 700,
    color: '#1a1a2e',
};

const modalCloseBtn: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#999',
    cursor: 'pointer',
    padding: '4px',
    lineHeight: 1,
};

const modalSearchInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d9d9d9',
    fontSize: '13px',
    color: '#333',
    outline: 'none',
    boxSizing: 'border-box',
};

const modalListStyle: React.CSSProperties = {
    overflowY: 'auto',
    flex: 1,
};

const modalItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '11px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #fafafa',
    transition: 'background-color 0.1s',
};

const modalItemLabelStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#333',
    fontWeight: 500,
};

const modalItemPathStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#0891b2',
    fontFamily: 'monospace',
    backgroundColor: '#e0f9ff',
    padding: '2px 7px',
    borderRadius: '4px',
};

const modalFooterStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    borderTop: '1px solid #f0f0f0',
    backgroundColor: '#fafafa',
};

const modalCancelBtnStyle: React.CSSProperties = {
    padding: '6px 16px',
    borderRadius: '6px',
    border: '1px solid #d9d9d9',
    backgroundColor: '#fff',
    fontSize: '13px',
    color: '#555',
    cursor: 'pointer',
};
