# TikTok Live Checker

## About

TikLive is a CLI tool that allows you to check via command line if a TikTok user is currently broadcasting live.

## Prerequisites

Ensure you have installed all of the following prerequisites on your development machine:

**Node.js** - Download & Install Node.js and the npm package manager.

**Docker** - Download & Install Docker on your machine.

## Docker Instructions

### Build the image

To build the Docker image, run the following command:

```shell
docker built -t IMAGE_NAME .
```

### Run the container for the first time

To run the container for the first time, execute the following command:

```shell
docker run -it IMAGE_NAME bash
```

## Usage instructions

### View the help

```shell
tiklive -h
```

### Check if a TikTok user is currently live

```shell
tiklive -s USER_NAME
```

## Running the tests

To run the tests, use the following command:

```shell
npm run test
```

Note: Two services have been programmed to detect if a user is live streaming. Sometimes one may fail, but there's a backup service in place. If you see a test item failing, take this into account and consider changing the user being tested.

You can modify the users to be tested in:

```shell
./src/config/testConfig.ts
```

## Built Using

- [Selenium](https://www.selenium.dev/) - Web Scraping
- [Vitest](https://vitest.dev/) - Testing Framework
- [NodeJs](https://nodejs.org/en) - JavaScript Runtime
- [Commander](https://github.com/tj/commander.js) - CLI Interface Builder for Node.js

## Future implementations

Here are some features and improvements planned for future releases:

- [ ] Implement monitoring capability to detect when a user starts a live stream
- [ ] Add live stream download functionality
- [ ] Enable automatic live stream download when a monitored user starts streaming

## Disclaimer

This is a personal learning project. The software is not guaranteed to work correctly at all times and can be considered in an experimental state. Use it at your own risk. I am not responsible for any misuse of this tool or potential bans from the TikTok platform.
