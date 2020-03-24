export class Encode_Permission {
    private permission: String[] = [];
    constructor(permission: string[]) {
        this.permission = permission;
    }

    encode() {
        const encoded_permission = [];
        for (let index = 0; index < this.permission.length; index++) {
            const encode = btoa(this.permission[index].toString());
            encoded_permission.push(encode);
        }
        return encoded_permission;
    }

    decoded() {
        const encoded_permission = [];
        for (let index = 0; index < this.permission.length; index++) {
            const encode = atob(this.permission[index].toString());
            encoded_permission.push(encode);
        }
        return encoded_permission;
    }
}