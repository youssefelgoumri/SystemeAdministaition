package com.example.deliberationsessionordinaireservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class DeliberationSessionOrdinaireServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliberationSessionOrdinaireServiceApplication.class, args);
		System.out.println("=============================================================================\n" +
				"Deliberation Session Ordinaire Service is lanced on port 6565\n" +
				"=============================================================================");
	}

}
