import $api from "../http/api";
import {AxiosResponse} from "axios";
import {Cart, CartDto} from "../components/assets/utils/Cart";


export default class CartServices {
    static async getCarts (): Promise<AxiosResponse<Cart[]>> {
        return $api.get('/cart');
    }

    static async createCart (cart: CartDto, token: string): Promise<AxiosResponse<Cart>> {
        return $api.post(`/cart?token=${token}`, cart);
    }

    static async updateCart (cart_id: string, cart: CartDto, token: string): Promise<AxiosResponse<void>> {
        return $api.put(`/cart/${cart_id}?token=${token}`, cart);
    }

    static async deleteCart (card_id: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/cart/${card_id}`);
    }

    static async getCartById (cart_id: string): Promise<AxiosResponse<Cart>>{
        return $api.get(`/cart/${cart_id}`);
    }

    static async deleteAll (token: string): Promise<AxiosResponse<void>> {
        return $api.delete(`/cart/user-carts?token=${token}`);
    }

    static async getUserAll (token: string): Promise<AxiosResponse<Cart[]>> {
        return $api.get(`/cart/user-carts?token=${token}`);
    }
}