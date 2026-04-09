package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="sys_menu")
public class SysMenu {
    @Id
    @Column (name = "menu_id")
    private String menuId;

    @Column (name = "upp_menu_id")
    private String uppMenuId;

    @Column(name = "menu_nm")
    private String menuNm;

    @Column(name = "menu_path")
    private String menuPath;

    @Column(name = "pgm_id")
    private String pgmId;

    @Column (name = "sort_no")
    private Integer sortNo;

    @Column (name = "lvl")
    private Integer lvl;

    @Column (name = "use_yn")
    private String useYn;
}
