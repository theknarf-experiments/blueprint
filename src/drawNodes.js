import * as d3 from 'd3';

function dom(nodeName, config) {
	const subDom = Array.prototype.slice.call(arguments, 2);

	return (el, data) => {
		if(data !== null ) {
			const tmp = el.selectAll(nodeName).data(data)

			tmp.exit().remove();
			const mrg = tmp.enter()
				.append(nodeName)
				.merge(tmp);

			Object.keys(config).forEach( key => mrg.attr(key, config[key]) );

			subDom.forEach( tmpSubDom => tmpSubDom(mrg, null) ); 
			return mrg;
		} else {
			el.selectAll(nodeName).remove();
			const mrg = el.append(nodeName);

			Object.keys(config).forEach( key => mrg.attr(key, config[key]) );

			subDom.forEach( tmpSubDom => tmpSubDom(mrg, null) ); 
			return mrg;
		}
	};
}

export function drawNodes(svg) {
	const layout = svg.append('g');

	this.setDrag = (drag) => {
		this.drag = drag;
	};

	this.update = (transform, graph) => {
		const gTransform = (d) =>
			'translate(' +
				(graph.node(d).x * transform.k + transform.x) + ',' +  
				(graph.node(d).y * transform.k + transform.y) +
			')';

		const g = (
			<g transform={gTransform} fill='grey'>
				<rect x="0" y="0"
					width={  d => graph.node(d).width  * transform.k }
					height={ d => graph.node(d).height * transform.k } />
					{/*<rect x="0" y="0"
					width={  d => graph.node(d).width  * transform.k }
					height={ d => 30                   * transform.k } /> */}
			</g>
		)(layout, graph.nodes());
		
		/*
		if(typeof this.drag !== 'undefined')
			g.call(this.drag);

		g.selectAll('rect').remove();
		g.append('rect')	
			.attr('x', 0)
			.attr('y', 0)
			.attr('width',  (d) => graph.node(d).width  * transform.k )
			.attr('height', (d) => graph.node(d).height * transform.k );

		g.insert('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width',  (d) => graph.node(d).width  * transform.k )
			.attr('height', (d) => 30                   * transform.k )
			.attr('fill', 'black');

		g.selectAll('text').remove();
		g.insert('text')
			.attr('x', 15 * transform.k)
			.attr('y', 20 * transform.k)
			.attr('font-size', 16 * transform.k + 'px')
			.style('fill', 'white')
			.text((d) => graph.node(d).label);

		g.selectAll('g').remove();
		const attr = g.selectAll('g').data( (d) => {
			const attr = graph.node(d).attributes || {};
			return Object.keys(attr).map( key => { return {
				key,
				d
			} });
		});
	
		attr.exit().remove();

		attr.enter()
			.append('text')
			.merge(attr)
			.attr('y', ({key, d}) => Object.keys(graph.node(d).attributes).indexOf(key) * 30 + 40 )
			.attr('x', 0)
			.text(({key, d}) => graph.node(d).attributes[key].value)
			.attr('font-family', 'sans-serif')
			.attr('font-size', '20px')
			.attr('fill', 'red')
			.attr('alignment-baseline', 'hanging');
		//*/
	}

	return this;
}
