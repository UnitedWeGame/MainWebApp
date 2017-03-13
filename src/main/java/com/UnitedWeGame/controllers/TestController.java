package com.UnitedWeGame.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.UserService;

@RestController
public class TestController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping("/test")
	public List<User> test() {
		return userService.allUsers(); 
	}
}
