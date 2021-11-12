import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { FrontMatter, SubjectData, BasicInfo } from "@/types/content";

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
 * get front-matter from markdown file
 */
const getFrontMatter = (articlePath: string): FrontMatter => {
  const articleData = fs.readFileSync(articlePath, "utf-8");
  const { data, content } = matter(articleData);

  return {
    info: data,
    content
  };
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

const getAllArticleMatter = (subjectPath: string): BasicInfo[] => {
  const articleMatterList = getDirData(subjectPath).map((fileName) => {
    const articlePath = concatPath([subjectPath, fileName]);
    const { info } = getFrontMatter(articlePath);

    return info;
  });

  return articleMatterList;
};

export { concatPath, getSubjectData, getAllArticleMatter };
