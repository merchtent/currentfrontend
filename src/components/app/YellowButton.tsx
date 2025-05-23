import { Button } from '@mui/joy'
import { SxProps } from '@mui/material';
import { useNavigate } from 'react-router-dom'

type YellowButtonProps = {
    title: string;
    url: string;
    onClick?: () => void; // Optional onClick function
    sx?: SxProps; // Allow custom styles
};

const YellowButton: React.FC<YellowButtonProps> = ({ title, url, onClick, sx }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick(); // Execute the custom onClick function if provided
        } else {
            navigate(url); // Default behavior: navigate to the given URL
        }
    };

    return (
        <Button
            onClick={handleClick}
            sx={{
                bgcolor: '#fcd157',
                color: 'black',
                '&:hover': {
                    bgcolor: '#d4a847',
                },
                ...sx,
            }}
        >
            {title}
        </Button>
    );
};

export default YellowButton;
