import { Graph } from 'graphlib';
import dagre from 'dagre';
import * as d3 from 'd3';

function Blueprint(config) {
	var graph = new Graph({ multigraph: true });
	this.transform = {x: 0, y: 0, k: 1};
	// Set an object for the graph label
	graph.setGraph({});

	// Default to assigning a new object as a label for each new edge.
	graph.setDefaultEdgeLabel(function() { return {}; });

	const scaleExtent = config.scaleExtent || [0.2, 50];

	const pluginUpdateMethods = () => config.plugin.forEach( (plugin) =>
			(plugin.update || (() => {}))(this.transform, graph) );
	pluginUpdateMethods();

	config.dom.call(
		d3
			.zoom()
			.scaleExtent(scaleExtent)
			.on('zoom', () => {
				this.transform = d3.event.transform;	
				pluginUpdateMethods();
			})
	);

	var drag = d3.drag()
		.on("drag", (d) => {
			var node = graph.node(d3.event.subject);
			node.x += d3.event.dx / this.transform.k;
			node.y += d3.event.dy / this.transform.k;
			pluginUpdateMethods();
		});
	config.plugin.forEach( plugin => (plugin.setDrag || (()=>{}) )( drag ) );

	return {
		getGraph : () => graph,
		calculateLayout : () => dagre.layout(graph),
		drag,
		update: pluginUpdateMethods
	}
}

module.exports = Blueprint;
