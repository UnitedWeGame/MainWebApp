package com.UnitedWeGame.controllers.api;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.FriendRequest;
import com.UnitedWeGame.models.Profile;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.FriendRequestService;
import com.UnitedWeGame.services.ProfileService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api")
public class UsersAPIController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	ProfileService profileService;
	
	@Autowired
	FriendRequestService requestService;
	
	@RequestMapping("/users")
	public List<User> index(Model model) {
		return userService.allUsers();
	}
	
	@RequestMapping("/users/me")
	public User loggedInUser() {
		return userService.findById(userService.getLoggedInUser().getId());
	}
	
	@RequestMapping("/users/{userId}")
	public User getProfile(@PathVariable Long userId) {
		return userService.findById(userId);
	}
	
	@RequestMapping("/users/search/{username}")
	public List<User> searchForUser(@PathVariable String username) {
		return userService.findByUsernameContaining(username);
	}
	
	@RequestMapping(value="/users", method=RequestMethod.PUT)
	public Profile updateProfile(@RequestBody Profile profile) {
		Profile oldProfile = profileService.getLoggedInProfile();
		oldProfile.updateAttributes(profile);
		profileService.saveProfile(oldProfile);
		return oldProfile;
	}
	
	@RequestMapping("/users/updateTimestamp")
	public void updateTimeStamp() {
		User user = userService.getLoggedInUser();
		user.setLastActivity(new Date());
		userService.saveUser(user);
	}
	
	@RequestMapping("/users/{friendId}/requestFriend")
	public FriendRequest createRequest(@PathVariable Long friendId) {
		User user = userService.getLoggedInUser();
		System.out.println(user.getId());
		//Do a call to ensure this is a user in the system
		User friend = userService.findById(friendId);
		FriendRequest request = new FriendRequest();
		request.setOwner(user.getId());
		request.setFriend(friend.getId());
		requestService.saveRequest(request);
		return request;
	}
	
	@RequestMapping("/requests/owned")
	public Set<FriendRequest> listAllRequests() {
		User user = userService.getLoggedInUser();
		return requestService.allRequestsOwned(user.getId());
	}
	
	@RequestMapping("/requests/pending")
	public Set<FriendRequest> listAllRequestsForMe() {
		User user = userService.getLoggedInUser();
		return requestService.allRequestsToAccept(user.getId());
	}
	
	@RequestMapping("/requests/{requestId}/acceptRequest")
	public String acceptRequest(@PathVariable Long requestId) {
		FriendRequest request = requestService.findById(requestId);
		User owner = userService.findById(request.getOwner());
		User friend = userService.findById(request.getFriend());
		Set<User> ownerFriends = owner.getFriends();
		// Silly name I know..
		Set<User> friendFriends = friend.getFriends();
		ownerFriends.add(friend);
		friendFriends.add(owner);
		owner.setFriends(ownerFriends);
		friend.setFriends(friendFriends);
		userService.saveUser(owner);
		userService.saveUser(friend);
		requestService.removeRequest(request);
		return "Friendship accepted.";
	}
	
	@RequestMapping("/requests/{requestId}/rejectRequest")
	public String rejectRequest(@PathVariable Long requestId) {
		FriendRequest request = requestService.findById(requestId);
		requestService.removeRequest(request);
		return "Friendship denied.";
	}
	
	
}
