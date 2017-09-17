package com.UnitedWeGame.controllers.api;

import java.util.List;
import java.util.Set;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.NewUsers;
import com.UnitedWeGame.models.OnlineFeed;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.NewUsersService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/friends")
public class FriendsAPIController {

	@Autowired
	UserService userService;

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	NewUsersService newUsersService;

	@RequestMapping("")
	public Set<User> getFriends() {
		User user = userService.getLoggedInUser();
		return user.getFriends();
	}

	@RequestMapping("/online")
	public List<User> onlineFriends() {
		return userService.getOnlineFriends();
	}

	@RequestMapping("onlineFeed")
	public List<OnlineFeed> getOnlineFeed() {
		if (!userService.getOldUserFeed().isEmpty()) {
			NewUsers newUser = new NewUsers();
			newUser.setUserId(userService.getLoggedInUser().getId());
			newUsersService.saveNewUser(newUser);
		}
		return userService.getUserFeed();
	}
	
	@RequestMapping("/{friendId}/removeFriend")
	public String removeFriend(@PathVariable long friendId) {
		User friend = userService.findById(friendId);
		User loggedInUser = userService.getLoggedInUser();
		// Yes I know, not the best name.
		Set<User> friendFriends = friend.getFriends();
		Set<User> userFriends = loggedInUser.getFriends();
		
		try {
			friendFriends.remove(loggedInUser);
			userFriends.remove(friend);
			friend.setFriends(friendFriends);
			loggedInUser.setFriends(userFriends);
			userService.saveUser(friend);
			userService.saveUser(loggedInUser);
			return "Friend removed";
		} catch (Exception e) {
			return "Unable to remove friend due to system issues";
		}
	}
}
