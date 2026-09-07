import { useState, useEffect } from "react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDateTime = (date, compact) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mon = MONTHS[date.getMonth()];
  const yyyy = date.getFullYear();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");

  if (compact) {
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm} ${hh}:${min}:${sec} ${ampm}`;
  }
  return `${dd}-${mon}-${yyyy} ${hh}:${min}:${sec} ${ampm}`;
};

export const useLiveDateTime = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const isCompact = window.innerWidth < 600;
      setDateTime(formatDateTime(new Date(), isCompact));
    };

    tick();

    const timer = setInterval(tick, 1000);
    window.addEventListener("resize", tick);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return dateTime;
};
