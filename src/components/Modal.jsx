import PropTypes from "prop-types";
import css from "./modal.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { RegistrationCtx } from "./Ctx";

export class Modal extends React.Component {
  static contextType = RegistrationCtx;

  
  componentDidMount() {
    const body = document.querySelector('body')
    body.addEventListener("keyup", this.props.onCloseModall);
  }

  componentWillMount() {
    const body = document.querySelector('body')
    body.removeEventListener("keyup", this.props.onCloseModall);
  }


  render() {
    const modal = (
      <div key={this.props.onCloseModall} className={css.modal}>
        <div className={css.info}>
        <ul className={css.list}>
          <li className={css.item}>Ваш логин: {this.context.login}</li>
          <li className={css.item}>Ваш пароль: {this.context.password}</li>
          <li className={css.item}>Ваш пол: {this.props.gender}</li>
        </ul>
        </div>
        <p>Регистрация прошла успешна!</p>
        <button onClick={this.props.onCloseModal} className={css.btn}>
          Хорошо
        </button>
      </div>
    );
    const body = document.querySelector("body");

    return ReactDOM.createPortal(modal, body);
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func,
};
