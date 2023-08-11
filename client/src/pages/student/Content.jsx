import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useGraphQuery } from "../../hooks/useGraphQuery";
import { contentsQuery } from "../../utilities/graphqlQueries";
import { Loading } from "../Loading";
import { TopicCard } from "./../../components/cards/TopicCard";

const showContents = ({ title, subjectRef, image, sys }) => {
	return (
		<TopicCard
			key={sys.id}
			id={sys.id}
			image={image.url}
			title={title}
			subject={subjectRef.name}
		/>
	);
};

export const Content = () => {
	const { subjectId } = useParams();
	const { isLoading, data } = useGraphQuery(
		"contents",
		contentsQuery(subjectId)
	);

	const contents = data ? data.data.contentCollection.items : null;

	if (isLoading) return <Loading />;

	console.log(contents);
	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				marginTop: "20px",
			}}>
			{contents.map(showContents)}
		</Box>
	);
};
