# Finding Falcone

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Problem Statement

Full Problem Detail - [Here](https://drive.google.com/file/d/1hdosmDX9r2m0lvwoLxtDB5LarIN3KjnA/view?usp=sharing)

- You need to build a UI through which King Shan can
  select 4 planets to search (out of the total 6)
  select which space vehicles to send to these planets
  see how much time it will take for the vehicles to reach their targets & show final result of success or failure

#### Provided Data

- A planets API that list out the planets, and how far they are from Lengaburu (https://findfalcone.herokuapp.com/planets)

- A vehicles API that lists the types of space vehicle at your disposal, how many of each type you have, the
  maximum distance a vehicle can go (range), and their speed (https://findfalcone.herokuapp.com/vehicles)

- A FindFalcone API that returns whether you were successful in your search or not (we randomly assign a planet to Al Falcone) (https://findfalcone.herokuapp.com/find)

### Tech used

- VueJS
- Vuetify
- Axios
- VueRouter
- Vue-test-utils
