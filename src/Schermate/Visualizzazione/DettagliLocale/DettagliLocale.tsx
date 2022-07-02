import { Alert, Typography } from "@mui/material"
import { Marker } from "react-map-gl"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CustomMap from "../../../Components/CustomMap"
import Locale from "../../../Utils/Classes/Locale"
import Pin from "../Mappa/Pin"

export const DettagliLocale = () => {

    const { id = "" } = useParams()




    const [locale, setlocale] = useState<Locale | undefined>(undefined)


    useEffect(() => {

        if (id === "") return

        Locale.getLocale(id).then((l) => setlocale(l))

    }, [id])


    if (!locale) return <Alert severity="error">
        <strong>Locale non trovato</strong>
    </Alert>



    return <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>

                    <Typography align="center" variant="h3">
                        {locale.nome}
                    </Typography>

                    <Typography align="center">
                        {locale.descrizione}
                    </Typography></div>
            </div>

            <div>
                <CustomMap posizione={locale.posizione} zoom={13.5} widthHeight={{ width: "45vw", height: "45vh" }} >
                    <div>

                        <Marker
                            key={`marker-${locale.id}`}
                            longitude={locale.posizione.longitudine}
                            latitude={locale.posizione.latitudine}
                            anchor="bottom"
                        >
                            <Pin />
                        </Marker>
                    </div>

                </CustomMap>
            </div>
        </div >
    </div >


}