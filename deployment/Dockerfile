FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN corepack enable

WORKDIR /src

# Cache and install dependencies
COPY package.json pnpm-lock.yaml /
COPY . /src

# Build project
RUN pnpm install
RUN pnpm run build -- --mode production




