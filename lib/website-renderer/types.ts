export type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject;
export type JsonObject = { [key: string]: JsonValue };

export type RenderableSection = {
  id: string;
  type: string;
  version: number;
  sortOrder: number;
  visible: boolean;
  content: JsonObject;
};

export type RenderablePage = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  sortOrder: number;
  isHome: boolean;
  sections: RenderableSection[];
};

export type RenderableWebsite = {
  id: string;
  name: string;
  slug: string;
  templateKey: string;
  templateVersion: number;
  businessProfile: JsonObject;
  pages: RenderablePage[];
};
