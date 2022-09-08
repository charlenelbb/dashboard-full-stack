import { MutationFunction } from '@tanstack/react-query'

import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
})

export const loginRequest: MutationFunction = async (params: any) =>
  await apiClient.post(`/login`, params)

export const signupRequest: MutationFunction = async (params: any) =>
  await apiClient.post(`/signup`, params)

export const logoutRequest: MutationFunction = async () =>
  await apiClient.post(`/logout`)

export const filterDateRequest: MutationFunction = async (params: any) =>
  await apiClient.get(`/filter`, { params })
