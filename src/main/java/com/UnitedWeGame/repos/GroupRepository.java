package com.UnitedWeGame.repos;

import com.UnitedWeGame.models.ActivityPost;
import com.UnitedWeGame.models.Group;
import com.UnitedWeGame.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

/**
 * Author: cweeter
 * Date: 11/2/17
 */
public interface GroupRepository extends CrudRepository<Group, Long> {
}
