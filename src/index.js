import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import { alert, } from '.././node_modules/@pnotify/core/dist/PNotify.js';
const debounce = require('lodash.debounce');

import countryListTpl from './templates/countryList.hbs'
import countryTpl from './templates/country.hbs'

const refs = {
    input: document.getElementById("country-name-input"),
    countriesContainer: document.querySelector('.js-countires-container'),
};
refs.input.addEventListener('input',  debounce(OnInput, 500),);
function OnInput(event) {
    const input = event.target.value.trim();
    clearMarkup();
    if(input)
    {fetchCountries(input)
        .then(countries => {
            chooseCountriesMarkup(countries);
            })
    }
}
function chooseCountriesMarkup(countries) {
    if (countries.length > 10) {
        alert({
            text: "Too many matches found. Please enter more specific query!",
            type: 'error',
            closer: false,
            sticker: false,
            width: '360px',
            delay:1000,
  });
    }
    else if (countries.length == 1) {
        appendCountryMarkup(...countries);
    }
    else if (countries.length >1 && countries.length <=10)
    {
        appendCountryListMarkup(countries);
    }
    else  {
        alert({
            text: "Nothing found. Please enter another country!",
            closer: false,
            sticker: false,
            delay:1000,
            width: '360px',
            }
  );
    }
}
function appendCountryListMarkup(countries) {
    const countriesMarkup = countryListTpl(countries);
  refs.countriesContainer.insertAdjacentHTML('beforeend', countriesMarkup);
}
function appendCountryMarkup(countries) {
    const countryMarkup = countryTpl(countries);
    console.log(countryMarkup);
  refs.countriesContainer.insertAdjacentHTML('beforeend', countryMarkup);
}
function clearMarkup() {
    refs.countriesContainer.innerHTML = "";
}
