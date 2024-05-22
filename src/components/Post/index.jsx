import { AccountCircle } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";

export default function Post(
  imageUrl,
  fullname,
  createDate,
  comments,
  photo,
  handleSendComment,
  setComment,
  comment
) {
  if (!comment) comment = [];
  const getDateTimeFormat = (date) =>
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();
  const Comment = (comment) => {
    return (
      <div class="comment-container">
        <Avatar sx={{ bgcolor: red[500] }} aria-label="user" />
        <Box
          sx={{ bgcolor: "#eee", borderRadius: "50px", padding: "18px 32px" }}
        >
          <div className="comment-detail">
            <div className="info">
              <span className="username">
                {comment.user.first_name + " " + comment.user.last_name + " "}
              </span>
              <span className="creation-date">
                {getDateTimeFormat(new Date(comment.date_time))}
              </span>
            </div>
          </div>
        </Box>
      </div>
    );
  };
  return (
    <>
      <Card sx={{ margin: { xs: ".5rem", sm: "3rem" } }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="user" />}
          title={fullname}
          subheader={getDateTimeFormat(new Date(createDate))}
        />
        <CardMedia
          component="img"
          height="350rem"
          image={imageUrl}
          alt="Photo"
          sx={{ backgroundPosition: "center", backgroundSize: "cover" }}
        />
        <Divider />
        <CardContent>
          {comments.map((comment) => {
            return <Comment comment={comment} />;
          })}
          <TextField
            id="input-with-icon-textfield"
            label="Add your comment"
            fullWidth
            value={comment}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="send"
                    onClick={() => handleSendComment(photo._id)}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onkeyDown={(e) => {
              if (e.key === "Enter") handleSendComment(photo._id);
            }}
            onChange={(e) => setComment(e.target.value)}
            variant="standard"
          />
        </CardContent>
      </Card>
    </>
  );
}
