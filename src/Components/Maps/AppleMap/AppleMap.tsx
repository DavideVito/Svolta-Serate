import { useEffect, useState } from "react";

const AppleMap = () => {


    useEffect(() => {
        //@ts-ignore
        mapkit.init({
            authorizationCallback: function (done: any) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "/services/jwt");
                xhr.addEventListener("load", function () {
                    done(this.responseText);
                });
                xhr.send();
            }
        });

        //@ts-ignore
        var Cupertino = new mapkit.CoordinateRegion(
            //@ts-ignore
            new mapkit.Coordinate(37.3316850890998, -122.030067374026),
            //@ts-ignore
            new mapkit.CoordinateSpan(0.167647972, 0.354985255)
        );
        //@ts-ignore
        var map = new mapkit.Map("map");
        map.region = Cupertino;
    }, [])



    return <>

        <div id="map" style={{ width: "90rem", height: "90rem" }}></div>
    </>
}

export default AppleMap