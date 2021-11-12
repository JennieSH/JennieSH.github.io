import fs from "fs";
import path from "path";
import { SubjectData } from "@/types/content";

/**
 * @example
 * (['dev', 'test', 'TDD'], ".md") => "dev/test/TDD.md"
 * (['dev', 'test']) => "dev/test"
 */
const concatPath = (paths: string[], suffix?: string): string => {
  const tempPath = paths.reduce((pre, cur) => path.join(pre, cur), "");

  return suffix ? `${tempPath}${suffix}` : tempPath;
};

/**
 * @example
 * "#${process.cwd()}/contents" => "['dev', 'life']"
 * "#${process.cwd()}/contents/dev/javascript" => "['closure.md']"
 */
const getDirData = (folderPath: string): string[] => fs.readdirSync(folderPath);

/**
 * @example
 * "dev" => [ { name: 'javascript', articleList: ['closure.md', 'hoisting.md'] } ]
 */
const getSubjectData = (categoryPath: string): SubjectData[] => {
  const categoryData = getDirData(categoryPath).map((subjectName) => {
    const subjectPath = concatPath([categoryPath, subjectName]);
    const articleList = getDirData(subjectPath);

    return {
      name: subjectName,
      amount: articleList.length,
      articleList
    };
  });

  return categoryData;
};

export { concatPath, getSubjectData };
