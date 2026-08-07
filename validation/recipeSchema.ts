import * as Yup from 'yup';

export const recipeSchema = Yup.object({
  name: Yup.string().max(64, 'Max 64 characters').required(),
  decr: Yup.string().max(200, 'Max 200 characters').required(),
  cookiesTime: Yup.number().min(1, 'Min 1 minute').max(360, 'Max 360 minute').required(),
  cals: Yup.number().min(1).max(10000),
  category: Yup.string().required(),
  ingredient: Yup.array()
    .of(
      Yup.object({
        ingredientId: Yup.string().required(),
        measure: Yup.string().max(10).required(),
      })
    )
    .min(2)
    .max(16)
    .required(),
  instruction: Yup.string().max(1200).required(),
  recipeImg: Yup.mixed()
    .test('fileType', 'Allowed formats: jpg, jpeg, png, webp', (value) => {
      if (!value) return true;
      const file = value as File;
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
    })
    .test('fileSize', 'Max size is 2MB', (value) => {
      if (!value) return true;
      const file = value as File;
      return file.size <= 2 * 1024 * 1024;
    }),
});
