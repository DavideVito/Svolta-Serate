
export class Posizione {
    latitudine: number
    longitudine: number


    constructor(lat: number, long: number) {
        this.latitudine = lat
        this.longitudine = long
    }

    toJSON = () => {



        return {

            latitudine: this.latitudine,
            longitudine: this.longitudine

        }
    }
}