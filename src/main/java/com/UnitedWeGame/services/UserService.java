package com.UnitedWeGame.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.StatelessSession;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.Subqueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.UnitedWeGame.models.Game;
import com.UnitedWeGame.models.OnlineFeed;
import com.UnitedWeGame.models.Platform;
import com.UnitedWeGame.models.Profile;
import com.UnitedWeGame.models.Role;
import com.UnitedWeGame.models.User;
import com.UnitedWeGame.repos.ProfileRepository;
import com.UnitedWeGame.repos.RoleRepository;
import com.UnitedWeGame.repos.UserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	UserRepository userRepo;
	@Autowired
	RoleRepository roleRepo;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	ProfileRepository profileRepo;
	@Autowired
	SessionFactory sessionFactory;
	
	public List<User> allUsers() {
		return (List<User>) userRepo.findAll();
	}
	
	public User getLoggedInUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) loadUserByUsername(auth.getName());
		return userDetails.getUser();
	}
	
	public List<User> findByUsernameContaining(String username) {
		return userRepo.findByUsernameContaining(username);
	}
	
	public void createUser(User user) {
		// This is VERY temporary, only doing this because I'm currently using H2 in memory database
		Role role = new Role("USER");
		roleRepo.save(role);
		Set<Role> roles = user.getRoles();
		roles.add(role);
		// Assign every user with a default blank profile
		Profile profile = new Profile();
		profileRepo.save(profile);
		user.setProfile(profile);
		user.setRoles(roles);
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepo.save(user);
	}
	
	public void saveUser(User user) {
		userRepo.save(user);
	}

	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}
	
	public User findById(Long id) {
		return userRepo.findOne(id);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUsername(username);
		
		if (user == null) {
			throw new UsernameNotFoundException(username);
		}
		
		return new UserDetailsImpl(user);
	}
	
	public List<User> gameOwnedByFriends(Long gameId) {
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		Long userId = getLoggedInUser().getId();
		DetachedCriteria subquery = DetachedCriteria.forClass(User.class, "users")
				.createAlias("users.friends", "friends")
				.add(Restrictions.eq("users.id", userId))
				.setProjection(Projections.property("friends.id"));
		Criteria query = session.createCriteria(User.class, "users2")
				.createAlias("users2.games", "gamesAlias")
				.add(Restrictions.eq("gamesAlias.id", gameId))
				.add(Subqueries.propertyIn("users2.id", subquery));
		List<User> users = query.list();
		session.getTransaction().commit();
		session.close();
		return users;
	}
	
	public List<Game> gamesOwnedByPlatform(String platformTitle) {
		StatelessSession session = sessionFactory.openStatelessSession();
		session.beginTransaction();
		Long userId = getLoggedInUser().getId();
		Criteria query = session.createCriteria(Game.class, "game")
				.createAlias("game.users", "userAlias")
				.add(Restrictions.eq("game.platform.title", platformTitle))
				.add(Restrictions.eq("userAlias.id", userId))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		List<Game> games =  query.list();
		session.getTransaction().commit();
		session.close();
		return games;
	}
	
	public List<User> gamesOwnedByFriends() {
		StatelessSession session = sessionFactory.openStatelessSession();
		session.beginTransaction();
		Long userId = getLoggedInUser().getId();
		DetachedCriteria subquery = DetachedCriteria.forClass(User.class, "users")
				.createAlias("users.friends", "friends")
				.add(Restrictions.eq("users.id", userId))
				.setProjection(Projections.property("friends.id"));
		Criteria query = session.createCriteria(Game.class, "game")
				.createAlias("game.users", "userAlias")
				.add(Subqueries.propertyIn("userAlias.id", subquery))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		List<User> users = query.list();
		session.getTransaction().commit();
		session.close();
		return users;
	}
	
	@Transactional
	public List<User> getOnlineFriends() {
		StatelessSession session;
		session = sessionFactory.openStatelessSession();
		session.beginTransaction();
		Long userId = getLoggedInUser().getId();
		Date currentDate = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(currentDate);
		cal.add(Calendar.MINUTE, -1);
		DetachedCriteria subquery = DetachedCriteria.forClass(User.class, "users")
				.createAlias("users.friends", "friends")
				.add(Restrictions.eq("users.id", userId))
				.add(Restrictions.gt("friends.lastActivity", cal.getTime()))
				.setProjection(Projections.property("friends.id"));
		Criteria query = session.createCriteria(User.class, "users2")
				.add(Subqueries.propertyIn("users2.id", subquery))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		List<User> users = query.list();
		//session.flush();
		session.getTransaction().commit();
		session.close();
		return users;
	}
	
	public User getUserByGamerIdentifier(String gamerIdentifier) {
		StatelessSession session = sessionFactory.openStatelessSession();
		session.beginTransaction();
		Criteria query = session.createCriteria(User.class, "users")
				.createAlias("users.gamerIdentifiers", "gamerTags")
				.add(Restrictions.eq("gamerTags.identifier", gamerIdentifier));
		User user = (User) query.uniqueResult();
		session.getTransaction().commit();
		session.close();
		return user;
	}
	
	public List<OnlineFeed> getUserFeed() {
		StatelessSession session = sessionFactory.openStatelessSession();
		session.beginTransaction();
		Long userId = getLoggedInUser().getId();
		Date currentDate = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(currentDate);
		cal.add(Calendar.HOUR, -7);
		Criteria query = session.createCriteria(OnlineFeed.class, "onlineFeed")
				.createAlias("onlineFeed.user", "users")
				.add(Restrictions.eq("users.id", userId))
				.add(Restrictions.gt("onlineFeed.lastActivity", cal.getTime()))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		List<OnlineFeed> feed = query.list();
		List<OnlineFeed> feedWithoutDup = new ArrayList<OnlineFeed>();
		HashSet<Long> ids = new HashSet<Long>();
		for (OnlineFeed item : feed) {
			if (!ids.contains(item.getId())) {
				feedWithoutDup.add(item);
			}
			ids.add(item.getId());
		}
		session.getTransaction().commit();
		session.close();
		return feedWithoutDup;
	}
	
	public List<OnlineFeed> getOldUserFeed() {
		StatelessSession session = sessionFactory.openStatelessSession();
		session.beginTransaction();
		Long userId = getLoggedInUser().getId();
		Date currentDate = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(currentDate);
		cal.add(Calendar.HOUR, -7);
		Criteria query = session.createCriteria(OnlineFeed.class, "onlineFeed")
				.createAlias("onlineFeed.user", "users")
				.add(Restrictions.eq("users.id", userId))
				.add(Restrictions.lt("onlineFeed.lastActivity", cal.getTime()))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		List<OnlineFeed> feed = query.list();
		session.getTransaction().commit();
		session.close();
		return feed;
	}
	
	public boolean isFriend(Long userId) {
		for (User user : getLoggedInUser().getFriends()) {
			if (user.getId().equals(userId))
				return true;
		}
		return false;
	}
}
