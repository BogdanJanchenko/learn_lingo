import { directServer } from './api';
import {
  FetchCampersParams,
  FetchCampersResponse,
  SingleCamper,
  CamperReview,
  CreateBookingPayload,
  CreateBookingResponse,
} from '../types/campers';

// 1. Получить все кемперы (с пагинацией и фильтрами)
export const fetchCampers = async ({
  page,
  perPage = 4,
  location,
  form,
  transmission,
  engine,
}: FetchCampersParams): Promise<FetchCampersResponse> => {
  const response = await directServer.get<FetchCampersResponse>('/campers', {
    params: { page, perPage, location, form, transmission, engine },
  });
  return response.data;
};

// 2. Получить один кемпер по ID
export const fetchSingleCamper = async (camperId: string): Promise<SingleCamper> => {
  const response = await directServer.get<SingleCamper>(`/campers/${camperId}`);
  return response.data;
};

// 3. Получить отзывы конкретного кемпера
export const fetchCamperReviews = async (camperId: string): Promise<CamperReview[]> => {
  const response = await directServer.get<CamperReview[]>(`/campers/${camperId}/reviews`);
  return response.data;
};

// 4. Отправить запрос на бронирование кемпера
export const createBookingRequest = async (
  camperId: string,
  payload: CreateBookingPayload
): Promise<CreateBookingResponse> => {
  const response = await directServer.post<CreateBookingResponse>(
    `/campers/${camperId}/booking-requests`,
    payload
  );
  return response.data;
};
