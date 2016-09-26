var width = 1200;
var height = 400;

var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

var svg = d3.select('body').append('svg')
                    .attr('width', width)
                    .attr('height', height);


//the transform: translate(x, y) sets the position in the svg 
var g = svg.append('g')
            .attr("transform", "translate(32," + (height / 2) + ")");

var update = function(data) {
  var t = d3.transition()
      .duration(750);

  var text = g.selectAll('text')
              .data(data, function(d) { return d; });

//fade out old data
  text.exit()
        .attr("class", "exit")
      .transition(t)
        .attr("y", 60)
        .style("fill-opacity", 0)
        .remove();

  //updated data
  text.attr('class', 'update')
        .attr("y", 0)
        .style("fill-opacity", 1)
      .transition(t)
        .attr("x", function(d, i) { return i * 40; });;

  //new data
  text.enter().append("text")
        .attr("class", "enter")
        .attr("y", -60)
        .attr("x", function(d, i) { return i * 40; })
        .style("fill-opacity", 0)
        .text(function(d) { return d; })
      .transition(t)
        .attr("y", 0)
        .style("fill-opacity", 1);

};

update(alphabet);

d3.interval(function() {
  update(d3.shuffle(alphabet)
    .slice(0, Math.floor(alphabet.length*Math.random()))
    .sort()
  );
}, 2000);

// basic update pattern .select('').selectAll('').data().enter().attr('')


