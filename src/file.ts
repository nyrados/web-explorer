export default interface File
{
    type: string;
    name: string;
    mime: string;
    path: string;
    size: number;
    [key: string]: any;
}