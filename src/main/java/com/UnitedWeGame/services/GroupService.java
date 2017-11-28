package com.UnitedWeGame.services;

import com.UnitedWeGame.models.Group;
import com.UnitedWeGame.repos.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Author: cweeter
 * Date: 11/2/17
 */
@Service
public class GroupService {

    @Autowired
    GroupRepository groupRepo;

    @Autowired
    UserService userService;

    public void saveGroup(Group group)
    {
        groupRepo.save(group);
    }

    public Group getGroupById(Long groupId) { return groupRepo.findOne(groupId);}
}
