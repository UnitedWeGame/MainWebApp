package com.UnitedWeGame.models;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class PlatformIdentifier {
	
	@OneToOne
	private User user;
	@OneToMany
	private Platform platform;
}
