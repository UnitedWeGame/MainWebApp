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
	public ActivityPost createActivity(@RequestBody String json) {
		ActivityPost activity = new ActivityPost();
		try {
			JSONObject jsonObj = new JSONObject(json);
			activity.setContent(jsonObj.getString("content"));
		} catch (JSONException e) {
			e.printStackTrace();
		}
		activity.setUser(userService.getLoggedInUser());
		activityPostService.createActivity(activity);
		return activity;
	}

	@RequestMapping("/friends")
	public List<ActivityPost> fetchFriendsFeed() {
		return activityPostService.findAllActiviesByFriends(userService.getLoggedInUser());
		// Not sure if we want to return just user name, it's more work when we
		// can just return full user
		// List<Map<Object, Object>> jsonResp = new ArrayList<>();
		/*
		 * for (ActivityPost activity : activityFeed) { Map<Object, Object>
		 * activityMap = new HashMap<>(); activityMap.put("userId",
		 * activity.getUser().getId()); activityMap.put("username",
		 * activity.getUser().getUsername()); activityMap.put("content",
		 * activity.getContent()); activityMap.put("created_date",
		 * activity.getCreatedDate()); jsonResp.add(activityMap); } return
		 * jsonResp;
		 */
	}

	@RequestMapping("/{userId}")
	public List<ActivityPost> getFeedForUser(@PathVariable long userId) {
		if (userService.isFriend(userId) || userService.getLoggedInUser().getId().equals(userId)) {
			return activityPostService.findByUser(userId);
		}
		return new ArrayList<ActivityPost>();
	}
}
