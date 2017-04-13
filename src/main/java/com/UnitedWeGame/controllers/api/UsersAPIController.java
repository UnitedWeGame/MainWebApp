package com.UnitedWeGame.controllers.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.Profile;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.ProfileService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api")
public class UsersAPIController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	ProfileService profileService;
	
	@RequestMapping("/users")
	public List<User> index(Model model) {
		return userService.allUsers();
	}
	
	@RequestMapping("/users/{username}")
	public User getProfile(@PathVariable String username) {
		return userService.getUserByUsername(username);
	}
	
	@RequestMapping(value="/users/{username}", method=RequestMethod.PUT)
	public Profile updateProfile(@RequestBody Profile profile) {
		Profile oldProfile = profileService.getLoggedInProfile();
		oldProfile.updateAttributes(profile);
		profileService.saveProfile(oldProfile);
		return oldProfile;
	}
}
