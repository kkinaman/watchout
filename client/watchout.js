var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisionCount: 0
};

var gameBoard = d3.select('.board').append('svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

var Player = function () {
  this.fill = '#ff6600';
  this.x = gameOptions.width / 2;
  this.y = gameOptions.height / 2;
  this.angle = 0;
  this.r = 10;
};

Player.prototype.render = function(gameBoard ) {
  gameBoard.append('circle')
          .attr('class', 'player')
          .attr('cx', this.x)
          .attr('cy', this.y)
          .attr('r', this.r )
          .attr('fill', this.fill);
};

var Enemy = function(i) {
  this.id = i;
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;
  this.r = 10;
  this.hasHit = false;
};

var createEnemies = function() {
  return d3.range(0, gameOptions.nEnemies).map(function(i) {
    return new Enemy(i);
  });
};

var renderEnemies = function (enemies) {
  gameBoard.selectAll('circle.enemy')
            .data(enemies, function(d) {
              return d.id;
            })
            .enter().append('circle')
            .attr('class', 'enemy')
            .attr('cx', function(enemy) { return enemy.x; })
            .attr('cy', function(enemy) { return enemy.y; })
            .attr('r', function(enemy) { return enemy.r; });
};
var updateCollisions = function() {
  gameStats.collisionCount++;
  d3.select('.collisions').text(gameStats.collisionCount);
};
 
var updateBestScore = function() {
  if (gameStats.score >= gameStats.bestScore) {
    var intNum = Math.floor(gameStats.score.toString());
    gameStats.bestScore = intNum;
    d3.select('.best-score').text(gameStats.bestScore.toString());
  }
};

var updateScore = function() {
  var intNum = Math.floor(gameStats.score.toString());
  d3.select('.current-score').text(intNum);
};

var checkCollision = function(enemy) {
  var radiusSum = enemy.r + parseFloat(d3.select('.player').attr('r'));
  var xDiff = enemy.x - parseFloat(d3.select('.player').attr('cx'));
  var yDiff = enemy.y - parseFloat(d3.select('.player').attr('cy'));

  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (distance < radiusSum) {
    if (!enemy.hasHit) {
      updateCollisions();
    }
    enemy.hasHit = true;
    updateBestScore();
    gameStats.score = 0;
  } else {
    enemy.hasHit = false;
    gameStats.score += 0.01;
  }
  updateScore();
};

var updateEnemies = function() {
  var enemies = gameBoard.selectAll('circle.enemy')
        .transition().duration(2000).tween('move', function(enemy) {
          var d3Enemy = d3.select(this);
          var startX = parseFloat(d3Enemy.attr('cx'));
          var startY = parseFloat(d3Enemy.attr('cy'));

          var endX = Math.random() * gameOptions.width;
          var endY = Math.random() * gameOptions.height;
          return function(t) {
            var currX = startX + (endX - startX) * t;
            var currY = startY + (endY - startY) * t;
            enemy.x = currX;
            enemy.y = currY;
            checkCollision(enemy);
            d3Enemy.attr('cx', currX)
                  .attr('cy', currY);
          };
        });
};

var play = function () {
  var gameTurn = function () {
    updateEnemies();
    setTimeout(gameTurn, 2000);
  };

  var drag = d3.behavior.drag().on('drag', function(player) {
    var mouseCoords = d3.mouse(this);
    d3.select('.player')
                    .attr('cx', mouseCoords[0])
                    .attr('cy', mouseCoords[1]);
  });
  gameBoard.call(drag);

  var enemies = createEnemies();

  renderEnemies(enemies);

  gameTurn();
};

var player = new Player(gameOptions).render(gameBoard);

play();



