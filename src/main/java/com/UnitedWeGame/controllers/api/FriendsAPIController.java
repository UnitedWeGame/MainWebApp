package com.UnitedWeGame.controllers.api;

import java.util.List;
import java.util.Set;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/friends")
public class FriendsAPIController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@RequestMapping("")
	public Set<User> getFriends() {
		User user = userService.getLoggedInUser();
		return user.getFriends();
	}
	
	@RequestMapping("/online")
	public List<User> onlineFriends() {
		return userService.getOnlineFriends();
	}
}
