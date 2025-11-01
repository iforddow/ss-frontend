'use client';

import { Box, Button, Card, Center, Overlay, Skeleton, Space, Title } from "@mantine/core";
import Image from "next/image";
import useSanitizeContent from "@/hooks/sanitize-content-hook";
import { getImageSrc } from "../../../direct-next/package/directus-utils";
import { useVisualEditing } from "../../../direct-next/package/hooks/visual-editing-hook";
import { directusImageLoader } from "../../../direct-next/package/service/directus-image-loader";
import { HeroBlock } from "../../../direct-next/package/types/directus-schemas";

export default function HeroBlockComponent({ block }: { block: HeroBlock }) {

    const { getDirectusAttr } = useVisualEditing();
    const { sanitizedContent, sanitizedLoading } = useSanitizeContent(block.hero_cta || "");

    const imageSrc = getImageSrc(block.hero_image);

    return (
        <Box w={"100%"} h={"calc(100vh - 56px)"} pos="relative">
            {imageSrc && <Image
                src={imageSrc}
                alt="Super Stars Hero Image"
                fill
                style={{ objectFit: "cover" }}
                priority
                loader={directusImageLoader}
                {...getDirectusAttr('hero_block', block.id, 'hero_image', 'drawer')}
            />}
            <Overlay color="#000" backgroundOpacity={0.55} />
            <Center style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 500 }}>
                <Card bg={"rgba(255, 255, 255, 0.3)"} p={"xl"} radius={"lg"}>
                    <Skeleton animate={true} visible={sanitizedLoading} width={"100%"} radius="xl" ta={"center"}>
                        <Title
                            order={1}
                            size={"50px"}
                            {...getDirectusAttr('hero_block', block.id, 'hero_cta', 'popover')}
                            dangerouslySetInnerHTML={{
                                __html: sanitizedContent
                            }}
                        />
                        <Space h="xl" />
                        <Button w={"50%"} {...(block.button && typeof block.button === 'object' ? getDirectusAttr('button', block.button.id, 'button', 'drawer') : {})}>
                            {(block.button && typeof block.button === 'object' ? block.button.label : block.button) || "Learn More"}
                        </Button>
                    </Skeleton>
                </Card>
            </Center>
        </Box >
    );

}