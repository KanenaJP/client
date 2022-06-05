import axios from "axios";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchBaseUrl } from "../../config";
import { checkAccessAdmin } from "../../helpers/checkAccess";
import { checkAccessToken } from "../../helpers/checkAccessToken";

const Localities: FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [areas, setAreas] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [localities, setLocalities] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/countries/read/all`).then(({ data }) => setCountries(data));
  });

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/areas/read/all`).then(({ data }) => setAreas(data));
  });

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/localities/read/all`).then(({ data }) => setLocalities(data));
  });

  const access = checkAccessAdmin();

  if (!access) {
    return <Navigate to="/access-denied" />
  }

  const addLocality: MouseEventHandler = (e) => {
    e.preventDefault();

    const countryCode = (document.getElementById("countryCode") as HTMLInputElement).value.trim();
    const areaCode = (document.getElementById("areaCode") as HTMLInputElement).value.trim();
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const fullName = (document.getElementById("fullName") as HTMLInputElement).value.trim();
    const englishName = (document.getElementById("englishName") as HTMLInputElement).value.trim();
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement).value.trim();
    const level = (document.getElementById("level") as HTMLInputElement).value.trim();
    const postalIndex = (document.getElementById("postalIndex") as HTMLInputElement).value.trim();
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement).value.trim();
    document.getElementById("countryCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("areaCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("name")?.classList.remove("border-danger", "border-success");
    document.getElementById("fullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishFullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("level")?.classList.remove("border-danger", "border-success");
    document.getElementById("postalIndex")?.classList.remove("border-danger", "border-success");
    document.getElementById("isoCode")?.classList.remove("border-danger", "border-success");

    let haveErrors = false;

    if (countryCode === "") {
      document.getElementById("countryCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("countryCode")?.classList.add("border-success");
    }

    if (areaCode === "") {
      document.getElementById("areaCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("areaCode")?.classList.add("border-success");
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

    if (level === "") {
      document.getElementById("level")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("level")?.classList.add("border-success");
    }

    if (postalIndex === "") {
      document.getElementById("postalIndex")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("postalIndex")?.classList.add("border-success");
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
      axios.post(`${fetchBaseUrl}/localities/create`, {
        name,
        fullName,
        englishName,
        englishFullName,
        isoCode,
        countryCode,
        areaCode,
        level,
        postalIndex
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
        }
      }).then(() => rollbackChanges(e));
    }
  }

  const editLocality: MouseEventHandler = (e) => {
    e.preventDefault();

    const countryCode = (document.getElementById("countryCode") as HTMLInputElement).value.trim();
    const areaCode = (document.getElementById("areaCode") as HTMLInputElement).value.trim();
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const fullName = (document.getElementById("fullName") as HTMLInputElement).value.trim();
    const englishName = (document.getElementById("englishName") as HTMLInputElement).value.trim();
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement).value.trim();
    const level = (document.getElementById("level") as HTMLInputElement).value.trim();
    const postalIndex = (document.getElementById("postalIndex") as HTMLInputElement).value.trim();
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement).value.trim();
    document.getElementById("countryCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("areaCode")?.classList.remove("border-danger", "border-success");
    document.getElementById("name")?.classList.remove("border-danger", "border-success");
    document.getElementById("fullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishName")?.classList.remove("border-danger", "border-success");
    document.getElementById("englishFullName")?.classList.remove("border-danger", "border-success");
    document.getElementById("level")?.classList.remove("border-danger", "border-success");
    document.getElementById("postalIndex")?.classList.remove("border-danger", "border-success");
    document.getElementById("isoCode")?.classList.remove("border-danger", "border-success");

    let haveErrors = false;

    if (countryCode === "") {
      document.getElementById("countryCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("countryCode")?.classList.add("border-success");
    }

    if (areaCode === "") {
      document.getElementById("areaCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("areaCode")?.classList.add("border-success");
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

    if (level === "") {
      document.getElementById("level")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("level")?.classList.add("border-success");
    }

    if (postalIndex === "") {
      document.getElementById("postalIndex")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("postalIndex")?.classList.add("border-success");
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
      axios.patch(`${fetchBaseUrl}/localities/update/${countryCode}/${isoCode}/${isoCode}`, {
        name,
        fullName,
        englishName,
        englishFullName,
        countryCode,
        isoCode,
        areaCode,
        postalIndex,
        level
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
        }
      }).then(() => rollbackChanges(e));
    }
  };

  const deleteLocality: MouseEventHandler = (e) => {
    e.preventDefault();

    const countryCode = (document.getElementById("countryCode") as HTMLInputElement).value.trim();
    const areaCode = (document.getElementById("areaCode") as HTMLInputElement).value.trim();
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement).value.trim();
    let haveErrors = false;

    if (isoCode === "") {
      document.getElementById("isoCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("isoCode")?.classList.add("border-success");
    }

    if (areaCode === "") {
      document.getElementById("areaCode")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("areaCode")?.classList.add("border-success");
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
      axios.delete(`${fetchBaseUrl}/localities/delete/${countryCode}/${isoCode}/${isoCode}`, {
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
    const areaCode = (document.getElementById("areaCode") as HTMLInputElement);
    const name = (document.getElementById("name") as HTMLInputElement);
    const fullName = (document.getElementById("fullName") as HTMLInputElement);
    const englishName = (document.getElementById("englishName") as HTMLInputElement);
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement);
    const level = (document.getElementById("level") as HTMLInputElement);
    const postalIndex = (document.getElementById("postalIndex") as HTMLInputElement);
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement);

    countryCode.classList.remove("border-danger", "border-success");
    areaCode.classList.remove("border-danger", "border-success");
    name.classList.remove("border-danger", "border-success");
    fullName.classList.remove("border-danger", "border-success");
    englishName.classList.remove("border-danger", "border-success");
    englishFullName.classList.remove("border-danger", "border-success");
    level.classList.remove("border-danger", "border-success");
    postalIndex.classList.remove("border-danger", "border-success");
    isoCode.classList.remove("border-danger", "border-success");

    countryCode.value = "";
    areaCode.value = "";
    name.value = "";
    fullName.value = "";
    englishName.value = "";
    englishFullName.value = "";
    level.value = "";
    postalIndex.value = "";
    isoCode.value = "";
  }

  const editLocalities: MouseEventHandler = (e) => {
    e.preventDefault()
    setEdit(true);

    const selected = Number(e.currentTarget.querySelector("th")?.innerText);
    const locality = localities?.find(locality => locality.isoCode === selected);

    const countryCode = (document.getElementById("countryCode") as HTMLInputElement);
    const areaCode = (document.getElementById("areaCode") as HTMLInputElement);
    const name = (document.getElementById("name") as HTMLInputElement);
    const fullName = (document.getElementById("fullName") as HTMLInputElement);
    const englishName = (document.getElementById("englishName") as HTMLInputElement);
    const englishFullName = (document.getElementById("englishFullName") as HTMLInputElement);
    const level = (document.getElementById("level") as HTMLInputElement);
    const postalIndex = (document.getElementById("postalIndex") as HTMLInputElement);
    const isoCode = (document.getElementById("isoCode") as HTMLInputElement);

    countryCode.value = locality.countryCode;
    areaCode.value = locality.areaCode;
    name.value = locality.name;
    fullName.value = locality.fullName;
    englishName.value = locality.englishName;
    englishFullName.value = locality.englishFullName;
    level.value = locality.level;
    postalIndex.value = locality.postalIndex;
    isoCode.value = locality.isoCode;
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
            Область
          </label>
          <select id="areaCode" className="form-select">
            {
              areas.map(area => <option value={area.isoCode}>{area.name}</option>)
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
          <label htmlFor="level" className="form-label">
            Уровень
          </label>
          <input
            type="text"
            className="form-control"
            id="level"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postalIndex" className="form-label">
            Почтовый индекс
          </label>
          <input
            type="text"
            className="form-control"
            id="postalIndex"
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
        <button type="submit" className="btn btn-success mb-2" onClick={addLocality}>
          Добавить населенный пункт
        </button>
        {
          edit ?
          <button type="submit" className="btn btn-primary mb-2" onClick={editLocality}>
            Изменить населенный пункт
          </button> : 
          undefined
        }
        {
          edit ?
          <button type="submit" className="btn btn-danger mb-2" onClick={deleteLocality}>
            Удалить населенный пункт
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
            <th scope="col">Область:</th>
            <th scope="col">Навание:</th>
            <th scope="col">Полное название:</th>
            <th scope="col">Название (на Английском):</th>
            <th scope="col">Полное название (на Английском):</th>
            <th scope="col">Код по ISO:</th>
          </tr>
        </thead>
        <tbody>
          {
            localities.map(locality => <tr key={locality.isoCode} className="text-center" onClick={editLocalities}>
              <th>{locality.isoCode}</th>
              <th>{countries.find(country => country.isoCode === locality.countryCode)?.name}</th>
              <th>{areas.find(area => area.isoCode === locality.areaCode)?.name}</th>
              <td>{locality.name}</td>
              <td>{locality.fullName}</td>
              <td>{locality.englishName}</td>
              <td>{locality.englishFullName}</td>
              <td>{locality.isoCode}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export { Localities };
