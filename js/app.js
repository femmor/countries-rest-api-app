// TODO
// API Call - done
// Theme toggle - done
// Search - 
// Filter
// Modal

document.addEventListener('DOMContentLoaded', () => {
    const countriesEl = document.getElementById('countries')
    const toggleBtn = document.getElementById('toggle')
    const dropdown = document.getElementById('dropdown')
    const regions = document.getElementById('regions')
    const searchInput = document.getElementById('search')
    const regionsUl = document.getElementById('regions')
    const filterByRegion = dropdown.querySelectorAll('li')
    const modal = document.getElementById('modal')
    const close = document.getElementById('close')

    getCountries()

    // get countries
    async function getCountries() {
        const res = await fetch('https://restcountries.eu/rest/v2/all')
        const countries = await res.json()
        const regions = countries.map(country => {
            return country.region
        })

        // Display countries
        displayCountries(countries)
        // displayRegions(regions)
    }

    // Display Countries
    function displayCountries(countries){
        countriesEl.innerHTML = ''

        countries.forEach(country => {
            const countryEl = document.createElement('div')
            countryEl.classList.add('country-card')
            countryEl.innerHTML = `
                <div class="">
                    <div class="country-card-header">
                        <img src="${country.flag}" class="country-flag" alt="country-flag">
                    </div>
                    <div class="country-card-body">
                        <h4 class="country-name">${country.name}</h4>
                        <p>Population<strong>: ${country.population.toLocaleString()}</strong></p>
                        <p class="country-region">Region<strong>: ${country.region}</strong></p>
                        <p>Capital<strong>: ${country.capital}</strong></p>
                    </div>
                </div>
            `
            countryEl.addEventListener('click', () => {
                modal.style.display = 'flex'
                showCountryDetails(country)
            })

            close.addEventListener('click', () => {
                modal.style.display = 'none'
            })

            countriesEl.appendChild(countryEl)
        });
    }

    function showCountryDetails(country) {
        const modalBody = modal.querySelector('.modal-body')
        const modalImage = modal.querySelector('img')

        modalImage.src = country.flag
        modalBody.innerHTML = `
            <h4>${country.name}</h4>
            <p>Native Name<strong>: ${country.nativeName}</strong></p>
            <p>Population<strong>: ${country.population.toLocaleString()}</strong></p>
            <p>Region<strong>: ${country.region}</strong></p>
            <p>Sub Region<strong>: ${country.subregion}</strong></p>
            <p>Capital<strong>: ${country.capital}</strong></p>
            <p>Top Level Domain<strong>: ${country.topLevelDomain[0]}</strong></p>
            <p>Currencies<strong>: ${
                country.currencies.map(currency => currency.code)
            }</strong></p>
            <p>Languages<strong>: ${
                country.languages.map(language => language.name)
            }</strong></p>
        `
    }


    // Toggle
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark')
    })

    // Toggle Dropdown
    dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('open')
    })

    // Search input
    searchInput.addEventListener('input', (e) => {
        const {value} = e.target
        const countryName = document.querySelectorAll('.country-name')

        countryName.forEach(name => {
            if(name.innerText.toLowerCase().includes(value.toLowerCase())) {
                name.parentElement.parentElement.style.display = 'block'
            } else {
                name.parentElement.parentElement.style.display = 'none'
            }

        })
    })

    // filterByRegions
    filterByRegion.forEach(filter => {
        filter.addEventListener('click', () => {
            const countryRegion = document.querySelectorAll('.country-region')

            countryRegion.forEach(region => {
                if (region.innerText.includes(value) || value === 'All') {
                    // .card -> .card-body -> .country-region
                    region.parentElement.parentElement.style.display = 'block';
                } else {
                    region.parentElement.parentElement.style.display = 'none';
                }
            });
        })
    })
})