package com.UnitedWeGame.controllers.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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

	@RequestMapping(value="", method=RequestMethod.POST)
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
	public Map<Object, Object> fetchFriendsFeed() {
		Map<Object, Object> jsonResp = new HashMap<>();
		List<ActivityPost> activityFeed = activityPostService.findAllActiviesByFriends(userService.getLoggedInUser());
		for (ActivityPost activity : activityFeed) {
			jsonResp.put("userId", activity.getUser().getId());
			jsonResp.put("username", activity.getUser().getUsername());
			jsonResp.put("content", activity.getContent());
		}
		return jsonResp;
	}
}
