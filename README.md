# MapsPlanner

MapsPlanner is the web-application for maps and trips planning.

#### Features

- Plan and organize trips around the world.
- Centerlize and view all your destination on the map,
  including name, description and location on the map.
- Suggest new places using ChatGPT.

#### Technologies Used

- React + Redux
- Material-UI
- Vite for fast & responsive development experience.
- SWR and Axios for efficient, easy and smooth network operations experience.
- SCSS and CSS Variables for easy and smooth experience.
- ESLint & Prettier for code quality.

#### Usage

Before you start, make sure you clone [MapsPlanner-API](https://github.com/wnimrod/MapsPlanner-API), and run the backend service as instructed.

#### Envrionment files

You can set environment file for 2 different modes: `development` and `production`.
These are name`.env.prod` and `.env.development` accordinly.

The `.env` file structure is as the following:

| Name                | Descrition                                                                  | Mandatory                                                    |
| ------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------ |
| API_BASE_URL        | MapsPlanner-API server address                                              | Yes                                                          |
| GOOGLE_MAPS_API_KEY | Google Maps API Key                                                         | No. If missing, only open street maps view will be available |
| MAPTILER_API_KEY    | [Maptiler API Key](https://docs.maptiler.com/cloud/api/authentication-key/) | No. If missing. no autocomplete will be shown on map.        |

#### Running the application

For developing purposes, I suggest to run the application locally.
For now, hot reload is not supported in docker.

```bash
pnpm install
pnpm run dev
```

In order to preview the application in production mode, you can choose to run locally, or in a docker container:

#### running in container

Simply run `make build`. This is the prefered method.

You can also run it locally:

```bash
pnpm install
pnpm run preview
```

Enhancements and contributions for this project are welcome. Feel free to open pull request for any improvement :)
