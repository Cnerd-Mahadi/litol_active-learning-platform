import { Link, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

export const MindMapCard = ({ id, title, updated }) => {
	console.log(title, updated, id);
	return (
		<Link href={"/student/mindmap/" + id} underline="none">
			<Paper
				elevation={3}
				sx={{
					width: "100%",
					borderRadius: "8px",
					backgroundColor: "white",
					color: "#2C3333",
					padding: "30px",
				}}>
				<Typography gutterBottom variant="h6" component="div">
					{title}
				</Typography>
				<Typography
					variant="body2"
					color="text.primary"
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: "1",
						WebkitBoxOrient: "vertical",
					}}>
					{updated}
				</Typography>
			</Paper>
		</Link>
	);
};
