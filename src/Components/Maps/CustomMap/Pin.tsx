import PlaceIcon from '@mui/icons-material/Place';
import { memo } from 'react';

const Pin = ({ size = 20, color = "#d00" }: { size?: number, color?: string }) => <PlaceIcon style={{ color }} />
export default memo(Pin);