export enum UserSocials {
  SOUNDCLOUD = "soundcloud",
  INSTAGRAM = "instagram",
  TWITTER = "twitter",
  FACEBOOK = "facebook",
  PINTEREST = "pinterest",
  TUMBLR = "tumblr",
  YOUTUBE = "youtube",
  DISCORD = "discord",
}

export interface IUserInvite {
  phone: string;
  fullName: string;
  instagram: string;
  twitter?: string;
  facebook?: string;
  pinterest?: string;
  tumblr?: string;
  youtube?: string;
  discord?: string;
  soundcloud?: string;
  email?: string;
}
