import { create } from "zustand";

type State = {
  count: number;
};

const intitalState: State = {
  count: 0,
};

const useStore = create<State>((set) => ({
  ...intitalState,
}));

export default useStore;
