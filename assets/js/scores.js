const highscores = document.getElementById('highscores')



listItem = document.createElement('li')
listItem.textContent = localStorage.getItem("Name") + ' , ' + localStorage.getItem("Score");
highscores.appendChild(listItem)