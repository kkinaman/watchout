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

// var players = [];
// players.push(new Player(gameOptions).render(gameBoard));

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

var renderEnemies = function (enemies) {
  gameBoard.selectAll('circle.enemy')
            .data(enemies, function(d) {
              return d.id;
            })
            .enter().append('circle')
            .attr('class', 'enemy')
            .attr('cx', function(enemy) { return enemy.x; })
            .attr('cy', function(enemy) { return enemy.y; })
            .attr('r', 10);
};

var updateEnemies = function() {
  var enemies = gameBoard.selectAll('circle.enemy')
        .transition().duration(2000)
        .attr('cx', function() { return Math.random() * gameOptions.width; } )
        .attr('cy', function() { return Math.random() * gameOptions.height; } );
};

var play = function () {
  var gameTurn = function () {
    updateEnemies();
    setTimeout(gameTurn, 2000);
  };

  var player = new Player(gameOptions).render(gameBoard);

  var drag = d3.behavior.drag().on('drag', function(player) {
    var mouseCoords = d3.mouse(this);
    d3.select('.player').transition().duration(0)
                    .attr('cx', mouseCoords[0])
                    .attr('cy', mouseCoords[1]);
  });
  gameBoard.call(drag);

  var enemies = createEnemies();

  renderEnemies(enemies);

  gameTurn();
};

play();



