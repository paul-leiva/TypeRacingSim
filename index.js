const URL_FOR_QUOTES = 'http://api.quotable.io/random'
const timerEl = document.getElementById('timer')
const quoteDisplayEl = document.getElementById('quoteDisplay')
const quoteInputEl = document.getElementById('quoteInput')

quoteInputEl.addEventListener('input', () => {
  const arrayQuote = quoteDisplayEl.querySelectorAll('span')
  const arrayValue = quoteInputEl.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) getNextQuote()
})

function getQuote() {
  return fetch(URL_FOR_QUOTES)
    .then(response => response.json())
    .then(data => data.content)
}

async function getNextQuote() {
  const quote = await getQuote()
  quoteDisplayEl.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayEl.appendChild(characterSpan)
  })
  quoteInputEl.value = null
  startTimer()
}

let startTime
function startTimer() {
  timerEl.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

getNextQuote()