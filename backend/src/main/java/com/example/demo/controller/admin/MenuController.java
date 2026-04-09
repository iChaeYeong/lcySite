package com.example.demo.controller.admin;

import com.example.demo.entity.SysMenu;
import com.example.demo.repository.admin.SysMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/menu")
public class MenuController {
    @Autowired
    private SysMenuRepository menuRepository;

    @GetMapping("/getList")
    public List<SysMenu> getAllMenu(
            @RequestParam(defaultValue = "all") String type,
            @RequestParam(defaultValue = "") String keyword
    ){
        return menuRepository.searchMenus(type, keyword);
    }

    @GetMapping("/active")
    public List<SysMenu> getActiveMenus() {
        return menuRepository.findByUseYnOrderBySortNoAsc("Y");
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveMenu(@RequestBody SysMenu menu) {
        try {
            menuRepository.save(menu);
            return ResponseEntity.ok("메뉴가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("저장 중 오류 발생: " + e.getMessage());
        }
    }

    @PostMapping("/saveAll")
    @Transactional
    public ResponseEntity<?> saveAllMenus(@RequestBody List<SysMenu> menuList) {
        menuRepository.saveAll(menuList); // JPA가 리스트 전체를 돌면서 insert/update 수행
        return ResponseEntity.ok("전체 저장 성공");
    }

    @DeleteMapping("/delete/{menuId}")
    public ResponseEntity<String> deleteMenu(@PathVariable String menuId) {
        try {
            menuRepository.deleteById(menuId);
            return ResponseEntity.ok("메뉴가 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("삭제 실패: " + e.getMessage());
        }
    }
}
