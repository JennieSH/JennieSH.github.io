import fs from "fs";
import path from "path";
import matter from "gray-matter";
import md from "@/utils/markdown";
import {
  ToC,
  FrontMatter,
  SubjectData,
  ArticleData,
  BasicInfo
} from "@/types/content";

/**
 * join all given path segments and suffix together
 * @example
 * (['dev', 'test', 'TDD'], ".md") => "dev/test/TDD.md"
 * (['dev', 'test']) => "dev/test"
 */
const concatPath = (paths: string[], suffix?: string): string => {
  const tempPath = paths.reduce((pre, cur) => path.join(pre, cur), "");

  return suffix ? `${tempPath}${suffix}` : tempPath;
};

/**
 * returns an array with all the file names or objects in the directory of a given path
 * @example
 * "#${process.cwd()}/contents" => "['dev', 'life']"
 * "#${process.cwd()}/contents/dev/javascript" => "['closure.md']"
 */
const getDirData = (folderPath: string): string[] => fs.readdirSync(folderPath);

/**
 * get front-matter from markdown file
 * @example
 * ('---title: Front Matter---\nThis is content.) => { data:{ title: "Front Matter"}, content:\nThis is content.}
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
 * parse markdown text and return HTML
 * @example
 * "# Hello World" => "<h1>Hello World</h1>"
 */
const parseMarkdownToHtml = (markdownText: string): string =>
  md.render(markdownText);

/**
 * generate ToC and set the anchor to title
 */
const processHtml = (
  rawHtmlContent: string
): { toc: ToC; htmlContent: string } => {
  let htmlContent = rawHtmlContent;
  const toc: ToC = {
    title: "",
    subtitles: []
  };

  // a tag
  const linkRegex = /<a.*?>/g;
  const linkList = htmlContent.match(linkRegex) || [];

  linkList.forEach((anchorTag) => {
    const href = anchorTag.replace(/<a|>/g, "");

    htmlContent = htmlContent.replace(
      anchorTag,
      `<a ${href} target="_blank" rel="noreferrer noopener">`
    );
  });

  // h1 tag
  const titleRegex = /<h1>.*?<\/h1>/g;
  // "<h1>Hello</h1> <h2>World</h2> <h2>!</h2>" => ['<h1>Hello</h1>']
  const titleList = htmlContent.match(titleRegex) || [];

  titleList.forEach((title) => {
    const titleStr = title.replace(/<h1>|<\/h1>/g, "");

    toc.title = titleStr;
    htmlContent = htmlContent.replace(
      title,
      `<h1 id="${titleStr}" title="${titleStr}">${titleStr}</h1>`
    );
  });

  // h2 tag
  const subTitleRegex = /<h2>.*?<\/h2>/g;
  const subTitleList = htmlContent.match(subTitleRegex) || [];

  subTitleList.forEach((title) => {
    const titleStr = title.replace(/<h2>|<\/h2>/g, "");
    const tocTitleStr = titleStr.replace(/<\/?(s|a)>/g, "");

    toc.subtitles.push(tocTitleStr);
    htmlContent = htmlContent.replace(
      title,
      `<h2 id="${titleStr}" title="${titleStr}"><a href="#${titleStr}">${titleStr}</a></h2>`
    );
  });

  return {
    toc,
    htmlContent
  };
};

/**
 * count the number of words from markdownText
 * @param markdownText
 */
const getWordCount = (markdownText: string): number => {
  const textContent = markdownText
    .replace(/[#>*_`~\-+[\]().!]|<\/?[^>]+(>|$)|\s+/g, " ")
    .trim();

  return textContent.split(" ").length;
};

/**
 * calculate the reading time based on the word count
 * @param wordCount
 * @param wordsPerMinute
 */
const calculateReadingTime = (
  wordCount: number,
  wordsPerMinute: number = 250
): number => Math.ceil(wordCount / wordsPerMinute);

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

const getArticleData = (articlePath: string): ArticleData => {
  const { info, content } = getFrontMatter(articlePath);
  const rawHtmlContent = parseMarkdownToHtml(content);
  const { toc, htmlContent } = processHtml(rawHtmlContent);
  const wordCount = getWordCount(content);

  return {
    info,
    content: htmlContent,
    toc,
    wordCount
  };
};

export {
  concatPath,
  calculateReadingTime,
  getSubjectData,
  getAllArticleMatter,
  getArticleData
};
