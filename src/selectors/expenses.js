import moment from "moment";
// Get visible expenses

// input เป็น array of expenses(object)
// return เป็น array of expenses หลังจากใส่ object filter{} แล้ว
export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAtMoment = expense.createdAt;
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      }

      if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
