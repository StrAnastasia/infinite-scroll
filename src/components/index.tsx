import { FC, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import styled from "@emotion/styled";
import PokeBallIcon from "./pokeball";
import pokeDataState from "../store/poke-data-state";
import { observer } from "mobx-react-lite";

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const InfiniteScrollPage: FC = observer(() => {
  function fetchData() {
    axios
      .get(pokeDataState.next || baseUrl + "?offset=0&limit=96")
      .then(({ data }) => {
        pokeDataState.setTotal(data.count);
        pokeDataState.setNext(data.next);
        pokeDataState.setPokeList(data.results);
      });
  }
  useEffect(() => fetchData(), []);

  return (
    <Wrapper>
      <Header>
        <PokeBallIcon />
        <p>Gotta catach 'em all!</p>
      </Header>
      <InfiniteScroll
        dataLength={pokeDataState.pokeList.length}
        next={fetchData}
        hasMore={
          pokeDataState.total === 0 ||
          pokeDataState.total > pokeDataState.pokeList.length
        }
        loader={
          <p style={{ textAlign: "center" }}>
            <b>Загрузка...</b>
          </p>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Ура! Вы поймали их всех</b>
          </p>
        }
      >
        <List>
          {pokeDataState.pokeList?.map(({ name, url }) => (
            <Card key={name}>
              <img
                alt={name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  url?.split("/")?.[6]
                }.png`}
              />
              <p>{name}</p>
            </Card>
          ))}
        </List>
      </InfiniteScroll>
    </Wrapper>
  );
});

export default InfiniteScrollPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  > div {
    max-width: 2140px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  padding: 16px;
  box-sizing: border-box;
  align-items: center;
  > p {
    margin: 0px 48px 0px 0px;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
  }
`;
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 12px 48px;
`;

const Card = styled.div`
  width: 14.5%;
  padding: 12px;
  box-sizing: border-box;
  background: #ed5564;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1%;
  border-radius: 25px;
  image-rendering: pixelated;
  > img {
    image-rendering: pixelated;
    width: 250px;
    height: auto;
  }
  > p {
    color: white;
  }

  @media (max-width: 1600px) {
    width: 23%;
  }
  @media (max-width: 1150px) {
    width: 31%;
  }
  @media (max-width: 800px) {
    width: 48%;
  }
  @media (max-width: 544px) {
    width: 100%;
    margin-right: 0px;
  }
`;
