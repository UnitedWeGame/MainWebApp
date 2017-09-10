package com.UnitedWeGame.models;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		User user = (User) target;

		if (!user.getPassword().equals(user.getPasswordConfirm())) {
			errors.rejectValue("password", "error.user", "Passwords don't match");
		}
	}

}
