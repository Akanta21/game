/* global $*/

$(function () {
// accessing the image and putting it on the DOM once it is loaded
  for (var j = 0; j < 16; j++) {
    $('li').eq(j).append('<img src =" ' + url[j] + ' "/>')
  }
// hide images once it is being loaded
  $('img').hide()
// event listener once the li element is being clicked
  $('li').click(gameLogic)
// event listener to start the game
  $('#start').click(function () {
    $('.grid').css('display', 'flex')
    $('#start').toggle()
    $('#restart').toggle()
    $('body').addClass('load')
    startTimer()
  })

// event restart button
  $('#restart').click(function () {
    console.log('New Game!')
    document.location.reload(true)
  })

  // setInterval(gameLogic, 50)

  function gameLogic () {
    if ($(this).hasClass('up')) return
    $(this).addClass('up')
    $(this).children('img').removeClass('fading_div')
    $(this).children('img').show()
    if (count === 0) {
      index1 = $(this)
      guess1 = index1.children('img').attr('src')
      console.log('this is for if statement for guess1')
      count++
      console.log(count)
    } else {
      guess2 = $(this).children('img').attr('src')
      index2 = $(this)
      console.log('this is else statement for guess2' + guess2)
      console.log(index2)
      if (guess1 === guess2) {
        console.log('we have a match')
        matches++
        gameOver()
      } else {
        console.log('we do not have a match')
        index1.removeClass('up')
        index2.removeClass('up')
        index1.children('img').addClass('fading_div')
        index2.children('img').addClass('fading_div')
        $('.fading_div').fadeOut('slow')
      }
      count = 0
      index1 = 0
      index2 = 0
    }
  }
})

function gameOver () {
  if (matches === 8) {
    $('h1').text('The game is over.')
    setTimeout(delay(), 4000)
  }
}

var timer = 30

function startTimer () {
  setInterval(timerId, 1000)
  $('#timer').text(timer)
}

function timerId () {
  timer--
  $('#timer').text(timer)
  if (timer === 0) {
    $('.grid').toggle()
    $('#restart').toggle()
    $('#timer').toggle()
    $('h1').addClass('end')
    $('h1').text('Game Over')
    setTimeout(delay(), 10000)
  }
}

function delay () {
  document.location.reload(true)
}
// function scores () {
//
// }

var guess1 = ''
var guess2 = ''

var index1, index2

var count = 0
var matches = 0

// memory tiles

var url = []
// push images into the url
for (var i = 0; i < 8; i++) {
  var dir = './Images/download' + (i + 1) + '.png'
  url.push(dir)
  url.push(dir)
}
imageRandomise()
// Fisher-Yates algorithm for shuffling array with finite number of elements
function imageRandomise () {
  var i = url.length
  var j
  var temp
    // While there remain elements to shuffle
  while (--i > 0) {
        // Pick a remaining elements
    j = Math.floor(Math.random() * (i + 1))

        // if not already shuffled, move it to a new Array.
    temp = url[j]
    url[j] = url[i]
    url[i] = temp
  }
}
// function start() {
//   // no tiles flipped at the start
//   tiles_flipped = 0
//   var output = ' '
//   url.randomImages()
//   for(var i = 0; i < url.length; i++){
//     output += '<div id = "#' + i +'" onclick="memoryFlipTile(this,\''+url[i]+'\')"></div>'
//   }
//   $('#container').html = output;
// }
