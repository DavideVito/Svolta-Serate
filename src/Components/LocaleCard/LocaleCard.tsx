
import { CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Locale from "../../Utils/Classes/Locale";

interface LocaleCardProps {
    locale: Locale
}

export default function LocaleCard({ locale }: LocaleCardProps) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={locale.nome}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {locale.descrizione}
                </Typography>
            </CardContent>

        </Card>
    );
}
