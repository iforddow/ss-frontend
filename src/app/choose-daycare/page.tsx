import { getChooseDaycareBlocks } from '@/graphql/choose-daycare-query';
import { BlockRenderer } from '../../../direct-next/package/renderers/block-renderer';

export default async function ChooseDaycare() {
    try {
        const data = await getChooseDaycareBlocks();

        console.log("Fetched choose daycare page data:", data);

        if (!data?.choose_daycare_page || !data.choose_daycare_page.blocks) {
            return <div>No choose daycare page data available</div>;
        }

        // Extract blocks and use __typename directly as collection
        const blocks: any[] = data.choose_daycare_page.blocks
            ?.map((blockItem: any) => {
                const item = blockItem.item;

                // Skip empty items
                if (!item || !item.__typename) {
                    console.warn("Skipping empty or invalid block:", blockItem);
                    return null;
                }

                return {
                    collection: item.__typename, // Use __typename directly
                    item
                };
            })
            .filter(Boolean) || [];

        return (
            <div>
                {blocks.length > 0 ? (
                    blocks.map((block: any, index: number) => (
                        <BlockRenderer key={`${block.collection}-${block.item?.id || index}`} block={block} />
                    ))
                ) : (
                    <div>No blocks found</div>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error loading enroll blocks:", error);
        return <div>Error loading data: {error instanceof Error ? error.message : 'Unknown error'}</div>;
    }
}