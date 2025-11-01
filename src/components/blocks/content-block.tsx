'use client';

import { Box, Button, Center, SimpleGrid, Space, Title, Text } from "@mantine/core";
import { directusImageLoader } from "../../../direct-next/package/service/directus-image-loader";
import Image from "next/image";
import { ContentBlock } from "../../../direct-next/package/types/directus-schemas";
import { useVisualEditing } from "../../../direct-next/package/hooks/visual-editing-hook";
import useSanitizeContent from "@/hooks/sanitize-content-hook";
import { getImageSrc } from "../../../direct-next/package/directus-utils";

export default function ContentBlockComponent({ block }: { block: ContentBlock }) {

    const { getDirectusAttr } = useVisualEditing();
    const { sanitizedContent } = useSanitizeContent(block.content || "");

    const imageSrc = getImageSrc(block.image);

    // Determine if image should be on the right (default) or left
    const imageOnRight = block.image_side !== 'left';

    const leftBgColor = block.left_bg_color || null;
    const rightBgColor = block.right_bg_color || null;

    const getTitleColor = () => {
        if (!block.title_color) return 'primary';
        return block.title_color as any;
    };

    const contentSection = ({ bgColor }: { bgColor: string | null }) => (

        <div>
            <Center h={"100%"} w={"100%"} pos={"relative"} style={{ backgroundColor: bgColor || 'transparent' }}>
                <Box w={"50%"}>
                    <Title c={getTitleColor()} mb={"md"}  {...getDirectusAttr('content_block', block.id, 'title', 'drawer')}>
                        {block.title}
                    </Title>
                    <Text {...getDirectusAttr('content_block', block.id, 'content', 'drawer')}
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                    <Space h={"md"} />
                    {
                        block.button && typeof block.button === 'object' ?
                            <Button {...getDirectusAttr('button', block.button.id, 'button', 'drawer')}>
                                {block.button.label || "Learn More"}
                            </Button>
                            : null
                    }
                </Box>
            </Center>
        </div>
    );

    const imageSection = ({ bgColor }: { bgColor: string | null }) => (
        <div>
            <Box w={"100%"} pos={"relative"} h={"100%"} display="flex" style={{ alignItems: "center", justifyContent: "center", backgroundColor: bgColor || 'transparent' }}>
                <Box h={block.image_scale ? `${block.image_scale}%` : "100%"} w={block.image_scale ? `${block.image_scale}%` : "100%"} pos={"relative"}>
                    <Image
                        src={imageSrc}
                        alt="Super Stars About Image"
                        fill
                        style={{ objectFit: "contain" }}
                        loader={directusImageLoader}
                        {...getDirectusAttr('content_block', block.id, 'image', 'drawer')}
                    />
                </Box>
            </Box>
        </div>
    );

    return (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="0" my={"5rem"} mih={"70vh"} >
            {imageOnRight ? (
                <>
                    {contentSection({ bgColor: leftBgColor })}
                    {imageSection({ bgColor: rightBgColor })}
                </>
            ) : (
                <>
                    {imageSection({ bgColor: leftBgColor })}
                    {contentSection({ bgColor: rightBgColor })}
                </>
            )}
        </SimpleGrid>
    );
}