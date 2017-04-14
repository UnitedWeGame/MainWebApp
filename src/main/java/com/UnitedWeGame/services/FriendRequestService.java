package com.UnitedWeGame.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.FriendRequest;
import com.UnitedWeGame.repos.FriendRequestRepository;

@Service
public class FriendRequestService {
	
	@Autowired
	FriendRequestRepository requestRepo;
	
	public List<FriendRequest> allRequests() {
		return (List<FriendRequest>) requestRepo.findAll();
	}
	
	public FriendRequest findById(Long id) {
		return requestRepo.findOne(id);
	}
	
	public void saveRequest(FriendRequest request) {
		requestRepo.save(request);
	}
	
	public void removeRequest(FriendRequest request) {
		requestRepo.delete(request);
	}
}
