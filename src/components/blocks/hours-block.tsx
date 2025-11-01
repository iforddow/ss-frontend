'use client';

import { Box, Center, Grid, Title, Flex, Text, Divider } from "@mantine/core";
import Image from "next/image";
import { useVisualEditing } from "../../../direct-next/package/hooks/visual-editing-hook";
import { HoursBlock } from "../../../direct-next/package/types/directus-schemas";
import { getImageSrc } from "../../../direct-next/package/directus-utils";
import { directusImageLoader } from "../../../direct-next/package/service/directus-image-loader";

// Define the interface for hours of operation
interface HoursOfOperation {
    day: string;
    open: string;
    close: string;
    closed: boolean;
}

// Add this helper function for time formatting
function formatTime(time: string): string {
    if (!time) return '';
    // Assuming time is in HH:MM format, convert to readable format
    const [hours, minutes] = time.split(':');
    const hour12 = parseInt(hours) > 12 ? parseInt(hours) - 12 : parseInt(hours);
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12 === 0 ? 12 : hour12}:${minutes} ${ampm}`;
}

export default function HoursBlockComponent({ block }: { block: HoursBlock }) {

    const { getDirectusAttr } = useVisualEditing();

    // Type assertion to tell TypeScript the structure of hours_of_operation
    const hoursOfOperation = block.hours_of_operation as HoursOfOperation[];

    const imageSrc = getImageSrc(block.image);

    return (
        <Box w={"100%"} pos={"relative"} bg={"primary"} mih={"65vh"}>
            <Grid columns={12} gutter={0} h={"100%"}>
                <Grid.Col span={{ base: 12, md: 4 }} p={"xl"}>
                    <Center h={"100%"} w={"100%"}>
                        <Box w={"70%"}>
                            <Title order={2} c={"white"} mb={"xl"}  {...getDirectusAttr('hours_block', block.id, 'title', 'drawer')}>
                                {block.title}
                            </Title>
                            {hoursOfOperation?.map((day, index) => (
                                <div key={index} {...getDirectusAttr('hours_block', block.id, 'hours_of_operation', 'drawer')}>
                                    <Flex mb={5} direction={"row"} justify={"space-between"} align={"center"}>
                                        <Text c={"white"} fz={"lg"}>
                                            {day.day.replace(day.day.charAt(0), day.day.charAt(0).toUpperCase())}
                                        </Text>
                                        {day.closed ? (
                                            <Text c={"white"} fz={"md"}>
                                                Closed
                                            </Text>
                                        ) : (
                                            <Text c={"white"} fz={"md"}>
                                                {formatTime(day.open)} - {formatTime(day.close)}
                                            </Text>
                                        )}
                                    </Flex>
                                    <Divider mt={"md"} mb={"sm"} />
                                </div>
                            ))}
                        </Box>
                    </Center>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 8 }}>
                    {block.image && (
                        <Image
                            src={imageSrc || ''}
                            alt={block.title}
                            width={800}
                            height={400}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                            loader={directusImageLoader}
                            {...getDirectusAttr('hours_block', block.id, 'image', 'drawer')}
                        />
                    )}
                </Grid.Col>
            </Grid>
        </Box >
    );
}