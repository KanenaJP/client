import axios from "axios";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchBaseUrl } from "../../config";
import { checkAccessAdmin, checkAccessCompany } from "../../helpers/checkAccess";
import { checkAccessToken } from "../../helpers/checkAccessToken";

const Counterpartes: FC = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const [counterparties, setCounterparties] = useState<any[]>([]);
    const [typesCounterparties, setTypesCounterparties] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [selectedCounterparty, setSelectedCounterparty] = useState<number>(0);

    useEffect(() => {
        axios.get(`${fetchBaseUrl}/counterparties/read/all`).then(({ data }) => setCounterparties(data));
    });

    useEffect(() => {
        axios.get(`${fetchBaseUrl}/type-counterparties/read/all`).then(({ data }) => setTypesCounterparties(data));
    });

    const access = checkAccessAdmin() || checkAccessCompany();

    if (!access) {
        return <Navigate to="/access-denied" />
    }

    const addCounterparty: MouseEventHandler = (e) => {
        e.preventDefault();

        const type = (document.getElementById("type") as HTMLInputElement).value.trim();
        const name = (document.getElementById("name") as HTMLInputElement).value.trim();
        const fullName = (document.getElementById("fullName") as HTMLInputElement).value.trim();
        const englishName = (document.getElementById("englishName") as HTMLInputElement).value.trim();
        const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement).value.trim();

        document.getElementById("type")?.classList.remove("border-danger", "border-success");
        document.getElementById("name")?.classList.remove("border-danger", "border-success");
        document.getElementById("fullName")?.classList.remove("border-danger", "border-success");
        document.getElementById("englishName")?.classList.remove("border-danger", "border-success");
        document.getElementById("englishFullName")?.classList.remove("border-danger", "border-success");

        let haveErrors = false;

        if (type === "") {
            document.getElementById("type")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("type")?.classList.add("border-success");
        }

        if (name === "") {
            document.getElementById("name")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("name")?.classList.add("border-success");
        }

        if (fullName === "") {
            document.getElementById("fullName")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("fullName")?.classList.add("border-success");
        }

        if (englishName === "") {
            document.getElementById("englishName")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("englishName")?.classList.add("border-success");
        }

        if (englishFullName === "") {
            document.getElementById("englishFullName")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("englishFullName")?.classList.add("border-success");
        }

        if (haveErrors) {
            return;
        } else {
            axios.post(`${fetchBaseUrl}/counterparties/create`, {
                type: typesCounterparties.find(typesCounterpartiy => typesCounterpartiy.id == type)?.name,
                name,
                fullName,
                englishName,
                englishFullName
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
        const name = (document.getElementById("name") as HTMLInputElement).value.trim();
        const fullName = (document.getElementById("fullName") as HTMLInputElement).value.trim();
        const englishName = (document.getElementById("englishName") as HTMLInputElement).value.trim();
        const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement).value.trim();

        document.getElementById("type")?.classList.remove("border-danger", "border-success");
        document.getElementById("name")?.classList.remove("border-danger", "border-success");
        document.getElementById("fullName")?.classList.remove("border-danger", "border-success");
        document.getElementById("englishName")?.classList.remove("border-danger", "border-success");
        document.getElementById("englishFullName")?.classList.remove("border-danger", "border-success");

        let haveErrors = false;

        if (type === "") {
            document.getElementById("type")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("type")?.classList.add("border-success");
        }

        if (name === "") {
            document.getElementById("name")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("name")?.classList.add("border-success");
        }

        if (fullName === "") {
            document.getElementById("fullName")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("fullName")?.classList.add("border-success");
        }

        if (englishName === "") {
            document.getElementById("englishName")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("englishName")?.classList.add("border-success");
        }

        if (englishFullName === "") {
            document.getElementById("englishFullName")?.classList.add("border-danger");
            haveErrors = true;
        } else {
            document.getElementById("englishFullName")?.classList.add("border-success");
        }

        if (haveErrors) {
            return;
        } else {
            axios.patch(`${fetchBaseUrl}/counterparties/update/${selectedCounterparty}`, {
                type: typesCounterparties.find(typesCounterpartiy => typesCounterpartiy.id == type)?.name,
                name,
                fullName,
                englishName,
                englishFullName
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
                }
            }).then(() => rollbackChanges(e));
        }
    };

    const deleteCounterparty: MouseEventHandler = (e) => {
        e.preventDefault()
        axios.delete(`${fetchBaseUrl}/counterparties/delete/${selectedCounterparty}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
            }
        }).then(() => rollbackChanges(e));

    }

    const rollbackChanges: MouseEventHandler = (e) => {
        e.preventDefault()
        setEdit(false);

        const type = (document.getElementById("type") as HTMLInputElement);
        const name = (document.getElementById("name") as HTMLInputElement);
        const fullName = (document.getElementById("fullName") as HTMLInputElement);
        const englishName = (document.getElementById("englishName") as HTMLInputElement);
        const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement);

        type.classList.remove("border-danger", "border-success");
        name.classList.remove("border-danger", "border-success");
        fullName.classList.remove("border-danger", "border-success");
        englishName.classList.remove("border-danger", "border-success");
        englishFullName.classList.remove("border-danger", "border-success");

        type.value = "";
        name.value = "";
        fullName.value = "";
        englishName.value = "";
        englishFullName.value = "";
    }

    const editcounterparties: MouseEventHandler = (e) => {
        e.preventDefault();

        setEdit(true);

        const selected = Number(e.currentTarget.querySelector("th")?.innerText);
        setSelectedCounterparty(selected);
        const counterparty = counterparties?.find(counterparty => counterparty.id === selected);

        const type = (document.getElementById("type") as HTMLInputElement);
        const name = (document.getElementById("name") as HTMLInputElement);
        const fullName = (document.getElementById("fullName") as HTMLInputElement);
        const englishName = (document.getElementById("englishName") as HTMLInputElement);
        const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement);

        type.value = typesCounterparties.find(typesCounterparty => typesCounterparty.name === counterparty.type)?.id;
        name.value = counterparty.name;
        fullName.value = counterparty.fullName;
        englishName.value = counterparty.englishName;
        englishFullName.value = counterparty.englishFullName;
    }

    return (
        <div className="container">
            <form className="col-12 col-lg-5 mx-auto d-flex flex-column">
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Тип контрагента
                    </label>
                    <select className="form-select" id="type">
                        {
                            typesCounterparties.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Имя
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                        Полное имя
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="englishName" className="form-label">
                        Имя (на Английском)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="englishName"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="englishFullName" className="form-label">
                        Полное имя (на Английском)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="englishFullName"
                    />
                </div>

                <button type="submit" className="btn btn-success mb-2" onClick={addCounterparty}>
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
                        <button type="submit" className="btn btn-danger mb-2" onClick={deleteCounterparty}>
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
                        <th scope="col">Имя:</th>
                        <th scope="col">Полное имя:</th>
                        <th scope="col">Имя (на Английском):</th>
                        <th scope="col">Полное имя (на Английском):</th>
                        <th scope="col">Тип контрагента:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        counterparties.map(counterparty => <tr key={counterparty.id} className="text-center" onClick={editcounterparties}>
                            <th>{counterparty.id}</th>
                            <td>{counterparty.name}</td>
                            <td>{counterparty.fullName}</td>
                            <td>{counterparty.englishName}</td>
                            <td>{counterparty.englishFullName}</td>
                            <td>{counterparty.type}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export { Counterpartes };
