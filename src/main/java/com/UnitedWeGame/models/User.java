package com.UnitedWeGame.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author logangster
 *
 */
@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@NotEmpty
	@Size(min=5, max=20)
	@Pattern(regexp = "^[\\p{Alnum}]{1,32}$", message = "username should contain letters and numbers only")
	@Column(unique = true, nullable = false)
	private String username;
	@NotEmpty
	@Email(message = "email should be valid")
	private String email;
	@NotEmpty
	private String password;
	@OneToOne
	private Profile profile;
	@Pattern(regexp = "^$|^[0-9]{10}$", message = "phone number must be in the format of 8881234444")
	private String phoneNum;
	private Date lastActivity;
	private String imageUrl;
	
	@ElementCollection(fetch = FetchType.EAGER, targetClass=Long.class)
	private Set<Long> groups = new HashSet<>();

	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<Role>();

	@JsonIgnore
	@OneToMany
	private Set<ActivityPost> activityFeed = new HashSet<ActivityPost>();

	@JsonIgnore
	@OneToMany(cascade = {CascadeType.ALL})
	private List<GameRating> gameRatings = new ArrayList<GameRating>();

	@Transient
	private List<Game> visibleGames = new ArrayList<Game>();
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "user_library", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "game_id"))
	private Set<Game> games = new HashSet<Game>();

	@OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL })
	@JoinColumn(name = "user_id", nullable = false)
	private Set<GamerIdentifier> gamerIdentifiers = new HashSet<GamerIdentifier>();

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id != other.id)
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@JsonIgnore
	@ManyToMany
	private Set<User> friends;

	@JsonIgnore
	@Transient
	private String passwordConfirm;

	public Long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordConfirm() {
		return passwordConfirm;
	}

	public void setPasswordConfirm(String passwordConfirm) {
		this.passwordConfirm = passwordConfirm;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public List<Game> getGames() {
		return visibleGames;
	}
	
	public void setGames(List<Game> games) {
		this.visibleGames = games;
	}
	
	@JsonIgnore
	public Set<Game> getHiddenGames() {
		return games;
	}

	@JsonIgnore
	public void setHiddenGames(Set<Game> games) {
		this.games = games;
	}

	public Set<User> getFriends() {
		return friends;
	}

	public void setFriends(Set<User> friends) {
		this.friends = friends;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public Date getLastActivity() {
		return lastActivity;
	}

	public void setLastActivity(Date lastActivity) {
		this.lastActivity = lastActivity;
	}

	public Set<GamerIdentifier> getGamerIdentifiers() {
		return gamerIdentifiers;
	}

	public void setGamerIdentifiers(Set<GamerIdentifier> gamerIdentifiers) {
		this.gamerIdentifiers = gamerIdentifiers;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String pictureUrl) {
		this.imageUrl = pictureUrl;
	}

	public Set<ActivityPost> getActivityFeed() {
		return activityFeed;
	}

	public void setActivityFeed(Set<ActivityPost> activityFeed) {
		this.activityFeed = activityFeed;
	}

	public List<GameRating> getGameRatings() {
		return gameRatings;
	}

	public void setGameRatings(List<GameRating> gameRatings) {
		this.gameRatings = gameRatings;
	}

	public Set<Long> getGroups() {

		if(groups == null)
			return new HashSet<>();

		return groups;
	}

	public void setGroups(Set<Long> groups) {
		this.groups = groups;
	}
	
	public void clearGamerIdentifiers() {
		this.gamerIdentifiers.clear();
	}
}
