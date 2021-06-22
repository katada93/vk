import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	list: {
		padding: 0,
		listStyle: "none",
		display: "flex",
		flexWrap: "wrap",
		"& li": {
			width: "25%",
		},
	},
	link: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		margin: 5,
		textDecoration: "none",
		color: "#2a5885",
		"& span": {
			fontSize: "13px",
			"&:hover": {
				textDecoration: "underline",
			},
		},
	},
});

export default useStyles;
