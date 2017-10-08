import * as d3 from 'd3';
import Blueprint from './blueprint';
import { Grid } from './grid';
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

blueprint.getGraph().setNode("kspacey", {
	label: "Kevin Spacey",
	width: 300, height: 400,
	attributes: {
		noiseStrengt: {
			value: 10,
			step: 5
		},
		growthSped: {
			value: 0.2,
			min: -5,
			max: 5
		},
		maxSize: {
			value: 4,
			min: 0,
			step: 0.25
		},
		message: {
			value: ['pizza', 'chrome', 'hooray' ] 
		},
		speed: {
			value: { Stopped: 0, Slow: 0.1, Fast: 5 }
		}
	}
});
blueprint.getGraph().setNode("swilliams", {
	label: "Saul Williams",
	width: 300, height: 400
});
blueprint.getGraph().setNode("bpitt", {
	label: "Brad Pitt",
	width: 300, height: 400
});
blueprint.getGraph().setNode("hford", {
	label: "Harrison Ford",
	width: 300, height: 400
});
blueprint.getGraph().setNode("lwilson", {
	label: "Luke Wilson",
	width: 300, height: 400
});
blueprint.getGraph().setNode("kbacon", {
	label: "Kevin Bacon",
	width: 300, height: 400
});

// Add edges to the graph.
blueprint.getGraph().setEdge("kspacey",   "swilliams");
blueprint.getGraph().setEdge("swilliams", "kbacon");
blueprint.getGraph().setEdge("bpitt",     "kbacon");
blueprint.getGraph().setEdge("hford",     "lwilson");
blueprint.getGraph().setEdge("lwilson",   "kbacon");//*/

blueprint.calculateLayout();
blueprint.update();

window.graph = blueprint.getGraph();
