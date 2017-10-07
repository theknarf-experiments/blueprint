import * as d3 from 'd3';
import { Grid } from './grid';
import Blueprint from './blueprint';
import { drawNodes } from './drawNodes';

import preventMacScrollback from './preventMacScrollback';
preventMacScrollback();

const svg = d3
	.select('body')
		.style('margin', '0')
		.style('padding', '0')
	.append('svg')
		.attr('width', window.innerWidth)
		.attr('height',window.innerHeight)

var blueprint = new Blueprint({
	dom: svg,
	plugin: [
		new Grid(svg, {
			space: 20,
			pattern: {
				vertical: 'bsssssss',
				horizontal: 'bsssssss',
			},
			color: {
				'b' : '#3c529e',
				's' : '#233671',
			}
		}),
		new drawNodes(svg)
	]
});

//import dot from 'graphlib-dot';
//var graph = dot.read("digraph { 1; 2; 1 -> 2 [label=\"label\"] }");
var graph = blueprint.getGraph();

graph.setNode("kspacey",    { label: "Kevin Spacey",  width: 300, height: 400 });
graph.setNode("swilliams",  { label: "Saul Williams", width: 300, height: 400 });
graph.setNode("bpitt",      { label: "Brad Pitt",     width: 300, height: 400 });
graph.setNode("hford",      { label: "Harrison Ford", width: 300, height: 400 });
graph.setNode("lwilson",    { label: "Luke Wilson",   width: 300, height: 400 });
graph.setNode("kbacon",     { label: "Kevin Bacon",   width: 300, height: 400 });

// Add edges to the graph.
graph.setEdge("kspacey",   "swilliams");
graph.setEdge("swilliams", "kbacon");
graph.setEdge("bpitt",     "kbacon");
graph.setEdge("hford",     "lwilson");
graph.setEdge("lwilson",   "kbacon");//*/

blueprint.calculateLayout();
blueprint.update();

window.graph = graph; // tmp to debug stuff. TODO: remove
