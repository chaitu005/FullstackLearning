package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bean.employeebean;
import com.example.services.employeeservice;

@RestController
public class HomeController {

	@Autowired
	employeeservice empServ;
	
	@GetMapping("/api/users")
	public List<employeebean> getUsers() {
		try {
			return empServ.readFile();

		} catch (Exception e) {
			return null;
		}
	}
	
	@PostMapping("/api/adduser")
	public void addUser(@RequestBody employeebean emp) {
		try {
			empServ.writeFile(emp);

		} catch (Exception e) {
			
		}
	}
	
	@PostMapping("/api/searchuser")
	public List<employeebean> searchUser(@RequestBody String key) {
		try {
			return empServ.searchFile(key);

		} catch (Exception e) {
			return null;
		}
	}
	
	
}
