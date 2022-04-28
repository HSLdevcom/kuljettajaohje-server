# transitlog-alert-proxy
Proxy for reading transitlog (Reittiloki) alerts for hsl-map-web-ui

# Development
Provide a PostgreSQL connection string in the PG_CONNECTION_STRING environment variable to connect to Transitlog database in an ```.env``` file.

Start proxy locally:
```bash
npm run start
```

Navigate to ```http://localhost:3001/alerts/31M2M``` for example, proxy should return an array of alerts for that route ID

### Build and run in Docker container

```bash
$ docker build -t transitlog-alert-proxy .
$ docker run -d -p 0.0.0.0:3001:3001 transitlog-alert-proxy
```
