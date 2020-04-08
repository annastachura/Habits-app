"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}


const json2 = localStorage.getItem("Data");
var habits = JSON.parse(json2);

if (habits == null) {
    habits = [];
}
const input = document.querySelector('.header__input--js');
const headerButton = document.querySelector('.header__button--js');
showHabits();

headerButton.addEventListener('click', function() {
    if (input.value) {
        addNewHabit(input.value);
        input.value = "";
    }
});

input.addEventListener('keyup', function(e) {
    if (input.value && e.keyCode === 13) {
        addNewHabit(input.value);
        input.value = "";
    }

});


function addNewHabit(title) {
    const habitNames = habits.map(function(habit) {
        return habit.name;
    })
    if (habitNames.includes(title)) {
        return;
    }
    const habit = {
        name: title,
        doneDates: [],
    }
    habits.push(habit);
    showHabits();
    const json = JSON.stringify(habits);
    localStorage.setItem('Data', json);

}


function toggleHabit(habit, date) {
    if (habit.doneDates.includes(date)) {
        habit.doneDates.splice(habit.doneDates.indexOf(date), 1);
    } else {
        const index = habits.indexOf(habit);
        habits[index].doneDates.push(date);
    }
    showHabits();
    const Json = JSON.stringify(habits);
    localStorage.setItem('Data', Json);




    // const habitsStatus = document.querySelector('.habits__status');
    // const habitsStatusDone = document.querySelector('.habits__status--done');
    // habitsStatus.addEventListener('click', function() {
    // });
}

function showHabits() {
    const habitsList = document.querySelector('.habits__list--js');
    habitsList.innerHTML = "";
    habits.forEach(function(habit) {
        var habitLi = document.createElement("li");
        habitLi.classList.add("habits__item");
        habitLi.innerHTML += `<span class="habits__input"> ${habit.name} </span>`

        var date = new Date();
        date.setDate(date.getDate() - 6);
        for (var i = 0; i < 7; i++) {
            const dateString = date.toLocaleDateString();
            const done = habit.doneDates.includes(dateString);
            var span = document.createElement("span")
            span.classList.add("habits__status");
            if (done) {
                span.classList.add("habits__status--done");
            }
            habitLi.appendChild(span);
            date.setDate(date.getDate() + 1);
            span.addEventListener('click', function() {
                toggleHabit(habit, dateString);
            })
        }
        habitsList.appendChild(habitLi);
    });
}



function showWeekDays() {
    const daysList = document.querySelector('.days__list--js')
    var date = new Date();
    date.setDate(date.getDate() - 6);
    for (var i = 0; i < 7; i++) {
        var li = document.createElement("li");
        daysList.appendChild(li);
        li.innerHTML = "pon";
        li.classList.add("days__item");
        const day = `${date.getDate()}.${date.getMonth()+1}`;
        li.innerHTML = day;
        date.setDate(date.getDate() + 1);
    }
}

showWeekDays();