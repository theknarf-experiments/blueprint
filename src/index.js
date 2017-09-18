import * as d3 from 'd3';
import { gridRender } from './grid';
import { Graph } from 'graphlib';
import dot from 'graphlib-dot';
import dagre from 'dagre';
import preventMacScrollback from './preventMacScrollback';

preventMacScrollback();

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

var transform = {x: 0, y: 0, k: 1};

gridRender(svg);
svg.call(
	d3
		.zoom()
		.scaleExtent([0.2, 50])
		.on("zoom", () => {
			transform = d3.event.transform;
			gridRender(svg, d3.event.transform);
			layoutUpdate();
		})
);

//var digraph = dot.read("digraph { 1; 2; 1 -> 2 [label=\"label\"] }");
var g = new Graph();

// Set an object for the graph label
g.setGraph({});

// Default to assigning a new object as a label for each new edge.
g.setDefaultEdgeLabel(function() { return {}; });


g.setNode("kspacey",    { label: "Kevin Spacey",  width: 300, height: 400 });
g.setNode("swilliams",  { label: "Saul Williams", width: 300, height: 400 });
g.setNode("bpitt",      { label: "Brad Pitt",     width: 300, height: 400 });
g.setNode("hford",      { label: "Harrison Ford", width: 300, height: 400 });
g.setNode("lwilson",    { label: "Luke Wilson",   width: 300, height: 400 });
g.setNode("kbacon",     { label: "Kevin Bacon",   width: 300, height: 400 });

// Add edges to the graph.
//g.setEdge("kspacey",   "swilliams");
//g.setEdge("swilliams", "kbacon");
//g.setEdge("bpitt",     "kbacon");
//g.setEdge("hford",     "lwilson");
//g.setEdge("lwilson",   "kbacon");

dagre.layout(g);

var drag = d3.drag()
    .on("drag", (d) => {
	var node = g.node(d3.event.subject);
	node.x += d3.event.dx;
	node.y += d3.event.dy;
	layoutUpdate();
})


var line = d3.radialLine()
    .curve(d3.curveBundle.beta(0.85))
    .radius((d) => d.y )
    .angle((d) => d.x / 180 * Math.PI );

const layoutUpdate = () => {
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
		.call(drag);

	gEl.exit()
}
layoutUpdate();
