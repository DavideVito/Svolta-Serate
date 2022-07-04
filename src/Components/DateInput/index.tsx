import { TextFieldProps } from "@mui/material"

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';


import itLocale from 'date-fns/locale/it';

interface DateInputProps {
    date: Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
    label: string,
    renderInput: (props: TextFieldProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>

}


const DateInput = ({ date, setDate, label, renderInput }: DateInputProps) => {

    const handleChange = (newValue: Date | null) => {
        setDate(newValue ?? undefined);
    };
    return <>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={itLocale}>


            <DateTimePicker

                label={label}
                value={date}
                onChange={handleChange}
                renderInput={renderInput}
            /></LocalizationProvider>
    </>
}

export default DateInput