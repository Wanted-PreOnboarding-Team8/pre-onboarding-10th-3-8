import { AxiosResponse } from 'axios';
import apiRequest from './index';

const RESOURCE = '/todos';

export interface Todo {
  id: number;
  title: string;
}

export const getTodoList = async (): Promise<AxiosResponse<Todo[]>> => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`);

    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export const createTodo = async (data: { title: string }): Promise<AxiosResponse> => {
  try {
    const response = await apiRequest.post(`${RESOURCE}`, data);

    return response;
  } catch (error) {
    throw new Error('API createTodo error');
  }
};

export const deleteTodo = async (id: number): Promise<AxiosResponse> => {
  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`);

    return response;
  } catch (error) {
    throw new Error('API deleteTodo error');
  }
};
