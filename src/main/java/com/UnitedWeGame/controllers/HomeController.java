package com.UnitedWeGame.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.UnitedWeGame.services.UserService;

@Controller
public class HomeController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping("/")
	// Principal returns null if user isn't logged in
	public String index(Principal user) {
		if (user == null)
			return "index";
		else
			return "redirect:/users";
	}
	
	@RequestMapping("/about")
	public String about() {
		return "about";
	}
	
	@RequestMapping("/tutorial")
	public String tutorial() {
		return "tutorial";
	}
}
