import { ChargeInterface } from "./charge.interface";

export interface ModalChargeComponent {
  abrirModal(charge: ChargeInterface,op?:string): void;
}
