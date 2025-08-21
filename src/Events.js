import { CardsGridEvents, CardsListEvents } from "@asu/component-events";

const Events = ({ dataFromPage }) => {
  const feed = dataFromPage.feed;
  const view = dataFromPage.view;
  const items = dataFromPage.items;

  return (
    <>
      {view === "Grid" || items === "ThreeCards" ? (
        <CardsGridEvents
          dataSource={{
            url: feed,
          }}
          maxItems={items.startsWith("Three") && 3}
        />
      ) : (
        <CardsListEvents
          dataSource={{ url: feed }}
          maxItems={items === "Three" && 3}
        />
      )}
    </>
  );
};

export default Events;
