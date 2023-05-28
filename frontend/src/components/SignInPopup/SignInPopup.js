import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../utils/Validation';

function SignInPopup(props) {
  const { errors, handleChange, isValid, resetForm, values } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(values);
    resetForm();
  };

  return (
    <PopupWithForm
      title="Sign in"
      name="signin"
      buttonText="Sign in"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onLinkClick={props.onLinkClick}
      disabledButton={!isValid}
    >
      <label className="form__label">
        Email
        <input
          required
          id="email-signin"
          name="email"
          value={values.email || ''}
          type="email"
          onChange={(e) => handleChange(e)}
          className="form__input"
          placeholder="Enter email"
        />
        <span
          className={`form__input-error name-error ${
            errors.email && 'form__input-error_visible'
          }`}
        >
          {errors.email}
        </span>
      </label>
      <label className="form__label">
        Password
        <input
          required
          id="password-signin"
          name="password"
          type="password"
          value={values.password || ''}
          onChange={(e) => handleChange(e)}
          minLength="8"
          className="form__input"
          placeholder="Enter password"
        />
        <span
          className={`form__input-error password-error ${
            errors.password && 'form__input-error_visible'
          }`}
        >
          {errors.password}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default SignInPopup;
