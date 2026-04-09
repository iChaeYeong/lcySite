package com.example.demo.controller;

import com.example.demo.common.Common;
import com.example.demo.entity.SysUser;
import com.example.demo.repository.SysUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private SysUserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<SysUser> getLoginId = userRepository.findByLoginId(request.getLoginId());
        if (getLoginId.isPresent()) {
            SysUser user = getLoginId.get();
            if (Common.matches(request.getPwd(),user.getPwd())) {
                user.setPwd(null); // 비밀번호 해시를 응답에 포함하지 않음
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(401).body("아이디 또는 비밀번호가 틀렸습니다.");
    }

    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<?> signup(@RequestBody SignupRequest request, HttpServletRequest httpRequest){
        Optional<SysUser> getUserId = userRepository.findByLoginId(request.getLoginId());
        if (getUserId.isPresent()){
            return ResponseEntity.status(409).body("이미 존재하는 계정입니다.");
        }
        try{
            SysUser newUser = new SysUser();
            newUser.setLoginId(request.getLoginId());
            newUser.setUserNm(request.getUserNm());
            newUser.setJoinDgcnt(1);
            newUser.setPwd(Common.encode(request.getPwd()));
            Common.setAuditInfo(newUser,httpRequest,request.getLoginId());

            userRepository.save(newUser);
            return ResponseEntity.ok("가입성공");
        }catch (Exception e){
            return ResponseEntity.status(500).body("가입 처리 중 오류 발생:" + e.getMessage());
        }
    }

    @Data
    static class LoginRequest {
        private String loginId;
        private String pwd;
    }

    @Data
    static class SignupRequest{
        private String userNm;
        private String loginId;
        private String pwd;
    }
}