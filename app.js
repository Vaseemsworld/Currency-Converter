const BASE_URL = "https://v6.exchangerate-api.com/v6/3d62d3a0e7e4df616e7e331e/latest";

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('#btn');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const amountInput = document.querySelector('.amount input');
const msg = document.querySelector('.msg');

// Function to update flag based on selected currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    try{
        img.src = newSrc;
    } catch(error){
        console.error("Error updating flag image:",error);
        alert('Sorry! Some error occured. Try again')
    }
};
// Event listeners for dropdowns
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === 'from' && currCode === 'USD') {
            newOption.selected = 'selected';
        } else if (select.name === 'to' && currCode === 'INR') {
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Event listener for button click
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amtVal = amountInput.value;
    if (amtVal === '' || amtVal < 0) {
        amtVal = 1;
        amountInput.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;
    try{
        let response = await fetch(URL);
    let data = await response.json();
    let conversionRate = data.conversion_rates[toCurr.value];
    let convertedAmount = (amtVal * conversionRate).toFixed(2);
    msg.innerText = (`${amtVal} ${fromCurr.value}  = ${convertedAmount} ${toCurr.value}`)
    }
    catch(error){
        console.error("Error fetching data:",error);
        alert("An error occurred while fetching data.Please try again later.");
    }
     
});

// Event listener for window load
window.addEventListener('load', () => {
    amountInput.value = 1;
});
