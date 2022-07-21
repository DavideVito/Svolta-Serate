

interface CustomControlProps {
    background?: boolean
    children: React.ReactNode
}


const CustomControl = ({ background, children }: CustomControlProps) => {
    return <div className='mapboxgl-ctrl-top-right' style={{ top: 0, right: 0 }}>
        <div className={`mapboxgl-ctrl ${background ? "mapboxgl-ctrl-group" : ""}`} style={{
            top: "0",
            right: "0",
            position: "absolute"
        }}>
            {children}
        </div>
    </div>
}

export default CustomControl