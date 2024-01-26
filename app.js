// Начальная скорость и ускорение
var starterSpeed = 1;
var acceleration = 0.005;

window.onload = function() {
    // Меняем видимость начального и конечного экранов
    changeState('splashScreen', 'flex');
    changeState('GameOver', 'none');
};

function changeState(ScreenName, ChangedState){
    var ScreenToChange = document.getElementById(ScreenName);
    ScreenToChange.style.display = ChangedState;
}

document.addEventListener("DOMContentLoaded", () => {
// Обработчик нажатия на кнопку "Начать игру"
document.getElementById('startButton').addEventListener('click', (e) =>  {
    changeState('splashScreen', 'none');
    game(e.clientX, e.clientY);
});
// "Вернуться в меню"
document.getElementById('retryButton').addEventListener('click', () =>  {
    changeState('GameOver', 'none');
    changeState('splashScreen','flex');
});
});

// Вспомог функция для таблицы результатов
function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

// Игра :)
function game(StartX, StartY) {
//document.addEventListener("DOMContentLoaded", () => {
    var timeStart = new Date().getTime();
    let SuperMouseX, SuperMouseY;

    document.addEventListener("mousemove", (e) => {
        SuperMouseX = e.clientX;
        SuperMouseY = e.clientY;
        //console.log(e.clientX);
        //console.log(e.clientY);
    });

    const dot = document.getElementById("dot");
    const gameContainer = document.getElementById("game-container");

    let mouseX = StartX, mouseY = StartY;
    let dotX = Math.random() * gameContainer.offsetWidth;
    let dotY = Math.random() * gameContainer.offsetHeight;
    let speed = starterSpeed;

    // Начал позиция крокодайла
    dot.style.left = dotX + "px";
    dot.style.top = dotY + "px";

    gameContainer.addEventListener("mousemove", (e) => {
        mouseX = e.clientX - gameContainer.offsetLeft;
        mouseY = e.clientY - gameContainer.offsetTop;
        //console.log(mouseX);
        //console.log(mouseY);
    });

    const update = () => {
        let dotRect = dot.getBoundingClientRect();
        let dotCenter= {
            x: dotRect.left + dotRect.width/2, 
            y: dotRect.top + dotRect.height/2
        };

        var angleDeg = -90 + Math.atan2(dotCenter.y - mouseY, dotCenter.x - mouseX) * 180 / Math.PI;
        if (dotCenter.x < mouseX) {
            dotX += speed;
        } else {
            dotX -= speed;
        }

        if (dotCenter.y < mouseY) {
            dotY += speed;
        } else {
            dotY -= speed;
        }

        dot.style.left = dotX + "px";
        dot.style.top = dotY + "px";
        dot.style.transform = 'rotate(' + angleDeg + 'deg)';
        

        // если крок догнал нас ИЛИ игрок вышел за пределы поля = геймовер
        if ((Math.abs(dotCenter.x - mouseX) < speed && Math.abs(dotCenter.y - mouseY) < speed) || ((SuperMouseX > gameContainer.offsetWidth) || (SuperMouseY > gameContainer.offsetHeight))) {
            return gameOver();
        } else {
            requestAnimationFrame(update);
            speed += acceleration;
            return 0;
        }
    };

    // Геймовер
    const gameOver = () => {
        var timeEnd = new Date().getTime();
        var timeResult = timeEnd - timeStart;
        document.getElementById("PlayerResult").innerHTML = timeResult;
        createTable([["PlayerSanya", timeResult]]);
        changeState('GameOver','flex');
        //alert("Game Over");
        return 1;
        // dotX = Math.random() * gameContainer.offsetWidth;
        // dotY = Math.random() * gameContainer.offsetHeight;
        // speed = 1;
        // update();
    };

    update();
//});
}

