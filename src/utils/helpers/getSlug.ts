// use slugify to create a slug from a string
import slugify from 'slugify';

export const getSlug = (str: string) => {
  const slugName = slugify(str, {
    replacement: '-',
    lower: true,
    strict: true,
  });

  const slugDate = `${slugName}-${new Date().getTime()}`;

  return slugDate;
};
