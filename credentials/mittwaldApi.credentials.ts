import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class mittwaldApi implements ICredentialType {
    name = 'mittwaldApi';
    displayName = 'mittwald API';
    documentationUrl = 'https://developer.mittwald.de/docs/v2/api/intro/';
    properties: INodeProperties[] = [
        {
            displayName: 'API Token',
            name: 'apiToken',
            type: 'string',
            default: '',
            required: true,
            typeOptions: { password: true },
        },
    ];
    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                // Das Token wird per X-Access-Token übergeben
                'X-Access-Token': '={{$credentials.apiToken}}',
            },
        },
    };
    test: ICredentialTestRequest = {
        request: {
            // Basis-URL für alle Testrequests
            baseURL: 'https://api.mittwald.de',
            // Einfacher Endpoint, der bei gültigem Token die User-Daten zurückgibt
            url: '/users/self',
        },
    };
}