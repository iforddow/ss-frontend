'use client';

import { useVisualEditing } from "../../../direct-next/package/hooks/visual-editing-hook";
import { ImportanceBlock } from "../../../direct-next/package/types/directus-schemas";
import { Box, Center, Grid, SimpleGrid, Title } from "@mantine/core";
import ImportantItemComponent from "../items/importance-item";

export default function ImportanceBlockComponent({ block }: { block: ImportanceBlock }) {

    const { getDirectusAttr } = useVisualEditing();

    return (
        <Box bg={"primary"} mih={"70vh"} py={"7rem"} px={"7rem"}>
            <Center w={"100%"} h={"100%"}>
                <Grid w={"100%"}>
                    <Grid.Col span={{ sm: 12, md: 4 }} mb={"xl"}>
                        <Title c={"white"} mb={"md"} {...getDirectusAttr('importance_block', block.id, 'title', 'popover')}>
                            {block.title}
                        </Title>
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12, md: 8 }}>
                        {block.important_items && block.important_items.length > 0 ? (
                            <SimpleGrid cols={2} spacing="xl">
                                {block.important_items.map((blockItem: any) => (
                                    <ImportantItemComponent key={blockItem.item.id} item={blockItem.item} />
                                ))}
                            </SimpleGrid>
                        ) : (
                            <p>No important items found.</p>
                        )}
                    </Grid.Col>
                </Grid>
            </Center>
        </Box>
    )
}