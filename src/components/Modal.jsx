import PropTypes from "prop-types";
import css from "./modal.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { RegistrationCtx } from "./Ctx";

export class Modal extends React.Component {
  static contextType = RegistrationCtx;

  
  componentDidMount() {
    const body = document.querySelector('body')
    body.addEventListener("keyup", this.props.onCloseModal);
  }

  componentWillMount() {
    const body = document.querySelector('body')
    body.removeEventListener("keyup", this.props.onCloseModal);
  }


  render() {
    const values = [{label: 'Ваш логин:', value: this.context.login}, {label: 'Ваш пароль:', value: this.context.password}, {label: 'Ваш пол:', value: this.props.gender}]
    const modal = (
      <div key={this.props.onCloseModal} className={css.modal}>
        <div className={css.info}>
        <ul className={css.list}>
          {values.map(item => {
            return (
                   <li>{item.label} {item.value}</li>
            )
          })}
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
