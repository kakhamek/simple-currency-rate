/**
 * Simple Currency Exchange Rate 
 * Author: Kakhaber Mekvabishvili
 */
document.addEventListener('DOMContentLoaded', async () => {
  
    // NBG API url
    const API_URL = 'https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies';

    const printRate = document.getElementById('rates');

    // Fetch all rates from NBG Api
    async function fetchExchangeRates() 
    {
        try {

            const response = await fetch(API_URL);
            var data = await response.json();
            return data;

        } catch (error) {

            printRate.innerHTML = `შეცდომა: ${error}`;
            return null;

        }
    }
   
    // Date formater
    function prettyDate(dateString) {

        const date = new Date(dateString);

        return new Intl.DateTimeFormat('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            weekday: 'long'
        }).format(date);
    }

    const data = await fetchExchangeRates();
    const rates = data[0].currencies;

    // list of currencies 
    const currencies = Array('USD','EUR','GBP','RUB','TRY');

    if(data)
    {

        let html = `<table>`;

        currencies.forEach(currency => {

            rates.forEach(nbg => {

                if(currency.toString() == nbg.code) {
                    
                    let cls = nbg.diff < 0 ? 'down' : 'up';

                    html += `
                    <tr>
                        <td>
                            <div>${nbg.quantity} ${nbg.name}</div>
                            <small>${prettyDate(nbg.date)}</small>
                        </td>
                        <td>
                            <div>${nbg.rate}₾ </div>
                            <small class="${cls}">${nbg.diff}</small>
                        </td>
                    </tr>`;
                }
            });

        });
        
        html += `</table>`;

        printRate.innerHTML = html;

    }
    
});