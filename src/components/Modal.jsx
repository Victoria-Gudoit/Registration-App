import PropTypes from "prop-types";
import css from "./modal.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { RegistrationCtx } from "./Ctx";
import { v4 as uuidv4 } from "uuid";

export class Modal extends React.Component {
  static contextType = RegistrationCtx;

  render() {
    const modal = (
      <div className={css.modal}>
        <div className={css.info}>
          {["Ваш логин:", "Ваш пароль:"].map((label) => (
            <div key={uuidv4()}>
              {this.context.values.map((item) => (
                <p key={uuidv4()}>
                  {label} {label === "Ваш логин:" ? item.login : item.password}
                </p>
              ))}
            </div>
          ))}
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
