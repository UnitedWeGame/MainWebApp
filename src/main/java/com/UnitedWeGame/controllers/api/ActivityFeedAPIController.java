package com.UnitedWeGame.controllers.api;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UnitedWeGame.models.ActivityFeed;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.ActivityFeedService;
import com.UnitedWeGame.services.UserService;

@RestController
@RequestMapping("/api/activityFeed")
public class ActivityFeedAPIController {
	
	@Autowired
	ActivityFeedService activityFeedService;
	
	@Autowired
	UserService userService;

	@RequestMapping(value="", method=RequestMethod.POST)
	public ActivityFeed createActivity(@RequestBody ActivityFeed activity) {
		activity = activityFeedService.createActivity(activity);
		User loggedInUser = userService.getLoggedInUser();
		Set<ActivityFeed> activityFeedItems = loggedInUser.getActivityFeed();
		activityFeedItems.add(activity);
		userService.saveUser(loggedInUser);
		return activity;
	}
}
