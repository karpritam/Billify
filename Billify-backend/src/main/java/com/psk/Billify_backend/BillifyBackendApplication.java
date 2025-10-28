package com.psk.Billify_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BillifyBackendApplication {

	public static void main(String[] args) {
//		System.out.println("AWS_ACCESS_KEY_ID: " + System.getenv("AWS_ACCESS_KEY_ID"));
//		System.out.println("AWS_SECRET_ACCESS_KEY: " + System.getenv("AWS_SECRET_ACCESS_KEY"));
//		System.out.println("AWS_REGION: " + System.getenv("AWS_REGION"));
//		System.out.println("AWS_bucket name: " + System.getenv("MY_APP_BUCKET"));

		SpringApplication.run(BillifyBackendApplication.class, args);
	}

}
