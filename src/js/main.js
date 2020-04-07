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


var habits = [];


const input = document.querySelector('.header__input--js');
const headerButton = document.querySelector('.header__button--js');

headerButton.addEventListener('click', function() {
    if (input.value) {
        addNewHabit(input.value);
        input.value = "";
    }
});

function addNewHabit(title) {
    const habit = {
        name: title,
        doneDates: [],
    }
    habits.push(habit);
    showHabits();
}

function toggleHabit(habit, date) {
    if (habit.doneDates.includes(date)) {
        habit.doneDates.splice(habit.doneDates.indexOf(date), 1);
    } else {
        const index = habits.indexOf(habit);
        habits[index].doneDates.push(date);
    }
    showHabits();
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

function ShowWeekDays(date) {
    const daysList = document.querySelector('.days__list--js')

}