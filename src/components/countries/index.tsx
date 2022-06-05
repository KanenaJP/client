import axios from "axios";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchBaseUrl } from "../../config";
import { checkAccessAdmin } from "../../helpers/checkAccess";
import { checkAccessToken } from "../../helpers/checkAccessToken";

const Countries: FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/countries/read/all`).then(({ data }) => setCountries(data));
  });

  const access = checkAccessAdmin();

  if (!access) {
    return <Navigate to="/access-denied" />
  }

  const addCountry: MouseEventHandler = (e) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const fullName = (document.getElementById("fullName") as HTMLInputElement).value.trim();
    const englishName = (document.getElementById("englishName") as HTMLInputElement).value.trim();
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement).value.trim();
    const twoCharacterCode = (document.getElementById("twoCharacterCode") as HTMLInputElement).value.trim();
    const threeCharacterCode = (document.getElementById("threeCharacterCode") as HTMLInputElement).value.trim();
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement).value.trim();
    document.getElementById("name")?.classList.remove("border-danger", "border-success");
    document.getElementById("fullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishFullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("twoCharacterCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("threeCharacterCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("isoCode")?.classList.remove("border-danger", "border-success");

    let haveErrors = false;

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

    if (twoCharacterCode === "") {
      document.getElementById("twoCharacterCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("twoCharacterCode")?.classList.add("border-success");
    }

    if (threeCharacterCode === "") {
      document.getElementById("threeCharacterCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("threeCharacterCode")?.classList.add("border-success");
    }

    if (isoCode === "") {
      document.getElementById("isoCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("isoCode")?.classList.add("border-success");
    }

    if (haveErrors) {
      return;
    } else {
      axios.post(`${fetchBaseUrl}/countries/create`, {
        name,
        fullName,
        englishName,
        englishFullName,
        twoCharacterCode,
        threeCharacterCode,
        isoCode
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
        }
      }).then(() => rollbackChanges(e));
    }
  }

  const editCountry: MouseEventHandler = (e) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const fullName = (document.getElementById("fullName") as HTMLInputElement).value.trim();
    const englishName = (document.getElementById("englishName") as HTMLInputElement).value.trim();
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement).value.trim();
    const twoCharacterCode = (document.getElementById("twoCharacterCode") as HTMLInputElement).value.trim();
    const threeCharacterCode = (document.getElementById("threeCharacterCode") as HTMLInputElement).value.trim();
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement).value.trim();
    document.getElementById("name")?.classList.remove("border-danger", "border-success");
    document.getElementById("fullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishFullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("twoCharacterCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("threeCharacterCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("isoCode")?.classList.remove("border-danger", "border-success");

    let haveErrors = false;

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

    if (twoCharacterCode === "") {
      document.getElementById("twoCharacterCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("twoCharacterCode")?.classList.add("border-success");
    }

    if (threeCharacterCode === "") {
      document.getElementById("threeCharacterCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("threeCharacterCode")?.classList.add("border-success");
    }

    if (isoCode === "") {
      document.getElementById("isoCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("isoCode")?.classList.add("border-success");
    }

    if (haveErrors) {
      return;
    } else {
      axios.patch(`${fetchBaseUrl}/countries/update/${isoCode}`, {
        name,
        fullName,
        englishName,
        englishFullName,
        twoCharacterCode,
        threeCharacterCode,
        isoCode
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
        }
      }).then(() => rollbackChanges(e));
    }
  };

  const deleteCountry: MouseEventHandler = (e) => {
    e.preventDefault();

    const isoCode = (document.getElementById("isoCode") as HTMLInputElement).value.trim();
    let haveErrors = false;

    if (isoCode === "") {
      document.getElementById("isoCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("isoCode")?.classList.add("border-success");
    }

    if (haveErrors) {
      return;
    } else {
      e.preventDefault()
      axios.delete(`${fetchBaseUrl}/countries/delete/${isoCode}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
        }
      }).then(() => rollbackChanges(e));
    }
  }

  const rollbackChanges: MouseEventHandler = (e) => {
    e.preventDefault()
    setEdit(false);

    const name = (document.getElementById("name") as HTMLInputElement);
    const fullName = (document.getElementById("fullName") as HTMLInputElement);
    const englishName = (document.getElementById("englishName") as HTMLInputElement);
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement);
    const twoCharacterCode = (document.getElementById("twoCharacterCode") as HTMLInputElement);
    const threeCharacterCode = (document.getElementById("threeCharacterCode") as HTMLInputElement);
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement);

    name.classList.remove("border-danger", "border-success");
    fullName.classList.remove("border-danger", "border-success");
    englishName.classList.remove("border-danger", "border-success");
    englishFullName.classList.remove("border-danger", "border-success");
    twoCharacterCode.classList.remove("border-danger", "border-success");
    threeCharacterCode.classList.remove("border-danger", "border-success");
    isoCode.classList.remove("border-danger", "border-success");

    name.value = "";
    fullName.value = "";
    englishName.value = "";
    englishFullName.value = "";
    twoCharacterCode.value = "";
    threeCharacterCode.value = "";
    isoCode.value = "";
  }

  const editCountries: MouseEventHandler = (e) => {
    e.preventDefault();
    
    setEdit(true);

    const selected = Number(e.currentTarget.querySelector("th")?.innerText);
    const country = countries?.find(country => country.isoCode === selected);

    const name = (document.getElementById("name") as HTMLInputElement);
    const fullName = (document.getElementById("fullName") as HTMLInputElement);
    const englishName = (document.getElementById("englishName") as HTMLInputElement);
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement);
    const twoCharacterCode = (document.getElementById("twoCharacterCode") as HTMLInputElement);
    const threeCharacterCode = (document.getElementById("threeCharacterCode") as HTMLInputElement);
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement);

    name.value = country.name;
    fullName.value = country.fullName;
    englishName.value = country.englishName;
    englishFullName.value = country.englishFullName;
    twoCharacterCode.value = country.twoCharacterCode;
    threeCharacterCode.value = country.threeCharacterCode;
    isoCode.value = country.isoCode;
  }


  return (
    <div className="container">
      <form className="col-12 col-lg-5 mx-auto d-flex flex-column">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Название
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Полное название
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="englishName" className="form-label">
            Название (на Английском)
          </label>
          <input
            type="text"
            className="form-control"
            id="englishName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="englishFullName" className="form-label">
            Полное название (на Английском)
          </label>
          <input
            type="text"
            className="form-control"
            id="englishFullName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="twoCharacterCode" className="form-label">
            Двухсимвольный код
          </label>
          <input
            type="text"
            className="form-control"
            id="twoCharacterCode"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="threeCharacterCode" className="form-label">
            Трехсимвольный код
          </label>
          <input
            type="text"
            className="form-control"
            id="threeCharacterCode"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="isoCode" className="form-label">
            Код по ISO
          </label>
          <input
            type="text"
            className="form-control"
            id="isoCode"
          />
        </div>
        <button type="submit" className="btn btn-success mb-2" onClick={addCountry}>
          Добавить страну
        </button>
        {
          edit ?
          <button type="submit" className="btn btn-primary mb-2" onClick={editCountry}>
            Изменить страну
          </button> : 
          undefined
        }
        {
          edit ?
          <button type="submit" className="btn btn-danger mb-2" onClick={deleteCountry}>
            Удалить страну
          </button> : 
          undefined
        }
        {
          edit ?
          <button type="submit" className="btn btn-warning mb-2" onClick={rollbackChanges}>
            Отменить изменение
          </button> : 
          undefined
        }
      </form>
      <table className="table overflow-scroll">
        <thead>
          <tr className="text-center">
            <th scope="col">№:</th>
            <th scope="col">Навание:</th>
            <th scope="col">Полное название:</th>
            <th scope="col">Название (на Английском):</th>
            <th scope="col">Полное название (на Английском):</th>
            <th scope="col">Двухсимвольный код:</th>
            <th scope="col">Трехсимвольный код:</th>
            <th scope="col">Код по ISO:</th>
          </tr>
        </thead>
        <tbody>
          {
            countries.map(country => <tr key={country.isoCode} className="text-center" onClick={editCountries}>
              <th>{country.isoCode}</th>
              <td>{country.name}</td>
              <td>{country.fullName}</td>
              <td>{country.englishName}</td>
              <td>{country.englishFullName}</td>
              <td>{country.twoCharacterCode}</td>
              <td>{country.threeCharacterCode}</td>
              <td>{country.isoCode}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export { Countries };
