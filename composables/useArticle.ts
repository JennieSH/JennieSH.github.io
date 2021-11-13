import { useStatic, computed, Ref } from "@nuxtjs/composition-api";
import {
  concatPath,
  getSubjectData,
  getAllArticleMatter,
  getArticleData
} from "@/utils/parser";
import { ArticleData, BasicInfo, SubjectData } from "@/types/content";

const useArticle = () => {
  const root = `${process.cwd()}/contents`;

  const getSubjectDataList = (category: string): Ref<SubjectData[] | null> => {
    const categoryId = computed(() => category);

    return useStatic(
      async () => {
        const categoryPath = concatPath([root, category]);
        const subjectData = await getSubjectData(categoryPath);

        return subjectData;
      },
      categoryId,
      "subjectData"
    );
  };

  const getArticleMatterList = (
    category: string,
    subject: string
  ): Ref<BasicInfo[] | null> => {
    const subjectId = computed(() => `${category}-${subject}`);

    return useStatic(
      async () => {
        const subjectPath = concatPath([root, category, subject]);
        const articleMatterList = await getAllArticleMatter(subjectPath);

        return articleMatterList;
      },
      subjectId,
      "articleMatterList"
    );
  };

  const getArticleMatter = (
    category: string,
    subject: string,
    article: string
  ): Ref<ArticleData | null> => {
    const articleId = computed(() => `${subject}-${article}`);

    return useStatic(
      async () => {
        const articlePath = concatPath(
          [root, category, subject, article],
          ".md"
        );
        const articleData = await getArticleData(articlePath);

        return articleData;
      },
      articleId,
      "articleMatter"
    );
  };

  return {
    getSubjectDataList,
    getArticleMatterList,
    getArticleMatter
  };
};

export default useArticle;
