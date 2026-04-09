package com.example.demo.common;

import com.example.demo.entity.LogEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Common {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String encode(String rawPassword){
        if(rawPassword == null) return null;
        return encoder.encode(rawPassword);
    }

    public static boolean matches(String rawPassword, String encodedPassword){
        return encoder.matches(rawPassword, encodedPassword);
    }


    /**
     * 등록/수정자 id,ip,de 한번에 셋팅
     * @param entity 상속받은 엔티티 객체
     * @param request 현재 요청 객체
     * @param userId 현재 사용자 ID (가입 시에는 본인 ID, 로그인 후엔 세션 ID 등
     * */
    public static void setAuditInfo(LogEntity entity, HttpServletRequest request, String userId){
        String ip =  getClientIp(request);

        if (entity.getInsId()==null){
            entity.setInsId(userId);
            entity.setInsIp(ip);
        }
        entity.setUptId(userId);
        entity.setUptIp(ip);
    }

    /**
     * ip 추출 메소드
     * @param request 현재 요청 객체
     * */
    public static String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        // 로컬 호스트(IPv6)인 경우 127.0.0.1로 변환 (보기 편하게)
        if ("0:0:0:0:0:0:0:1".equals(ip)) {
            ip = "127.0.0.1";
        }

        return ip;
    }

}
