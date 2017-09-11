package com.UnitedWeGame.models;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;
import org.springframework.beans.factory.annotation.Autowired;

import com.UnitedWeGame.services.GameRatingService;
import com.UnitedWeGame.services.UserService;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String title;
	private String imageUrl;
	@ManyToOne
	private Platform platform;
	@Column(columnDefinition = "TEXT")
	private String summary;
	@Column
	@Type(type = "date")
	private Date firstReleaseDate;
	@Column(nullable = true)
	private Float totalRating;
	@Column(nullable = true)
	private Integer totalRatingCount;
	@OneToMany(mappedBy = "game", fetch = FetchType.EAGER)
	private Set<Screenshot> screenshots;
	@JsonIgnore
	@OneToMany(cascade= {CascadeType.ALL})
	private List<GameRating> ratings;
	@Transient
	@JsonSerialize
	@JsonDeserialize
	private GameRating userRating;
	@Transient
	@JsonSerialize
	@JsonDeserialize
	private List<GameRating> friendsRatings;
	@JsonBackReference
	@ManyToMany(mappedBy = "games")
	private Set<User> users;


	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Platform getPlatform() {
		return platform;
	}

	public void setPlatform(Platform platform) {
		this.platform = platform;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String pictureUrl) {
		this.imageUrl = pictureUrl;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public Date getFirstReleaseDate() {
		return firstReleaseDate;
	}

	public void setFirstReleaseDate(Date firstReleaseDate) {
		this.firstReleaseDate = firstReleaseDate;
	}

	public Float getTotalRating() {
		return totalRating;
	}

	public void setTotalRating(Float totalRating) {
		this.totalRating = totalRating;
	}

	public Integer getTotalRatingCount() {
		return totalRatingCount;
	}

	public void setTotalRatingCount(Integer totalRatingCount) {
		this.totalRatingCount = totalRatingCount;
	}

	public Set<Screenshot> getScreenshots() {
		return screenshots;
	}

	public void setScreenshots(Set<Screenshot> screenshots) {
		this.screenshots = screenshots;
	}

	public List<GameRating> getRatings() {
		return ratings;
	}

	public void setRatings(List<GameRating> ratings) {
		this.ratings = ratings;
	}
	
	public GameRating getUserRating() {
		return userRating;
	}
	
	public void setUserRating(GameRating gameRating) {
		this.userRating = gameRating;
	}
	
	public List<GameRating> getFriendsRatings() {
		return friendsRatings;
	}

	public void setFriendsRatings(List<GameRating> friendsRatings) {
		this.friendsRatings = friendsRatings;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((platform == null) ? 0 : platform.hashCode());
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
		Game other = (Game) obj;
		if (id != other.id)
			return false;
		if (platform == null) {
			if (other.platform != null)
				return false;
		} else if (!platform.equals(other.platform))
			return false;
		return true;
	}
}
