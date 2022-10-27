# Grow - Node exercise
Technical Interview [source](https://github.com/Growmies/node-exercise)

## Usage

### Run docker-compose
Open one terminal, go to the root directory and run
```bash
docker-compose up --build
``` 

### Execute bash to enter to the api container
In another terminal run
```bash
docker-compose exec api bash
``` 

###  Install dependencies running
```bash
npm install
``` 

###  Run service inside of container
```bash
npm run dev
``` 

### Accessing to API
http://localhost:3000/people

http://localhost:3000/planets