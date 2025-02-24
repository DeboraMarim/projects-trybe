export type ServiceMessage = { message: string };

export type ServiceResponseError = {
  status: 400 | 401 | 404 | 409 | 422,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 200 | 201 | 204,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
