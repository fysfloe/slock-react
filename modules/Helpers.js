export function withLeadingZero(num) {
  return (parseInt(num) < 10 ? "0" : "") + parseInt(num)
}

export function getQuarters(minutes) {
  if(parseInt(minutes) < 15) {
    return 4
  } else if(parseInt(minutes) < 30) {
    return 1
  } else if(parseInt(minutes) < 45) {
    return 2
  } else {
    return 3
  }
}

export function getMinutes(quarters) {
  switch(parseInt(quarters)) {
    case 1:
      return 15
      break
    case 2:
      return 30
      break
    case 3:
      return 45
      break
    case 4:
      return 0
      break
  }
}

export function getDisplayQuarters(minutes) {
  if(parseInt(minutes) < 15) {
    return '00'
  } else if(parseInt(minutes) < 30) {
    return '15'
  } else if(parseInt(minutes) < 45) {
    return '30'
  } else {
    return '45'
  }
}

export function calcMinutes(minutes, context, buffers) {
  let thirty, tens, five, ones
  thirty = tens = five = ones = false
  let minutes_to_play = []

  if(minutes >= 30) {
    thirty = context.createBufferSource()
    thirty.buffer = buffers.minutes[30]
    thirty.connect(context.destination)
  }

  if(minutes < 30 || minutes > 39) {
    var new_minutes = minutes
    if(minutes >= 40) {
      new_minutes -= 30
    }
    var tensCount = Math.floor(new_minutes/10 % 10)
    if(tensCount) {
      tens = context.createBufferSource()
      tens.buffer = buffers.minutes[tensCount*10]
      tens.connect(context.destination)
    }
  }

  var onesCount = Math.floor(minutes % 10)

  if(onesCount >= 5) {
    five = context.createBufferSource()
    five.buffer = buffers.minutes[5]
    five.connect(context.destination)
  }

  if(onesCount != 5 && onesCount != 0) {
    ones = context.createBufferSource()
    ones.buffer = buffers.minutes[onesCount % 5]
    ones.connect(context.destination)
  }

  if(thirty) minutes_to_play.push(thirty)
  if(tens) minutes_to_play.push(tens)
  if(five) minutes_to_play.push(five)
  if(ones) minutes_to_play.push(ones)

  return minutes_to_play;
}

export function playSound(context, buffers, hour, minutes, minuteMode, hourMode) {
  if(hour > 12) {
    hour -= 12
  }

  let hourSound
  let waitingTime

  if(hourMode === 'chromatic') {
    waitingTime = 1200
  } else {
    waitingTime = 600
  }

  if(hour) {
    hourSound = context.createBufferSource()
    if(hourMode === 'chromatic') {
      hourSound.buffer = buffers.chromatic[hour]
    } else {
      hourSound.buffer = buffers.hour[hour]
    }
    hourSound.connect(context.destination)

    if(minuteMode === 'minutes') {
      hourSound.start(0)
    }
  }

  if(minuteMode === 'quarters' && minutes) {
    let quartersSound = context.createBufferSource()
    quartersSound.buffer = buffers.quarters[getQuarters(minutes)]
    quartersSound.connect(context.destination)
    quartersSound.start(0)

    if(hourSound) {
      setTimeout(function() {
        hourSound.start(0)
      }, 1800)
    }
  } else if(minuteMode === 'minutes' && minutes) {
    let minutes_to_play = calcMinutes(minutes, context, buffers)
    setTimeout(function() {
      $(minutes_to_play).each(function() {
        this.start(0)
      })
    }, waitingTime)
  }
}
