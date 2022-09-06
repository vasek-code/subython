export interface StreamLabsUser {
  twitch: {
    id: number;
    name: string;
    icon_url: string;
    display_name: string;
  };
  youtube: { id: string; title: string };
  streamlabs: {
    id: number;
    primary: string;
    username: string;
    thumbnail: string;
    display_name: string;
  };
}
