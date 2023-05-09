const handleButtonSlrOptionsVisibility = () => selector.classList.toggle(string_values.VISIBILITY_STATUS)
const handleButtonSlrOptions = e => {
  const key = e.target.getAttribute('key')

  difficulty_selected = key
  text_difficulty_selected.innerText = game_prperties[key].text
  selector.classList.toggle(string_values.VISIBILITY_STATUS)
}

const string_values = {
  VISIBILITY_STATUS: 'visible',
  DIFFICULTY: {
    EASY: 'easy',
    NORMAL: 'normal',
    HARD: 'hard',
    EXTREME: 'extreme'
  }
}

const game_prperties = {
  [string_values.DIFFICULTY.EASY]: {
    text: 'Easy',
    mines: 10,
    size: {
      cols: 10,
      rows: 10
    }
  },
  [string_values.DIFFICULTY.NORMAL]: {
    text: 'Normal',
    mines: 50,
    size: {
      cols: 18,
      rows: 12
    }
  },
  [string_values.DIFFICULTY.HARD]: {
    text: 'Hard',
    mines: 100,
    size: {
      cols: 30,
      rows: 20
    }
  },
  [string_values.DIFFICULTY.EXTREME]: {
    text: 'Extreme',
    mines: 200,
    size: {
      cols: 40,
      rows: 25
    }
  }
}

Object.freeze(string_values)
Object.freeze(game_prperties)

const selector = document.querySelector('div.selector')
const slr_options = document.querySelector('ul.slr-options')
const text_difficulty_selected = document.querySelector('span#difficulty-selected')
const button_slr_options_visibility = document.querySelector('button.slr-options-visibility')

let difficulty_selected = undefined

button_slr_options_visibility.addEventListener('click', handleButtonSlrOptionsVisibility)

Object.entries(game_prperties).forEach(([key, value]) => {
  const li = document.createElement('li')
  const button = document.createElement('button')

  button.addEventListener('click', handleButtonSlrOptions)
  button.setAttribute('key', key)
  button.innerText = `${value.text} (${value.mines} Mines)`

  li.appendChild(button)
  slr_options.appendChild(li)
})