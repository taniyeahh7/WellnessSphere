export default function ImproveSkill() {
	const list = [
		"Learn new exciting recipes",
		"Discover deficiency management",
		"Get customised recipes",
		"Forget all fitness trainer tantrums",
		"Exercise with maximising benefits",
		"Get sole attention of our trainer",
	];

	return (
		<div className="section improve-skills">
			<div className="col img">
				<img src="/img/gallery/img_10.jpg" alt="" />
			</div>
			<div className="col typography">
				<h1 className="title">Improve Your Cullinary Skills</h1>
				{list.map((item, index) => (
					<p className="skill-item" key={index}>
						{item}
					</p>
				))}
				<button className="btn">Signup now</button>
			</div>
		</div>
	);
}
