package com.UnitedWeGame.controllers.api;

import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.GamerIdentifier;
import com.UnitedWeGame.models.Platform;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.models.UserSettings;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/userSettings")
public class UserSettingsAPIController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public UserSettings saveUserSettings(@RequestBody UserSettings userSettings) {
		User loggedInUser = userService.getLoggedInUser();
		Set<GamerIdentifier> identifiers = loggedInUser.getGamerIdentifiers();
		
		// First validate they changed fields before updating them
		
		if (!StringUtils.isEmpty(userSettings.getEmail()))
			loggedInUser.setEmail(userSettings.getEmail());
		
		if (!StringUtils.isEmpty(userSettings.getImageUrl()))
			loggedInUser.setImageUrl(userSettings.getImageUrl());
		
		if (!StringUtils.isEmpty(userSettings.getCoverPhoto()))
			loggedInUser.getProfile().setCoverPhoto(userSettings.getCoverPhoto());
		
		if (!StringUtils.isEmpty(userSettings.getSteamId())) 
			updateGamerIdentifier(GamerIdentifier.STEAM, userSettings.getSteamId(), identifiers);
		
		
		if (!StringUtils.isEmpty(userSettings.getXboxGamertag())) 
			updateGamerIdentifier(GamerIdentifier.XBOX, userSettings.getXboxGamertag(), identifiers);
		
		
		if(!StringUtils.isEmpty(userSettings.getPsnGamertag())) 
			updateGamerIdentifier(GamerIdentifier.PSN, userSettings.getPsnGamertag(), identifiers);
		
		loggedInUser.getProfile().setSmsEnabled(userSettings.isSmsEnabled());
		userService.saveUser(loggedInUser);
		return userSettings;
	}
	
	private void updateGamerIdentifier(String platform, String newIdentifier, Set<GamerIdentifier> identifiers) {
		for (GamerIdentifier identifier : identifiers) {
			if (identifier.getPlatform().equals(platform)) {
				identifier.setIdentifier(newIdentifier);
			}
		}
	}

}
