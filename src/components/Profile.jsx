import useVK from "../services/VK";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
	const { call } = useVK();
	const { userId } = useParams();
	const history = useHistory();

	const [posts, setPosts] = useState([]);

	useEffect(async () => {
		const answer = await call("wall.get", {
			owner_id: userId,
		});

		console.log(answer);

		setPosts(answer.response.items);

		// LoginPage
		// if (answer.responce && !answer.error) {
		//   history.push(`/user/${answer}`)
		// }
	}, [userId]);

	return (
		<div>
			<h2>Profile</h2>
			{posts.map((post) => (
				<div
					key={post.id}
					style={{ border: "1px solid gray", margin: "10px" }}
				>
					{post.text}
				</div>
			))}
		</div>
	);
};

export default Profile;
