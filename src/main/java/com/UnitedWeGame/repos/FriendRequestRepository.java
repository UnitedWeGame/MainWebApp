package com.UnitedWeGame.repos;

import java.util.Set;

import org.springframework.data.repository.CrudRepository;

import com.UnitedWeGame.models.FriendRequest;

public interface FriendRequestRepository extends CrudRepository<FriendRequest, Long> {
	public Set<FriendRequest> findByOwner(Long ownerId);
	public Set<FriendRequest> findByFriend(Long friendId);
}
