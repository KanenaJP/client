import axios from "axios";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchBaseUrl } from "../../config";
import { checkAccessAdmin } from "../../helpers/checkAccess";
import { checkAccessToken } from "../../helpers/checkAccessToken";

const Areas: FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [areas, setAreas] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/countries/read/all`).then(({ data }) => setCountries(data));
  });

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/areas/read/all`).then(({ data }) => setAreas(data));
  });

  const access = checkAccessAdmin();

  if (!access) {
    return <Navigate to="/access-denied" />
  }

  const addArea: MouseEventHandler = (e) => {
    e.preventDefault();

    const countryCode = (document.getElementById("countryCode") as HTMLInputElement).value.trim();
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const fullName = (document.getElementById("fullName") as HTMLInputElement).value.trim();
    const englishName = (document.getElementById("englishName") as HTMLInputElement).value.trim();
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement).value.trim();
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement).value.trim();
    document.getElementById("countryCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("name")?.classList.remove("border-danger", "border-success");
    document.getElementById("fullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishFullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("isoCode")?.classList.remove("border-danger", "border-success");

    let haveErrors = false;

    if (countryCode === "") {
      document.getElementById("countryCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("countryCode")?.classList.add("border-success");
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

    if (isoCode === "") {
      document.getElementById("isoCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("isoCode")?.classList.add("border-success");
    }

    if (haveErrors) {
      return;
    } else {
      axios.post(`${fetchBaseUrl}/areas/create`, {
        name,
        fullName,
        englishName,
        englishFullName,
        isoCode,
        countryCode
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
        }
      }).then(() => rollbackChanges(e));
    }
  }

  const editArea: MouseEventHandler = (e) => {
    e.preventDefault();

    const countryCode = (document.getElementById("countryCode") as HTMLInputElement).value.trim();
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const fullName = (document.getElementById("fullName") as HTMLInputElement).value.trim();
    const englishName = (document.getElementById("englishName") as HTMLInputElement).value.trim();
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement).value.trim();
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement).value.trim();
    document.getElementById("countryCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("name")?.classList.remove("border-danger", "border-success");
    document.getElementById("fullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishFullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("isoCode")?.classList.remove("border-danger", "border-success");

    let haveErrors = false;

    if (countryCode === "") {
      document.getElementById("countryCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("countryCode")?.classList.add("border-success");
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

    if (isoCode === "") {
      document.getElementById("isoCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("isoCode")?.classList.add("border-success");
    }

    if (haveErrors) {
      return;
    } else {
      axios.patch(`${fetchBaseUrl}/areas/update/${countryCode}/${isoCode}`, {
        name,
        fullName,
        englishName,
        englishFullName,
        countryCode,
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

    const countryCode = (document.getElementById("countryCode") as HTMLInputElement).value.trim();
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement).value.trim();
    let haveErrors = false;

    if (isoCode === "") {
      document.getElementById("isoCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("isoCode")?.classList.add("border-success");
    }

    if (countryCode === "") {
      document.getElementById("countryCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("countryCode")?.classList.add("border-success");
    }

    if (haveErrors) {
      return;
    } else {
      axios.delete(`${fetchBaseUrl}/areas/delete/${countryCode}/${isoCode}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
        }
      }).then(() => rollbackChanges(e));
    }
  }

  const rollbackChanges: MouseEventHandler = (e) => {
    e.preventDefault();

    setEdit(false);

    const countryCode = (document.getElementById("countryCode") as HTMLInputElement);
    const name = (document.getElementById("name") as HTMLInputElement);
    const fullName = (document.getElementById("fullName") as HTMLInputElement);
    const englishName = (document.getElementById("englishName") as HTMLInputElement);
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement);
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement);

    countryCode.classList.remove("border-danger", "border-success");
    name.classList.remove("border-danger", "border-success");
    fullName.classList.remove("border-danger", "border-success");
    englishName.classList.remove("border-danger", "border-success");
    englishFullName.classList.remove("border-danger", "border-success");
    isoCode.classList.remove("border-danger", "border-success");

    countryCode.value = "";
    name.value = "";
    fullName.value = "";
    englishName.value = "";
    englishFullName.value = "";
    isoCode.value = "";
  }

  const editAreas: MouseEventHandler = (e) => {
    e.preventDefault()
    setEdit(true);

    const selected = Number(e.currentTarget.querySelector("th")?.innerText);
    const area = areas?.find(area => area.isoCode === selected);

    console.log(area)
    const countryCode = (document.getElementById("countryCode") as HTMLInputElement)
    const name = (document.getElementById("name") as HTMLInputElement);
    const fullName = (document.getElementById("fullName") as HTMLInputElement);
    const englishName = (document.getElementById("englishName") as HTMLInputElement);
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement);
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement);

    countryCode.value = area.countryCode;
    name.value = area.name;
    fullName.value = area.fullName;
    englishName.value = area.englishName;
    englishFullName.value = area.englishFullName;
    isoCode.value = area.isoCode;
  }


  return (
    <div className="container">
      <form className="col-12 col-lg-5 mx-auto d-flex flex-column">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Страна
          </label>
          <select id="countryCode" className="form-select">
            {
              countries.map(country => <option value={country.isoCode}>{country.name}</option>)
            }
          </select>
        </div>
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
          <label htmlFor="isoCode" className="form-label">
            Код по ISO
          </label>
          <input
            type="text"
            className="form-control"
            id="isoCode"
          />
        </div>
        <button type="submit" className="btn btn-success mb-2" onClick={addArea}>
          Добавить область
        </button>
        {
          edit ?
          <button type="submit" className="btn btn-primary mb-2" onClick={editArea}>
            Изменить область
          </button> : 
          undefined
        }
        {
          edit ?
          <button type="submit" className="btn btn-danger mb-2" onClick={deleteCountry}>
            Удалить облать
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
            <th scope="col">Страна:</th>
            <th scope="col">Навание:</th>
            <th scope="col">Полное название:</th>
            <th scope="col">Название (на Английском):</th>
            <th scope="col">Полное название (на Английском):</th>
            <th scope="col">Код по ISO:</th>
          </tr>
        </thead>
        <tbody>
          {
            areas.map(area => <tr key={area.id} className="text-center" onClick={editAreas}>
              <th>{area.isoCode}</th>
              <th>{countries.find(country => country.isoCode === area.countryCode)?.name}</th>
              <td>{area.name}</td>
              <td>{area.fullName}</td>
              <td>{area.englishName}</td>
              <td>{area.englishFullName}</td>
              <td>{area.isoCode}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export { Areas };
