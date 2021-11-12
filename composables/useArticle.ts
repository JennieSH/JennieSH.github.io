import { useAsync } from "@nuxtjs/composition-api";
import {
  concatPath,
  getSubjectData,
  getAllArticleMatter,
  getArticleData
} from "@/utils/parser";

const useArticle = (category: string, subject?: string, article?: string) => {
  const root = `${process.cwd()}/contents`;

  const subjectData = useAsync(() => {
    const categoryPath = concatPath([root, category]);

    return getSubjectData(categoryPath);
  });

  const articleMatterList = useAsync(() => {
    if (subject) {
      const subjectPath = concatPath([root, category, subject]);

      return getAllArticleMatter(subjectPath);
    }

    return [];
  });

  const articleMatter = useAsync(() => {
    if (subject && article) {
      const articlePath = concatPath([root, category, subject, article], ".md");

      return getArticleData(articlePath);
    }

    return null;
  });

  return {
    subjectData,
    articleMatterList,
    articleMatter
  };
};

export default useArticle;
