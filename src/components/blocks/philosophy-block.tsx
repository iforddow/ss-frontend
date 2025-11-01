'use client';

import { Box, Grid, Title } from "@mantine/core";
import { useVisualEditing } from "../../../direct-next/package/hooks/visual-editing-hook";
import { PhilosophyBlock } from "../../../direct-next/package/types/directus-schemas";
import useSanitizeContent from "@/hooks/sanitize-content-hook";
import Image from "next/image";
import { directusImageLoader } from "../../../direct-next/package/service/directus-image-loader";
import { getImageSrc } from "../../../direct-next/package/directus-utils";

export default function PhilosophyBlockComponent({ block }: { block: PhilosophyBlock }) {

    const { getDirectusAttr } = useVisualEditing();
    const { sanitizedContent } = useSanitizeContent(block.content || "");

    const imageSrc = getImageSrc(block.image);

    return (
        <Box py={"7rem"} px={"7rem"}>
            <Grid gutter={"5rem"}>
                <Grid.Col span={5}>
                    <Box w={"100%"} h={"500px"} pos={"relative"}>
                        <Image
                            src={imageSrc}
                            alt="Super Stars About Image"
                            style={{ objectFit: "cover" }}
                            fill
                            loader={directusImageLoader}
                            {...getDirectusAttr('content_block', block.id, 'image', 'drawer')}
                        />
                    </Box>
                </Grid.Col>
                <Grid.Col span={7}>
                    <Title c={"primary"} mb={"md"}>{block.title}</Title>
                    <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </Grid.Col>
            </Grid>
        </Box >
    );
}