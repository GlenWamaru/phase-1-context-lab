/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}

/* Define functions */

function createEmployeeRecord(employeeInfo) {
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);
  if (timeIn && timeOut) {
    return (timeOut.hour - timeIn.hour) / 100;
  }
  return 0;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor(employee);
  }, 0);
}

/* Test Data */
const employeesData = [
  ["John", "Doe", "Engineer", 25],
  ["Jane", "Smith", "Designer", 20],
  ["Mike", "Johnson", "Manager", 30],
];

/* Create Employee Records */
const employees = createEmployeeRecords(employeesData);

/* Test Functionality */
createTimeInEvent(employees[0], "2023-10-09 0900");
createTimeOutEvent(employees[0], "2023-10-09 1700");
createTimeInEvent(employees[1], "2023-10-09 1000");
createTimeOutEvent(employees[1], "2023-10-09 1800");
createTimeInEvent(employees[2], "2023-10-09 0800");
createTimeOutEvent(employees[2], "2023-10-09 1600");

console.log(allWagesFor(employees[0])); // Output: 800
console.log(allWagesFor(employees[1])); // Output: 1600
console.log(allWagesFor(employees[2])); // Output: 2400

console.log(calculatePayroll(employees)); // Output: 4800
