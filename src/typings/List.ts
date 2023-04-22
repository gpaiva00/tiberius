export interface ListProps {
  items: ListItem[];
  id: number;
  name: string;
  icon?: string;
}

export interface ListItem {
  id: number;
  text: string;
  completed: boolean;
}