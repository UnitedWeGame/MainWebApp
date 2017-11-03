package com.UnitedWeGame.controllers.api;

import com.UnitedWeGame.models.ActivityPost;
import com.UnitedWeGame.models.Group;
import com.UnitedWeGame.models.GroupPost;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.services.GroupPostService;
import com.UnitedWeGame.services.GroupService;
import com.UnitedWeGame.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

/**
 * Author: cweeter
 * Date: 11/2/17
 */

@RestController
@RequestMapping("/api/group")
public class GroupAPIController {

    @Autowired
    UserService userService;

    @Autowired
    GroupService groupService;

    @Autowired
    GroupPostService groupPostService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Group createGroup(@RequestBody Group group) {
        Set<Long> members = group.getMembers();
        User currentUser = userService.getLoggedInUser();
        members.add(currentUser.getId());
        group.setMembers(members);
        group.setAdminUser(currentUser.getId());
        Set<Long> groups = currentUser.getGroups();

        groupService.createGroup(group);

        groups.add(group.getId());
        currentUser.setGroups(groups);
        userService.saveUser(currentUser);

        return group;
    }

    @RequestMapping(value = "/{groupId}/createPost", method = RequestMethod.POST)
    public GroupPost createPost(@RequestBody GroupPost groupPost, @PathVariable Long groupId) {
        groupPost.setUser(userService.getLoggedInUser());
        groupPost.setGroupId(groupId);
        groupPostService.createGroupPost(groupPost);

        Group group = groupService.getGroupById(groupId);
        List<GroupPost> groupPosts = group.getGroupPost();
        groupPosts.add(groupPost);

        group.setGroupPost(groupPosts);
        groupService.createGroup(group);
        return groupPost;
    }

    @RequestMapping("/{groupId}")
    public Group getGroup(@PathVariable Long groupId) {
        return groupService.getGroupById(groupId);
    }

    @RequestMapping("/{groupId}/addMember/{userId}")
    public Group addMemberToGroup(@PathVariable Long groupId, @PathVariable Long userId)
    {
        Group group = groupService.getGroupById(groupId);
        Set<Long> members = group.getMembers();
        members.add(userId);
        group.setMembers(members);

        User user = userService.findById(userId);
        Set<Long> groups = user.getGroups();
        groups.add(groupId);
        user.setGroups(groups);

        groupService.createGroup(group);

        userService.saveUser(user);

        return group;
    }

    @RequestMapping("/{groupId}/addMember")
    public Group addCurrentUserToGroup(@PathVariable Long groupId)
    {
        Group group = groupService.getGroupById(groupId);
        Set<Long> members = group.getMembers();
        members.add(userService.getLoggedInUser().getId());
        group.setMembers(members);

        User user = userService.getLoggedInUser();
        Set<Long> groups = user.getGroups();
        groups.add(groupId);
        user.setGroups(groups);

        groupService.createGroup(group);

        userService.saveUser(user);

        return group;
    }

}
