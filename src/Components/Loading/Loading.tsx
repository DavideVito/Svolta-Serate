import { Box, LinearProgress } from "@mui/material"

const Loading = ({ text }: { text?: string }) => <Box sx={{ width: '100%' }}>
    <LinearProgress />
    {text && <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>{text}</div>}

</Box>
export default Loading