import React, { FC, MouseEventHandler } from 'react'
import { Navigate } from 'react-router-dom'
import { checkAccessToken } from '../../helpers/checkAccessToken'
import { Button } from '../button'
import { FormFullscreen } from '../form-fullscreen'
import { Input } from '../input'
import { InputsGroup } from '../inputs-group'
import { russianWordsToEnglish } from '../../helpers/russianWordsToEnglish'
import axios from 'axios'
import { fetchBaseUrl } from '../../config'

const Login: FC = () => {
  checkAccessToken().then(data => {
    if (data) { window.location.href = "/main" }
  });

  const validateLoginFrom: MouseEventHandler = (e) => {
    const login = document.getElementById("login") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    let haveErrors = false;
    login.classList.remove("border-danger", "border-success");
    password.classList.remove("border-danger", "border-success");

    const loginValue = login.value.trim();
    const passwordValue = password.value.trim();

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




    if (haveErrors) {
      return;
    } else {
      axios.post(`${fetchBaseUrl}/auth/login`, {
        login: loginValue,
        password: passwordValue
      }).then(({ data }) => {
        const access_token = data.access_token;
        console.log(access_token)
        localStorage.setItem("gl_access_token", access_token);
        window.location.href = "/main";
      }).catch(() => {
        password.classList.add("border-danger");
        login.classList.add("border-danger");
      })
    }

  };

  return (
    <FormFullscreen
      title="Вход"
      image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
    >
      <InputsGroup>
        <Input id="login" title="Логин:" type="text" required />
        <Input id="password" title="Пароль:" type="password" required />
      </InputsGroup>

      <InputsGroup>
        <Button title="Войти" type="outline-primary" onClick={validateLoginFrom} />
      </InputsGroup>
    </FormFullscreen>
  )
}

export { Login }
