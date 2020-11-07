console.log('in client.js');
$(document).ready(onReady);
// -- Global variables --
// Keeps track of table rows so that each one can have a unique id.
let tableRowCounter = 0;
// Keeps track of the cumulative monthly salary.
let totalMonthlySalary = 0;
// Array of objects that keeps track of individual salaries.
let salaries = [];

// way to format an integer to USD, from stackoverflow and MDN: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

function onReady(){
    console.log('in jQuery');
    $('#add-employee').on('click', addEmployee);
    $('#employee-table').on('click', '.delete-button', deleteEmployee);
}

function addEmployee(){
    // Prevent page from reloading.
    event.preventDefault();
    // Make an object that contains the values of the submitted employee.
    let employee = {
        firstName: $('#in-first-name').val(),
        lastName: $('#in-last-name').val(),
        idNumber: $('#in-id').val(),
        title: $('#in-title').val(),
        salary: $('#in-salary').val()
    };
    // Error checking to ensure all fields have a value.
    if (employee.firstName && employee.lastName && employee.idNumber && employee.title && employee.salary){
        // Add new employee to the salaries array.
        salaries.push({row: tableRowCounter, salary: Number(employee.salary)});
        console.log(salaries);
        appendTable(employee);
        appendMonthlySalary();
        emptyValues();
        // This is used for an id field in the table row for addition and deletion later.
        tableRowCounter ++;
    } else{
        // TODO display error message on DOM
        console.log('nope');
    }
}

function appendTable(employee){
    $('#employee-table').append(`<tr id="row-${tableRowCounter}"></tr>`);
    // I wanted to use a for/in loop to append these at first, but it would make it tough to implement the formatting for USD.
    // I could do that formatting earlier, however then it may make it tricky to do math things with it later.
    $(`#row-${tableRowCounter}`).append(`<td>${employee.firstName}</td>`);
    $(`#row-${tableRowCounter}`).append(`<td>${employee.lastName}</td>`);
    $(`#row-${tableRowCounter}`).append(`<td>${employee.idNumber}</td>`);
    $(`#row-${tableRowCounter}`).append(`<td>${employee.title}</td>`);
    $(`#row-${tableRowCounter}`).append(`<td>${formatter.format(employee.salary)}</td>`);
    $(`#row-${tableRowCounter}`).append(`<td class="table-button"><button class="delete-button" id="${tableRowCounter}" value="${employee.salary}">Delete TODO</button></td>`);
}

// Adjusts the total monthly 
function appendMonthlySalary(){
    let totalSalaries = 0
    for (let x of salaries){
        totalSalaries += x.salary;
    }
    totalSalaries = formatter.format(Math.round(totalSalaries / 12));
    console.log(totalSalaries);
    $('#salaryCount').empty();
    $('#salaryCount').append(`Total Monthly Salary: ${totalSalaries}`);
}

// Deletes a row from the table when you press the delete button.
function deleteEmployee(){
    // Table row that I want to delete.
    let rowId = Number(this.id);
    // Delete that row.
    $(`#row-${rowId}`).remove();
    // Delete from salaries array.
    for (let i = 0; i < salaries.length; i++){
        if (rowId === salaries[i].row){
            salaries.splice(i, 1);
        }
    }
    appendMonthlySalary();
}


// Empties the input fields.
function emptyValues(){
    $('#in-first-name').val('');
    $('#in-last-name').val('');
    $('#in-id').val('');
    $('#in-title').val('');
    $('#in-salary').val('');
}