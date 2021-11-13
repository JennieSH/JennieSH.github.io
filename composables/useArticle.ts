import { useStatic, ComputedRef, computed } from "@nuxtjs/composition-api";
import {
  concatPath,
  getSubjectData,
  getAllArticleMatter,
  getArticleData
} from "@/utils/parser";

const useArticle = (
  category: ComputedRef<string>,
  subject?: ComputedRef<string>,
  article?: ComputedRef<string>
) => {
  const root = `${process.cwd()}/contents`;
  const subjectId = computed(() => `${category.value}-${subject?.value}`);
  const articleId = computed(() => `${subject?.value}-${article?.value}`);

  const subjectData = useStatic(
    async () => {
      const categoryPath = await concatPath([root, category.value]);

      return getSubjectData(categoryPath);
    },
    category,
    "subjectData"
  );

  const articleMatterList = useStatic(
    async () => {
      if (subject?.value) {
        const subjectPath = await concatPath([
          root,
          category.value,
          subject.value
        ]);

        return getAllArticleMatter(subjectPath);
      }

      return [];
    },
    subjectId,
    "articleMatterList"
  );

  const articleMatter = useStatic(
    async () => {
      if (subject && article) {
        const articlePath = concatPath(
          [root, category.value, subject.value, article.value],
          ".md"
        );
        const articleData = await getArticleData(articlePath);

        return articleData;
      }

      return null;
    },
    articleId,
    "articleMatter"
  );

  return {
    subjectData,
    articleMatterList,
    articleMatter
  };
};

export default useArticle;
