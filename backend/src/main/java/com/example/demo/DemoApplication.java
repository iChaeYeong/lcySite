package com.example.demo;

import com.example.demo.common.Common;
import com.example.demo.entity.SysUser;
import com.example.demo.repository.SysUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(SysUserRepository repository){
		return args -> {
//			SysUser testUser = new SysUser();
//			testUser.setJoinDgcnt(1);
//			testUser.setUserNm("관리자");
//			testUser.setLoginId("0000000");
//			testUser.setPwd(Common.encode("1243"));
//
//			repository.save(testUser);

			System.out.println("==============================================");
			System.out.println("실행완료");
			System.out.println("==============================================");
		};
	}



}
