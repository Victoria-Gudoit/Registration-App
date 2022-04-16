import React from "react";
import css from "./styles.module.css";
import { GENGER_STATUSES, genderOptions } from "./constants";
import { CheckboxGroup } from "./common";
import { Modal } from "./Modal";
import { ErrorBoundary } from "./ErrorBoundary";
import { RegistrationCtx } from "./Ctx";

export class App extends React.Component {
  state = {
    values: {login: '', password: '', gender: GENGER_STATUSES.FEMALE},
    checked: true,
    isModalVisible: false,
    errors: {login: '', password: ''},
  };

  changeGenderHandler = (event) => {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        gender: event.target.value
      },
  }))};

  toggleCheckbox = () => {
    this.setState(() => ({
      checked: !this.state.checked
      
    }))
  };

  inputChangeHandler = (event) => {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [event.target.name]: event.target.value
      },
      errors: {
        ...prevState.errors,
        [event.target.name]: ''
      }
    }))
  };

  onCloseModal = (e) => {
    if (e.key === "Escape" || e.currentTarget.closest('button')){
      this.setState( (prevState) => ({ isModalVisible: false, 
        values: {
        ...prevState.values,
        login: '',
        password: '',
      }}));
    }
  };

  clickHandler = (e) => {
    e.preventDefault();
    const isValid = this.state.values.login.length > 5 && this.state.values.password.length > 5
    this.setState((prevState) => ({
      isModalVisible: isValid,
      errors: {
        login: this.state.values.login.length > 5 ? '' : 'Логин не меньше 5 символов!',
        password: this.state.values.password.length > 5 ? '' : 'Пароль не меньше 5 символов!'
      }
    }))
  };

  FindGenderLabel = () => {
    return genderOptions.find(({ value }) => {
      return value === this.state.values.gender;
    });
  };

  render() {
    const {values, errors, checked, isModalVisible} = this.state;

    return (
      <div className={css.wrapper}>
        <RegistrationCtx.Provider value={this.state.values}>
          <h1 className={css.title}>Регистрация</h1>
          <form className={css.form}>
            <input className={css.input} type='text' value={values.login} name="login" placeholder="Введите логин" onChange={this.inputChangeHandler}/>{errors.login}
            <input className={css.input} type='password' value={values.password} name="password" placeholder="Введите пароль" onChange={this.inputChangeHandler}/>{errors.password}
            <div><CheckboxGroup options={genderOptions} value={values.gender} onChange={this.changeGenderHandler}/>
            </div>
            <div>
              <input type="checkbox" checked={checked} onChange={this.toggleCheckbox} className={css.checkbox}/>
              <span>Вы соглашаетесь на рассылку новостей</span>
            </div>
            <button className={css.btn} onClick={this.clickHandler} type="submit">Зарегистрироваться</button>
          </form>
          {isModalVisible && (<ErrorBoundary><Modal gender={this.FindGenderLabel().label} onCloseModal={this.onCloseModal}/></ErrorBoundary>)}
        </RegistrationCtx.Provider>
      </div>
    );
  }
}
