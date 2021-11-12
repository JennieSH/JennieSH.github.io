import { useAsync } from "@nuxtjs/composition-api";
import { concatPath, getSubjectData } from "@/utils/parser";

const useArticle = (category: string) => {
  const root = `${process.cwd()}/contents`;

  const subjectData = useAsync(() => {
    const categoryPath = concatPath([root, category]);

    return getSubjectData(categoryPath);
  });

  return {
    subjectData
  };
};

export default useArticle;
