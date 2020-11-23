export class GlobalConstants {
    // to be used when developing(use dev API) and when testing locally:
    // public static apiBaseUrl = 'http://localhost:1337/';
    // does not work on production server:
    // public static apiBaseUrl: string = 'http://localhost:8333/';
    // to be used on production server and hence when testing on Travis, Scrutinizer:
    public static apiBaseUrl = 'https://me-api.ktibe.me/';
}
