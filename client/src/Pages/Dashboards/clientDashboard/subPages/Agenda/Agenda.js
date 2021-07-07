import React, { useState, useEffect } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import "./Agenda.css";
const Agenda = () => {
  const [month, setMonth] = useState("10");
  const [year, setYear] = useState(2021);
  // guarda todos os eventos do calendário do utilizador
  const [agenda, setAgenda] = useState([
    {
      id: 1,
      text: "Event 1",
      start: "2021-10-02T00:00:00",
      end: "2021-10-02T00:00:00",
      resource: "10H",
      element: <i className="fas fa-trash-alt"></i>,
    },
    {
      id: 2,
      text: "Event 2",
      start: "2021-10-01T00:00:00",
      end: "2021-10-01T00:00:00",
      resource: "8H",
      barColor: "#38761d",
      barBackColor: "#93c47d",
    },
    {
      id: 3,
      text: "Event 3",
      start: "2021-10-02T00:00:00",
      end: "2021-10-02T00:00:00",
      resource: "15H",
      barColor: "#f1c232",
      barBackColor: "#f1c232",
    },
    {
      id: 4,
      text: "Event 4",
      start: "2021-10-08T00:00:00",
      end: "2021-10-08T00:00:00",
      resource: "14H",
      barColor: "#cc0000",
      barBackColor: "#ea9999",
    },
  ]);

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
    onBeforeEventDomAdd: (args) => {
      args.element = (
        <div>
          {args.e.data.text}
          <div
            style={{
              position: "absolute",
              right: "0px",
              top: "5px",
              width: "17px",
              height: "17px",
            }}
            onClick={() => deleteEvent(args.e)}
          >
            <i className="fas fa-trash-alt"></i>
          </div>

          <div
            style={{
              position: "absolute",
              right: "0px",
              top: "26px",
              width: "17px",
              height: "17px",
            }}
            onClick={() => changeColor(args.e)}
          >
            <i className="fas fa-palette"></i>
          </div>
        </div>
      );
    },
  });

  //elimina o evento
  const deleteEvent = (e) => {
    let i = 0;
    for (let x = 0; x < event.events.length; x++) {
      if (event.events[x].id === e.data.id) {
        i = x;
      }
    }

    event.events.splice(i, 1);
    const newAgenda = event.events;
    setAgenda(newAgenda);
    setEvent((prevState) => ({
      ...prevState,
      events: newAgenda,
    }));
  };

  //altera a cor do evento
  const changeColor = (e) => {
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

    for (let x = 0; x < event.events.length; x++) {
      if (event.events[x].id === e.data.id) {
        i = x;
      }
    }
    const newAgenda = event.events;
    newAgenda[i] = {
      id: newAgenda[i].id,
      text: newAgenda[i].text,
      start: newAgenda[i].start,
      end: newAgenda[i].end,
      resource: newAgenda[i].resource,
      barColor: colorPicker,
      barBackColor: colorPicker,
    };
    setAgenda(newAgenda);
    setEvent((prevState) => ({
      ...prevState,
      events: newAgenda,
    }));
  };

  // coloca as horas no calendário
  const getTime = () => {
    let hours = [];
    for (let i = 8; i <= 20; i++) {
      hours.push({ name: i + ":00", id: i + "H" });
    }

    return hours;
  };

  //atualiza quando a página inicia pela primeira vez
  useEffect(() => {
    const hours = getTime();
    setEvent((state) => {
      for (let i = 0; i < hours.length; i++) {
        state.resources.push(hours[i]);
      }
    });
  }, []);

  //função que altera a posição do evento no calendário
  const moveEvent = () => {
    const newAgenda = event.events;
    setAgenda(newAgenda);
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
        id: agenda.length + 1,
        text: res.result,
        start: args.start,
        end: args.end,
        resource: args.resource,
        barColor: colorPicker,
        barBackColor: colorPicker,
      });

      setEvent((prevState) => ({
        ...prevState,
        events: newAgenda,
      }));
    }
    setAgenda(newAgenda);
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
    };
    setAgenda(newAgenda);
    setEvent({ ...event, events: agenda });
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

  useEffect(() => {
    setEvent({
      ...event,
      startDate: year + "-" + month + "-01",
      days: new Date(year, month, 0).getDate(),
    });
  }, [month, year]);

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
        onTimeRangeSelected={(args) => {
          createEvent(args);
        }}
        onEventClick={(args) => {
          editEvent(args);
        }}
      />
    </div>
  );
};

export default Agenda;
