package com.UnitedWeGame.models;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="Groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String groupName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String coverPhoto;

    private Long adminUser;

    @ElementCollection(targetClass=Long.class)
    private List<Long> members = new ArrayList<>();

    @OneToMany
    private List<GroupPost> groupPost = new ArrayList<>();


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCoverPhoto() {
        return coverPhoto;
    }

    public void setCoverPhoto(String coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public List<Long> getMembers() {
        if(members == null)
            return new ArrayList<>();

        return members;
    }

    public void setMembers(List<Long> members) {
        this.members = members;
    }

    public List<GroupPost> getGroupPost() {
        return groupPost;
    }

    public void setGroupPost(List<GroupPost> groupPost) {
        this.groupPost = groupPost;
    }

    public Long getAdminUser() {
        return adminUser;
    }

    public void setAdminUser(Long adminUser) {
        this.adminUser = adminUser;
    }
}
