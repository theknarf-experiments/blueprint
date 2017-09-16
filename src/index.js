import * as d3 from 'd3';
import { gridRender } from './grid';
import { Graph } from 'graphlib';

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
svg.call(
	d3
		.zoom()
		.scaleExtent([0.2, 1000])
		.on("zoom", () => gridRender(svg, d3.event.transform) )
);

var g = new Graph();

g.setNode("a");
console.log( 'g.hasNode("a")', g.hasNode("a"));

g.setNode("b", "b's value");
console.log('g.node("b");', g.node("b"));


g.setNode("c", { k: 123 });

console.log('g.nodes();', g.nodes());


g.setEdge("a", "b");
g.setEdge("c", "d", { k: 456 });

console.log('g.edges()', g.edges());

console.log('g.outEdges("a")', g.outEdges("a"));

console.log('g.nodeEdges("d")', g.nodeEdges("d"));

console.log(g);