const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelectorAll(".time-location p")[0];
const dateAndTimeField = document.querySelectorAll(".time-location p")[1];
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation);

let target = 'Ghaziabad';

const fetchResult = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=9c3fe8b08048405892b160414252805&q=${targetLocation}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    let splitDate = time.split(" ")[0];
    let splitTime = time.split(" ")[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    updateDetails(temp, locationName, splitDate, splitTime, currentDay, condition);
};

function updateDetails(temp, locationName, splitDate, splitTime, currentDay, condition) {
    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateAndTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResult(target);
}

fetchResult(target);

function getDayName(number) {
    switch (number) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}
