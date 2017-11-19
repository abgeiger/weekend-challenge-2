console.log('js sourced');
var operation = 'none';

$(document).ready(readyNow);

function readyNow() {
    console.log('JQ sourced');
    $('#additionButton').on('click', additionButtonClick);
    $('#subtractionButton').on('click', subtractionButtonClick);
    $('#multiplicationButton').on('click', multiplicationButtonClick);
    $('#divisionButton').on('click', divisionButtonClick);
    $('#postButton').on('click', postButtonClick);
    $('#clearButton').on('click', clearButtonClick);
}

function additionButtonClick() {
    operation = '+';
}

function subtractionButtonClick() {
    operation = '-';
}

function multiplicationButtonClick() {
    operation = '*';
}

function divisionButtonClick() {
    operation = '/';
}

function postButtonClick() {
    var object = {};
    var $inputOne = $('#inputOne').val();
    var $inputTwo = $('#inputTwo').val();

    if ($inputOne !== undefined && $inputTwo !== undefined && operation !== 'none') {
        object.inputOne = $inputOne;
        object.inputTwo = $inputTwo;
        object.operation = operation;
    } else {
        console.log('invalid inputs and/or operation');
    }

    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: object,
        success: function(response){
          console.log('object sent to calculate:', object);
          console.log('response is:', response);
        },
        error: function(error){
          console.log('The "/calculate" ajax post request failed with error: ', error);
        }
      });

      $.ajax({
        method: 'GET',
        url: '/calculate',
        success: function(response) {
            console.log('the calculated data returned is:', response);
            $('#answer').html(response.number);
            
        }
    });

    operation = 'none';
    $('input').val('');
}

function clearButtonClick() {
    operation = 'none';
    $('input').val('');
    $('#answer').html('');

    $.ajax({
        method: 'GET',
        url: '/calculate/clear',
        success: function(response){
          console.log('the "/calculate/clear" get is:', response);
        },
        error: function(error){
          console.log('The "/calculate/clear" ajax get request failed with error: ', error);
        }
      });
}