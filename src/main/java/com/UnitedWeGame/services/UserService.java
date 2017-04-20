package com.UnitedWeGame.services;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
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
		Session session;
		try {
		    session = sessionFactory.getCurrentSession();
		} catch (HibernateException e) {
		    session = sessionFactory.openSession();
		}
		Long userId = getLoggedInUser().getId();
		DetachedCriteria subquery = DetachedCriteria.forClass(User.class, "users")
				.createAlias("users.friends", "friends")
				.add(Restrictions.eq("users.id", userId))
				.setProjection(Projections.property("friends.id"));
		Criteria query = session.createCriteria(User.class, "users2")
				.createAlias("users2.games", "gamesAlias")
				.add(Restrictions.eq("gamesAlias.id", gameId))
				.add(Subqueries.propertyIn("users2.id", subquery));
		return query.list();
	}
	
	public List<Game> gamesOwnedByPlatform(String platformTitle) {
		Session session;
		try {
		    session = sessionFactory.getCurrentSession();
		} catch (HibernateException e) {
		    session = sessionFactory.openSession();
		}
		Long userId = getLoggedInUser().getId();
		Criteria query = session.createCriteria(Game.class, "game")
				.createAlias("game.users", "userAlias")
				.add(Restrictions.eq("game.platform.title", platformTitle))
				.add(Restrictions.eq("userAlias.id", userId))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		return query.list();
	}
	
	public List<User> gamesOwnedByFriends() {
		Session session;
		try {
		    session = sessionFactory.getCurrentSession();
		} catch (HibernateException e) {
		    session = sessionFactory.openSession();
		}
		Long userId = getLoggedInUser().getId();
		DetachedCriteria subquery = DetachedCriteria.forClass(User.class, "users")
				.createAlias("users.friends", "friends")
				.add(Restrictions.eq("users.id", userId))
				.setProjection(Projections.property("friends.id"));
		Criteria query = session.createCriteria(Game.class, "game")
				.createAlias("game.users", "userAlias")
				.add(Subqueries.propertyIn("userAlias.id", subquery))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		return query.list();
	}
	
	@Transactional
	public List<User> getOnlineFriends() {
		Session session;
		try {
		    session = sessionFactory.getCurrentSession();
		} catch (HibernateException e) {
		    session = sessionFactory.openSession();
		}
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
		session.flush();
		session.getTransaction().commit();
		return users;
	}
	
	public User getUserByGamerIdentifier(String gamerIdentifier) {
		Session session;
		try {
		    session = sessionFactory.getCurrentSession();
		} catch (HibernateException e) {
		    session = sessionFactory.openSession();
		}
		Criteria query = session.createCriteria(User.class, "users")
				.createAlias("users.gamerIdentifiers", "gamerTags")
				.add(Restrictions.eq("gamerTags.identifier", gamerIdentifier));
		return (User) query.uniqueResult();
	}
	
	public List<OnlineFeed> getUserFeed() {
		Session session;
		try {
		    session = sessionFactory.getCurrentSession();
		} catch (HibernateException e) {
		    session = sessionFactory.openSession();
		}
		Long userId = getLoggedInUser().getId();
		Date currentDate = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(currentDate);
		cal.add(Calendar.HOUR, -1);
		Criteria query = session.createCriteria(OnlineFeed.class, "onlineFeed")
				.add(Restrictions.eq("onlineFeed.user.id", userId))
				.add(Restrictions.gt("onlineFeed.lastActivity", cal.getTime()))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		return query.list();
	}
}
