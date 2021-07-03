import React, { useState, useEffect } from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
const Agenda = () => {
  const [event, setEvent] = useState({
    startDate: "2021-10-01",
    days: 31,
    scale: "Day",
    eventHeight: 30,
    cellWidth: 50,
    timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
    cellWidthSpec: "Auto",
    resources: [],
    events: [
      {
        id: 1,
        text: "Event 1",
        start: "2021-10-02T00:00:00",
        end: "2021-10-02T00:00:00",
        resource: "10H",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2021-10-03T00:00:00",
        end: "2021-10-03T00:00:00",
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
        text: "Event 3",
        start: "2021-10-08T00:00:00",
        end: "2021-10-08T00:00:00",
        resource: "14H",
        barColor: "#cc0000",
        barBackColor: "#ea9999",
      },
    ],
  });

  const getTime = () => {
    let hours = [];
    for (let i = 8; i <= 20; i++) {
      hours.push({ name: i + ":00", id: i + "H" });
    }

    return hours;
  };

  useEffect(() => {
    setEvent({ resources: getTime() });
  }, []);

  const handleClick = () => {
    console.log("clicked");
    DayPilot.onEventClick = function (args) {
      if (args.e.id() === "3") {
        args.preventDefault();
      }
    };
  };
  const { ...config } = event;
  return (
    <div className=" py-5 px-2">
      <DayPilotScheduler cellWidth={100} eventHeight={50} {...config} />
    </div>
  );
};

export default Agenda;
