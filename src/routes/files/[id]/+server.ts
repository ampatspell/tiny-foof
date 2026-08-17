import { getFiles } from '$lib/services';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ params: { id } }) => getFiles().stream({ id });
