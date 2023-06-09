import { makeAutoObservable } from "mobx";

interface PokemonType {
  name: string;
  url: string;
}

class PokeDataState {
  total = 0;
  pokeList: PokemonType[] = [];
  next = "";

  constructor() {
    makeAutoObservable(this);
  }
  setTotal(newTotal: number) {
      this.total = newTotal;
    console.log('total', this.total);
    
  }
  setNext(newNext: string) {
      this.next = newNext;
    console.log('next', this.next);
    
  }
  setPokeList(newItems: PokemonType[]) {
      this.pokeList = [...this.pokeList, ...newItems];
    console.log('pokeList', this.pokeList);
    
  }
}

export default new PokeDataState();
