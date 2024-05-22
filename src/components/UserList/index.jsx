import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./styles.css";
import * as Api from "../../lib/fetchData";
import { Link } from "react-router-dom";
/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      const res = await Api.get("/user");
      setUsers(res.usersList);
      setLoading(false);
    };
    getUsers();
  }, []);
  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <List component="nav">
          {users.map((item) => (
            <div key={item._id}>
              <ListItem className="item">
                <PersonIcon />
                <Link to={`/users/${item._id}`} underline="none">
                  <ListItemText
                    primary={`${item.first_name} ${item.last_name}`}
                    className="fullname"
                  />
                </Link>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </div>
  );
}

export default UserList;
