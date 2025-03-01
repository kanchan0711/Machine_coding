(async function () {
    const res = await fetch("./data.json");
    const data = await res.json();
    console.log(data);
  
    let employee = data;
    let selectedEmployeeId = employee[0].id;
    let selectedEmployee = employee[0];
  
    const employeeList = document.querySelector(".employee__names--list");
    const employeeInfo = document.querySelector(".employee__names--info");
  
    const createEmployeeButton = document.querySelector(".addEmployee");
    const addEmployeePage = document.querySelector(".addEmployee_page");
    const addEmployee_details = document.querySelector(".addEmployee_details");
    const createEmployee = document.querySelector(".addEmployee_create--submit");
    const closeForm = document.querySelector(".closeForm ");
  
    createEmployeeButton.addEventListener("click", () => {
      addEmployeePage.style.display = "flex";
    });
    closeForm.addEventListener("click", () => {
      addEmployeePage.style.display = "none";
    });
  
    addEmployee_details.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const formData = new FormData(addEmployee_details);
      const values = Object.fromEntries(formData.entries());
      console.log(values);

    values.id = employee[employee.length - 1].id + 1;
    values.imageUrl =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

      employee.push(values);
      renderEmployees();
      addEmployeePage.style.display = "none";

    });
  
    employeeList.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
        selectedEmployeeId = e.target.id;
        selectedEmployee = employee.find(
          (emp) => emp.id === parseInt(selectedEmployeeId, 10)
        ); // Update selectedEmployee
        renderSingleEmployee();
      }
    });
  
    const renderEmployees = () => {
      employeeList.innerHTML = "";
      employee.forEach((emp) => {
        const employee = document.createElement("span");
        employee.classList.add("employee__names--items");
  
        if (parseInt(selectedEmployeeId, 10) === emp.id) {
          employee.classList.add("selected");
  
          selectedEmployee = emp;
        }
        employee.setAttribute("id", emp.id);
        employee.innerHTML = `${emp.firstName} ${emp.lastName}  ❌`;
  
        employeeList.append(employee);
      });
    };
  
    const renderSingleEmployee = () => {
      employeeInfo.innerHTML = `
      <img height=200 src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" referrerpolicy="no-referrer" alt="Profile Picture">
  
      <span class= "employee__single--heading">
      ${selectedEmployee.firstName} </span>
      <span>${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>${selectedEmployee.contactNumber}<span/>
      <span>DOB - ${selectedEmployee.dob}</span>
      `;
    };
  
    if (selectedEmployee) renderSingleEmployee();
    renderEmployees();
  })();
  