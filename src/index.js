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
			color: {
			}
		})	
	]
});

//import dot from 'graphlib-dot';
//var digraph = dot.read("digraph { 1; 2; 1 -> 2 [label=\"label\"] }");
var g = blueprint.getGraph();

g.setNode("kspacey",    { label: "Kevin Spacey",  width: 300, height: 400 });
g.setNode("swilliams",  { label: "Saul Williams", width: 300, height: 400 });
g.setNode("bpitt",      { label: "Brad Pitt",     width: 300, height: 400 });
g.setNode("hford",      { label: "Harrison Ford", width: 300, height: 400 });
g.setNode("lwilson",    { label: "Luke Wilson",   width: 300, height: 400 });
g.setNode("kbacon",     { label: "Kevin Bacon",   width: 300, height: 400 });

/*/ Add edges to the graph.
g.setEdge("kspacey",   "swilliams");
g.setEdge("swilliams", "kbacon");
g.setEdge("bpitt",     "kbacon");
g.setEdge("hford",     "lwilson");
g.setEdge("lwilson",   "kbacon");//*/

blueprint.calculateLayout();

function layoutUpdate(transform) {
	svg.selectAll('g').remove();

	const gEl = svg.selectAll('g')
				   .data(g.nodes(), (d) => d)

	gEl.enter()
		.append('g')
		.merge(gEl)
			.attr('transform', (d) =>
				'translate(' +
					(g.node(d).x * transform.k + transform.x)
					+ ',' +  
					(g.node(d).y * transform.k + transform.y)
					+ ')'
			)
		.append("rect")	
			.attr('x', 0)
			.attr('y', 0)
			.attr('width',  (d) => g.node(d).width  * transform.k )
			.attr('height', (d) => 30 * transform.k )
			.attr('fill', 'black')

	svg.selectAll('g')
			.append('text')
			.attr('x', 15 * transform.k)
			.attr('y', 20 * transform.k)
			.attr('font-size', 16 * transform.k + 'px')
			.style('fill', 'white')
			.text((d) => g.node(d).label)
	
	svg.selectAll('g')
		.call(blueprint.drag);

	gEl.exit()
}
layoutUpdate({x: 0, y: 0, k: 1});
