import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import { alert, defaultModules } from '.././node_modules/@pnotify/core/dist/PNotify.js';
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
    if(input)
    {fetchCountries(input)
        .then(countries => {clearMarkup();
            chooseCountriesMarkup(countries);
            })
    }
}
function chooseCountriesMarkup(countries) {
    if (countries.length > 10) {
        alert({
            text: "Too many matches found. Please enter more specific query!",
            type: 'error',
            styling: 'brighttheme',
            icons: 'brighttheme',
  });
    }
    else if (countries.length == 1) {
        console.log(countries);
        appendCountryMarkup(countries[0]);
    }
    else if (countries.message) {
         alert({
    text: "Nothing found. Please enter another country!"
  });
    }
    else
    {
        countries.forEach(element => {
            console.log(element.name);
        });
        appendCountryListMarkup(countries);
        
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
