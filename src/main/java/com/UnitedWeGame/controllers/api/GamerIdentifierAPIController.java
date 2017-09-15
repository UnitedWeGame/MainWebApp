package com.UnitedWeGame.controllers.api;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.GamerIdentifier;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.GamerIdentifierService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/gamerids")
public class GamerIdentifierAPIController {

	@Autowired
	UserService userService;
	@Autowired
	GamerIdentifierService gamerIdService;

	@RequestMapping(value = "", method = RequestMethod.POST)
	public GamerIdentifier createGametag(@RequestBody GamerIdentifier gamerIdentifier) {
		User user = userService.getLoggedInUser();
		Set<GamerIdentifier> identifiers = user.getGamerIdentifiers();
		identifiers.add(gamerIdentifier);
		user.setGamerIdentifiers(identifiers);
		userService.saveUser(user);
		return gamerIdentifier;
	}

	@RequestMapping("/{gamerIdentifier}")
	public User getUserByGamerIdentifier(@PathVariable String gamerIdentifier) {
		return userService.getUserByGamerIdentifier(gamerIdentifier);
	}
}
