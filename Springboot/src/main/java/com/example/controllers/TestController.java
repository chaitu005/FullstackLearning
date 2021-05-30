package com.example.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TestController {

	@GetMapping("/users1")
	public String getUsers() {
		return "Ganesha ! Sairam ! Venkanna!";
	}
	
	@GetMapping("/users123")
	public String getUsers1() {
		return "Ganesha ! Sairam ! Venkanna!"; 
	}
	
	

}
