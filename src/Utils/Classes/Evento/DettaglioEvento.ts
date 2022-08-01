import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

enum CHIAVI_DETTAGLI {
    fumatori = "Fumatori",
    eta = "Età",
    musica = "Musica"
}

abstract class DettaglioEvento<T>  {

    chiave: CHIAVI_DETTAGLI
    valore: T
    iconCompoent: any
    valori: any[]
    multiple: boolean

    constructor(chiave: CHIAVI_DETTAGLI, valore: T, iconComponent: any, valori: any[], multiple: boolean) {
        this.chiave = chiave
        this.valore = valore
        this.iconCompoent = iconComponent
        this.valori = valori
        this.multiple = multiple
    }



    abstract parseValue(value: any): T
    abstract getValueIcon(): string;

    getFirestoreKey(): string {
        return `${this.chiave}_${this.valore}`
    }

    toJSON() {
        return { chiave: this.chiave, valore: this.valore }
    }

    serialize() {
        return this.toJSON()
    }

    static getDettaglioFromKey(key: any, valore: any) {
        if (key === CHIAVI_DETTAGLI.eta) {
            return new DettaglioEta(valore)
        } else if (key === CHIAVI_DETTAGLI.fumatori) {
            return new DettaglioFumatori(valore)
        } else if (key === CHIAVI_DETTAGLI.musica) {
            return new DettaglioMusica(valore)
        }

        return null
    }

    static deserialize(snapshot: any, options: any): DettaglioEvento<any>[] {
        const { dettagli } = snapshot.data(options);

        return dettagli.map(({ chiave, valore }: { chiave: any, valore: any }) => this.getDettaglioFromKey(chiave, valore))
    }
}

export class DettaglioFumatori extends DettaglioEvento<boolean> {
    parseValue(value: any): boolean {
        return value === "✅" ? true : false
    }
    getValueIcon() {
        //return this.valore ? DoneIcon : CloseIcon
        return this.valore ? "✅" : "❌"
    }

    constructor(valore: boolean) {
        super(CHIAVI_DETTAGLI.fumatori, valore, SmokingRoomsIcon, ["✅", "❌"], false)
    }
}


export class DettaglioEta extends DettaglioEvento<boolean>{

    parseValue(value: any): boolean {
        return value === "🔞" ? true : false
    }

    getValueIcon() {
        return this.valore === true ? "🔞" : "👯‍♀️"
    }

    constructor(valore: boolean) {
        super(CHIAVI_DETTAGLI.eta, valore, ContactPageIcon, ["🔞", "👯‍♀️"], false)
    }
}


export enum GeneriMusicali {
    "Hip-Hop" = "Hip-Hop",
    "Rap" = "Rap",
    "Reggaeton" = "Reggaeton",
    "Commerciale" = "Commerciale"


}

export class DettaglioMusica extends DettaglioEvento<GeneriMusicali>{

    parseValue(value: any): GeneriMusicali {
        //@ts-ignore
        return GeneriMusicali[value]
    }


    getValueIcon() {
        return this.valore
    }

    constructor(valore: GeneriMusicali) {
        super(CHIAVI_DETTAGLI.musica, valore, MusicNoteIcon, Object.keys(GeneriMusicali), true)
    }
}

export const DETTAGLI = [
    new DettaglioFumatori(false),
    new DettaglioMusica(GeneriMusicali['Hip-Hop']),
    new DettaglioEta(false)
]





export default DettaglioEvento