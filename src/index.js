import * as d3 from 'd3';
import { Grid } from './grid';
import Blueprint from './blueprint';

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

	zoom: layoutUpdate,

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
		})	
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

/*/ Add edges to the graph.
graph.setEdge("kspacey",   "swilliams");
graph.setEdge("swilliams", "kbacon");
graph.setEdge("bpitt",     "kbacon");
graph.setEdge("hford",     "lwilson");
graph.setEdge("lwilson",   "kbacon");//*/

blueprint.calculateLayout();

function layoutUpdate(transform) {
	svg.selectAll('g').remove();

	const gEl = svg.selectAll('g')
				   .data(graph.nodes(), (d) => d)

	gEl.enter()
		.append('g')
		.merge(gEl)
			.attr('transform', (d) =>
				'translate(' +
					(graph.node(d).x * transform.k + transform.x)
					+ ',' +  
					(graph.node(d).y * transform.k + transform.y)
					+ ')'
			)
		.append("rect")	
			.attr('x', 0)
			.attr('y', 0)
			.attr('width',  (d) => graph.node(d).width  * transform.k )
			.attr('height', (d) => 30 * transform.k )
			.attr('fill', 'black')

	svg.selectAll('g')
			.append('text')
			.attr('x', 15 * transform.k)
			.attr('y', 20 * transform.k)
			.attr('font-size', 16 * transform.k + 'px')
			.style('fill', 'white')
			.text((d) => graph.node(d).label)
	
	svg.selectAll('g')
		.call(blueprint.drag);

	gEl.exit()
}
layoutUpdate({x: 0, y: 0, k: 1});
