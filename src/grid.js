import * as d3 from 'd3';

function grid(dx, dy, step, every, c1, c2) {
	var linesData = []
	dx = dx % (step * every);
	dy = dy % (step * every);

	for(var x = -every; x < window.innerWidth/step + every; x++) {
		linesData.push({
			x1: x * step + dx,
			x2: x * step + dx,
			y1: 0,
			y2: window.innerHeight,
			stroke: (x % every == 0) ? c1 : c2
		})
	}

	for(var y = -every; y < window.innerHeight/step + every; y++) {
		linesData.push({
			x1: 0,
			x2: window.innerWidth,
			y1: y * step + dy,
			y2: y * step + dy,
			stroke: (y % every == 0) ? c1 : c2
		})
	}
	return linesData.sort((a, b) => a.stroke == c1);
}

function gridRender(svg, {x, y, k}) {
	var lines = svg
		.selectAll('line')
		.data(grid(x, y, 20 * k, 8, '#3c529e', '#233671'));

	lines
		.enter()
			.append("line")
				.attr('x1', (d) => d.x1 )
				.attr('y1', (d) => d.y1 )
				.attr('x2', (d) => d.x2 )
				.attr('y2', (d) => d.y2 )
				.attr('stroke-width', 1 )
				.attr('stroke', (d) => d.stroke )
		.merge(lines)
			.attr('x1', (d) => d.x1 )
			.attr('y1', (d) => d.y1 )
			.attr('x2', (d) => d.x2 )
			.attr('y2', (d) => d.y2 )
			.attr('stroke-width', 1 )
			.attr('stroke', (d) => d.stroke )

	lines.exit().remove();
}

export default function(svg) {
	gridRender(svg, {x: 0, y: 0, k: 1});

	svg.call(
		d3
			.zoom()
			.scaleExtent([0.2, 1000])
			.on("zoom", () => gridRender(svg, d3.event.transform) )
	);
}