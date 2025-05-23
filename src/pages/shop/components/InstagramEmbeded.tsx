import React, { useEffect } from 'react';
import { Box } from '@mui/joy';

type InstagramEmbedProps = {
    url: string;
};

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
    useEffect(() => {
        const script = document.createElement('script');
        script.setAttribute('src', 'https://www.instagram.com/embed.js');
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const embedHTML = `
    <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%;">
    </blockquote>
  `;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
            }}
            dangerouslySetInnerHTML={{ __html: embedHTML }}
        />
    );
}
