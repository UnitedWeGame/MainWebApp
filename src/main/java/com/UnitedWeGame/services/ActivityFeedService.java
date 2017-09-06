package com.UnitedWeGame.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.UnitedWeGame.models.ActivityFeed;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.repos.ActivityFeedRepository;

public class ActivityFeedService {
	@Autowired
	ActivityFeedRepository activityFeedRepo;
	
	public ActivityFeed findById(Long id) {
		return activityFeedRepo.findOne(id);
	}
	
	public List<ActivityFeed> findAllActiviesByFriends(User user) {
		return activityFeedRepo.findByUserInOrderByCreateddateDesc(user.getFriends());
	}
	
	public ActivityFeed createActivity(ActivityFeed activity) {
		activity.setCreatedDate(new Date());
		activityFeedRepo.save(activity);
		return activity;
	}
	
	public String deleteActivity(ActivityFeed activity) {
		try {
			activityFeedRepo.delete(activity);
			return "Deleted activity";
		} catch (Exception e) {
			return "Unable to delete activity";
		}
	}
}
