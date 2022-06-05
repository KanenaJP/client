import axios from "axios";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchBaseUrl } from "../../config";
import { checkAccessAdmin } from "../../helpers/checkAccess";
import { checkAccessToken } from "../../helpers/checkAccessToken";

const Users: FC = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const [users, setUsers] = useState<any[]>([]);
    const [typesCounterparties, setTypesCounterparties] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<number>(0);

    useEffect(() => {
        axios.get(`${fetchBaseUrl}/users/read/all`).then(({ data }) => setUsers(data));
    });

    useEffect(() => {
        axios.get(`${fetchBaseUrl}/type-counterparties/read/all`).then(({ data }) => setTypesCounterparties(data));
    });

    useEffect(() => {
        axios.get(`${fetchBaseUrl}/counterparties/read/all`).then(({ data }) => setCompanies(data.filter((counterpatry: any) => counterpatry.type === "Перевозчик")));
    });

    const access = checkAccessAdmin();

    if (!access) {
        return <Navigate to="/access-denied" />
    }

    const addUser: MouseEventHandler = (e) => {
        e.preventDefault();

        const type = (document.getElementById("type") as HTMLInputElement).value.trim();
        const login = (document.getElementById("login") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value.trim();
        const companyEmployee = (document.getElementById("companyEmployee") as HTMLInputElement).value.trim();

        document.getElementById("type")?.classList.remove("border-danger", "border-success");
        document.getElementById("login")?.classList.remove("border-danger", "border-success");
        document.getElementById("password")?.classList.remove("border-danger", "border-success");
        document.getElementById("companyEmployee")?.classList.remove("border-danger", "border-success");

        let haveErrors = false;

        if (type === "") {
            document.getElementById("type")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("type")?.classList.add("border-success");
        }

        if (login === "") {
            document.getElementById("login")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("login")?.classList.add("border-success");
        }

        if (password === "") {
            document.getElementById("password")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("password")?.classList.add("border-success");
        }

        if (companyEmployee === "") {
            document.getElementById("companyEmployee")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("companyEmployee")?.classList.add("border-success");
        }

        if (haveErrors) {
            return;
        } else {
            axios.post(`${fetchBaseUrl}/users/create`, {
                type: typesCounterparties.find(typesCounterpartiy => typesCounterpartiy.id == companyEmployee)?.name,
                login,
                password,
                companyEmployee,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
                }
            }).then(() => rollbackChanges(e));
        }
    }

    const editUser: MouseEventHandler = (e) => {
        e.preventDefault();

        const type = (document.getElementById("type") as HTMLInputElement).value.trim();
        const login = (document.getElementById("login") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value.trim();
        const companyEmployee = (document.getElementById("companyEmployee") as HTMLInputElement).value.trim();

        document.getElementById("type")?.classList.remove("border-danger", "border-success");
        document.getElementById("login")?.classList.remove("border-danger", "border-success");
        document.getElementById("password")?.classList.remove("border-danger", "border-success");
        document.getElementById("companyEmployee")?.classList.remove("border-danger", "border-success");

        let haveErrors = false;

        if (type === "") {
            document.getElementById("type")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("type")?.classList.add("border-success");
        }

        if (login === "") {
            document.getElementById("login")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("login")?.classList.add("border-success");
        }

        if (password === "") {
            document.getElementById("password")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("password")?.classList.add("border-success");
        }

        if (companyEmployee === "") {
            document.getElementById("companyEmployee")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("companyEmployee")?.classList.add("border-success");
        }

        if (haveErrors) {
            return;
        } else {
            axios.patch(`${fetchBaseUrl}/users/update/${selectedUser}`, {
                type: typesCounterparties.find(typesCounterpartiy => typesCounterpartiy.id == companyEmployee)?.name,
                login,
                password,
                companyEmployee,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
                }
            }).then(() => rollbackChanges(e));
        }
    };

    const deleteUser: MouseEventHandler = (e) => {
        e.preventDefault()
        axios.delete(`${fetchBaseUrl}/users/delete/${selectedUser}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
            }
        }).then(() => rollbackChanges(e));

    }

    const rollbackChanges: MouseEventHandler = (e) => {
        e.preventDefault()
        setEdit(false);

        const type = (document.getElementById("type") as HTMLInputElement);
        const login = (document.getElementById("login") as HTMLInputElement);
        const password = (document.getElementById("password") as HTMLInputElement);
        const companyEmployee = (document.getElementById("companyEmployee") as HTMLInputElement);

        type.classList.remove("border-danger", "border-success");
        login.classList.remove("border-danger", "border-success");
        password.classList.remove("border-danger", "border-success");
        companyEmployee.classList.remove("border-danger", "border-success");

        type.value = "";
        login.value = "";
        password.value = "";
        companyEmployee.value = "";
    }

    const editUsers: MouseEventHandler = (e) => {
        e.preventDefault();

        setEdit(true);

        const selected = Number(e.currentTarget.querySelector("th")?.innerText);
        setSelectedUser(selected);
        const user = users?.find(user => user.id === selected);

        const type = (document.getElementById("type") as HTMLInputElement);
        const login = (document.getElementById("login") as HTMLInputElement);
        const password = (document.getElementById("password") as HTMLInputElement);
        const companyEmployee = (document.getElementById("companyEmployee") as HTMLInputElement);

        type.value = typesCounterparties.find(typesCounterparty => typesCounterparty.name === user.type)?.id;
        login.value = user.login;
        password.value = user.password;
        companyEmployee.value = user.companyEmployee;
    }

    return (
        <div className="container">
            <form className="col-12 col-lg-5 mx-auto d-flex flex-column">
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Тип учетной записи
                    </label>
                    <select className="form-select" id="type">
                        {
                            typesCounterparties.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="login" className="form-label">
                        Логин
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="login"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Пароль
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="companyEmployee" className="form-label">
                        Работник компании
                    </label>
                    <select className="form-select" id="companyEmployee">
                        {
                            companies.map((comapny) => <option key={comapny.id} value={comapny.id}>{comapny.name}</option>)
                        }
                    </select>
                </div>

                <button type="submit" className="btn btn-success mb-2" onClick={addUser}>
                    Добавить пользователя
                </button>
                {
                    edit ?
                        <button type="submit" className="btn btn-primary mb-2" onClick={editUser}>
                            Изменить пользователя
                        </button> :
                        undefined
                }
                {
                    edit ?
                        <button type="submit" className="btn btn-danger mb-2" onClick={deleteUser}>
                            Удалить пользователя
                        </button> :
                        undefined
                }
                {
                    edit ?
                        <button type="submit" className="btn btn-warning mb-2" onClick={rollbackChanges}>
                            Отменить пользователя
                        </button> :
                        undefined
                }
            </form>
            <table className="table overflow-scroll">
                <thead>
                    <tr className="text-center">
                        <th scope="col">№:</th>
                        <th scope="col">Тип учетной записи:</th>
                        <th scope="col">Логин:</th>
                        <th scope="col">Пароль:</th>
                        <th scope="col">Последняя активность:</th>
                        <th scope="col">Работник компании:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => <tr key={user.id} className="text-center" onClick={editUsers}>
                            <th>{user.id}</th>
                            <td>{user.type}</td>
                            <td>{user.login}</td>
                            <td>{user.password.split().map((c: any) => "*")}</td>
                            <td>{user.lastLogin}</td>
                            {
                                user.type !== "Водитель" ?
                                    <td></td> :
                                    <td>{user.companyEmployee}</td>
                            }
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export { Users };
