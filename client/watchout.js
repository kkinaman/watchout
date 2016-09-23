// start slingin' some d3 here.


var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};


var gameBoard = d3.select('.board').append('svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

var updateScore = function() {
  d3.select('#current-score').text(gameStats.score.toString());
};

var updateBestScore = function () {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  d3.select('#best-score').text(gameStats.bestScore.toString());
};


var Player = function () {
  this.fill = '#ff6600';
  this.x = gameOptions.width / 2;
  this.y = gameOptions.height / 2;
  this.angle = 0;
  this.r = 10;
};

Player.prototype.render = function(gameBoard ) {
  var el = gameBoard.append('circle')
          .attr('class', 'player')
          //.attr('cx', function() { return this.x; })
          //.attr('cy', function() { return this.y; })
          .attr('cx', this.x)
          .attr('cy', this.y)
          .attr('r', this.r )
          .attr('fill', this.fill);
};

var players = [];
players.push(new Player(gameOptions).render(gameBoard));
//players.push(new Player(gameOptions).render(gameBoard));


var Enemy = function(i) {
  this.id = i;
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;

};

var createEnemies = function() {
  return d3.range(0, gameOptions.nEnemies).map(function(i) {
    return new Enemy(i);
  });
};

var render = function ( enemies ) {
  var enemiesOnBoard = gameBoard.selectAll('circle.enemy');
  enemiesOnBoard.data(enemies, function(d) {
    return d.id;
  });
  //setRandom(enemies);
  enemiesOnBoard.enter().append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(enemy) { return enemy.x; })
    .attr('cy', function(enemy) { return enemy.y; })
    .attr('r', 10);
};

var setRandom = function(enemies) {
  enemies.attr('cx', function() { return Math.random() * gameOptions.width; } )
        .attr('cy', function() { return Math.random() * gameOptions.height; } )
        .transition().duration(2000);
};

var updateScreen = function(){
  var circleEnemies = gameBoard.selectAll('circle.enemy');
  setRandom(circleEnemies);
};



var play = function () {
  var gameTurn = function () {
    updateScreen();
    setInterval(gameTurn, 2000);
  };
  var enemies = createEnemies();
  render(enemies);
  gameTurn();
};

play();



