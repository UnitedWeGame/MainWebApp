package com.UnitedWeGame.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.UnitedWeGame.models.User;
import com.UnitedWeGame.models.UserValidator;
import com.UnitedWeGame.services.UserService;

@Controller
public class RegistrationController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserValidator userValidator;
	
	@GetMapping("/registration")
	public String registration(Model model) {
		model.addAttribute("user", new User());
		return "registration/register";
	}
	
	@PostMapping("/registration")
	public String registration(@Valid @ModelAttribute User user, BindingResult bindingResult) {
		userValidator.validate(user, bindingResult);
		if (bindingResult.hasErrors()) {
			return "registration/register";
		}
		userService.saveUser(user);
		return "redirect:/login?registered";
	}
}
