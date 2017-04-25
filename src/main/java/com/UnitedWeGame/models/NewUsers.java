package com.UnitedWeGame.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class NewUsers {
	@Id
	private long userId;

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
}
