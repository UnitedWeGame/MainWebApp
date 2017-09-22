package com.UnitedWeGame.controllers;

import java.util.Set;

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

import com.UnitedWeGame.models.GamerIdentifier;
import com.UnitedWeGame.models.NewUsers;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.models.UserValidator;
import com.UnitedWeGame.services.GamerIdentifierService;
import com.UnitedWeGame.services.NewUsersService;
import com.UnitedWeGame.services.UserService;

@Controller
public class RegistrationController {

	@Autowired
	UserService userService;
	@Autowired
	GamerIdentifierService gamerIdentifierService;
	@Autowired
	NewUsersService newUsersService;

	@Autowired
	UserValidator userValidator;

	@GetMapping("/onboarding-xbox")
	public String onboardingXbox(Model model) {
		model.addAttribute("gamertag", new GamerIdentifier());
		return "onboarding/onboard-xbox";
	}
	
	@PostMapping("/onboarding-xbox")
	public String onboardingXbox(@Valid @ModelAttribute GamerIdentifier gamerIdentifier, BindingResult bindingResult) {
		User user = userService.getLoggedInUser();
		gamerIdentifier.setPlatform("Xbox Live");
		Set<GamerIdentifier> identifiers = user.getGamerIdentifiers();
		identifiers.add(gamerIdentifier);
		user.setGamerIdentifiers(identifiers);
		gamerIdentifierService.save(gamerIdentifier);
		userService.saveUser(user);
		return "redirect:/onboarding-steam";
	}
	
	@GetMapping("/onboarding-steam")
	public String onboardingSteam(Model model) {
		model.addAttribute("gamertag", new GamerIdentifier());
		return "onboarding/onboard-steam";
	}
	
	@PostMapping("/onboarding-steam")
	public String onboardingSteam(@Valid @ModelAttribute GamerIdentifier gamerIdentifier, BindingResult bindingResult) {
		User user = userService.getLoggedInUser();
		gamerIdentifier.setPlatform("Steam");
		Set<GamerIdentifier> identifiers = user.getGamerIdentifiers();
		identifiers.add(gamerIdentifier);
		user.setGamerIdentifiers(identifiers);
		gamerIdentifierService.save(gamerIdentifier);
		userService.saveUser(user);
		return "redirect:/users";
	}
	
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
		user.setImageUrl("https://images.igdb.com/igdb/image/upload/t_micro/mjustxpafje74fzjbeuy.jpg");
		userService.createUser(user);
		NewUsers newUser = new NewUsers();
		newUser.setUserId(user.getId());
		newUsersService.saveNewUser(newUser);
		//Manually log user in
		UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
		Authentication auth = new UsernamePasswordAuthenticationToken(userDetails.getUsername(),
				userDetails.getPassword(), userDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		redirectAttrib.addFlashAttribute("success",
				"You have successfully registered. Feel free to edit your profile now!");
		return "redirect:/onboarding-xbox";
	}
	
	@GetMapping("/logout")
	public String logout(RedirectAttributes redirectAttrib) {
		SecurityContextHolder.clearContext();
		redirectAttrib.addFlashAttribute("success", "You have been successfully logged out.");
		return "redirect:/login";
	}
}
