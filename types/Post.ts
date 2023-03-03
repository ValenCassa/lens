export interface PostsResponse {
  kind: string;
  data: Data2;
}

interface Data2 {
  modhash: string;
  dist: number;
  facets: Facets;
  after: string;
  geo_filter: string;
  children: Child[];
  before?: any;
}

interface Child {
  kind: string;
  data: Data;
}

export interface Data {
  approved_at_utc?: any;
  subreddit: string;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title?: any;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: (Linkflairrichtext | Linkflairrichtext2)[];
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number;
  link_flair_css_class?: string;
  downs: number;
  thumbnail_height?: number;
  top_awarded_type?: any;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: string;
  upvote_ratio: number;
  author_flair_background_color?: string;
  subreddit_type: string;
  ups: number;
  total_awards_received: number;
  media_embed: Facets;
  thumbnail_width?: number;
  author_flair_template_id?: string;
  is_original_content: boolean;
  user_reports: any[];
  secure_media?: any;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category?: any;
  secure_media_embed: Facets;
  link_flair_text?: string;
  can_mod_post: boolean;
  score: number;
  approved_by?: any;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean | number;
  author_flair_css_class?: string;
  author_flair_richtext: (Linkflairrichtext | Authorflairrichtext2)[];
  gildings: Facets;
  content_categories?: string[];
  is_self: boolean;
  mod_note?: any;
  created: number;
  link_flair_type: string;
  wls: number;
  removed_by_category?: any;
  banned_by?: any;
  author_flair_type: string;
  domain: string;
  allow_live_comments: boolean;
  selftext_html: string;
  likes?: any;
  suggested_sort?: string;
  banned_at_utc?: any;
  view_count?: any;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  all_awardings: Allawarding[];
  awarders: any[];
  media_only: boolean;
  link_flair_template_id?: string;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text?: string;
  treatment_tags: any[];
  visited: boolean;
  removed_by?: any;
  num_reports?: any;
  distinguished?: string;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by?: any;
  removal_reason?: any;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons?: any;
  author: string;
  discussion_type?: any;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: string;
  contest_mode: boolean;
  mod_reports: any[];
  author_patreon_flair: boolean;
  author_flair_text_color?: string;
  permalink: string;
  parent_whitelist_status: string;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media?: any;
  is_video: boolean;
  post_hint?: string;
  preview?: Preview;
  url_overridden_by_dest?: string;
  media_metadata?: Mediametadata;
}

interface Mediametadata {
  c7ydo7adjrea1: C7ydo7adjrea1;
  m667i0odjrea1: C7ydo7adjrea1;
  tv9yhzbajrea1: C7ydo7adjrea1;
  n3f8hok5jrea1: C7ydo7adjrea1;
}

interface C7ydo7adjrea1 {
  status: string;
  e: string;
  m: string;
  p: P[];
  s: P;
  id: string;
}

interface P {
  y: number;
  x: number;
  u: string;
}

interface Preview {
  images: Image[];
  enabled: boolean;
}

interface Image {
  source: Resizedicon;
  resolutions: Resizedicon[];
  variants: Facets;
  id: string;
}

interface Allawarding {
  giver_coin_reward?: any;
  subreddit_id?: any;
  is_new: boolean;
  days_of_drip_extension?: any;
  coin_price: number;
  id: string;
  penny_donate?: any;
  award_sub_type: string;
  coin_reward: number;
  icon_url: string;
  days_of_premium?: any;
  tiers_by_required_awardings?: any;
  resized_icons: Resizedicon[];
  icon_width: number;
  static_icon_width: number;
  start_date?: any;
  is_enabled: boolean;
  awardings_required_to_grant_benefits?: any;
  description: string;
  end_date?: any;
  sticky_duration_seconds?: any;
  subreddit_coin_reward: number;
  count: number;
  static_icon_height: number;
  name: string;
  resized_static_icons: Resizedicon[];
  icon_format?: any;
  icon_height: number;
  penny_price?: any;
  award_type: string;
  static_icon_url: string;
}

interface Resizedicon {
  url: string;
  width: number;
  height: number;
}

interface Authorflairrichtext2 {
  a: string;
  e: string;
  u: string;
}

interface Linkflairrichtext2 {
  e: string;
  t: string;
}

interface Linkflairrichtext {
  a?: string;
  e: string;
  u?: string;
  t?: string;
}

interface Facets {}
