package com.UnitedWeGame.services;

import com.UnitedWeGame.models.GroupPost;
import com.UnitedWeGame.repos.GroupPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Author: cweeter
 * Date: 11/2/17
 */
@Service
public class GroupPostService {

    @Autowired
    GroupPostRepository groupRepo;

    @Autowired
    UserService userService;

    public void createGroupPost(GroupPost groupPost)
    {
        groupRepo.save(groupPost);
    }

}
