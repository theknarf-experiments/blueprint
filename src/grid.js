import * as d3 from 'd3';

function gridData(dx, dy, step, vertical, horizont, color) {
	const everyVertical = vertical.length;
	const everyHorizont = horizont.length;

	dx = dx % (step * everyHorizont);
	dy = dy % (step * everyVertical);

	const horizontalLines = d3
		.range(window.innerWidth/step + 2*everyHorizont)
		.map((x) => {return {
			x1: (x-everyHorizont) * step + dx,
			x2: (x-everyHorizont) * step + dx,
			y1: 0,
			y2: window.innerHeight,
			stroke: color[ horizont[ x % everyHorizont ] ] 
		};});

	const verticalLines = d3
		.range(window.innerHeight/step + 2*everyVertical)
		.map((y) => {return {
			x1: 0,
			x2: window.innerWidth,
			y1: (y-everyVertical) * step + dy,
			y2: (y-everyVertical) * step + dy,
			stroke: color[ vertical[ y % everyVertical ] ] 
		};})

	return horizontalLines
		.concat(verticalLines)
		.sort(
			(a, b) =>
				Object.values(color).indexOf(a.stroke) <
				Object.values(color).indexOf(b.stroke)
		);
}

export function Grid(svg, config) {
	const vertical   = ((config||{}).pattern||{}).vertical   || 'bsssssss';
	const horizontal = ((config||{}).pattern||{}).horizontal || 'bsssssss'; 

	const color = (config||{}).color||{};
	color.b  = color.b  || '#3c529e';
	color.s  = color.s  || '#233671';
	color.bg = color.bg || '#1c2e60';
	svg.style('background-color', color.bg);

	const space = (config||{}).space || 20;

	return {
		update(transform) {
			const x = (transform||{}).x || 0,
			y = (transform||{}).y || 0,
			k = (transform||{}).k || 1;

			var lines = svg
				.selectAll('line')
				.data(gridData(
					x, y,
					space * k,
					vertical,
					horizontal,
					color
				));

			lines
				.enter()
				.append("line")
				.merge(lines)
				.attr('x1', (d) => d.x1 )
				.attr('y1', (d) => d.y1 )
				.attr('x2', (d) => d.x2 )
				.attr('y2', (d) => d.y2 )
				.attr('stroke-width', 1 )
				.attr('stroke', (d) => d.stroke );

			lines.exit().remove();
		}
	}
}
