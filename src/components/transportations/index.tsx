import axios from 'axios'
import React, { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from 'react'
import { fetchBaseUrl } from '../../config'
import { checkAccessToken } from '../../helpers/checkAccessToken'
import moment from "moment";
import { Navigate } from 'react-router-dom';
import { checkAccessAdmin, checkAccessCarrier, checkAccessCompany, checkAccessCustomer } from '../../helpers/checkAccess';

const Transportations: FC = () => {
  checkAccessToken().then((data) => {
    if (!data) {
      window.location.href = '/login'
    }
  })

  const access = checkAccessAdmin() || checkAccessCompany() || checkAccessCarrier() || checkAccessCustomer();

  const [transportations, setTransportations] = useState<any[]>([])
  const [statuses, setStatuses] = useState<any[]>([])
  const [toCountries, setToCountries] = useState<any[]>([])
  const [toAreas, setToAreas] = useState<any[]>([])
  const [toLocalities, setToLocalities] = useState<any[]>([])
  const [fromCountries, setFromCountries] = useState<any[]>([])
  const [fromAreas, setFromAreas] = useState<any[]>([])
  const [fromLocalities, setFromLocalities] = useState<any[]>([])
  const [counterparties, setCounterparties] = useState<any[]>([])
  const [selectedTransportation, setSelectedTransportation] = useState<number>(0)
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedFromCountry, setSelectedFromCountry] = useState<number>(0);
  const [selectedToCountry, setSelectedToCountry] = useState<number>(0);
  const [selectedFromArea, setSelectedFromArea] = useState<number>(0);
  const [selectedToArea, setSelectedToArea] = useState<number>(0);

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/statuses/read/all`).then(({ data }) => {
      setStatuses(data)
    })
  }, [])

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/countries/read/all`).then(({ data }) => {
      setToCountries(data)
      setFromCountries(data)
    })
  }, [])

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/areas/read/all`).then(({ data }) => {
      setToAreas(data)
      setFromAreas(data)
    })
  }, [])

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/localities/read/all`).then(({ data }) => {
      setToLocalities(data)
      setFromLocalities(data)
    })
  }, [])

  useEffect(() => {
    axios.get(`${fetchBaseUrl}/counterparties/read/all`).then(({ data }) => {
      setCounterparties(data)
    })
  }, [])

  useEffect(() => {
    axios
      .get(`${fetchBaseUrl}/transportation-orders/read/all`)
      .then(({ data }) => {
        let result: any[] = []

        data.forEach((element: any) => {
          let item = {
            id: element.id,
            name: element.name,
            loadingDate: moment(element.loadingDate).format("YYYY-MM-DD"),
            unloadingDate: moment(element.unloadingDate).format("YYYY-MM-DD"),
            statusId: statuses?.find((status) => status.id === element.status)
              ?.id,
            statusName: statuses?.find((status) => status.id === element.status)
              ?.name,
            fromCountryId: toCountries?.find(
              (country) => country.isoCode === element.fromCountry,
            )?.isoCode,
            fromCountryName: fromCountries?.find(
              (country) => country.isoCode === element.fromCountry,
            )?.name,
            toCountryId: toCountries?.find(
              (country) => country.isoCode === element.toCountry,
            )?.isoCode,
            toCountryName: toCountries?.find(
              (country) => country.isoCode === element.toCountry,
            )?.name,
            fromAreaId: fromAreas?.find((area) => area.isoCode === element.fromArea)
              ?.isoCode,
            fromAreaName: fromAreas?.find(
              (area) => area.isoCode === element.fromArea,
            )?.name,
            toAreaId: toAreas?.find((area) => area.isoCode === element.toArea)
              ?.isoCode,
            toAreaName: toAreas?.find((area) => area.isoCode === element.toArea)
              ?.name,
            fromLocalityId: fromLocalities?.find(
              (locality) => locality.isoCode === element.fromLocality,
            )?.isoCode,
            fromLocalityName: fromLocalities?.find(
              (locality) => locality.isoCode === element.fromLocality,
            )?.name,
            toLocalityId: toLocalities?.find(
              (locality) => locality.isoCode === element.toLocality,
            )?.isoCode,
            toLocalityName: toLocalities?.find(
              (locality) => locality.isoCode === element.toLocality,
            )?.name,
            from: `${fromCountries?.find(
              (country) => country.isoCode === element.fromCountry,
            )?.name
              } > ${fromAreas?.find((area) => area.isoCode === element.fromArea)?.name
              } > ${fromLocalities?.find(
                (locality) => locality.isoCode === element.fromLocality,
              )?.name
              }`,
            to: `${toCountries?.find(
              (country) => country.isoCode === element.toCountry,
            )?.name
              } > ${toAreas?.find((area) => area.isoCode === element.toArea)?.name
              } > ${toLocalities?.find(
                (locality) => locality.isoCode === element.toLocality,
              )?.name
              }`,
            carCount: element.carCount,
            weight: element.weight,
            volume: element.volume,
            rateToYou: element.rateToYou,
            rateToCarrier: element.rateToCarrier,
            companyId: counterparties?.find(
              (counterparty) => counterparty.id === element.company,
            )?.id,
            companyName: counterparties?.find(
              (counterparty) => counterparty.id === element.company,
            )?.name,
            carrierId: counterparties?.find(
              (counterparty) => counterparty.id === element.carrier,
            )?.id,
            carrierName: counterparties?.find(
              (counterparty) => counterparty.id === element.carrier,
            )?.name,
          }

          result.push(item)
        })

        setTransportations(result)
      })
  })

  if (!access) {
    return <Navigate to="/access-denied" />
  }

  const editTransportations: MouseEventHandler = (e) => {
    e.preventDefault();

    setEdit(true);

    const selected = Number(e.currentTarget.querySelector("th")?.innerText);
    setSelectedTransportation(selected)
    const transportation = transportations?.find(transportation => transportation.id === selected);

    const name = (document.getElementById("name") as HTMLInputElement);
    const loadingDate = (document.getElementById("loadingDate") as HTMLInputElement);
    const unloadingDate = (document.getElementById("unloadingDate") as HTMLInputElement);
    const status = (document.getElementById("status") as HTMLInputElement);
    const fromCountry = (document.getElementById("fromCountry") as HTMLInputElement);
    const toCountry = (document.getElementById("toCountry") as HTMLInputElement);
    const fromArea = (document.getElementById("fromArea") as HTMLInputElement);
    const toArea = (document.getElementById("toArea") as HTMLInputElement);
    const fromLocality = (document.getElementById("fromLocality") as HTMLInputElement);
    const toLocality = (document.getElementById("toLocality") as HTMLInputElement);
    const carCount = (document.getElementById("carCount") as HTMLInputElement);
    const weight = (document.getElementById("weight") as HTMLInputElement);
    const volume = (document.getElementById("volume") as HTMLInputElement);
    const rateToYou = (document.getElementById("rateToYou") as HTMLInputElement);
    const rateToCarrier = (document.getElementById("rateToCarrier") as HTMLInputElement);
    const company = (document.getElementById("company") as HTMLInputElement);
    const carrier = (document.getElementById("carrier") as HTMLInputElement);

    name.value = transportation.name;
    loadingDate.value = transportation.loadingDate;
    unloadingDate.value = transportation.unloadingDate;
    status.value = transportation.statusId;
    fromCountry.value = transportation.fromCountryId;
    toCountry.value = transportation.toCountryId;
    fromArea.value = transportation.fromAreaId;
    toArea.value = transportation.toAreaId;
    fromLocality.value = transportation.fromLocalityId;
    toLocality.value = transportation.toLocalityId;
    carCount.value = transportation.carCount;
    weight.value = transportation.weight;
    volume.value = transportation.volume;
    rateToYou.value = transportation.rateToYou;
    rateToCarrier.value = transportation.rateToCarrier;
    company.value = transportation.companyId;
    carrier.value = transportation.carrierId;
  };

  const addTransportation: MouseEventHandler = (e) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const loadingDate = (document.getElementById("loadingDate") as HTMLInputElement).value.trim();
    const unloadingDate = (document.getElementById("unloadingDate") as HTMLInputElement).value.trim();
    const status = (document.getElementById("status") as HTMLInputElement).value.trim();
    const fromCountry = (document.getElementById("fromCountry") as HTMLInputElement).value.trim();
    const toCountry = (document.getElementById("toCountry") as HTMLInputElement).value.trim();
    const fromArea = (document.getElementById("fromArea") as HTMLInputElement).value.trim();
    const toArea = (document.getElementById("toArea") as HTMLInputElement).value.trim();
    const fromLocality = (document.getElementById("fromLocality") as HTMLInputElement).value.trim();
    const toLocality = (document.getElementById("toLocality") as HTMLInputElement).value.trim();
    const carCount = (document.getElementById("carCount") as HTMLInputElement).value.trim();
    const weight = (document.getElementById("weight") as HTMLInputElement).value.trim();
    const volume = (document.getElementById("volume") as HTMLInputElement).value.trim();
    const rateToYou = (document.getElementById("rateToYou") as HTMLInputElement).value.trim();
    const rateToCarrier = (document.getElementById("rateToCarrier") as HTMLInputElement).value.trim();
    const company = (document.getElementById("company") as HTMLInputElement).value.trim();
    const carrier = (document.getElementById("carrier") as HTMLInputElement).value.trim();

    let haveErrors = false;

    if (name === "") {
      document.getElementById("name")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("name")?.classList.add("border-success");
    }

    if (loadingDate === "") {
      document.getElementById("loadingDate")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("loadingDate")?.classList.add("border-success");
    }

    if (unloadingDate === "") {
      document.getElementById("unloadingDate")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("unloadingDate")?.classList.add("border-success");
    }

    if (status === "") {
      document.getElementById("status")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("status")?.classList.add("border-success");
    }

    if (fromCountry === "") {
      document.getElementById("fromCountry")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("fromCountry")?.classList.add("border-success");
    }

    if (toCountry === "") {
      document.getElementById("toCountry")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("toCountry")?.classList.add("border-success");
    }

    if (fromArea === "") {
      document.getElementById("fromArea")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("fromArea")?.classList.add("border-success");
    }

    if (toArea === "") {
      document.getElementById("toArea")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("toArea")?.classList.add("border-success");
    }

    if (fromLocality === "") {
      document.getElementById("fromLocality")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("fromLocality")?.classList.add("border-success");
    }

    if (toLocality === "") {
      document.getElementById("toLocality")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("toLocality")?.classList.add("border-success");
    }

    if (carCount === "") {
      document.getElementById("carCount")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("carCount")?.classList.add("border-success");
    }

    if (weight === "") {
      document.getElementById("weight")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("weight")?.classList.add("border-success");
    }

    if (volume === "") {
      document.getElementById("volume")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("volume")?.classList.add("border-success");
    }

    if (rateToYou === "") {
      document.getElementById("rateToYou")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("rateToYou")?.classList.add("border-success");
    }

    if (rateToCarrier === "") {
      document.getElementById("rateToCarrier")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("rateToCarrier")?.classList.add("border-success");
    }

    if (company === "") {
      document.getElementById("company")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("company")?.classList.add("border-success");
    }

    if (carrier === "") {
      document.getElementById("carrier")?.classList.add("border-danger");
      haveErrors = true;
    } else {
      document.getElementById("carrier")?.classList.add("border-success");
    }

    if (haveErrors) {
      return;
    } else {
      axios.post(`${fetchBaseUrl}/transportation-orders/create`, {
        name,
        carCount,
        loadingDate,
        unloadingDate,
        status,
        fromCountry,
        fromArea,
        fromLocality,
        toCountry,
        toArea,
        toLocality,
        weight,
        volume,
        rateToYou,
        rateToCarrier,
        company,
        carrier
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
        }
      }).then(() => rollbackChanges(e));
    }
  };

  const rollbackChanges: MouseEventHandler = (e) => {
    e.preventDefault()
    setEdit(false);

    const name = (document.getElementById("name") as HTMLInputElement);
    const loadingDate = (document.getElementById("loadingDate") as HTMLInputElement);
    const unloadingDate = (document.getElementById("unloadingDate") as HTMLInputElement);
    const status = (document.getElementById("status") as HTMLInputElement);
    const fromCountry = (document.getElementById("fromCountry") as HTMLInputElement);
    const toCountry = (document.getElementById("toCountry") as HTMLInputElement);
    const fromArea = (document.getElementById("fromArea") as HTMLInputElement);
    const toArea = (document.getElementById("toArea") as HTMLInputElement);
    const fromLocality = (document.getElementById("fromLocality") as HTMLInputElement);
    const toLocality = (document.getElementById("toLocality") as HTMLInputElement);
    const carCount = (document.getElementById("carCount") as HTMLInputElement);
    const weight = (document.getElementById("weight") as HTMLInputElement);
    const volume = (document.getElementById("volume") as HTMLInputElement);
    const rateToYou = (document.getElementById("rateToYou") as HTMLInputElement);
    const rateToCarrier = (document.getElementById("rateToCarrier") as HTMLInputElement);
    const company = (document.getElementById("company") as HTMLInputElement);
    const carrier = (document.getElementById("carrier") as HTMLInputElement);

    name.classList.remove("border-danger", "border-success");
    loadingDate.classList.remove("border-danger", "border-success");
    unloadingDate.classList.remove("border-danger", "border-success");
    status.classList.remove("border-danger", "border-success");
    fromCountry.classList.remove("border-danger", "border-success");
    toCountry.classList.remove("border-danger", "border-success");
    fromArea.classList.remove("border-danger", "border-success");
    toArea.classList.remove("border-danger", "border-success");
    fromLocality.classList.remove("border-danger", "border-success");
    toLocality.classList.remove("border-danger", "border-success");
    carCount.classList.remove("border-danger", "border-success");
    weight.classList.remove("border-danger", "border-success");
    volume.classList.remove("border-danger", "border-success");
    rateToYou.classList.remove("border-danger", "border-success");
    rateToCarrier.classList.remove("border-danger", "border-success");
    company.classList.remove("border-danger", "border-success");
    carrier.classList.remove("border-danger", "border-success");

    name.value = "";
    loadingDate.value = "";
    unloadingDate.value = "";
    status.value = "";
    fromCountry.value = "";
    toCountry.value = "";
    fromArea.value = "";
    toArea.value = "";
    fromLocality.value = "";
    toLocality.value = "";
    carCount.value = "";
    weight.value = "";
    volume.value = "";
    rateToYou.value = "";
    rateToCarrier.value = "";
    company.value = "";
    carrier.value = "";
  }

  const deleteTransportation: MouseEventHandler = (e) => {
    e.preventDefault()
    axios.delete(`${fetchBaseUrl}/transportation-orders/delete/${selectedTransportation}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("gl_access_token")}`
      }
    }).then(() => rollbackChanges(e));
  }

  const onToCountryChanged: ChangeEventHandler = (e) => {
    const country = (e.currentTarget as HTMLSelectElement).value;

    axios.get(`${fetchBaseUrl}/areas/read/all`).then(({ data }) => {
      let areas = data.filter((area: any) => area.countryCode == country);
      setToAreas(areas);
      setToLocalities([])
    });
  };

  const onFromCountryChanged: ChangeEventHandler = (e) => {
    const country = (e.currentTarget as HTMLSelectElement).value;

    axios.get(`${fetchBaseUrl}/areas/read/all`).then(({ data }) => {
      let areas = data.filter((area: any) => area.countryCode == country);
      setFromAreas(areas);
      setFromLocalities([])
    });
  };

  const onToAreasChanged: ChangeEventHandler = (e) => {
    const area = (e.currentTarget as HTMLSelectElement).value;

    axios.get(`${fetchBaseUrl}/localities/read/all`).then(({ data }) => {
      let localities = data.filter((locality: any) => locality.areaCode == area);
      setToLocalities(localities);
    });
  };

  const onFromAreasChanged: ChangeEventHandler = (e) => {
    const area = (e.currentTarget as HTMLSelectElement).value;

    axios.get(`${fetchBaseUrl}/localities/read/all`).then(({ data }) => {
      let localities = data.filter((locality: any) => locality.areaCode == area);
      setFromLocalities(localities);
    });
  };


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
          <label htmlFor="loadingDate" className="form-label">
            Дата погрузки
          </label>
          <input
            type="date"
            className="form-control"
            id="loadingDate"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="unloadingDate" className="form-label">
            Дата выгрузки
          </label>
          <input
            type="date"
            className="form-control"
            id="unloadingDate"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="unloadingDate" className="form-label">
            Статус
          </label>
          <select className="form-select" id="status">
            {
              statuses?.map(status => <option value={status.id}>{status.name}</option>)
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="fromCountry" className="form-label">
            Из страны
          </label>
          <select className="form-select" id="fromCountry" onChange={onFromCountryChanged}>
            {
              fromCountries?.map(country => <option value={country.isoCode}>{country.name}</option>)
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="toCountry" className="form-label">
            В страну
          </label>
          <select className="form-select" id="toCountry" onChange={onToCountryChanged}>
            {
              toCountries?.map(country => <option value={country.isoCode}>{country.name}</option>)
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="fromArea" className="form-label">
            Из области
          </label>
          <select className="form-select" id="fromArea" onChange={onFromAreasChanged}>
            {
              fromAreas?.map(area => <option value={area.isoCode}>{area.name}</option>)
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="toArea" className="form-label">
            В область
          </label>
          <select className="form-select" id="toArea" onChange={onToAreasChanged}>
            {
              toAreas?.map(area => <option value={area.isoCode}>{area.name}</option>)
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="fromLocality" className="form-label">
            Из населенного пункта
          </label>
          <select className="form-select" id="fromLocality">
            {
              fromLocalities?.map(locality => <option value={locality.isoCode}>{locality.name}</option>)
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="toLocality" className="form-label">
            В населенный пункт
          </label>
          <select className="form-select" id="toLocality">
            {
              toLocalities?.map(locality => <option value={locality.isoCode}>{locality.name}</option>)
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="carCount" className="form-label">
            Количество машин
          </label>
          <input
            type="number"
            className="form-control"
            id="carCount"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">
            Вес
          </label>
          <input
            type="number"
            className="form-control"
            id="weight"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="volume" className="form-label">
            Объем
          </label>
          <input
            type="number"
            className="form-control"
            id="volume"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rateToYou" className="form-label">
            Ставка нам
          </label>
          <input
            type="number"
            className="form-control"
            id="rateToYou"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rateToCarrier" className="form-label">
            Ставка водителю
          </label>
          <input
            type="number"
            className="form-control"
            id="rateToCarrier"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Перевозчик
          </label>
          <select className="form-select" id="company">
            {
              counterparties?.map(counterparty => counterparty.type === "Перевозчик" ? <option value={counterparty.id}>{counterparty.name}</option> : undefined)
            }
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="carrier" className="form-label">
            Водитель
          </label>
          <select className="form-select" id="carrier">
            {
              counterparties?.map(counterparty => counterparty.type === "Водитель" ? <option value={counterparty.id}>{counterparty.name}</option> : undefined)
            }
          </select>
        </div>
        <button type="submit" className="btn btn-success mb-2" onClick={(checkAccessAdmin() || checkAccessCustomer()) ? addTransportation : undefined}>
          Сделать заказ
        </button>
        {
          edit && (checkAccessCarrier() || checkAccessCustomer() || checkAccessAdmin()) ?
            <button type="submit" className="btn btn-primary mb-2">
              Изменить заказ
            </button> :
            undefined
        }
        {
          edit && (checkAccessCustomer() || checkAccessAdmin()) ?
            <button type="submit" className="btn btn-danger mb-2" onClick={deleteTransportation}>
              Удалить заказ
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
            <th scope="col">Название:</th>
            <th scope="col">Дата погрузки:</th>
            <th scope="col">Дата выгрузки:</th>
            <th scope="col">Статус:</th>
            <th scope="col">Из:</th>
            <th scope="col">В:</th>
            <th scope="col">Количество машин:</th>
            <th scope="col">Вес:</th>
            <th scope="col">Объем:</th>
            <th scope="col">Ставнка нам:</th>
            <th scope="col">Ставка водителю:</th>
            <th scope="col">Перевозчик:</th>
            <th scope="col">Водитель:</th>
          </tr>
        </thead>
        <tbody>
          {transportations?.map((transportation) => {
            console.log(transportation)
            return (
              <tr
                key={transportation.id}
                className="text-center cursor-pointer"
                onClick={editTransportations}
              >
                <th scope="col">{transportation.id}</th>
                <td scope="col">{transportation.name}</td>
                <td scope="col">{transportation.loadingDate}</td>
                <td scope="col">{transportation.unloadingDate}</td>
                <td scope="col">{transportation.statusName}</td>
                <td scope="col">{transportation.from}</td>
                <td scope="col">{transportation.to}</td>
                <td scope="col">{transportation.carCount}</td>
                <td scope="col">{transportation.weight}</td>
                <td scope="col">{transportation.volume}</td>
                <td scope="col">{transportation.rateToYou}</td>
                <td scope="col">{transportation.rateToCarrier}</td>
                <td scope="col">{transportation.companyName}</td>
                <td scope="col">{transportation.carrierName}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export { Transportations }
