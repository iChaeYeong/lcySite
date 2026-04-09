package com.example.demo.repository.admin;

import com.example.demo.entity.SysMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SysMenuRepository extends JpaRepository<SysMenu,String> {
    List<SysMenu> findByUseYnOrderBySortNoAsc(String useYn);

    @Query("SELECT m FROM SysMenu m WHERE " +
            "(:type = 'menuId' AND m.menuId LIKE %:keyword%) OR " +
            "(:type = 'menuNm' AND m.menuNm LIKE %:keyword%) OR " +
            "(:type = 'pgmId' AND m.pgmId LIKE %:keyword%) OR " +
            "(:type = 'all' AND (m.menuId LIKE %:keyword% OR m.menuNm LIKE %:keyword% OR m.pgmId LIKE %:keyword%)) " +
            "ORDER BY m.sortNo ASC")
    List<SysMenu> searchMenus(@Param("type") String type, @Param("keyword") String keyword);

    //List<SysMenu> findByUpMenuIdOderBySortNoAsc(String upMenuId);
}
