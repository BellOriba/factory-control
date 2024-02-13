import { Customer } from "@/types/customer.types";
import { Address } from "@/types/address.types";

export type RegisterCustomer = Partial<Omit<Customer, "addressId">> & Partial<Address>;
