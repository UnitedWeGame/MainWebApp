package com.UnitedWeGame.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.Profile;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.repos.ProfileRepository;

@Service
public class ProfileService {
	@Autowired
	ProfileRepository profileRepo;
	@Autowired
	UserService userService;
	
	public Profile getLoggedInProfile() {
		User user = userService.getLoggedInUser();
		return user.getProfile();
	}
	
	public Profile getProfileById(long id) {
		return profileRepo.findOne(id);
	}
	public void saveProfile(Profile profile) {
		profileRepo.save(profile);
	}

	public Profile getProfileByUsername(String username) {
		User user = userService.getUserByUsername(username);
		return user.getProfile();
	}
}
