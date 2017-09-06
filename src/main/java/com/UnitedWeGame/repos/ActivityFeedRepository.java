package com.UnitedWeGame.repos;

import java.util.List;
import java.util.Set;

import org.springframework.data.repository.CrudRepository;

import com.UnitedWeGame.models.ActivityFeed;
import com.UnitedWeGame.models.User;

public interface ActivityFeedRepository extends CrudRepository<ActivityFeed, Long> {
	public List<ActivityFeed> findByUserInOrderByCreatedDateDesc(Set<User> users);
}
