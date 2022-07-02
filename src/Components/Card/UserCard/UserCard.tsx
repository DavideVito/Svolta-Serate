import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { User } from "firebase/auth"

interface UserCardProps {
    user: User,
    logout: () => any
}

const UserCard = ({ user, logout }: UserCardProps) => {




    return <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}><Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            alt={`Foto profilo di ${user.displayName}`}
            height="140"
            image={user.photoURL || ""}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {user.displayName}
            </Typography>


            <Typography>

            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={logout}>Logout</Button>
            <Button size="small">Learn More</Button>
        </CardActions>
    </Card></div>
}

export default UserCard