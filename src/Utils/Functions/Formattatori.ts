const DATE_FORMAT = Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "2-digit",
    minute: "2-digit",
})


export const formattaData = (data: Date) => DATE_FORMAT.format(data)


