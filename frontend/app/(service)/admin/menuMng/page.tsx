'use client';

import { useState, useEffect } from 'react';
import MyButton from '@/components/MyButton';

// 메뉴 타입 정의
type Menu = {
    menuId: string;
    menuNm: string;
    menuPath: string;
    uppMenuId: string;
    pgmId: string;
    lvl: number;
    sortNo: number;
    useYn: string;
    isNew?: boolean; // 클라이언트에서 새로 추가된 행인지 구분용
};

export default function MenuMngPage() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [searchType, setSearchType] = useState("all"); // 콤보박스 상태
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null); // 선택된 행 index


    // 1. 조회 버튼 로직
    const fetchMenus = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/admin/menu/getList?type=${searchType}&keyword=${encodeURIComponent(searchKeyword)}`);
            if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
            const data = await res.json();
            setMenus(data);
        } catch (e) {
            console.error("메뉴 조회 실패:", e);
            alert("메뉴 조회에 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.");
        }
    };

    useEffect(() => { fetchMenus(); }, []);

    // 2. 행 추가 버튼 로직 (선택된 행 아래에 자식으로 추가)
    const handleAddRow = () => {
        if (selectedIdx === null) {
            alert("행을 추가할 위치(부모)를 선택해주세요.");
            return;
        }

        const newMenus = [...menus];
        const parentRow = menus[selectedIdx];
        const parentLvl = Number(parentRow.lvl);
        const parentId = parentRow.menuId;

        if (!parentId && !parentRow.isNew) {
            alert("부모 행의 메뉴ID가 입력되어야 자식을 만들 수 있습니다.");
            return;
        }

        // --- [핵심 로직: 자식들의 최하단 위치 찾기] ---
        let insertIdx = selectedIdx + 1;

        // 선택한 행 다음부터 리스트를 끝까지 확인
        for (let i = selectedIdx + 1; i < menus.length; i++) {
            // 현재 확인 중인 행의 레벨이 부모 레벨보다 높으면(=자식 혹은 자손이면)
            if (Number(menus[i].lvl) > parentLvl) {
                insertIdx = i + 1; // 인서트 지점을 계속 뒤로 미룸
            } else {
                // 부모 레벨과 같거나 낮은 행을 만나면 거기가 자식 그룹의 끝임
                break;
            }
        }
        // ------------------------------------------

        const newRow: Menu = {
            menuId: parentId,
            menuNm: '',
            menuPath: '',
            uppMenuId: parentId,     // 선택한 행이 부모가 됨
            pgmId: '',
            lvl: parentLvl + 1,      // 부모보다 한 단계 깊게
            sortNo: insertIdx + 1,   // 일단 위치 기반으로 순서 부여
            useYn: 'Y',
            isNew: true
        };

        newMenus.splice(insertIdx, 0, newRow);
        setMenus(newMenus);
        //setSelectedIdx(insertIdx); // 새로 만든 행을 선택 상태로
    };

    // 3. 행 삭제 버튼 로직 (체크박스 대신 간단하게 ID로 삭제하거나 선택된 행 삭제)
    const handleDeleteRow = (index: number) => {
        if (confirm("해당 행을 삭제하시겠습니까?")) {
            const newMenus = [...menus];
            newMenus.splice(index, 1);
            setMenus(newMenus);
            // 실제 삭제 API 호출 로직은 여기에 추가 (ex: deleteMenu(menus[index].menuId))
        }
    };

    // 그리드 내 입력값 변경 처리
    const handleInputChange = (index: number, field: keyof Menu, value: any) => {
        const updatedMenus = [...menus];
        updatedMenus[index] = { ...updatedMenus[index], [field]: value };
        setMenus(updatedMenus);
    };

    const handleSaveAll = async () => {
        // 유효성 검사 (자바의 Validation 역할)
        const invalidRow = menus.find(m => !m.menuId || !m.menuNm);
        if (invalidRow) {
            return alert("메뉴ID와 메뉴명은 필수 입력 항목입니다.");
        }

        if (!confirm("변경된 모든 내용을 저장하시겠습니까?")) return;

        try {
            const response = await fetch('http://localhost:8080/api/admin/menu/saveAll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menus), // 리스트 전체를 JSON으로 보냄
            });

            if (response.ok) {
                const msg = await response.text();
                alert(msg);
                fetchMenus(); // 저장 후 최신 데이터로 리로드
            } else {
                alert("저장 실패: 서버 에러 발생");
            }
        } catch (error) {
            console.error("Save Error:", error);
            alert("서버 연결에 실패했습니다.");
        }
    };

    return (
        <div style={{ padding: '20px',backgroundColor:"white"}}>
            <h2 style={{ marginBottom: '20px', color: 'black' }}>메뉴 관리 (Grid)</h2>

            {/* 상단: 조회 및 검색 영역 */}
            <div style={searchBarStyle}>
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    style={selectStyle}
                >
                    <option value="all">전체</option>
                    <option value="menuId">메뉴ID</option>
                    <option value="menuNm">메뉴명</option>
                    <option value="pgmId">프로그램ID</option>
                </select>
                <input
                    type="text"
                    placeholder="메뉴명 검색"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    style={inputStyle}
                />
                <MyButton text="조회" color="primary" onClick={fetchMenus} />
            </div>

            {/* 중간: 버튼 툴바 영역 */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', justifyContent: 'flex-end' }}>
                <MyButton text="행 추가" color="success" size="sm" onClick={handleAddRow} />
                <MyButton text="저장" color="primary" size="sm" onClick={handleSaveAll}/>
            </div>

            {/* 하단: 데이터 그리드 (테이블) */}
            <div style={{ overflowX: 'auto', backgroundColor: 'white' }}>
                <table style={tableStyle}>
                    <thead>
                    <tr style={headerTrStyle}>
                        <th>메뉴ID</th>
                        <th>메뉴명</th>
                        <th>경로</th>
                        <th>부모ID</th>
                        <th>프로그램ID</th>
                        <th>LVL</th>
                        <th>순서</th>
                        <th>사용여부</th>
                        <th>관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {menus.map((menu, index) => (
                        <tr key={index}
                            style={{...rowStyle,backgroundColor: selectedIdx === index ? '#e6f7ff' : 'transparent'}}
                            onClick={() => setSelectedIdx(index)}
                        >
                            <td style={tdStyle}>
                                <input
                                    style={gridInputStyle}
                                    value={menu.menuId}
                                    //readOnly={!menu.isNew} // 기존 데이터는 ID 수정 불가
                                    onChange={(e) => handleInputChange(index, 'menuId', e.target.value)}
                                />
                            </td>
                            <td style={{...tdStyle,padding: 0,position: 'relative' }}>
                                <div style={{ display: 'flex',
                                    alignItems: 'center',
                                    height:'100%',
                                    paddingLeft: `${(menu.lvl - 1) * 10}px`
                                }}>
                                    {menu.lvl > 0 && (
                                        <span style={{
                                            color: '#888',
                                            marginRight: '8px',
                                            userSelect: 'none' // 기호는 드래그 안 되게
                                        }}>
                                            └
                                        </span>
                                    )}
                                    <input style={{...gridInputStyle,
                                        width:'100%',
                                        }}
                                               value={menu.menuNm||''}
                                               onChange={(e) => handleInputChange(index, 'menuNm', e.target.value)} />
                                </div>
                            </td>
                            <td style={tdStyle}><input style={gridInputStyle} value={menu.menuPath||''} onChange={(e) => handleInputChange(index, 'menuPath', e.target.value)} /></td>
                            <td style={tdStyle}> <input style={gridInputStyle} value={menu.uppMenuId||''} onChange={(e) => handleInputChange(index, 'uppMenuId', e.target.value)} /></td>
                            <td style={tdStyle}><input style={gridInputStyle} value={menu.pgmId||''} onChange={(e) => handleInputChange(index, 'pgmId', e.target.value)} /></td>
                            <td style={tdStyle}><input type="number" style={gridInputStyle} value={menu.lvl} onChange={(e) => handleInputChange(index, 'lvl', e.target.value)} /></td>
                            <td style={tdStyle}><input type="number" style={gridInputStyle} value={menu.sortNo} onChange={(e) => handleInputChange(index, 'sortNo', e.target.value)} /></td>
                            <td style={tdStyle}>
                                <select style={gridInputStyle} value={menu.useYn} onChange={(e) => handleInputChange(index, 'useYn', e.target.value)}>
                                    <option value="Y">Y</option>
                                    <option value="N">N</option>
                                </select>
                            </td>
                            <td style={tdStyle}>
                                <MyButton text="삭제" color="danger" size="sm" onClick={() => handleDeleteRow(index)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// 스타일 정의들
const selectStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ddd', marginRight: '5px',color:'black',backgroundColor:'white'};

const searchBarStyle = { display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '15px', backgroundColor: '#888888', borderRadius: '8px' };

const inputStyle = { padding: '6px',  borderRadius: '4px',border: '1px solid #ddd', marginRight: '5px',width: '250px',color:'black',backgroundColor:'white'};

const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, fontSize: '14px', color: 'black' };

const headerTrStyle = { backgroundColor: '#888888',border:'1px solid', borderBottom: '2px solid ',color:'white'};

const rowStyle = { border:'1px solid',borderBottom: '2px solid' };

const gridInputStyle = { width: '100%', padding: '5px'};

const tdStyle = {
    border:'1px solid',
    borderRight: '1px solid', // 세로줄
};