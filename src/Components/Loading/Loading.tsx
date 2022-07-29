import { Box, LinearProgress } from "@mui/material"

interface LoadingProps {
    text?: string
    component?: React.ReactNode
}

const Loading = ({ text, component = <LinearProgress /> }: LoadingProps) => <Box sx={{ width: '100%' }}>
    {component}
    {text && <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>{text}</div>}

</Box>
export default Loading