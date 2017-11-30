package com.UnitedWeGame.controllers.api;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.ActivityPost;
import com.UnitedWeGame.services.ActivityPostService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/activityFeed")
public class ActivityFeedAPIController {

	@Autowired
	ActivityPostService activityPostService;

	@Autowired
	UserService userService;

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ActivityPost createActivity(@RequestBody ActivityPost activityPost) {
		if(!activityPost.getContent().trim().isEmpty()) {
			activityPost.setUser(userService.getLoggedInUser());
			activityPostService.createActivity(activityPost);
			return activityPost;
		}
		return new ActivityPost();
	}

	@RequestMapping("/friends")
	public List<ActivityPost> fetchFriendsFeed() {
		return activityPostService.findAllActiviesByFriends(userService.getLoggedInUser());
	}
	
	@RequestMapping("/")
	public List<ActivityPost> fetchFeed() {
		return activityPostService.findAllActivityFeed(userService.getLoggedInUser());
	}

	@RequestMapping("/{userId}")
	public List<ActivityPost> getFeedForUser(@PathVariable long userId) {
		if (userService.isFriend(userId) || userService.getLoggedInUser().getId().equals(userId)) {
			return activityPostService.findByUser(userId);
		}
		return new ArrayList<ActivityPost>();
	}
}
