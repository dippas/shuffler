# Shuffler

![shuffler](https://i.imgur.com/Hq8iFSu.png)

Fun way to sort how people will start talking in meetings, with daily quotes to boost your day

## Show your support

[![bc](https://cdn.buymeacoffee.com/buttons/lato-black.png)](https://www.buymeacoffee.com/dippas)

Give a ⭐️ if you enjoyed this project!

## Status

[![stars](https://img.shields.io/github/stars/dippas/shuffler.svg?style=social)](https://github.com/dippas/shuffler/stargazers)
[![forks](https://img.shields.io/github/forks/dippas/shuffler.svg?style=social)](https://github.com/dippas/shuffler/network)
[![watchers](https://img.shields.io/github/watchers/dippas/shuffler?label=Watchers&style=social)](https://github.com/dippas/shuffler/watchers)

[![release (latest by date)](https://img.shields.io/github/v/release/dippas/shuffler)](https://github.com/dippas/shuffler/releases/latest)
[![issues](https://img.shields.io/github/issues/dippas/shuffler)](https://github.com/dippas/shuffler/issues)
![maintenance](https://img.shields.io/maintenance/yes/2021)
![release date](https://img.shields.io/github/release-date/dippas/shuffler)

## Built With

* [Vue 3](https://vuejs.org/)
* [SCSS](https://sass-lang.com/)
* [Pug](https://pugjs.org/)
* [Vite](https://vitejs.dev/)
* [JSON Server](https://github.com/typicode/json-server)

## Getting Started

### Installation

```sh
npm i
```

### Development

Run json-server and let it running

```sh
npm run db
```

Run project in another terminal at the same time

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Locally preview production build

```sh
npm run preview
```

## Features

* Shuffle Randomly Users (with random rounds bwtween 5 and 10)
* CRUD application with JSON Server (with ability to upload image/avatar stored in base64, fallback to [UI avatars API](https://eu.ui-avatars.com) if no image provided)
* Randomly select daily who will shuffle
* Daily Random Background from [Picsum API](https://picsum.photos/)
* Daily Quotes and it's author with picture from [Quoteable API](https://api.quotable.io/)
* Sound of deck cards shuffling
* Confetti effect when shuffle had finished sorting (with an extra audio - 20th Century Fox Intro Flute)

## ChangeLog

You can check the changelog [here](https://github.com/dippas/shuffer/releases)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

[![Pull requests](https://img.shields.io/github/issues-pr/dippas/shuffler)](https://github.com/dippas/shuffler/pulls)

## License

[![MIT](https://img.shields.io/github/license/dippas/shuffler)](https://choosealicense.com/licenses/mit/)
