interface ToC {
  title: string;
  subtitles: string[];
}

interface BasicInfo {
  title?: string;
  fileName?: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  tags?: string[];
  [key: string]: any;
}

interface FrontMatter {
  info: BasicInfo;
  content: string;
}

interface ArticleData extends FrontMatter {
  toc: ToC;
}

interface SubjectData {
  name: string;
  articleList: string[];
  amount: number;
}

export { ToC, BasicInfo, FrontMatter, ArticleData, SubjectData };
