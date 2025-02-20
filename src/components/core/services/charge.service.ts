import { environment } from '@/env';
import axios from 'axios';
import { ChargeInterface } from '@/components/core/interfaces';

export class ChargeService {
  private ruta:string="/Charge";
  constructor() { 
  }

  async getAllChargeAxios(){
    try {
      const response = await axios.get(`${environment.apiUrl}${this.ruta}`);
      const { data, message }=response.data;
      console.log("axios")
      return {
        status:response.status,
        data,
        message
      };
    } catch (error:any) {
      console.error('Error al obtener los registros:', error);
      return error.data;
    }
  }
  async getAllChargeFetch() {
    try {
      const response = await fetch(`${environment.apiUrl}${this.ruta}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log("fetch");
      const responseData = await response.json();
      const { data, message } = responseData;
      return {
        status: response.status,
        data,
        message
      };
    } catch (error:any) {
      console.error('Error al obtener los registros:', error);
      return { error: error.data };
    }
  }
  
  async getOneCharge(id:number){
    try {
      const response = await axios.get(`${environment.apiUrl}${this.ruta}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    }
  }
  
  async createCharge(charge:ChargeInterface){
    try {
      const response = await axios.post(`${environment.apiUrl}${this.ruta}`,charge);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    }
  }
  async updateCharge(id:number,charge:ChargeInterface){
    try {
      const response = await axios.put(`${environment.apiUrl}${this.ruta}/${id}`,charge);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    }
  }
  async deleteCharge(id:number|any){
    try {
      const response = await axios.delete(`${environment.apiUrl}${this.ruta}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    }
  }
}
