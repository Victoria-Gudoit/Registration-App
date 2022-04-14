import React from "react";
import css from "./styles.module.css";
import { FILTER_STATUSES, filterOptions } from "./constants";
import { CheckboxGroup } from "./common";
import { Modal } from "./Modal";
import { ErrorBoundary } from "./ErrorBoundary";
import { RegistrationCtx } from "./Ctx";

export class App extends React.Component {
  state = {
    login: "",
    password: "",
    filter: FILTER_STATUSES.FEMALE,
    checked: true,
    isModalVisible: false,
    error: "",
  };

  componentDidMount() {
    window.addEventListener("keyup", (e) => this.KeyPress(e));
  }

  componentWillMount() {
    window.removeEventListener("keyup", (e) => this.KeyPress(e));
  }

  KeyPress(e) {
    if (e.key === "Escape") {
      this.setState({ isModalVisible: false });
    }
  }

  changeFilterHandler = (event) => {
    this.setState({ filter: event.target.value });
  };

  toggleCheckbox = (event) => {
    this.setState({ checked: event.target.value });
    this.setState({ checked: !this.state.checked });
  };

  loginInputChangeHandler = (event) => {
    this.setState({ login: event.target.value });
  };

  passwordInputChangeHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  onCloseModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  showModal = (e) => {
    e.preventDefault();
    if (this.state.login.length < 5 || this.state.password.length < 5) {
      this.setState({ error: "Минимальная длина поля 5 символов" });
    } else {
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
  };

  render() {
    const {login, password, error, checked, filter, isModalVisible} = this.state;
    const values = [{ login, password }];

    return (
      <div className={css.wrapper}>
        <RegistrationCtx.Provider value={{ values }}>
          <h1 className={css.title}>Регистрация</h1>
          <form className={css.form}>
            <input className={css.input} value={login} name="login" placeholder="Введите логин" onChange={this.loginInputChangeHandler}/>{error}
            <input className={css.input} value={password} name="password" placeholder="Введите пароль" onChange={this.passwordInputChangeHandler}/>{error}
            <div><CheckboxGroup options={filterOptions} value={filter} onChange={this.changeFilterHandler}/>
            </div>
            <div>
              <input type="checkbox" checked={checked} onChange={this.toggleCheckbox} className={css.checkbox}/>
              <span>Вы соглашаетесь на рассылку новостей</span>
            </div>
            <button className={css.btn} onClick={this.showModal} type="submit">Зарегистрироваться</button>
          </form>
          {isModalVisible && (<ErrorBoundary><Modal onCloseModal={this.onCloseModal}/></ErrorBoundary>)}
        </RegistrationCtx.Provider>
      </div>
    );
  }
}
