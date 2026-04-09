package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class LogEntity {
    @Column(name="ins_id", length=20, nullable = false, updatable = false)
    private String insId;

    @Column(name="ins_ip", length=50, nullable = false, updatable = false)
    private String insIp;

    @Column(name="ins_de", nullable = false, updatable = false)
    private LocalDateTime insDe;

    @Column(name="upt_id", length=20, nullable = false)
    private String uptId;

    @Column(name="upt_ip", length=50, nullable = false)
    private String uptIp;

    @Column(name="upt_de", nullable = false)
    private LocalDateTime uptDe;

    @PrePersist
    public void prePersist(){
        LocalDateTime now = java.time.LocalDateTime.now();
        this.insDe = now;
        this.uptDe = now;

        if (this.insId == null) this.insId = "SYSTEM";
        if (this.insIp == null) this.insIp = "127.0.0.1";
        if (this.uptId == null) this.uptId = "SYSTEM";
        if (this.uptIp == null) this.uptIp = "127.0.0.1";
    }

    @PreUpdate
    public void preUpdate(){
        if (this.uptId == null) this.uptId = "SYSTEM";
        if (this.uptIp == null) this.uptIp = "127.0.0.1";
        this.uptDe = LocalDateTime.now();
    }

    public void setUpdateInfo(String userId, String ip) {
        this.uptId = userId;
        this.uptIp = ip;
    }
}
