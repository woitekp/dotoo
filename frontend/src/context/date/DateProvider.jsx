import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import detectDateLocale from "./detectDateLocale";
import "dayjs/locale/en-gb";

dayjs.extend(localizedFormat);

const dateLocale = detectDateLocale();

dayjs.locale(dateLocale);

function DateProvider({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={dateLocale}>
      {children}
    </LocalizationProvider>
  );
}

export default DateProvider;
