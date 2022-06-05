export const checkAccessAdmin = () => {
  return (localStorage.getItem("gl_account_type") === "Администратор");
}

export const checkAccessCompany = () => {
  return (localStorage.getItem("gl_account_type") === "Перевозчик");
}

export const checkAccessCarrier = () => {
  return (localStorage.getItem("gl_account_type") === "Водитель");
}

export const checkAccessCustomer = () => {
  return (localStorage.getItem("gl_account_type") === "Заказчик");
}
