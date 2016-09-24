var map = new Datamap({
  scope: 'usa',
  element: document.getElementById('container'),
  fills: {
    defaultFill: '#f0af0a'
  }
}); 

var items = [];
$.getJSON('lib/city.list.us.json', function(data) {
  debugger;
  console.log(data);
});