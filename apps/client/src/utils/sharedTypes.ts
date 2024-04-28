export type State = {
  user: {
    user: {
      data: User;
      loggedIn: boolean;
      error: string | null;
    };
    loading: boolean;
  };
};
export type Task = {
  _id: string;
  title: string;
  description: string;
  checked: boolean;
  category: string;
  user: User;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
};

export type HandleClick = React.MouseEvent<HTMLButtonElement>;
