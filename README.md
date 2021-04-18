# Social Media Application | Built on MERN  

## This Project is currently under development! 💀

<hr/>

## Present Issues - 
* Changed profile images not showing in posts
* Heart fill preserve on like / unlike
* Save / Share post feature


## Bugs - 
* Bad UX - The CHANGE button under profile change should be disabled before selecting the profile image - If user presses that button without selecting a profile image, all other users can no longer access Friends Area (all those areas where profile picture appears)

<hr/>

## Screenshots - 

![feeds](https://user-images.githubusercontent.com/30652500/115150846-c0c38400-a087-11eb-87fc-2fd39dd88357.JPG)
![profile](https://user-images.githubusercontent.com/30652500/115150847-c15c1a80-a087-11eb-92e8-f49f2b14a137.JPG)
![comments](https://user-images.githubusercontent.com/30652500/115150844-be612a00-a087-11eb-8cda-642a5a34cdce.jpg)
![create-profile](https://user-images.githubusercontent.com/30652500/115150845-c02aed80-a087-11eb-83b1-54b7ecac1018.JPG)


# Steps to run this project 🚀

### Add a default.json file in config folder with the following

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret"
}
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run Server

```bash
node server
```

### Run Client

```bash
npm run start
```
