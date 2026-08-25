import { getFiles } from '$lib/services';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params: { id, variant } }) => {
  const file = await getFiles().get({ id, variant });
  return file.toResponse();
};
