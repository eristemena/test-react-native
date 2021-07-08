export enum Stacks {
  home = 'Home',
  details = 'Details',
}

export type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
};
