const endGame = final => {
  let time = 0

  document.querySelectorAll('button.box').forEach(box => box.removeEventListener('click', handleBox))

  Object.entries(virtual_board)
  .filter(([, value]) => value === -1)
  .forEach(([key,]) => {
    const box = document.querySelector(`button.box[key="${key}"]`)

    box.classList.add(final)
    box.style.transitionDelay = `${time}ms`

    time += 10
  })
}

const openArea = () => {
  const {mines} = game_prperties[difficulty_selected]
  const {cols, rows} = game_prperties[difficulty_selected].size
  const [y, x] = area_queue.shift()
  const area = [
    `${y - 1}|${x}`,
    `${y - 1}|${x - 1}`,
    `${y - 1}|${x + 1}`,
    `${y}|${x - 1}`,
    `${y}|${x + 1}`,
    `${y + 1}|${x}`,
    `${y + 1}|${x - 1}`,
    `${y + 1}|${x + 1}`
  ]

  area.forEach(key => {
    if (virtual_board[key] === undefined)
      return
    
    const isHidden = document.querySelector(`button.box[key="${key}"]`).classList.contains('hidden')
    const position = key.split('|').map(coordinate => Number(coordinate))

    console.log(isHidden)

    if (isHidden) {
      if (virtual_board[key] === 0)
        area_queue.push(position)

      document.querySelector(`button.box[key="${key}"]`).classList.remove('hidden')
      visible_box++
    }
  })

  if (visible_box === cols * rows - mines) {
    endGame('success')
    return alert('you win')
  }

  if (area_queue.length > 0)
    openArea()
}

const handleBox = e => {
  const key = e.target.getAttribute('key')
  const [y, x] = key.split('|').map(coordinate => Number(coordinate))

  const {mines} = game_prperties[difficulty_selected]
  const {cols, rows} = game_prperties[difficulty_selected].size
  
  if (virtual_board[key] === -1) {
    endGame('bomb')
    return alert('you lose')
  }

  e.target.classList.remove('hidden')
  e.target.removeEventListener('click', handleBox)
  visible_box++

  if (visible_box === cols * rows - mines) {
    endGame('success')
    return alert('you win')
  }

  if (virtual_board[key] === 0) {
    area_queue.push([y, x])
    openArea()
  }
}

const handleButtonSlrOptionsVisibility = () => selector.classList.toggle(string_values.VISIBILITY_STATUS)
const handleButtonPlay = () => {
  if (!difficulty_selected)
    return alert('Must select a game difficult before to start')
  
  const {mines} = game_prperties[difficulty_selected]
  const {cols, rows} = game_prperties[difficulty_selected].size
  const mines_coodinates = new Set()

  let x = 0
  let y = 0
  let posy = 0
  let posx = 0

  ;[...board.children].forEach(child => board.removeChild(child))
  virtual_board = {}
  visible_box = 0
  
  for (let i = 0; i < rows * cols; i++) {
    const box = document.createElement('button')

    box.classList.add('box')
    box.classList.add('hidden')
    box.tabIndex = '-1'

    box.style.gridColumn = `${x + 1}`
    box.style.gridRow = `${y + 1}`

    box.setAttribute('key', `${y}|${x}`)
    box.addEventListener('click', handleBox)

    board.appendChild(box)
    
    virtual_board[`${y}|${x}`] = 0

    y += x + 1 === cols ? 1 : 0 
    x += x + 1 === cols ? -x : 1
  }

  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
  board.style.gridTemplateRows = `repeat(${rows}, 1fr)`

  while (mines_coodinates.size < mines) {
    posy = Math.round(Math.random() * (rows - 1))
    posx = Math.round(Math.random() * (cols - 1))

    mines_coodinates.add(`${posy}|${posx}`)
  }

  mines_coodinates.forEach(key => virtual_board[key] = -1)

  Object.entries(virtual_board)
  .filter(([, value]) => value === 0)
  .forEach(([key, value]) => {
    [y, x] = key.split('|').map(coordinate => Number(coordinate))

    const area = [
      `${y - 1}|${x}`,
      `${y - 1}|${x - 1}`,
      `${y - 1}|${x + 1}`,
      `${y}|${x - 1}`,
      `${y}|${x + 1}`,
      `${y + 1}|${x}`,
      `${y + 1}|${x - 1}`,
      `${y + 1}|${x + 1}`
    ]

    area.forEach(coordinate => {
      if (virtual_board[coordinate] !== undefined && virtual_board[coordinate] === -1)
        value++
    })

    if (value > 0)
      document.querySelector(`button.box[key="${key}"]`).innerText = virtual_board[key] = value
  })
}
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
    mines: 40,
    size: {
      cols: 18,
      rows: 12
    }
  },
  [string_values.DIFFICULTY.HARD]: {
    text: 'Hard',
    mines: 150,
    size: {
      cols: 30,
      rows: 20
    }
  },
  [string_values.DIFFICULTY.EXTREME]: {
    text: 'Extreme',
    mines: 400,
    size: {
      cols: 50,
      rows: 25
    }
  }
}

Object.freeze(string_values)
Object.freeze(game_prperties)

const selector = document.querySelector('div.selector')
const slr_options = document.querySelector('ul.slr-options')
const board = document.querySelector('div#board')
const text_difficulty_selected = document.querySelector('span#difficulty-selected')
const button_slr_options_visibility = document.querySelector('button.slr-options-visibility')
const button_play = document.querySelector('button#play')

let difficulty_selected = undefined
let virtual_board = {}
let visible_box = 0
let area_queue = []

button_slr_options_visibility.addEventListener('click', handleButtonSlrOptionsVisibility)
button_play.addEventListener('click', handleButtonPlay)

Object.entries(game_prperties).forEach(([key, value]) => {
  const li = document.createElement('li')
  const button = document.createElement('button')

  button.addEventListener('click', handleButtonSlrOptions)
  button.setAttribute('key', key)
  button.innerText = `${value.text} (${value.mines} Mines)`

  li.appendChild(button)
  slr_options.appendChild(li)
})