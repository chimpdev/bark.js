# bark.js

![Bark.js Logo](https://i.imgur.com/xcs8YFq.png)

**Bark.js** is a simple JavaScript library for sending custom notifications to your iPhone using the [Bark](https://github.com/Finb/bark) iOS App.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [BarkClient](#barkclient)
- [Contributing](#contributing)
- [Help](#help)
- [License](#license)

## Features
- Send custom push notifications with various options
- Easy to use and integrate

## Installation

```bash
npm install @thiskyhan/bark.js
```

## Usage

```typescript
import { BarkClient, BarkOptions, BarkPushPayload } from 'bark.js';

// Configure the Bark client
const options: BarkOptions = {
  baseUrl: 'https://your-bark-server.com',
  key: 'your-device-key'
};

const client = new BarkClient(options);

// Create a notification payload
const payload: BarkPushPayload = {
  body: 'Hello, this is a test notification!',
  title: 'Test Notification',
  icon: 'https://example.com/icon.jpg',
  url: 'https://example.com'
};

// Send the notification
client.pushMessage(payload).then(response => {
  console.log('Notification sent successfully:', response);
}).catch(error => {
  console.error('Failed to send notification:', error);
});
```

## API

### BarkClient

#### `constructor(options: BarkOptions)`

Creates an instance of `BarkClient`.

- `options` (BarkOptions): Configuration options for the client.
  - `baseUrl` (string): Bark server base URL.
  - `key` (string): Device key for authentication.

#### `pushMessage(payload: BarkPushPayload): Promise<BarkResponse>`

Sends a push notification via the Bark API.

- `payload` (BarkPushPayload): The notification payload to send.
  - `body` (string): Content of the push notification (required).
  - `title` (string): Title of the push notification (optional).
  - `icon` (string): Icon URL for the notification (optional, must be a JPG image).
  - `url` (string): URL to open when the notification is clicked (optional, must be a valid URL).
  - Other optional fields as defined in the `BarkPushPayload` interface.

## Contributing

We welcome contributions from the community! If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository and clone it locally.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure the code passes any existing tests.
4. Commit your changes with descriptive commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
5. Push your changes to your fork and submit a pull request to the `main` branch of the original repository.

Please make sure to follow the [Code of Conduct](.github/CODE_OF_CONDUCT.md) and [Contributing Guidelines](.github/CONTRIBUTING.md) when contributing to this project.

## Help

If you encounter any issues with the Lantern or have any questions, feel free to [open an issue](https://github.com/chimpdev/bark.js/issues) on this repository. We'll do our best to assist you!

## License

This project is licensed under [The GNU General Public License v3.0](LICENSE).

## Acknowledgements

- [Bark](https://github.com/Finb/bark) - The iOS App for push notifications