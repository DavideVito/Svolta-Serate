//@ts-ignore
import { ReactAgenda } from 'react-agenda';

import "./style.css"

interface Item {
    _id: string;
    name: string;
    startDateTime: Date;
    endDateTime: Date;
    classes: string
}

interface CalendarViewProps {
    items: Item[],
    dataMinima: Date,
    dataMassima: Date
}

const CalendarView = ({ items, dataMassima, dataMinima }: CalendarViewProps) => {


    return <><ReactAgenda items={items} minDate={dataMinima} maxDate={dataMassima} /></>

}

export default CalendarView