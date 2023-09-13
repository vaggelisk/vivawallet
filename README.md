
## You will find in this repo the following stuff

- An eCommerce web application build by VueJS 3 for Viva Wallet Assessment

## Project Setup


open a terminal (Ctrl+Alt+T) and go to the folder WebstormProjects and type

```sh
git clone https://github.com/vaggelisk/vivawallet.git

cd vivaewallet
```


### choose the version of node

```sh
nvm use 18

```

if you don't have nvm, it's very easy to install via googleSearch
or looking [here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)  and type again

```sh 
nvm use 18
```


```sh
npx yarn install
```

### Compile and Hot-Reload for Development

```sh
npx yarn dev
```

Open browser at http://localhost:5173/

### Type-Check, Compile and Minify for Production

```sh
npx yarn build
```


### Lint with [ESLint](https://eslint.org/)

```sh
npx yarn lint
```
