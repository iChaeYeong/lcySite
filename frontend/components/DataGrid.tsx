import React, { ReactNode } from 'react';

// =====================================================================
// [1] 컬럼 설계도 (GridColumn)
// 자바의 DTO(VO)처럼, 한 칸의 컬럼이 가져야 할 속성들을 정의합니다.
// =====================================================================
export interface GridColumn<T> {
    header: string;          // 표 머리에 들어갈 글자 (예: "메뉴명", "작성일")

    // key는 T(예: Menu)가 가진 필드명만 들어올 수 있게 제한합니다.
    // 오타가 나면 빨간 줄을 그어줍니다! (예: menuId는 가능, targetId는 에러)
    key?: keyof T;

    width?: string | number; // 컬럼의 넓이 (예: '150px')
    align?: 'left' | 'center' | 'right'; // 정렬 방식

    // ✨ [가장 중요한 핵심: render 함수]
    // 자바의 함수형 인터페이스나 람다(Lambda)와 같습니다.
    // "단순 텍스트 말고, <input>이나 <button>을 그리고 싶을 때" 부모가 만들어서 던져주는 함수입니다.
    // item: 현재 줄의 데이터 1건 (Menu 객체 1개) / index: 현재 줄 번호
    render?: (item: T, index: number) => ReactNode;
}


// =====================================================================
// [2] 컴포넌트가 받을 파라미터들 (Props)
// 자바 메서드의 매개변수(Parameter)와 같습니다.
// =====================================================================
interface DataGridProps<T> {
    data: T[];                       // 화면에 뿌릴 실제 데이터 리스트 (List<T>)
    columns: GridColumn<T>[];        // 위에 정의한 컬럼 설계도 리스트
    selectedIdx?: number | null;     // 현재 마우스로 클릭된 줄 번호 (선택 사항)
    onRowClick?: (index: number) => void; // 줄을 클릭했을 때 실행할 함수 (선택 사항)
}


// =====================================================================
// [3] 공통 그리드 컴포넌트 본체
// =====================================================================
export default function DataGrid<T>({ data, columns, selectedIdx, onRowClick }: DataGridProps<T>) {
    return (
        // 가로 스크롤을 만들어주는 껍데기
        <div style={{ overflowX: 'auto', backgroundColor: 'white' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'black' }}>

                {/* --- [A] 테이블 헤더 (머리글) 그리기 --- */}
                <thead>
                <tr style={{ backgroundColor: '#888', color: 'white' }}>
                    <th style={{ padding: '8px', border: '1px solid #ddd', width: "40px", textAlign: 'center' }}>
                        NO {/* "메뉴ID", "메뉴명" 등이 여기에 찍힘 */}
                    </th>
                    {/* 부모가 넘겨준 columns 배열을 돌면서 <th>를 만듭니다. */}
                    {columns.map((col, index) => (
                        <th key={index} style={{ padding: '8px', border: '1px solid #ddd', width: col.width, textAlign: col.align || 'center' }}>
                            {col.header} {/* "메뉴ID", "메뉴명" 등이 여기에 찍힘 */}
                        </th>
                    ))}
                </tr>
                </thead>

                {/* --- [B] 테이블 본문 (데이터) 그리기 --- */}
                <tbody>
                {/* 1. data 배열을 한 줄씩 돌면서 <tr>을 만듭니다. */}
                {data.map((row, rowIndex) => (

                    <tr
                        key={rowIndex}
                        // 선택된 줄이면 하늘색(#e6f7ff), 아니면 투명색 배경을 줍니다.
                        style={{
                            borderBottom: '1px solid #eee',
                            backgroundColor: selectedIdx === rowIndex ? '#e6f7ff' : 'transparent',
                            cursor: onRowClick ? 'pointer' : 'default'
                        }}
                        // 줄을 클릭하면 부모가 넘겨준 onRowClick 함수를 실행합니다.
                        onClick={() => onRowClick && onRowClick(rowIndex)}
                    >
                            <td
                                style={{ borderRight: '1px solid #ddd',
                                    padding: '5px',
                                    backgroundColor: selectedIdx === rowIndex ? '#e6f7ff' : rowIndex % 2 === 0 ? "#FFFFFF" : "#E3E3E3",
                                    textAlign:"center"}}>
                                {rowIndex+1}
                            </td>
                        {/* 2. 각 줄(<tr>) 안에서, 다시 columns 배열을 돌면서 칸(<td>)을 만듭니다. */}
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}
                                style={{ borderRight: '1px solid #ddd',
                                         padding: '5px',
                                         backgroundColor: selectedIdx === rowIndex ? '#e6f7ff' : rowIndex % 2 === 0 ? "#FFFFFF" : "#E3E3E3",
                                         textAlign:"center"}}>

                                {/* ✨ [렌더링 로직]
                                        부모가 render 함수를 넘겨줬나요?
                                        - YES: 부모가 시킨 대로 복잡하게 그린다. (예: <input> 태그)
                                        - NO: 그냥 row 데이터에서 key에 해당하는 값을 글자로 찍는다.
                                    */}
                                {col.render
                                    ? col.render(row, rowIndex)
                                    : String(row[col.key as keyof T] || col.key)}

                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}