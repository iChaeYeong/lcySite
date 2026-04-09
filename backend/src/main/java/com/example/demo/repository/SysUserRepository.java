package com.example.demo.repository;

import com.example.demo.entity.SysUser;
import com.example.demo.entity.SysUserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SysUserRepository extends JpaRepository<SysUser,SysUserId> {

    Optional<SysUser> findByLoginId(String loginId);
}
