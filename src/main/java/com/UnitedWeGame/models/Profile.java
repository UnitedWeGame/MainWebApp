package com.UnitedWeGame.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Profile {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String aboutMe;
	
	//Used for copying one profile to another. Could probably use some cloning, will look into later..
	public void updateAttributes(Profile profile) {
		this.aboutMe = profile.getAboutMe();
	}
	public String getAboutMe() {
		return aboutMe;
	}
	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}
}
