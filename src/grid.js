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

export function gridRender(svg, transform) {
	const x = (transform||{}).x || 0,
		  y = (transform||{}).y || 0,
		  k = (transform||{}).k || 0;

	var lines = svg
		.selectAll('line')
		.data(grid(x, y, 20 * (k||1), 8, '#3c529e', '#233671'));

	lines
		.enter()
			.append("line")
		.merge(lines)
			.attr('x1', (d) => d.x1 )
			.attr('y1', (d) => d.y1 )
			.attr('x2', (d) => d.x2 )
			.attr('y2', (d) => d.y2 )
			.attr('stroke-width', 1 )
			.attr('stroke', (d) => d.stroke )

	lines.exit().remove();
}
