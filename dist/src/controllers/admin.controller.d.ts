export declare class AdminController {
    static showAdminPage(req: any, res: any): Promise<void>;
    static showAddPage(req: any, res: any): Promise<void>;
    static addProduct(req: any, res: any): Promise<void>;
    static showList(req: any, res: any): Promise<void>;
    static showFormUpdate(req: any, res: any): Promise<void>;
    static updateProduct(req: any, res: any): Promise<void>;
    static deleteProduct(req: any, res: any): Promise<void>;
    static formAddUser(req: any, res: any): void;
    static addUser(req: any, res: any): Promise<void>;
    static listUser(req: any, res: any): Promise<void>;
    static formUpdateUser(req: any, res: any): Promise<void>;
    static updateUser(req: any, res: any): Promise<void>;
    static deleteUser(req: any, res: any): Promise<void>;
    static searchProduct(req: any, res: any): Promise<void>;
    static showOrderlist(req: any, res: any): Promise<void>;
    static showOrderDetail(req: any, res: any): Promise<void>;
    static deleteOrder(req: any, res: any): Promise<void>;
    static updateStatusOrder(req: any, res: any): Promise<void>;
}
