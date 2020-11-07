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
    // This is used for an id field in the table row for addition and deletion later.
    tableRowCounter ++;
    console.log(formatter.format(employee.salary));
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
    $(`#row-${tableRowCounter}`).append(`<td class="table-button"><button>Delete TODO</button></td>`);
}

function emptyValues(){
    $('#in-first-name').val('');
    $('#in-last-name').val('');
    $('#in-id').val('');
    $('#in-title').val('');
    $('#in-salary').val('');
}