import axios from 'axios'
import React, { FC, MouseEventHandler } from 'react'
import { Navigate } from 'react-router-dom'
import { fetchBaseUrl } from '../../config'
import { checkAccessToken } from '../../helpers/checkAccessToken'
import { russianWordsToEnglish } from '../../helpers/russianWordsToEnglish'
import { Button } from '../button'
import { ButtonsGroup } from '../buttons-group'
import { FormFullscreen } from '../form-fullscreen'
import { Input } from '../input'
import { InputsGroup } from '../inputs-group'

const Registration: FC = () => {
  checkAccessToken().then(data => {
    if (data) { window.location.href = "/main" }
  });

  const validateRegistrationFrom: MouseEventHandler = (e) => {
    const login = document.getElementById("login") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const repeatedPassword = document.getElementById("repeatedPassword") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;
    const fullName = document.getElementById("fullName") as HTMLInputElement;
    const comment = document.getElementById("comment") as HTMLInputElement;
    const typeCompany = document.getElementById("typeCompany") as HTMLInputElement;
    const typeCustomer = document.getElementById("typeCustomer") as HTMLInputElement;
    const typeDriver = document.getElementById("typeDriver") as HTMLInputElement;
    let haveErrors = false;
    login.classList.remove("border-danger", "border-success");
    password.classList.remove("border-danger", "border-success");
    repeatedPassword.classList.remove("border-danger", "border-success");
    name.classList.remove("border-danger", "border-success");
    fullName.classList.remove("border-danger", "border-success");
    typeCompany.classList.remove("border-danger", "border-success");
    typeCustomer.classList.remove("border-danger", "border-success");
    typeDriver.classList.remove("border-danger", "border-success");

    const loginValue = login.value.trim();
    const passwordValue = password.value.trim();
    const repeatedPasswordValue = repeatedPassword.value.trim();
    const nameValue = name.value.trim();
    const fullNameValue = fullName.value.trim();
    const typeCompanyValue = typeCompany.checked;
    const typeCustomerValue = typeCustomer.checked;
    const typeDriverValue = typeDriver.checked;

    if (loginValue === "") {
      login.classList.add("border-danger");
      haveErrors = true;
    } else {
      login.classList.add("border-success");
    }

    if (passwordValue === "") {
      password.classList.add("border-danger");
      haveErrors = true;
    } else {
      password.classList.add("border-success");
    }

    if (repeatedPasswordValue === "") {
      repeatedPassword.classList.add("border-danger");
      haveErrors = true;
    } else {
      repeatedPassword.classList.add("border-success");
    }

    if (passwordValue !== repeatedPasswordValue) {
      password.classList.add("border-danger");
      repeatedPassword.classList.add("border-danger");
      haveErrors = true;
    } else {
      password.classList.add("border-success");
      repeatedPassword.classList.add("border-success");
    }

    if (nameValue === "") {
      name.classList.add("border-danger");
      haveErrors = true;
    } else {
      name.classList.add("border-success");
    }

    if (fullNameValue === "") {
      fullName.classList.add("border-danger");
      haveErrors = true;
    } else {
      fullName.classList.add("border-success");
    }

    if (typeCompanyValue) {
      typeCompany.classList.add("border-success")
    } else if (typeCustomerValue) {
      typeCustomer.classList.add("border-success")
    } else if (typeDriverValue) {
      typeDriver.classList.add("border-success")
    } else {
      typeCompany.classList.add("border-danger")
      typeCustomer.classList.add("border-danger")
      typeDriver.classList.add("border-danger")

      haveErrors = true;
    }

    if (haveErrors) {
      return;
    } else {
      axios.post(`${fetchBaseUrl}/users/create`, {
        login: loginValue,
        password: passwordValue,
        type: typeCompanyValue ? "Перевозчик" : 
          typeCustomerValue ? "Заказчик" : typeDriverValue ? "Водитель" : "Заказчик"
      });

      const access_token = axios.post(`${fetchBaseUrl}/auth/login`, {
        login: loginValue,
        password: passwordValue
      }).then(({ data }) => {

        axios.post(`${fetchBaseUrl}/counterparties/create`, {
          name: nameValue,
          fullName: fullNameValue,
          englishName: russianWordsToEnglish(nameValue),
          englishFullName: russianWordsToEnglish(fullNameValue),
          type: typeCompanyValue ? "Перевозчик" : 
          typeCustomerValue ? "Заказчик" : typeDriverValue ? "Водитель" : "Заказчик"
        }, {
          headers: {
            Authorization: `Bearer ${data.access_token}`
          }
        }).then(() => {
          localStorage.setItem("access_token", data.access_token);
          window.location.href = "/login";
        });
      })
    }

  };
  

  return (
    <FormFullscreen
      title="Регистрация"
      image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
    >
      <InputsGroup>
        <Input id="login" title="Логин:" type="text" required />
        <Input id="password" title="Пароль:" type="password" required />
        <Input id="repeatedPassword" title="Повторите пароль:" type="password" required />
        <Input id="fullName" title="ФИО:" type="text" />
        <Input id="name" title="ФИО сокращенно:" type="text" />
      </InputsGroup>
      
      <InputsGroup title="Тип учётной записи:">
          <Input id="typeCompany" name="type" title="Перевозчик" type="radio" required />
          <Input id="typeCustomer" name="type" title="Заказчик" type="radio" required />
          <Input id="typeDriver" name="type" title="Водитель" type="radio" required />
      </InputsGroup>

      <InputsGroup>
        <Button title="Зарегистрироваться" type="outline-primary" onClick={validateRegistrationFrom} />
      </InputsGroup>
    </FormFullscreen>
  )
}

export { Registration }
