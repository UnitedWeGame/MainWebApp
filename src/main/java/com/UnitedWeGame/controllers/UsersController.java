package com.UnitedWeGame.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.UnitedWeGame.models.ActivityPost;
import com.UnitedWeGame.models.Game;
import com.UnitedWeGame.models.Profile;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.ActivityPostService;
import com.UnitedWeGame.services.GameService;
import com.UnitedWeGame.services.ProfileService;
import com.UnitedWeGame.services.UserService;

@Controller
public class UsersController {

	@Autowired
	UserService userService;
	@Autowired
	ProfileService profileService;
	@Autowired
	GameService gameService;
	@Autowired
	ActivityPostService activityService;

	@RequestMapping("/users")
	public String index(Model model) {
		model.addAttribute("users", userService.allUsers());
		return "users/index";
	}
	
	@RequestMapping("/users/{username}")
	public String getProfile(@PathVariable String username, Model model) {
		Profile profile = profileService.getProfileByUsername(username);
		User user = userService.getUserByUsername(username);
		model.addAttribute("profile", profile);
		model.addAttribute("user", user);
		return "users/profile";
	}

	@GetMapping("/edit-profile")
	public String editProfile(Model model) {
		Profile profile = profileService.getLoggedInProfile();
		model.addAttribute("profile", profile);
		return "users/edit-profile";
	}

	@PostMapping("/edit-profile")
	public String editProfile(@ModelAttribute Profile profile, final RedirectAttributes redirectAttrib) {
		Profile oldProfile = profileService.getLoggedInProfile();
		oldProfile.updateAttributes(profile);
		profileService.saveProfile(oldProfile);
		redirectAttrib.addFlashAttribute("success", "Profile has been updated!");
		return "redirect:/edit-profile";
	}
	
	@GetMapping("/lfg-chat/{gameId}")
	public String lfgChat(@PathVariable long gameId, Model model) {
		Game game = gameService.findById(gameId);
		String username = userService.getLoggedInUser().getUsername();
		String gameTitle = game.getTitle();
		ActivityPost activityPost = new ActivityPost();
		activityPost.setUser(userService.getLoggedInUser());
		activityPost.setContent(" joined LFG Chat for " + gameTitle);
		activityService.createActivity(activityPost);
		model.addAttribute("gameTitle", game.getTitle());
		model.addAttribute("username", username);
		return "users/lfg-chat";
	}
	
}
