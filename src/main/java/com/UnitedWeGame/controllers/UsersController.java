package com.UnitedWeGame.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.UnitedWeGame.services.UserService;

@Controller
public class UsersController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping("/users")
	public String index(Model model) {
		model.addAttribute("users", userService.allUsers());
		return "users/index";
	}
}
