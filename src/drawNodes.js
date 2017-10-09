import * as d3 from 'd3';

function dom(nodeName, config) {
	const subDom = Array.prototype.slice.call(arguments, 2);

	return (el) => {
		const data = config['data'] || ( d => [d] );
		delete config['data'];

		const selector = config['select'] || ( el => el.selectAll(nodeName) ); 
		delete config['select'];

		const tmp = selector(el).data(data);

		tmp.exit().remove();
		const mrg = tmp.enter()
			.append(nodeName)
			.merge(tmp);

		if(typeof config['call'] !== 'undefined') {
			const cll = config['call'];
			delete config['call'];

			mrg.call(cll);
		}

		if(typeof config['text'] !== 'undefined') {
			const txt = config['text'];
			delete config['text'];

			mrg.text(txt);
		}

		Object.keys(config).forEach( key => mrg.attr(key, config[key]) );

		subDom.forEach( tmpSubDom => tmpSubDom(mrg) ); 
		return mrg;
	};
}

export function drawNodes(svg) {
	const layout = svg.append('g');

	this.setDrag = (drag) => {
		this.drag = drag;
	};

	this.update = (transform, graph) => {
		const g = (
			<g
				data={graph.nodes()}
				transform={(d) => 'translate(' +
					(graph.node(d).x * transform.k + transform.x) + ',' +  
					(graph.node(d).y * transform.k + transform.y) +
				')'}
				fill='grey'
				call={ (typeof this.drag !== 'undefined') ? this.drag : (()=>{}) }>
				<rect x="0" y="0"
					width={  d => graph.node(d).width  * transform.k }
					height={ d => graph.node(d).height * transform.k } />
				<rect x="0" y="0"  select={ e => e.selectAll('rect').select(function(d,i) { return i==1 ? this : null }) }
					width={  d => graph.node(d).width  * transform.k }
					height={ d => 30                   * transform.k }
					fill='black' />
				<text
					x={15 * transform.k}
					y={20 * transform.k}
					font-size={16 * transform.k + 'px'}
					fill='white'
					text={d=>graph.node(d).label}
					/>
			</g>
		)(layout); 
		
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
	}

	return this;
}
