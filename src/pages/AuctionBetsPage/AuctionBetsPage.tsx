import { Heading, Text } from "@radix-ui/themes";
import { useParams } from "@tanstack/react-router";
import { routes } from "../../shared/routes";

export default function AuctionBetsPage() {
  const { id } = useParams({ from: routes.auctionBets('$id') });

  return (
    <>
      <Heading as="h1" size="8">
        Ставки аукциона {id}
      </Heading>
      <Text as="p" color="gray" mt="2">
        Страница ставок
      </Text>
    </>
  );
}
