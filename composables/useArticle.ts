import { useAsync } from "@nuxtjs/composition-api";
import {
  concatPath,
  getSubjectData,
  getAllArticleMatter
} from "@/utils/parser";

const useArticle = (category: string, subject?: string) => {
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

  return {
    subjectData,
    articleMatterList
  };
};

export default useArticle;
