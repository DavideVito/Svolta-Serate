import { Button } from "@mui/material"


interface CustomControlProps {
    background?: boolean
    text: string,
    onClick: (e: any) => void
}


const CustomControl = ({ background, text, onClick }: CustomControlProps) => {
    return <div className='mapboxgl-ctrl-top-right' style={{ top: 0, right: 0 }}>
        <div className={`mapboxgl-ctrl ${background ? "mapboxgl-ctrl-group" : ""}`} style={{
            top: "0",
            right: "0",
            position: "absolute"
        }}>
            <Button
                variant="contained"
                onClick={onClick}
            >
                {text}
            </Button>
        </div>
    </div>
}

export default CustomControl