import { Stack, Title, Text } from "@mantine/core";
import { useVisualEditing } from "../../../direct-next/package/hooks/visual-editing-hook";
import DynamicIcon from "../icons/dynamic-icon";

export interface ImportanceItemData {
    id: string;
    title: string;
    content: string;
    icon: string;
}

export default function ImportanceItemComponent({ item }: { item: ImportanceItemData }) {

    const { getDirectusAttr } = useVisualEditing();

    return (
        <Stack>
            <Title c={"white"} order={5} fw={"lighter"} {...getDirectusAttr('importance_item', item.id, 'title', 'popover')}>{item.title}</Title>
            <DynamicIcon icon={item.icon} size="80px" color="white" {...getDirectusAttr('importance_item', item.id, 'icon', 'popover')} />
            <Text c={"white"} {...getDirectusAttr('importance_item', item.id, 'content', 'popover')}>{item.content}</Text>
        </Stack>
    );
}