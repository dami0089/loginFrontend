import { useState, useEffect } from "react";

export function useFormattedDate(inputDate) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // January is 0!
      const year = date.getUTCFullYear();

      setFormattedDate(`${day}/${month}/${year}`);
    }
  }, [inputDate]);

  return formattedDate;
}
