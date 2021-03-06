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

  var margins =
  {
    top:10,
    bottom:40,
    left:40,
    right:100
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
  var svg = d3.select('svg#s')
            .attr('width',screen.width)
            .attr('height',screen.height);

  var plotLand = svg.append('g')
                .classed("plot",true)
                .attr("transform","translate("+margins.left+","+margins.top+")");


  var colors = d3.scaleOrdinal(d3.schemeAccent);
  var students =
      plotLand.selectAll('rect')
      .data(data[0].grades)
      .enter()
      .append('rect')
      .attr('fill',function(d)
      {
        return colors(d.name);
      })
      .attr('x',function(d,i)
      {
      return xscale(i);
      })
      .attr('y',function(d)
      {
        return yscale(d.grade)+margins.top;
      })
      .attr('width',barWidth)
      .attr('height', function(d)
      {
        return height-yscale(d.grade);
      })
      .on('mouseover',function(d)
      {
        d3.select(this)
          .attr('fill','red');

      })
      .on('mouseout',function(d)
      {
        d3.select(this)
          .attr('fill',function(d)
          {
            return colors(d.name);
          });
      })
      .append('title')
      .text(function(d)
      {
        return d.name;
      })
      .attr('x',function(d,i)
      {
        return i*barWidth;
      })
      .attr('y',function(d,i)
      {
        return height-d.grade;
      })


  // buttons
  var body = d3.select('body');
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
           updateChart(data,clicked,plotLand,height,yscale);
        });

  var yAxis = d3.axisLeft(yscale);
  svg.append('g').classed('yAxis',true)
    .call(yAxis)
    .attr('transform','translate('+30+','+20+')')
}


var updateChart = function(data,clicked,plotLand,h,yscale)
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
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr('y', function(d)
        {
        return  yscale(d.grade)+10;
        })
        .attr('height',function(d)
        {
          return h-yscale(d.grade);
        })

      var p = document.getElementById('day');
      p.innerText = dd+1;

  }
  else if(clicked=='next')
  {
    //

    var dd = parseInt(day);
    var students =
        plotLand.selectAll('rect')
        .data(data[dd].grades)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr('y', function(d)
        {
        return  yscale(d.grade)+10;
        })
        .attr('height',function(d)
        {
          return h-yscale(d.grade);
        })
    dd += 1;
    var p = document.getElementById('day');
    p.innerText = dd;

  }

};
