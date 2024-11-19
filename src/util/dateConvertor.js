import moment from "jalali-moment";
export const dateConvertor = (timestamp) => {
  const shamsiDate = moment(timestamp).locale("fa").format("YYYY/MM/DD");
  const miladiDate = moment(timestamp).format("YYYY/MM/DD");
  const shamsi_fa = moment(timestamp).locale("fa").format("jD jMMMM jYYYY");
  const shamsi_fa_day = moment(timestamp)
    .locale("fa")
    .format("dddd, jD jMMMM jYYYY");

  return { shamsiDate, miladiDate, shamsi_fa, shamsi_fa_day };
};
