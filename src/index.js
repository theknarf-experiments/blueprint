import * as d3 from 'd3';
import gridRender from './grid';

d3
	.select('body')
	.style('background-color', '#1c2e60')
	.style('margin', '0')
	.style('padding', '0')

const svg = d3
	.select('body')
	.append('svg')
	.attr('width', window.innerWidth)
	.attr('height',window.innerHeight)

gridRender(svg);

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  //d3.select(this).classed("dragging", true);
  console.log('dragstart')
}

function dragged(d) {
  //d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  console.log('drag', d.x, d.y)
}

function dragended(d) {
  //d3.select(this).classed("dragging", false);
  console.log('dragended')
}