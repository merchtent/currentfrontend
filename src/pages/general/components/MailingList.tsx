import { Box, Typography, Card, Input, Button } from "@mui/joy";
import { useState } from "react";
import mail from '../.../../../../assests/images/mailing_list.png'
import InfoBox from "../../../components/app/InfoBox";
import { useApi } from "../../../context/api/ApiContext";
import { Subscriber } from "../../../models/subscriber";
import { urlSubscriber } from "../../../endpoints";

const MailingList: React.FC = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {

            const newSub = {
                email: email,
                timestamp: new Date,
                type: 'sub'
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
                    JOIN OUR MAILING LIST
                </Typography>
                <Typography level="body-md" mb={2}>
                    Receive new product listings, gig guides, coupons, charity information & much more!
                </Typography>
                {
                    submitted ? (
                        <Typography level="body-md" color="success">
                            Thank you for signing up! Stay tuned for updates.
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
                                Subscribe
                            </Button>
                        </Box>
                    )
                }
                {/* <img
                    src={mail}
                    alt="Mailing List"
                    style={{ width: "100%", borderRadius: "8px", marginBottom: "8px" }}
                /> */}
            </InfoBox>
            {/* <Card variant="outlined" sx={{ maxWidth: { xs: 400, md: '50%' }, p: 3, textAlign: "center", borderColor: 'transparent', backgroundColor: 'white' }}>


            </Card > */}
        </Box >
    );
};

export default MailingList;