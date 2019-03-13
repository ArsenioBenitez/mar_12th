var dataP = d3.json("gradeDataTime.json");
dataP.then(function(data)
{
  drawChart(data);

})

var drawChart = function(data)
{

  var screen =
  {
    width: 500,
    height: 400
  }
  var svg = d3.select('svg')
              .attr('width',screen.width)
              .attr('height',screen.height)
  var margins =
  {
    top:10,
    bottom:10,
    left:10,
    right:10
  }
  var width = screen.width-margins.left-margins.right;
  var height = screen.height-margins.top-margins.bottom;
  var barWidth = width/4;
  var xscale = d3.scaleLinear()
                .domain([0,4])
                .range([0,width]);
  var yscale = d3.scaleLinear()
                .domain([0,100])
                .range([height,0]);
  var colors = d3.scaleOrdinal(d3.schemeAccent);
  var plotLand = svg.append('g')
                    .classed('plot',true)
                    .attr("transform","translate("+margins.left+","+margins.top+")");
  var students =
      plotLand.selectAll('rect')
      .data(data[0].grades)
      .enter()
      .append('rect')
      .attr('x',function(d,i)
    {
      return i*barWidth;
    })
      .attr('y',function(d)
    {
      return height-margins.bottom;
    })
    .attr('width',barWidth)
    .attr('height', 10)


  // buttons
  var body = d3.select('body');
  var dayCounter = 0;
  var buttons =
      d3.selectAll('button')
       .on('click',function()
       {

          if (this.name=='prev')
          {
            var clicked = 'prev';
          }
          else if (this.name=='next')
          {
            var clicked = 'next';
          }
          console.log(data);
           updateChart(data,clicked,plotLand,height);
        });
}


var updateChart = function(data,clicked,plotLand,h)
{

  var day = document.getElementById("day").textContent;
  console.log(data[0].grades);
  if (clicked=='prev')
  {
    //do something
    var dd = parseInt(day)-2;
    var students =
        plotLand.selectAll('rect')
        .data(data[dd].grades)
        .attr('height', function(d)
      {
        return h - d.grade;
      })
      var p = document.getElementById('day');
      p.innerText = dd+1;


  }
  else if(clicked=='next')
  {
    //
    console.log(parseInt(day));
    var dd = parseInt(day)+1;
    var students =
        plotLand.selectAll('rect')
        .data(data[dd].grades)
        .attr('height', function(d)
      {
        return  h - d.grade;
      })
    var p = document.getElementById('day');
    p.innerText = dd;

  }

};
