import * as d3 from 'd3';

export function drawNodes(svg) {
	const layout = svg.append('g');

	this.setDrag = (drag) => {
			this.drag = drag;
	};

	this.update = (transform, graph) => {
			const gEl = layout.selectAll('g').data( graph.nodes() );	
			gEl.exit().remove();

			const g = gEl
				.enter()
				.append('g')
				.merge(gEl)
				.attr('transform', (d) => 'translate(' +
							(graph.node(d).x * transform.k + transform.x) + ',' +  
							(graph.node(d).y * transform.k + transform.y) + ')'
				)

			if(typeof this.drag !== 'undefined')
				g.call(this.drag);

				g.selectAll('rect').remove();
				g.append('rect')	
				.attr('x', 0)
				.attr('y', 0)
				.attr('width',  (d) => graph.node(d).width  * transform.k )
				.attr('height', (d) => graph.node(d).height * transform.k )
				.attr('fill', 'black')

				g.selectAll('text').remove();
				g.insert('text')
				.attr('x', 15 * transform.k)
				.attr('y', 20 * transform.k)
				.attr('font-size', 16 * transform.k + 'px')
				.style('fill', 'white')
				.text((d) => graph.node(d).label);
	}
	
	return this;
}
