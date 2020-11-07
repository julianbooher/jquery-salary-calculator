console.log('in client.js');
$(document).ready(onReady);
let tableRowCounter = 0;

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
    appendTable(employee);
    emptyValues();
    console.log(formatter.format(employee.salary));
}

function appendTable(employee){
    $('#employee-table').append(`<tr id="row-${tableRowCounter}"></tr>`);
    $(`#row-${tableRowCounter}`).append(`<td>${employee.firstName}</td>`);
    $(`#row-${tableRowCounter}`).append(`<td>${employee.lastName}</td>`);
    $(`#row-${tableRowCounter}`).append(`<td>${employee.idNumber}</td>`);
    $(`#row-${tableRowCounter}`).append(`<td>${employee.title}</td>`);
    $(`#row-${tableRowCounter}`).append(`<td>${formatter.format(employee.salary)}</td>`);
    
    
    $(`#row-${tableRowCounter}`).append(`<button>Delete TODO</button>`);
}

function emptyValues(){
    $('#in-first-name').val('');
    $('#in-last-name').val('');
    $('#in-id').val('');
    $('#in-title').val('');
    $('#in-salary').val('');
}