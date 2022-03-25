const Proposal = (props: any) => {
	return <div>
		<p>{props.summary || "This is a proposal to..."}</p>
		<p>{props.date || "Tue, 11 Feb 2022"}</p>
		<p>{props.time || "08:00 GMT"}</p>
		<p>{props.id || "#88"}</p>
		<p>{props.status || "Live"}</p>
		<button>View</button>
	</div>
}

const CommunityHistory = () => {
	return <div>
		<div>
			<div>
				<h1>Community History</h1>
				<p>Sort by</p>
				<p>See All</p>
			</div>
			<button>New Proposal</button>
		</div>
		<div>
			<Proposal/>
			<Proposal/>
			<Proposal/>
			<Proposal/>
			<Proposal/>
		</div>
	</div>
};

export default CommunityHistory;