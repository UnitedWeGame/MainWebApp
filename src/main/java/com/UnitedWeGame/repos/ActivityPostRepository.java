package com.UnitedWeGame.repos;

import java.util.List;
import java.util.Set;

import org.springframework.data.repository.CrudRepository;

import com.UnitedWeGame.models.ActivityPost;
import com.UnitedWeGame.models.User;

public interface ActivityPostRepository extends CrudRepository<ActivityPost, Long> {
	public List<ActivityPost> findByUserInOrderByCreatedDateDesc(Set<User> users);
	public List<ActivityPost> findByUser(User user);
}
