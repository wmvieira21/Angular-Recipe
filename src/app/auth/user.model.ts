export class User {

    /*_token: Why private and using underscore: this way we can acess
     this atribute as if it was a propriety with the GET above*/

    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date) { }


    /*Get (keyword) is not a function but a especial type of propriety
    how to use it in another class: user.token;
    */
    get token() {
        if (!this._tokenExpirationDate
            || new Date() > this._tokenExpirationDate) {
            return null;
        } else {
            return this._token;
        }
    }

    get tokenExpirationDate() {
        return this._tokenExpirationDate;
    }
}