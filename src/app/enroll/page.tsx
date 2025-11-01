import { BlockRenderer } from '../../../direct-next/package/renderers/block-renderer';
import { getEnrollBlocks } from '@/graphql/enroll-query';

export default async function Enroll() {
    try {
        const data = await getEnrollBlocks();

        console.log("Fetched enroll page data:", data);

        if (!data?.how_to_enroll_page || !data.how_to_enroll_page.blocks) {
            return <div>No enroll page data available</div>;
        }

        // Extract blocks and use __typename directly as collection
        const blocks: any[] = data.how_to_enroll_page.blocks
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