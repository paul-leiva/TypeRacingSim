const RANDOM_QUOTE_URL = 'http://api.quotable.io/random'
const quoteDisplay = document.getElementById('quoteDisplay')
const quoteInput = document.getElementById('quoteInput')

function getQuote () {
    return fetch(RANDOM_QUOTE_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getQuote()
    quoteDisplay.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.classList.add('correct') // if you type the letter correctly
        characterSpan.innerText = character
        quoteDisplay.appendChild(characterSpan)
    })
    quoteInput.value = null
    console.log(quote)
}

getNextQuote()