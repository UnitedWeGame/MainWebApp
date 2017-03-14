package com.UnitedWeGame.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
	public String registration(@Valid @ModelAttribute User user, BindingResult bindingResult,
			RedirectAttributes redirectAttrib) {
		userValidator.validate(user, bindingResult);
		if (bindingResult.hasErrors()) {
			return "registration/register";
		}
		userService.saveUser(user);
		
		//Manually log user in
		UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
		Authentication auth = new UsernamePasswordAuthenticationToken(userDetails.getUsername(),
				userDetails.getPassword(), userDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		redirectAttrib.addFlashAttribute("success",
				"You have successfully registered. Feel free to edit your profile now!");
		return "redirect:/edit-profile";
	}
}
