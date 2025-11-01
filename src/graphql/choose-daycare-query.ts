interface ChooseDaycareBlocksData {
  choose_daycare_page?: {
    id?: string;
    blocks?: {
      item: any;
    }[];
  };
}

export async function getChooseDaycareBlocks(): Promise<ChooseDaycareBlocksData> {
  try {
    const response = await fetch("http://localhost:8055/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({
        query: `
         query GetChooseDaycareBlocks {
            choose_daycare_page {
              blocks {
                item {
                  __typename
                  ... on content_block {
                    id
                    title
                    title_color
                    content
                    image
                    image_side
                    image_scale
                    left_bg_color
                    right_bg_color
                    button {
                      id
                      label
                      icon
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("GraphQL Error Response:", errorText);
      throw new Error(
        `Failed to fetch home blocks: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const result = await response.json();

    if (result.errors) {
      console.log("GraphQL Validation Errors:", result.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error) {
    console.error("Full error:", error);
    throw error;
  }
}
