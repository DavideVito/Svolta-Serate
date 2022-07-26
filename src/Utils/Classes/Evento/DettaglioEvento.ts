

enum CHIAVI_DETTAGLI {
    fumatori = "Fumatori",
    eta = "Età",
    musica = "Musica"
}

abstract class DettaglioEvento<T>  {

    chiave: CHIAVI_DETTAGLI
    valore: T

    constructor(chiave: CHIAVI_DETTAGLI, valore: T) {
        this.chiave = chiave
        this.valore = valore
    }

    toJSON() {
        return { chiave: this.chiave, valore: this.valore }
    }

    serialize() {
        return this.toJSON()
    }

    static deserialize(snapshot: any, options: any): DettaglioEvento<any>[] {
        const { dettagli } = snapshot.data(options);

        const l = dettagli.map(({ chiave, valore }: { chiave: any, valore: any }) => {


            if (chiave === CHIAVI_DETTAGLI.eta) {
                return new DettaglioEta(valore)
            } else if (chiave === CHIAVI_DETTAGLI.fumatori) {
                return new DettaglioFumatori(valore)
            } else if (chiave === CHIAVI_DETTAGLI.musica) {
                return new DettaglioMusica(valore)
            }

            return null

        })










        return l
    }



}

export class DettaglioFumatori extends DettaglioEvento<boolean> {

    constructor(valore: boolean) {



        super(CHIAVI_DETTAGLI.fumatori, valore)
    }
}


export class DettaglioEta extends DettaglioEvento<"Qualunque" | "18+">{

    constructor(valore: "Qualunque" | "18+") {
        super(CHIAVI_DETTAGLI.eta, valore)
    }
}


export enum GeneriMusicali {
    "Hip-Hop" = "Hip-Hop",
    "Rap" = "Rap",
    "Reggaeton" = "Reggaeton",
    "Commerciale" = "Commerciale"
}

export class DettaglioMusica extends DettaglioEvento<GeneriMusicali>{

    constructor(valore: GeneriMusicali) {
        super(CHIAVI_DETTAGLI.musica, valore)
    }
}






export default DettaglioEvento