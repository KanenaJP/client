import React, { FC } from 'react'
import { Button } from '../button'
import { ButtonsGroup } from '../buttons-group'
import { Navbar } from '../navbar'
import { NavbarLink } from '../navbar-link'

const Header: FC = () => {
  const access_token = localStorage.getItem("gl_access_token");

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Navbar>
          <NavbarLink title="Перевозки" href="/transportations" />
          <NavbarLink title="Контрагенты" href="/counterpartes" />
          <NavbarLink title="Пользователи" href="/users" />
          <NavbarLink title="Страны" href="/countries" />
          <NavbarLink title="Области" href="/areas" />
          <NavbarLink title="Населенные пункты" href="/localities" />
        </Navbar>

        {
          access_token ?
          <ButtonsGroup>
            <Button title="Выйти" type="outline-primary" href="/logout" />
          </ButtonsGroup> : 
          <ButtonsGroup>
            <Button title="Зарегистрироваться" type="outline-primary" href="/registration" />
            <Button title="Войти" type="primary" href="/login" />
          </ButtonsGroup> 
        }
      </header>
    </div>
  )
}

export { Header }
