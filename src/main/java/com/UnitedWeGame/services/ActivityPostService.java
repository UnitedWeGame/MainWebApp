package com.UnitedWeGame.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.ActivityPost;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.repos.ActivityPostRepository;

@Service
public class ActivityPostService {
	
	@Autowired
	ActivityPostRepository activityFeedRepo;
	
	@Autowired
	UserService userService;
	
	public ActivityPost findById(Long id) {
		return activityFeedRepo.findOne(id);
	}
	
	public List<ActivityPost> findAllActiviesByFriends(User user) {
		return activityFeedRepo.findByUserInOrderByCreatedDateDesc(user.getFriends());
	}
	
	public ActivityPost createActivity(ActivityPost activity) {
		activity.setCreatedDate(new Date());
		activityFeedRepo.save(activity);
		return activity;
	}
	
	public List<ActivityPost> findByUser(Long userId) {
		return activityFeedRepo.findByUser(userService.findById(userId));
	}
	
	public String deleteActivity(ActivityPost activity) {
		try {
			activityFeedRepo.delete(activity);
			return "Deleted activity";
		} catch (Exception e) {
			return "Unable to delete activity";
		}
	}
}
