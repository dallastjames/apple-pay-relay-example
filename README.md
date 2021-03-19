# Apple Pay Relay Demo

This server sample is expected to provide the minimal configuration needed to complete an Apple Pay Sandbox Transaction. It provides two endpoints that are required.

### Endpoints

#### `applepayrelay/session/start`

Provides merchant validation for Apple Pay JS requests made from a web application.

> If you're only deploying your application as a native app on iOS, then this endpoint is not required

#### `applepayrelay/session/authorize`

Provides a handler to authorize a transaction for a payment processor. In this demo, this method just returns some fake response data since we are handling sandbox data, but in a real application, you would outfit this endpoint to accept the token data and authorize the transaction.

### Certificates and Keys

You should place your Apple Pay Merchant certificate and private key in the assets folder and reference these files before building the final output.

#### Generating your own keys

When generating your certificate signing request (CSR), going through Key Chain doesn't provide the private key that you need for signing your merchant validation API request (that I'm aware of). The best way that I found was to generate the CSR and private key using the command line.

```bash
$ openssl req -new -newkey rsa:2048 -nodes -keyout applepay.key -out applepay.csr -subj '/O=Company Name/C=US'
```

> `Company Name` and `US` and the end of that command should be replaced with your company name and country code.

This command should generate both the CSR that you can then exchange in the developer portal for your merchant certificate. The certificate, together with the private key can then be used to sign your merchant validation request in this server.

### Building This Demo

The demo provides a simple Dockerfile that can be used to package the application for easy distribution on a server. Follow the steps below to build your own container.

```bash
$ docker build --tag my-container-name:tag .
$ docker run -dit -p 3000:3000 --name=apple-pay-relay --restart=unless-stopped my-container-name:tag
```

This runs your container and exposes the API on port 3000. You can then use a reverse proxy service such as NGINX to route requests to this port. 