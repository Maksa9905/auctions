import { Heading, Text } from "@radix-ui/themes";
import { useParams } from "@tanstack/react-router";
import { routes } from "../../shared/routes";

export default function AuctionDetailPage() {
  const { id } = useParams({ from: routes.auctionById('$id') });

  return (
    <>
      <Heading as="h1" size="8">
        Аукцион {id}
      </Heading>
      <Text as="p" color="gray" mt="2">
        Детальная страница аукциона
      </Text>
    </>
  );
}
