package com.UnitedWeGame.repos;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.UnitedWeGame.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
	public User findByUsername(String username);
	public List<User> findByUsernameContaining(String username);
}
