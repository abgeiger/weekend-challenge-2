console.log('js sourced');
var operation = 'none';
var stage = 'first';
var firstNumber = '';
var secondNumber = '';
var answer = '';

$(document).ready(readyNow);

// event listeners
function readyNow() {
    console.log('JQ sourced');
    displayHistory();
    $('#postButton').on('click', postButtonClick);
    $('#clearButton').on('click', clearButtonClick);
    $('.operatorButton').on('click', operatorButtonClick);
    $('.numberButton').on('click', numberButtonClick);
}

function numberButtonClick() {
    if (stage === 'first') {
        firstNumber += $(this).text();
        $('.display-screen-span').append('<span>' + $(this).text() + '</span>');
    } else if (stage === 'second') {
        secondNumber += $(this).text();
        $('.display-screen-span').append('<span>' + $(this).text() + '</span>');
    } else if (stage === 'third') {
        stage = 'first';
        $('.display-screen-span').html('');
        firstNumber += $(this).text();
        $('.display-screen-span').append('<span>' + $(this).text() + '</span>');
    }
}

function operatorButtonClick() {
    if (stage === 'first' && firstNumber !== '') {
        operation = $(this).text();
        $('.display-screen-span').append('<span> ' + operation + ' </span>');
        stage = 'second';
    } else if (stage === 'second' && secondNumber === '') {
        operation = $(this).text();
        $('.display-screen-span').children().last().html(' ' + operation + ' ');
    }
}

function postButtonClick() {
    if (stage === 'second' && secondNumber !== '') {
        var object = {};
        object.inputOne = firstNumber;
        object.inputTwo = secondNumber;
        object.operation = operation;

        // send math problem to server
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

        // retrieve answer to math problem with get request, run post request to add the answer to the history module, 
        // and get complete history from history module and put in in the history screen
        $.ajax({
            method: 'GET',
            url: '/calculate',
            success: function(response) {
                console.log('the calculated data returned is:', response);
                answer = response.number;
                $('.display-screen-span').append('<span> = ' + response.number + '</span>');
                stage = 'third';
                operation = 'none';
                firstNumber = '';
                secondNumber = '';

                // run post request to add the answer to the history module
                $.ajax({
                    method: 'POST',
                    url: '/calculate/answer',
                    data: {answer: answer},
                    success: function(response){
                        console.log('object sent as answer:', object);
                        console.log('response is:', response);

                        displayHistory();
                    },
                    error: function(error){
                    console.log('The "/calculate/answer" ajax post request failed with error: ', error);
                    }
                });
            }
        });
    }
}

// get complete history from history module and put in in the history screen
function displayHistory() {
    $.ajax({
        method: 'GET',
        url: '/calculate/history',
        success: function(response) {
            console.log('the history array is:', response);
            var output = '';
            for (var index = 0; index < response.length; index++) {
                output += '<p>' + response[index].inputOne + ' ' + response[index].operation + ' ' + response[index].inputTwo + ' = ' + response[index].answer + '</p>';
            }
            $('.history-screen').html(output);
        }
    });
}

// resets glabal variables, clears display-screen-span, sets stage to first, and runs a get request to clear
//  calculateData in routes/calculate.js
function clearButtonClick() {
    operation = 'none';
    firstNumber = '';
    secondNumber = '';
    answer = '';
    $('.display-screen-span').html('');
    stage = 'first';

    // runs a get request to clear calculateData in routes/calculate.js
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