export const commentText = "don't touch anything in { }";

export const initialComment = {
  html: `<!--${commentText}-->`,
  json: `//${commentText}`,
  yaml: `#${commentText}`,
};

export const defaultValues = {
  html: `<img src="images/{fileName}" alt="{altText}"/>${initialComment.html}`,
  json: `"path": "images/{fileName}",
  "alt": "{altText}",
  ${initialComment.json}`,
  yaml: `path: "images/{fileName}"
  alt: "{altText}"
  ${initialComment.yaml}`,
};
