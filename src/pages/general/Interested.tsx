import { Box, Typography, Card, Input, Button } from "@mui/joy";
import { useState } from "react";
import { Subscriber } from "../../models/subscriber";
import { urlSubscriber } from "../../endpoints";
import { useApi } from "../../context/api/ApiContext";
import InfoBox from "../../components/app/InfoBox";

const Interested: React.FC = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {

            const newSub = {
                email: email,
                timestamp: new Date,
                type: 'interest'
            }

            const response = await post<Subscriber, any>(`${urlSubscriber}`, newSub);

            if (response) {
                setSubmitted(true);
            }
            else {
            }
        }
    };

    const { post } = useApi()

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" sx={{ mt: 1 }}>
            <InfoBox>
                <Typography level="h3" mb={2}>
                    REGISTER YOUR INTEREST
                </Typography>
                <Typography level="body-md" mb={2}>
                    Merch Tent provides a platform for bands and artists to create amazing merch (tees, hoodies etc), have it listed online for sale, and profit from sales when fans purchase items. The merch solution is 100% free to use. The service also supports the local music scene.
                </Typography>
                <Typography level="body-md" mb={2}>
                    Keen to have your band/artist's merch created and listed on merchtent.com.au?
                </Typography>
                <Typography level="body-md" mb={2}>
                    Register your interest below and we'll let you know when we we're ready to get everyone onboard!
                </Typography>
                {
                    submitted ? (
                        <Typography level="body-md" color="success">
                            Thank you for registering! We'll be launching real soon!
                        </Typography>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type="submit" color="primary" sx={{
                                p: 1.5,
                                bgcolor: '#fcd157',
                                color: 'text.primary',
                                '&:hover': {
                                    bgcolor: '#ffdb70',
                                },
                            }}>
                                Register Interest
                            </Button>
                        </Box>
                    )
                }
            </InfoBox>
            {/* <Card variant="outlined" sx={{ maxWidth: { xs: 400, md: '50%' }, p: 3, textAlign: "center", borderColor: 'transparent', backgroundColor: 'white' }}>


            </Card > */}
        </Box >
    );
};

export default Interested;