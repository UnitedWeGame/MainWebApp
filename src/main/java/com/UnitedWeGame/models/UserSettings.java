package com.UnitedWeGame.models;

public class UserSettings {
	
	private boolean smsEnabled;
	private String email;
	private String imageUrl;
	private String coverPhoto;
	private String steamId;
	private String xboxGamertag;
	private String psnGamertag;
	
	public boolean isSmsEnabled() {
		return smsEnabled;
	}
	
	public void setSmsEnabled(boolean smsEnabled) {
		this.smsEnabled = smsEnabled;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	public String getCoverPhoto() {
		return coverPhoto;
	}
	
	public void setCoverPhoto(String coverPhoto) {
		this.coverPhoto = coverPhoto;
	}
	
	public String getSteamId() {
		return steamId;
	}
	
	public void setSteamId(String steamId) {
		this.steamId = steamId;
	}
	
	public String getXboxGamertag() {
		return xboxGamertag;
	}
	
	public void setXboxGamertag(String xboxGamertag) {
		this.xboxGamertag = xboxGamertag;
	}
	public String getPsnGamertag() {
		return psnGamertag;
	}
	
	public void setPsnGamertag(String psnGamertag) {
		this.psnGamertag = psnGamertag;
	}
}
