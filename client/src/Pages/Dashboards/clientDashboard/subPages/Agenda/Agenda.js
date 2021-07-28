import React, { useState, useEffect } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import * as tokenUser from "../../../../../Utils/localStorage";
import {
  updateAgenda,
  getUserAgenda,
  createUserAgenda,
} from "../../../../../Services/agenda";
import "./Agenda.css";
const Agenda = () => {
  const user = JSON.parse(tokenUser.getUserId());
  var months = new Date().getMonth() + 1;
  var years = new Date().getFullYear();
  months = months < 10 ? "0" + months.toString() : months;
  const [month, setMonth] = useState(months);
  const [year, setYear] = useState(years);
  // guarda todos os eventos do calendário do utilizador
  const [agenda, setAgenda] = useState([]);

  //definições gerais do calendário.
  const [event, setEvent] = useState({
    startDate: year + "-" + month + "-01",
    days: new Date(year, month, 0).getDate(),
    scale: "Day",
    eventHeight: 50,
    cellWidth: 90,
    timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
    cellWidthSpec: 100,
    resources: [],
    events: agenda,
  });

  // coloca as horas no calendário
  const getTime = () => {
    let hours = [];
    for (let i = 8; i <= 20; i++) {
      hours.push({ name: i + ":00", id: i + "H" });
    }

    return hours;
  };

  //recebe a informação da agenda vinda da BD
  const getAgenda = async () => {
    const { agenda } = await getUserAgenda();
    if (agenda > 0) {
      const nevents = agenda[0].agenda;
      setAgenda(nevents);
    } else {
      const params = {
        userId: user._id,
        agenda: [],
      };
      createUserAgenda(params);
    }
  };

  //atualiza quando a página inicia pela primeira vez
  useEffect(() => {
    const hours = getTime();
    setEvent((state) => {
      for (let i = 0; i < hours.length; i++) {
        state.resources.push(hours[i]);
      }
    });
    getAgenda();
  }, []);

  useEffect(() => {
    setEvent((prevState) => ({
      ...prevState,
      events: agenda,
    }));
  }, [agenda]);

  //define as horas do calendário.
  useEffect(() => {
    setEvent({
      ...event,
      startDate: year + "-" + month + "-01",
      days: new Date(year, month, 0).getDate(),
    });
  }, [year, month]);

  //altera a cor do evento
  const changeColor = async (args) => {
    let colors = [
      "#0000FF",
      "#CC0000",
      "#CCFF00",
      "#FFFF00",
      "#FF33FF",
      "#33FFFF",
    ];
    const colorPicker =
      colors[parseInt(Math.floor(Math.random() * colors.length))];

    let i = 0;
    for (let x = 0; x < agenda.length; x++) {
      if (agenda[x].id === args.e.data.id) {
        i = x;
      }
    }
    if (i === 0) return;
    const newAgenda = agenda;
    newAgenda[i] = {
      id: newAgenda[i].id,
      text: newAgenda[i].text,
      start: newAgenda[i].start,
      end: newAgenda[i].end,
      resource: newAgenda[i].resource,
      barColor: colorPicker,
      barBackColor: colorPicker,
      professionalId: newAgenda[i].professionalId,
    };
    await updateAgenda(newAgenda);
    setAgenda(newAgenda);
    setEvent((prevState) => ({
      ...prevState,
      events: newAgenda,
    }));
  };

  //função que altera a posição do evento no calendário
  const moveEvent = async () => {
    const newAgenda = event.events;
    setAgenda(newAgenda);
    await updateAgenda(newAgenda);
  };

  //cria um novo evento no calendário
  const createEvent = async (args) => {
    const res = await DayPilot.Modal.prompt("New event name", "Event").then(
      (modal) => {
        if (!modal.result) {
          return;
        }
        return modal;
      }
    );
    let colors = [
      "#0000FF",
      "#CC0000",
      "#CCFF00",
      "#FFFF00",
      "#FF33FF",
      "#33FFFF",
    ];

    const colorPicker =
      colors[parseInt(Math.floor(Math.random() * colors.length))];
    const newAgenda = event.events;
    if (res) {
      newAgenda.push({
        id: agenda.length > 0 ? agenda[agenda.length - 1].id + 1 : 1,
        text: res.result,
        start: args.start,
        end: args.end,
        resource: args.resource,
        barColor: colorPicker,
        barBackColor: colorPicker,
        professionalId: "",
      });

      setEvent((prevState) => ({
        ...prevState,
        events: newAgenda,
      }));
    }
    setAgenda(newAgenda);
    await updateAgenda(newAgenda);
  };

  //edita um evento do calendário
  const editEvent = async (args) => {
    const res = await DayPilot.Modal.prompt(
      "Edit event",
      args.e.data.text
    ).then((modal) => {
      if (!modal.result) {
        return;
      }
      return modal;
    });

    if (!res) return;
    let index = 0;
    for (let i = 0; i < agenda.length; i++) {
      if (agenda[i].id === args.e.data.id) {
        index = i;
      }
    }
    const newAgenda = event.events;
    newAgenda[index] = {
      id: args.e.data.id,
      text: res.result,
      start: args.e.data.start,
      end: args.e.data.end,
      resource: args.e.data.resource,
      barColor: args.e.data.barColor,
      barBackColor: args.e.data.barBackColor,
      professionalId: newAgenda[index].professionalId,
    };

    await updateAgenda(newAgenda);

    setAgenda(newAgenda);
    setEvent({ ...event, events: agenda });
  };

  //elimina o evento
  const deleteEvent = async (e) => {
    const response = window.confirm(
      "Está prestes a eliminar este evento. Continuar?"
    );
    let i = 0;
    for (let x = 0; x < agenda.length; x++) {
      if (agenda[x].id === e.data.id) {
        i = x;
      }
    }
    if (!response) return;
    event.events.splice(i, 1);
    const newAgenda = event.events;
    await updateAgenda(newAgenda);
    setAgenda(newAgenda);
    setEvent((prevState) => ({
      ...prevState,
      events: newAgenda,
    }));
  };

  //altera o mês do calendário e o ano dependendo do mês em que se encontra e se vai para o mes seguinte ou anterior.
  const changeMonth = (n) => (e) => {
    e.preventDefault();
    if (parseInt(month) + n > 12) {
      setYear(year + 1);
      setMonth("01");
    } else if (parseInt(month) + n < 1) {
      setYear(year - 1);
      setMonth("12");
    } else if (parseInt(month) + n >= 1 && parseInt(month) + n < 10) {
      setMonth("0" + (parseInt(month) + n).toString());
    } else if (parseInt(month) + n >= 10 && parseInt(month) + n <= 12) {
      setMonth((parseInt(month) + n).toString());
    }
  };

  //HTML que vai retornar deste componente
  return (
    <div className=" py-5 px-2">
      <div className="my-2">
        <button className="btn btn-primary mx-1" onClick={changeMonth(-1)}>
          mês anterior
        </button>
        <button className="btn btn-primary" onClick={changeMonth(1)}>
          mês seguinte
        </button>
      </div>

      <DayPilotScheduler
        className="calendar"
        cellWidth={100}
        eventHeight={50}
        {...event}
        onEventMoved={(args) => {
          moveEvent(args);
        }}
        onEventClick={(args) => {
          changeColor(args);
        }}
        onTimeRangeSelected={(args) => {
          createEvent(args);
        }}
        eventDoubleClickHandling="Enabled"
        onEventDoubleClicked={(args) => {
          editEvent(args);
        }}
        onEventRightClick={(args) => {
          deleteEvent(args.e);
        }}
      />
    </div>
  );
};

export default Agenda;
