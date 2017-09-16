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
		.scaleExtent([0.2, 1000])
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


g.setNode("kspacey",    { label: "Kevin Spacey",  width: 144, height: 100 });
g.setNode("swilliams",  { label: "Saul Williams", width: 160, height: 100 });
g.setNode("bpitt",      { label: "Brad Pitt",     width: 108, height: 100 });
g.setNode("hford",      { label: "Harrison Ford", width: 168, height: 100 });
g.setNode("lwilson",    { label: "Luke Wilson",   width: 144, height: 100 });
g.setNode("kbacon",     { label: "Kevin Bacon",   width: 121, height: 100 });

// Add edges to the graph.
g.setEdge("kspacey",   "swilliams");
g.setEdge("swilliams", "kbacon");
g.setEdge("bpitt",     "kbacon");
g.setEdge("hford",     "lwilson");
g.setEdge("lwilson",   "kbacon");

dagre.layout(g);

var drag = d3.drag()
    .on("drag", (d) => {
	var node = g.node(d3.event.subject);
	node.x += d3.event.dx;
	node.y += d3.event.dy;
	layoutUpdate();
})

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
			.attr('width',  (d) => 100  * transform.k )
			.attr('height', (d) => 50 * transform.k )
			.attr('fill', 'white')

	svg.selectAll('g')
			.append('text')
			.attr('y', 16 * transform.k)
			.attr('font-size', 16 * transform.k + 'px')
			.text((d) => d)
	
	svg.selectAll('g')
		.call(drag);

	gEl.exit()
		


}
layoutUpdate();

/*
g.nodes().forEach(function(v) {
     console.log("Node " + v + ": " + JSON.stringify(g.node(v), null, 2));
});
g.edges().forEach(function(e) {
    console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e), null, 2));
});
*/