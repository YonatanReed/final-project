import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../utils/Validation';

function SignUpPopup(props) {
  const { errors, handleChange, isValid, resetForm, values } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(values);
    if (props.showError) {
      console.log(props.showError);
      resetForm();
    }
  };

  return (
    <PopupWithForm
      title="Sign up"
      name="signup"
      buttonText="Sign up"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onLinkClick={props.onLinkClick}
      disabledButton={!isValid}
      showError={props.showError}
    >
      <label className="form__label">
        Email
        <input
          required
          id="email"
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
          id="password"
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
      <label className="form__label">
        Username
        <input
          required
          id="username"
          name="username"
          type="text"
          value={values.username || ''}
          onChange={(e) => handleChange(e)}
          minLength="2"
          maxLength="30"
          className="form__input"
          placeholder="Enter your username"
        />
        <span
          className={`form__input-error username-error ${
            errors.username && 'form__input-error_visible'
          }`}
        >
          {errors.username}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default SignUpPopup;
