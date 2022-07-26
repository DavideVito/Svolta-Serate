import { Alert, IconButton, Typography, Link } from "@mui/material"
import { Marker } from "react-map-gl"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CustomMap from "../../../Components/Maps/CustomMap"
import Locale from "../../../Utils/Classes/Locale"
import Pin from "../Mappa/Pin"
import CustomControl from "../../../Components/Maps/CustomMap/CustomControl"
import NavigationIcon from '@mui/icons-material/Navigation';

interface DettagliLocaleProps {
    propLocale?: Locale
}

export const DettagliLocale = ({ propLocale }: DettagliLocaleProps) => {

    const { idLocale = "" } = useParams()

    const [locale, setlocale] = useState<Locale | undefined>(propLocale)

    useEffect(() => {

        setTimeout(() => {
            //@ts-ignore
            window.instgrm.Embeds.process()
        }, 1000)


    }, [locale])

    useEffect(() => { console.log(locale) }, [locale])

    useEffect(() => {

        if (idLocale === "") return

        Locale.getLocale(idLocale).then((l) => setlocale(l))

    }, [idLocale])


    if (!locale) return <Alert severity="error">
        <strong>Locale non trovato</strong>
    </Alert>



    return <>


        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

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
                    <CustomMap posizione={locale.posizione} zoom={13.5} widthHeight={{ width: "100vw", height: "45vh" }} >
                        <Marker
                            key={`marker-${locale.id}`}
                            longitude={locale.posizione.longitudine}
                            latitude={locale.posizione.latitudine}
                            anchor="bottom"
                        >
                            <Pin />
                        </Marker>

                        <CustomControl>
                            <Link target="_blank" rel="noreferrer"
                                href={`http://maps.google.com/maps?daddr=${locale.posizione.latitudine},${locale.posizione.longitudine}`}>
                                <IconButton>
                                    <NavigationIcon />
                                </IconButton>
                            </Link>
                        </CustomControl>
                    </CustomMap>
                </div>

                <div>


                </div>
            </div >
        </div ></>


}