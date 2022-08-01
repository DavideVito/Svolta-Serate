import { Box, CircularProgress, CircularProgressProps, LinearProgress, Typography } from "@mui/material"

interface LoadingProps {
    text?: string
    component?: React.ReactNode
}

const Loading = ({ text, component = <LinearProgress /> }: LoadingProps) => {
    return <Box sx={{ width: '100%' }}>
        {component}
        {text && <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>{text}</div>}

    </Box>
}

export function LoadingWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}







export default Loading