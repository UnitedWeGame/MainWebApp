package com.UnitedWeGame.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Profile {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String aboutMe;
	private String coverPhoto;
	private boolean smsEnabled;

	// Used for copying one profile to another. Could probably use some cloning,
	// will look into later..
	public void updateAttributes(Profile profile) {
		this.aboutMe = profile.getAboutMe();
		this.coverPhoto = profile.getCoverPhoto();
	}

	public String getAboutMe() {
		return aboutMe;
	}

	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}

	public String getCoverPhoto() {
		return coverPhoto;
	}

	public void setCoverPhoto(String coverPhoto) {
		this.coverPhoto = coverPhoto;
	}

	public boolean isSmsEnabled() {
		return smsEnabled;
	}

	public void setSmsEnabled(boolean smsEnabled) {
		this.smsEnabled = smsEnabled;
	}
}
