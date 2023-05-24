type Options = {
	constrain?: number;
	perspective?: string;
};
export const followMouse = (node: Element, options: Options) => {
	// initiate default options
	const defaults = { constrain: 40, perspective: '100rem' };

	// merge options
	options = Object.assign(defaults, options);

	// destructure options
	const constrain = options.constrain;
	const perspective = options.perspective;

	const moveHandler = (e: MouseEvent) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		const position = [mouseX, mouseY].concat([node]);

		transformElement(node, position);
	};

	const transformElement = (el, xyEl, pre = '', post = '') => {
		el.style.transform = `${pre} ${transforms.apply(null, xyEl)} ${post}`;
	};

	const transforms = (x, y, el) => {
		let box = el.getBoundingClientRect();
		let calcX = -(y - box.y - box.height / 2) / constrain;
		let calcY = (x - box.x - box.width / 2) / constrain;

		return `perspective(${perspective}) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
	};

	window.addEventListener('mousemove', moveHandler);
};
