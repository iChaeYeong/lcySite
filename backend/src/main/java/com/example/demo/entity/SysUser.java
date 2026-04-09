package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "sys_user") //테이블 이름 지정
@IdClass(SysUserId.class) //복합키 클레스 연결
public class SysUser extends LogEntity{
    @Id       //Column (name="USER_ID", length = 20)
    @Column(name="login_id", length = 20)
    private String loginId;

    @Id
    @Column(name="join_dgcnt")
    private Integer joinDgcnt;

    @Column(name="user_nm", length = 20)
    private String userNm;

    @Column (name = "pwd", length = 200)
    private String pwd;
}
