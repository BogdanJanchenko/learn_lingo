import { VehicleForm, TransmissionType, EngineType, AmenityType } from './filters';

// --- СУЩЕСТВУЮЩИЕ ТИПЫ СПИСКА КЕМПЕРОВ ---
export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: VehicleForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: TransmissionType;
  engine: EngineType;
  amenities: AmenityType[];
  coverImage: string;
  totalReviews: number;
}

export interface FetchCampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface FetchCampersParams {
  page: number;
  perPage?: number;
  location?: string;
  form?: VehicleForm;
  transmission?: TransmissionType;
  engine?: EngineType;
}

// --- НОВЫЕ ТИПЫ ИЗ ПОЛНОЙ СПЕЦИФИКАЦИИ ---

// 1. Изображение из галереи кемпера
export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

// 2. Детальная информация об одном кемпере (GET /campers/{camperId})
export interface SingleCamper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: VehicleForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: TransmissionType;
  engine: EngineType;
  amenities: string; // По спецификации возвращается строка "ac"
  gallery: CamperImage[];
  createdAt: string;
  updatedAt: string;
}

// 3. Отзыв о кемпере (GET /campers/{camperId}/reviews)
export interface CamperReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

// 4. Тело запроса для бронирования (POST /campers/{camperId}/booking-requests)
export interface CreateBookingPayload {
  name: string;
  email: string;
}

// 5. Ответ сервера при успешном бронировании
export interface CreateBookingResponse {
  message: string;
}
