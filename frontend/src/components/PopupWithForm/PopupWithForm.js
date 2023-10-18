import React from 'react';
import './PopupWithForm.css';
import { Link } from 'react-router-dom';

function PopupWithForm(props) {
  const handleLinkClick = () => {
    props.onClose();
    props.onLinkClick();
  };

  return (
    <div className={props.isOpen ? 'popup popup_open' : 'popup'}>
      <div className='popup__container'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='close'
          onClick={props.onClose}
        ></button>
        <h2 className='popup__title'>{props.title}</h2>
        <form
          name={`${props.name}-form`}
          className='form popup__form'
          onSubmit={props.onSubmit}
        >
          <fieldset className='form__fieldset'>
            {props.children}
            <span
              className={`form__input-error form__input-error_button ${
                props.showError && 'form__input-error_visible'
              }`}
            >
              This email is not available
            </span>
            <button
              type='submit'
              className={`form__submit ${
                props.disabledButton && ' form__submit_disabled'
              }`}
              disabled={props.disabledButton}
            >
              {props.buttonText}
            </button>
          </fieldset>
          <div className='form__link-wrap'>
            <span className='form__text-link'>or </span>
            {props.name === 'signin' ? (
              <Link
                to='/signup'
                className='form__link'
                onClick={handleLinkClick}
              >
                Sign up
              </Link>
            ) : (
              <Link
                to='/signin'
                className='form__link'
                onClick={handleLinkClick}
              >
                Sign in
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
